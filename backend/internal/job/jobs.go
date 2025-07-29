package job

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"regexp"
	"strings"
	"time"
)

type Job struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Company     string `json:"company"`
	Location    string `json:"location"`
	Description string `json:"description"`
	Remote      bool   `json:"remote"`
	Salary      string `json:"salary"`
	PostedDate  string `json:"posted_date"`
	ApplyURL    string `json:"apply_url"`
}

type JobResponse struct {
	Jobs  []Job `json:"results"`
	Count int   `json:"count"`
}

type HuggingFaceClassificationRequest struct {
	Inputs     string `json:"inputs"`
	Parameters struct {
		CandidateLabels []string `json:"candidate_labels"`
	} `json:"parameters"`
}

type HuggingFaceClassificationResponse struct {
	Sequence string    `json:"sequence"`
	Labels   []string  `json:"labels"`
	Scores   []float64 `json:"scores"`
}

type AIJobFilter struct {
	client    *http.Client
	apiURL    string
	threshold float64
}

func NewAIJobFilter() *AIJobFilter {
	return &AIJobFilter{
		client: &http.Client{
			Timeout: 30 * time.Second,
		},
		apiURL:    "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
		threshold: 0.5,
	}
}

func (f *AIJobFilter) classifyJobInclusion(jobText string) (bool, float64, error) {
	inclusiveLabels := []string{
		"inclusive and welcoming job",
		"diversity focused position",
		"accessible workplace opportunity",
		"equal opportunity employment",
		"remote friendly job",
		"disability accommodating workplace",
		"flexible work arrangement",
		"neurodiversity friendly position",
	}

	exclusiveLabels := []string{
		"exclusive or discriminatory job",
		"physically demanding position",
		"high pressure aggressive environment",
		"youth only opportunity",
		"traditional rigid workplace",
	}

	allLabels := append(inclusiveLabels, exclusiveLabels...)

	reqBody := HuggingFaceClassificationRequest{
		Inputs: jobText,
		Parameters: struct {
			CandidateLabels []string `json:"candidate_labels"`
		}{
			CandidateLabels: allLabels,
		},
	}

	jsonData, err := json.Marshal(reqBody)
	if err != nil {
		return false, 0, err
	}

	req, err := http.NewRequest("POST", f.apiURL, bytes.NewBuffer(jsonData))
	if err != nil {
		return false, 0, err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("User-Agent", "Inclisiv-AI-Filter/1.0")

	resp, err := f.client.Do(req)
	if err != nil {
		return false, 0, err
	}
	defer resp.Body.Close()

	if resp.StatusCode == 503 {
		time.Sleep(2 * time.Second)
		return f.classifyJobInclusion(jobText)
	}

	if resp.StatusCode != 200 {
		return false, 0, fmt.Errorf("API request failed with status: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return false, 0, err
	}

	var result HuggingFaceClassificationResponse
	if err := json.Unmarshal(body, &result); err != nil {
		return false, 0, err
	}

	var inclusiveScore float64
	for i, label := range result.Labels {
		for _, inclusiveLabel := range inclusiveLabels {
			if label == inclusiveLabel && result.Scores[i] > inclusiveScore {
				inclusiveScore = result.Scores[i]
			}
		}
	}

	return inclusiveScore >= f.threshold, inclusiveScore, nil
}

func (f *AIJobFilter) analyzeJobSentiment(jobText string) (string, float64, error) {
	sentimentURL := "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest"

	reqBody := map[string]string{
		"inputs": jobText,
	}

	jsonData, err := json.Marshal(reqBody)
	if err != nil {
		return "", 0, err
	}

	req, err := http.NewRequest("POST", sentimentURL, bytes.NewBuffer(jsonData))
	if err != nil {
		return "", 0, err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("User-Agent", "Inclisiv-AI-Filter/1.0")

	resp, err := f.client.Do(req)
	if err != nil {
		return "", 0, err
	}
	defer resp.Body.Close()

	if resp.StatusCode == 503 {
		time.Sleep(2 * time.Second)
		return f.analyzeJobSentiment(jobText)
	}

	if resp.StatusCode != 200 {
		return "", 0, fmt.Errorf("sentiment API request failed with status: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", 0, err
	}

	var results [][]struct {
		Label string  `json:"label"`
		Score float64 `json:"score"`
	}

	if err := json.Unmarshal(body, &results); err != nil {
		return "", 0, err
	}

	if len(results) > 0 && len(results[0]) > 0 {
		bestResult := results[0][0]
		for _, result := range results[0] {
			if result.Score > bestResult.Score {
				bestResult = result
			}
		}
		return bestResult.Label, bestResult.Score, nil
	}

	return "", 0, fmt.Errorf("no sentiment results")
}

func FetchJobs(apiURL string) ([]Job, error) {
	client := &http.Client{Timeout: 30 * time.Second}

	req, err := http.NewRequest("GET", apiURL, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("User-Agent", "Inclisiv-Job-Fetcher/1.0")
	req.Header.Set("Accept", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API request failed with status: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var jobs []Job

	if strings.Contains(apiURL, "greenhouse") {
		re := regexp.MustCompile(`boards[-]?api\.greenhouse\.io/boards/([^/]+)/jobs`)
		matches := re.FindStringSubmatch(apiURL)
		company := "unknown"
		if len(matches) > 1 {
			company = matches[1]
		}
		if company == "unknown" {
    	u, err := url.Parse(apiURL)
    		if err == nil {
        	parts := strings.Split(u.Path, "/")
        	for i, part := range parts {
            	if part == "boards" && i+1 < len(parts) {
              	  company = parts[i+1]
                	break
            	}
        	}
    	}
	}

		var ghResponse struct {
			Jobs []struct {
				ID       int    `json:"id"`
				Title    string `json:"title"`
				Location struct {
					Name string `json:"name"`
				} `json:"location"`
				Content     string `json:"content"`
				UpdatedAt   string `json:"updated_at"`
				Departments []struct {
					Name string `json:"name"`
				} `json:"departments"`
			} `json:"jobs"`
		}
		if err := json.Unmarshal(body, &ghResponse); err != nil {
			return nil, err
		}

		for _, ghJob := range ghResponse.Jobs {
			job := Job{
				ID:          fmt.Sprintf("gh-%d", ghJob.ID),
				Title:       ghJob.Title,
				Company:     strings.Title(company),
				Location:    ghJob.Location.Name,
				Description: ghJob.Content,
				Remote:      strings.Contains(strings.ToLower(ghJob.Location.Name), "remote"),
				PostedDate:  ghJob.UpdatedAt,
				ApplyURL:    fmt.Sprintf("https://boards.greenhouse.io/%s/jobs/%d", company, ghJob.ID),
			}
			jobs = append(jobs, job)
		}
	} else {
		var jobResponse JobResponse
		if err := json.Unmarshal(body, &jobResponse); err != nil {
			return nil, err
		}
		jobs = jobResponse.Jobs
	}

	return jobs, nil
}

func CreateSampleJobs() []Job {
	return []Job{
		{
			ID:          "sample-1",
			Title:       "Inclusive Software Engineer",
			Company:     "TechForAll",
			Location:    "Remote",
			Description: "We're committed to diversity and inclusion. Equal opportunity employer welcoming applications from people with disabilities. We provide reasonable accommodations.",
			Remote:      true,
			Salary:      "$80,000 - $120,000",
			PostedDate:  "2025-07-28",
			ApplyURL:    "https://example.com/jobs/inclusive-engineer",
		},
		{
			ID:          "sample-2",
			Title:       "Accessibility Frontend Developer",
			Company:     "AccessibleTech",
			Location:    "New York, NY",
			Description: "Build accessible web applications. Experience with WCAG guidelines preferred. We provide accommodations for all employees and value neurodiversity.",
			Remote:      false,
			Salary:      "$90,000 - $130,000",
			PostedDate:  "2025-07-27",
			ApplyURL:    "https://example.com/jobs/accessibility-dev",
		},
		{
			ID:          "sample-3",
			Title:       "Remote Data Analyst",
			Company:     "DataInclusive",
			Location:    "Remote",
			Description: "Analyze data to drive inclusive business decisions. Flexible work arrangements available. Diversity is our strength and we welcome all backgrounds.",
			Remote:      true,
			Salary:      "$70,000 - $100,000",
			PostedDate:  "2025-07-26",
			ApplyURL:    "https://example.com/jobs/data-analyst",
		},
		{
			ID:          "sample-4",
			Title:       "Rockstar Developer",
			Company:     "TechBro Corp",
			Location:    "San Francisco, CA",
			Description: "Looking for a young, energetic ninja developer who can work in our fast-paced, aggressive environment. Must be able to stand for long periods.",
			Remote:      false,
			Salary:      "$100,000 - $150,000",
			PostedDate:  "2025-07-25",
			ApplyURL:    "https://example.com/jobs/rockstar-dev",
		},
	}
}

func FilterInclusiveJobsWithAI(jobs []Job) ([]Job, error) {
	filter := NewAIJobFilter()
	var filtered []Job

	for _, job := range jobs {
		jobText := fmt.Sprintf("%s %s %s", job.Title, job.Description, job.Company)

		isInclusive, score, err := filter.classifyJobInclusion(jobText)
		if err != nil {
			return FilterInclusiveJobs(jobs), nil
		}
		fmt.Println(score)

		sentiment, sentimentScore, err := filter.analyzeJobSentiment(jobText)
		if err != nil {
			sentiment = "UNKNOWN"
			sentimentScore = 0
		}

		if isInclusive || job.Remote ||
			(sentiment == "LABEL_1" && sentimentScore > 0.6) ||
			containsInclusiveKeywords(jobText) {
			filtered = append(filtered, job)
		}

		time.Sleep(1 * time.Second)
	}

	return filtered, nil
}

func FilterInclusiveJobs(jobs []Job) []Job {
	keywords := []string{"inclusive", "diversity", "accessibility", "equal opportunity", "disability", "remote"}
	var filtered []Job

	for _, job := range jobs {
		for _, keyword := range keywords {
			if containsIgnoreCase(job.Description, keyword) ||
				containsIgnoreCase(job.Title, keyword) ||
				job.Remote {
				filtered = append(filtered, job)
				break
			}
		}
	}

	return filtered
}

func containsInclusiveKeywords(text string) bool {
	inclusiveWords := []string{
		"diversity", "inclusion", "inclusive", "equal opportunity",
		"accessibility", "accommodation", "flexible", "remote",
		"work-life balance", "neurodiversity", "disability",
		"all backgrounds", "welcoming", "supportive environment",
		"reasonable accommodation", "adaptive", "barrier-free",
	}

	excludeWords := []string{
		"rockstar", "ninja", "young", "energetic", "aggressive",
		"fast-paced pressure", "stand for long periods", "physical demands",
		"must be able to lift", "youth", "recent graduate only",
	}

	textLower := strings.ToLower(text)

	for _, exclude := range excludeWords {
		if strings.Contains(textLower, exclude) {
			return false
		}
	}

	for _, keyword := range inclusiveWords {
		if strings.Contains(textLower, keyword) {
			return true
		}
	}

	return false
}

func containsIgnoreCase(text, substr string) bool {
	return strings.Contains(strings.ToLower(text), strings.ToLower(substr))
}

func DisplayJobsHTTP(w http.ResponseWriter, jobs []Job) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	response := struct {
		Count int   `json:"count"`
		Jobs  []Job `json:"jobs"`
	}{
		Count: len(jobs),
		Jobs:  jobs,
	}

	json.NewEncoder(w).Encode(response)
}
