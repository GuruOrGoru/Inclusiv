package main

import (
	"inclusiv/backend/internal/config"
	"inclusiv/backend/internal/router"
	"log"
)

func main() {
	portstr := config.InitEnvAndGetPortString()
	urls := config.GetAPIURLsFromEnv()
	router := router.NewRouter(urls)

	server := config.GetServerConfigs(portstr, router)

	log.Println("Server started on port", portstr)
	log.Fatalln(server.ListenAndServe())
}
