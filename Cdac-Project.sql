
-- 1. Create database and use it
CREATE DATABASE IF NOT EXISTS project;
USE project;

-- 2. User Table (Admins & Students)
CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'student') NOT NULL
);

-- 3. Exam Type Master Table (e.g., MCQ, Coding)
CREATE TABLE Exam_Type (
    exam_type_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE -- e.g., 'MCQ', 'Coding'
);

-- 4. Course Table
CREATE TABLE Course (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    description TEXT,
    price DECIMAL(10,2),
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES User(user_id) ON DELETE SET NULL
);

-- 5. Enrollments Table (Students enrolled in courses)
CREATE TABLE Enrollments (
    course_id INT,
    student_id INT,
    enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    completion_date DATE,
    PRIMARY KEY (course_id, student_id),
    FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES User(user_id) ON DELETE CASCADE
);

-- 6. Exam Table (Master Exam Table with optional course_id)
CREATE TABLE Exam (
    exam_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    exam_type_id INT NOT NULL,
    start_time DATETIME,
    end_time DATETIME,
    created_by INT NULL,
    course_id INT NULL,  -- Optional course reference

    FOREIGN KEY (exam_type_id) REFERENCES Exam_Type(exam_type_id),
    FOREIGN KEY (created_by) REFERENCES User(user_id) ON DELETE SET NULL,
    FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE SET NULL
);

-- 7. MCQ Question Table (Only MCQ Questions)
CREATE TABLE MCQ_Question (
    question_id INT PRIMARY KEY AUTO_INCREMENT,
    exam_id INT NOT NULL,
    question_text TEXT NOT NULL,
    description TEXT,
    option_a VARCHAR(255),
    option_b VARCHAR(255),
    option_c VARCHAR(255),
    option_d VARCHAR(255),
    correct_option ENUM('A', 'B', 'C', 'D'),
    FOREIGN KEY (exam_id) REFERENCES Exam(exam_id) ON DELETE CASCADE
);

-- 8. Coding Problem Table (Coding questions)
CREATE TABLE Coding_Problem (
    problem_id INT PRIMARY KEY AUTO_INCREMENT,
    exam_id INT NOT NULL,
    question_text TEXT NOT NULL,      -- title
    description TEXT,                 -- detailed explanation
    input_format TEXT,
    output_format TEXT,
    test_cases JSON,                  -- structured test cases JSON
    is_published BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (exam_id) REFERENCES Exam(exam_id) ON DELETE CASCADE
);

