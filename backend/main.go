package main

import (
	"log"
	"os"
	"strings"

	"student-portal/config"
	"student-portal/controllers"
	"student-portal/middleware"
	"student-portal/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	// Initialize database
	db, err := config.InitDB()
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Auto migrate database
	if err := db.AutoMigrate(&models.Student{}, &models.User{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	// Initialize Gin router
	if os.Getenv("ENVIRONMENT") == "production" {
		gin.SetMode(gin.ReleaseMode)
	}
	r := gin.Default()

	// Configure CORS
	allowedOrigins := []string{"http://localhost:3000"}
	if frontendURL := os.Getenv("FRONTEND_URL"); frontendURL != "" {
		allowedOrigins = append(allowedOrigins, frontendURL)
	}
	if origins := os.Getenv("ALLOWED_ORIGINS"); origins != "" {
		allowedOrigins = append(allowedOrigins, strings.Split(origins, ",")...)
	}

	r.Use(cors.New(cors.Config{
		AllowOrigins:     allowedOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Public routes (no authentication required)
	api := r.Group("/api")
	{
		// Auth routes
		api.POST("/auth/signup", controllers.Signup)
		api.POST("/auth/login", controllers.Login)
	}

	// Protected routes (authentication required)
	protected := api.Group("/")
	protected.Use(middleware.AuthMiddleware())
	{
		// User profile
		protected.GET("/auth/profile", controllers.GetProfile)

		// Student routes
		protected.GET("/students", controllers.GetAllStudents)
		protected.GET("/students/department/:department", controllers.GetStudentsByDepartment)
		protected.POST("/students", controllers.CreateStudent)
		protected.PUT("/students/:id", controllers.UpdateStudent)
		protected.DELETE("/students/:id", controllers.DeleteStudent)
	}

	// Get port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	log.Printf("Allowed origins: %v", allowedOrigins)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
