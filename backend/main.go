package main

import (
	"log"
	"os"

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

	// Set Gin to release mode in production
	if os.Getenv("ENVIRONMENT") == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()

	// ✅ Hardcoded CORS: Only allow your Vercel frontend
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"https://student-portal-m4.vercel.app"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Public routes
	api := r.Group("/api")
	{
		api.POST("/auth/signup", controllers.Signup)
		api.POST("/auth/login", controllers.Login)
	}

	// Protected routes
	protected := api.Group("/")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.GET("/auth/profile", controllers.GetProfile)
		protected.GET("/students", controllers.GetAllStudents)
		protected.GET("/students/department/:department", controllers.GetStudentsByDepartment)
		protected.POST("/students", controllers.CreateStudent)
		protected.PUT("/students/:id", controllers.UpdateStudent)
		protected.DELETE("/students/:id", controllers.DeleteStudent)
	}

	// Set port
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
