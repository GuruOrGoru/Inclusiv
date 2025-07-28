package main

import (
	"fmt"
	"inclusiv/backend/internal/job"
	"log"
)

func main() {
	apiURLs := []string{
		"https://boards-api.greenhouse.io/v1/boards/gitlab/jobs",
	}

	var allJobs []job.Job

	for _, apiURL := range apiURLs {
		fmt.Printf("Fetching jobs from: %s\n", apiURL)

		jobs, err := job.FetchJobs(apiURL)
		if err != nil {
			log.Printf("Error fetching from %s: %v\n", apiURL, err)
			continue
		}

		fmt.Printf("Retrieved %d jobs\n", len(jobs))
		allJobs = append(allJobs, jobs...)
	}

	if len(allJobs) == 0 {
		fmt.Println("Creating sample jobs for demonstration...")
		allJobs = job.CreateSampleJobs()
	}

	inclusiveJobs := job.FilterInclusiveJobs(allJobs)

	if len(inclusiveJobs) == 0 {
		fmt.Println("No inclusive job opportunities found")
		return
	}

	job.DisplayJobs(inclusiveJobs)

	fmt.Printf("\nTotal jobs processed: %d\n", len(allJobs))
	fmt.Printf("Inclusive opportunities found: %d\n", len(inclusiveJobs))
}
