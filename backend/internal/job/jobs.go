package job

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
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
}

type JobResponse struct {
	Jobs  []Job `json:"results"`
	Count int   `json:"count"`
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
				Company:     "Various",
				Location:    ghJob.Location.Name,
				Description: ghJob.Content,
				Remote:      strings.Contains(strings.ToLower(ghJob.Location.Name), "remote"),
				PostedDate:  ghJob.UpdatedAt,
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
			Description: "We're committed to diversity and inclusion. Equal opportunity employer welcoming applications from people with disabilities.",
			Remote:      true,
			Salary:      "$80,000 - $120,000",
			PostedDate:  "2025-07-28",
		},
		{
			ID:          "sample-2",
			Title:       "Accessibility Frontend Developer",
			Company:     "AccessibleTech",
			Location:    "New York, NY",
			Description: "Build accessible web applications. Experience with WCAG guidelines preferred. We provide accommodations for all employees.",
			Remote:      false,
			Salary:      "$90,000 - $130,000",
			PostedDate:  "2025-07-27",
		},
		{
			ID:          "sample-3",
			Title:       "Remote Data Analyst",
			Company:     "DataInclusive",
			Location:    "Remote",
			Description: "Analyze data to drive inclusive business decisions. Flexible work arrangements available. Diversity is our strength.",
			Remote:      true,
			Salary:      "$70,000 - $100,000",
			PostedDate:  "2025-07-26",
		},
	}
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

func containsIgnoreCase(text, substr string) bool {
	return strings.Contains(strings.ToLower(text), strings.ToLower(substr))
}

func DisplayJobs(jobs []Job) {
	fmt.Printf("Found %d inclusive job opportunities:\n\n", len(jobs))

	for i, job := range jobs {
		fmt.Printf("Job #%d\n", i+1)
		fmt.Printf("Title: %s\n", job.Title)
		fmt.Printf("Company: %s\n", job.Company)
		fmt.Printf("Location: %s\n", job.Location)
		if job.Remote {
			fmt.Printf("Work Type: Remote Friendly\n")
		}
		if job.Salary != "" {
			fmt.Printf("Salary: %s\n", job.Salary)
		}
		fmt.Printf("Posted: %s\n", job.PostedDate)
		fmt.Printf("Description: %.200s...\n", job.Description)
		fmt.Println("---")
	}
}
