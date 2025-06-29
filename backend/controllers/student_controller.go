package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"student-portal/config"
	"student-portal/models"
)

// GetAllStudents returns all students
func GetAllStudents(c *gin.Context) {
	var students []models.Student
	
	if err := config.DB.Find(&students).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch students",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": students,
	})
}

// GetStudentsByDepartment returns students filtered by department
func GetStudentsByDepartment(c *gin.Context) {
	department := c.Param("department")
	var students []models.Student
	
	if err := config.DB.Where("department = ?", department).Find(&students).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch students by department",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": students,
		"department": department,
	})
}

// CreateStudent creates a new student
func CreateStudent(c *gin.Context) {
	var student models.Student
	
	if err := c.ShouldBindJSON(&student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data",
		})
		return
	}

	// Validate required fields
	if student.Name == "" || student.Email == "" || student.Department == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Name, email, and department are required",
		})
		return
	}

	if err := config.DB.Create(&student).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create student",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"data": student,
		"message": "Student created successfully",
	})
}

// UpdateStudent updates an existing student
func UpdateStudent(c *gin.Context) {
	id := c.Param("id")
	var student models.Student
	
	// Parse ID
	studentID, err := strconv.ParseUint(id, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid student ID",
		})
		return
	}

	// Check if student exists
	if err := config.DB.First(&student, studentID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Student not found",
		})
		return
	}

	// Bind request data
	var updateData models.Student
	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data",
		})
		return
	}

	// Update student
	if err := config.DB.Model(&student).Updates(updateData).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to update student",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": student,
		"message": "Student updated successfully",
	})
}

// DeleteStudent deletes a student
func DeleteStudent(c *gin.Context) {
	id := c.Param("id")
	var student models.Student
	
	// Parse ID
	studentID, err := strconv.ParseUint(id, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid student ID",
		})
		return
	}

	// Check if student exists
	if err := config.DB.First(&student, studentID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Student not found",
		})
		return
	}

	// Delete student
	if err := config.DB.Delete(&student).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to delete student",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Student deleted successfully",
	})
} 