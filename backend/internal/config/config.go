package config

import (
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/joho/godotenv"
)

func GetServerConfigs(portstr string, router http.Handler) *http.Server {
	return &http.Server{
		Addr:         ":" + portstr,
		Handler:      router,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}
}

func InitEnvAndGetPortString() string {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file:", err)
	}

	portstr := os.Getenv("PORT")
	if portstr == "" {
		log.Fatal("Port not set in env")
	}
	return portstr
}

func GetAPIURLsFromEnv() []string {
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
