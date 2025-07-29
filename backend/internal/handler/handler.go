package handler

import (
	"encoding/json"
	"fmt"
	"inclusiv/backend/internal/job"
	"log"
	"net/http"
)

func RootHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		response := struct {
			Message string `json:"message"`
		}{
			Message: "Just Go to other Routes!",
		}
		if err := json.NewEncoder(w).Encode(response); err != nil {
			log.Fatalln("Error while internal encoding: ", err)
		}
	}
}

func HealthHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		response := struct {
			Message string `json:"message"`
		}{
			Message: "All good!",
		}
		if err := json.NewEncoder(w).Encode(response); err != nil {
			log.Fatalln("Error while internal encoding: ", err)
		}
	}
}

func JobsHandler(apiURLs []string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

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

		inclusiveJobs, err := job.FilterInclusiveJobsWithAI(allJobs)
		if err != nil {
			log.Fatal("Error while filtering", err)
		}

		job.DisplayJobsHTTP(w, inclusiveJobs)

		fmt.Fprintf(w, "\nTotal jobs processed: %d\n", len(allJobs))
		fmt.Fprintf(w, "Inclusive opportunities found: %d\n", len(inclusiveJobs))
	}
}
