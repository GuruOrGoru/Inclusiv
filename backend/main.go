package main

import (
	"inclusiv/backend/internal/router"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/joho/godotenv"
)

func getAPIURLsFromEnv() []string {
	urlsEnv := os.Getenv("API_URLS")

	if urlsEnv == "" {
		log.Println("Warning: API_URLS environment variable is empty")
		return []string{}
	}

	urlList := strings.Split(urlsEnv, ",")
	urls := make([]string, 0, len(urlList))

	for _, url := range urlList {
		trimmedURL := strings.TrimSpace(url)
		if trimmedURL != "" {
			urls = append(urls, trimmedURL)
		}
	}

	return urls
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file:", err)
	}

	portstr := os.Getenv("PORT")
	if portstr == "" {
		log.Fatal("Port not set in env")
	}

	urls := getAPIURLsFromEnv()
	router := router.NewRouter(urls)

	server := &http.Server{
		Addr:         ":" + portstr,
		Handler:      router,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	log.Println("Server started on port", portstr)
	log.Fatalln(server.ListenAndServe())
}
