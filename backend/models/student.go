package models

import (
	"time"

	"gorm.io/gorm"
)

type Student struct {
	ID         uint           `json:"id" gorm:"primaryKey"`
	Name       string         `json:"name" gorm:"not null"`
	Email      string         `json:"email" gorm:"unique;not null"`
	Department string         `json:"department" gorm:"not null"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`
}

// TableName specifies the table name for the Student model
func (Student) TableName() string {
	return "students"
} 