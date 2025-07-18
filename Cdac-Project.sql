create database project;
use project;

-- 1. User Table (Admins & Students)
CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'student') NOT NULL
);

-- 2. Exam Type Master Table
CREATE TABLE Exam_Type (
    exam_type_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE -- 'MCQ', 'Coding'
);

-- 3. Course Table
CREATE TABLE Course (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    description TEXT,
    price DECIMAL(10,2),
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES User(user_id) ON DELETE SET NULL
);

-- 4. Enrollments Table
CREATE TABLE Enrollments (
    course_id INT,
    student_id INT,
    enrollment_date DATE,
    completion_date DATE,
    PRIMARY KEY (course_id, student_id),
    FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES User(user_id) ON DELETE CASCADE
);

-- 5. Exam Table (Master Table)
CREATE TABLE Exam (
    exam_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    course_id INT,
    exam_type_id INT,
    start_time DATETIME,
    end_time DATETIME,
    FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE,
    FOREIGN KEY (exam_type_id) REFERENCES Exam_Type(exam_type_id)
);

-- 6. Unified Question Table (for both MCQ and Coding)
CREATE TABLE Question (
    question_id INT PRIMARY KEY AUTO_INCREMENT,
    exam_id INT,
    question_type ENUM('MCQ', 'Coding') NOT NULL,
    question_text TEXT NOT NULL,

    -- MCQ-specific
    option_a VARCHAR(255),
    option_b VARCHAR(255),
    option_c VARCHAR(255),
    option_d VARCHAR(255),
    correct_option ENUM('A', 'B', 'C', 'D'),

    -- Coding-specific
    input_format TEXT,
    output_format TEXT,
    test_cases TEXT,

    FOREIGN KEY (exam_id) REFERENCES Exam(exam_id) ON DELETE CASCADE
);

-- 7. Exam Submission Table (Storing result + answers)
CREATE TABLE Exam_Submission (
    exam_id INT,
    student_id INT,
    submission_time DATETIME,
    
    -- Store answers
    option_submission JSON,      -- e.g. {"1":"B", "2":"C"}
    code_submission TEXT,        -- For coding exam code
    
    -- Final score
    score DECIMAL(5,2),

    PRIMARY KEY (exam_id, student_id),
    FOREIGN KEY (exam_id) REFERENCES Exam(exam_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES User(user_id) ON DELETE CASCADE
);

-- 8. Module Table
CREATE TABLE Module (
    module_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    module_number INT NOT NULL,
    course_id INT,
    FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE
);

-- 9. Lesson Table (for video - uses folder + file name)
CREATE TABLE Lesson (
    lesson_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    lesson_number INT NOT NULL,
    video_folder VARCHAR(255),     -- e.g., "java"
    video_filename VARCHAR(255),   -- e.g., "intro.mp4"
    module_id INT,
    FOREIGN KEY (module_id) REFERENCES Module(module_id) ON DELETE CASCADE
);

INSERT INTO User (name, email, password, role)
VALUES (
  'Admin',
  'admin@gmail.com',
  '1234',
  'admin'
);
SELECT * FROM User WHERE email = 'admin@gmail.com';
DELETE FROM User WHERE email = 'admin@gmail.com';

INSERT INTO User (name, email, password, role)
VALUES (
  'Admin User',
  'admin123@gmail.com',
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

INSERT INTO User (name, email, password, role)
VALUES ('Student', 'mj@gmail.com', '1234', 'student');

select * from User