-- 9. Exam Submission Table (Student Answers)
CREATE TABLE Exam_Submission (
    exam_id INT,
    student_id INT,
    submission_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    option_submission JSON,          -- for MCQ answers; e.g. {"1":"B", "2":"A"}
    code_submission TEXT,            -- for coding answers/code
    
    score DECIMAL(5,2),
    
    PRIMARY KEY (exam_id, student_id),
    FOREIGN KEY (exam_id) REFERENCES Exam(exam_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES User(user_id) ON DELETE CASCADE
);

-- 10. Module Table (Course Modules)
CREATE TABLE Module (
    module_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    module_number INT NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE
);

-- 11. Lesson Table (Lessons inside Modules with Video Info)
CREATE TABLE Lesson (
    lesson_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    lesson_number INT NOT NULL,
    video_folder VARCHAR(255),       -- e.g., "java_basics"
    video_filename VARCHAR(255),     -- e.g., "intro.mp4"
    module_id INT NOT NULL,
    FOREIGN KEY (module_id) REFERENCES Module(module_id) ON DELETE CASCADE
);

-- ---------------------------
-- Sample Data Insertions
-- ---------------------------

-- Insert exam types
INSERT INTO Exam_Type (name) VALUES ('MCQ'), ('Coding');

-- Insert an admin user
INSERT INTO User (name, email, password, role)
VALUES (
  'Admin User',
  'admin@example.com',
  -- Use bcrypt hash or secure password
  '$2b$10$2qAmBhCFCGgfXpzTLxfEpOnR.bRHkqkZsSrkVEeMtT.0kJISmuoi6',  
  'admin'
);

INSERT INTO User (name, email, password, role)
VALUES (
  'Admin User',
  'rk@gmail.com',
  '1234',
  'admin'
);

-- Insert a sample student user
INSERT INTO User (name, email, password, role)
VALUES ('Sample Student', 'student@example.com', 'password123', 'student');

-- Insert a sample course
INSERT INTO Course (description, price, created_by)
VALUES ('Java Programming Basics', 49.99, 1);

-- Insert exams with and without course attached

-- Exam NOT attached to course (course_id NULL)
INSERT INTO Exam (title, exam_type_id, created_by, start_time, end_time, course_id)
VALUES ('General Aptitude Test', 1, 1, '2025-09-01 10:00:00', '2025-09-01 12:00:00', NULL);

-- Exam attached to course
INSERT INTO Exam (title, exam_type_id, created_by, start_time, end_time, course_id)
VALUES ('Java Basics Final', 2, 1, '2025-10-01 14:00:00', '2025-10-01 16:00:00', NULL);

SELECT email, password FROM User WHERE email = 'rk@gmail.com';

INSERT INTO User (name, email, password, role)
VALUES ('Admin User', 'admin2025@gmail.com', '$2b$10$yOCxw/PeArLN8JbwXdfUK.I7DgjQkj0VLw/On9Q5rEfp4opxtvmCW', 'admin');


INSERT INTO User (name, email, password, role)
VALUES ('joshi', 'joshi@gmail.com', '123456', 'student');

select * from user;

select * from coding_problem;

SELECT * FROM Coding_Problem WHERE is_published = TRUE;

select * from exam;
SELECT * FROM Exam_Type;
SELECT * FROM User;
SELECT * FROM Course;

SELECT * FROM Coding_Problem;

SELECT exam_id FROM Coding_Problem WHERE problem_id = 1;

select * from Exam_Submission;

ALTER TABLE Coding_Problem ADD COLUMN publish_until DATETIME;

SELECT * FROM Coding_Problem WHERE problem_id = 3;
SELECT problem_id, question_text, is_published, publish_until 
FROM Coding_Problem 
WHERE is_published = TRUE AND publish_until > NOW();

SELECT problem_id, is_published, publish_until FROM Coding_Problem;

SELECT * FROM Coding_Problem WHERE is_published = TRUE AND publish_until < NOW();

SELECT problem_id, question_text, is_published, publish_until FROM Coding_Problem;



select now();

SELECT * FROM Coding_Problem WHERE is_published = TRUE AND publish_until > NOW();

UPDATE Coding_Problem
SET is_published = TRUE,
    publish_until = NOW() + INTERVAL 1 DAY
WHERE problem_id = 1;  -- Use actual problem_id from your DB


SELECT problem_id, question_text, is_published, publish_until
FROM Coding_Problem
WHERE is_published = TRUE AND publish_until > NOW();

SELECT problem_id, question_text, is_published, publish_until, NOW()
FROM Coding_Problem;

ALTER TABLE Coding_Problem ADD COLUMN exam_duration_minutes INT DEFAULT 60;

SELECT problem_id, exam_duration_minutes FROM Coding_Problem WHERE problem_id = 1;

SELECT problem_id, exam_duration_minutes FROM Coding_Problem WHERE problem_id = 3;

ALTER TABLE Coding_Problem DROP COLUMN publish_until;

SELECT problem_id, question_text, exam_duration_minutes 
FROM Coding_Problem;

ALTER TABLE Exam_Submission ADD COLUMN status ENUM('submitted', 'auto-submitted') DEFAULT 'submitted';
SELECT problem_id, exam_duration_minutes FROM Coding_Problem;

select * from exam_submission;

ALTER TABLE Coding_Problem ALTER COLUMN is_published SET DEFAULT FALSE;

ALTER TABLE Exam_Submission ADD COLUMN problem_id INT;

-- Make sure student can only submit once per problem
ALTER TABLE Exam_Submission ADD UNIQUE KEY unique_submission (student_id, problem_id);


