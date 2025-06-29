-- Create database
CREATE DATABASE IF NOT EXISTS student_portal;

-- Connect to the database
\c student_portal;

-- Create students table
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    department VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on department for faster queries
CREATE INDEX IF NOT EXISTS idx_students_department ON students(department);

-- Insert sample data
INSERT INTO students (name, email, department) VALUES
    ('John Doe', 'john.doe@example.com', 'Computer Science'),
    ('Jane Smith', 'jane.smith@example.com', 'Computer Science'),
    ('Mike Johnson', 'mike.johnson@example.com', 'Electrical Engineering'),
    ('Sarah Wilson', 'sarah.wilson@example.com', 'Mechanical Engineering'),
    ('David Brown', 'david.brown@example.com', 'Computer Science'),
    ('Emily Davis', 'emily.davis@example.com', 'Electrical Engineering'),
    ('Robert Miller', 'robert.miller@example.com', 'Mechanical Engineering'),
    ('Lisa Garcia', 'lisa.garcia@example.com', 'Computer Science')
ON CONFLICT (email) DO NOTHING; 