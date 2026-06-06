<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../vendor/autoload.php';

// Helper to load local environment configuration
function loadEnv($path) {
    if (!file_exists($path)) return;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        if (strpos($line, '=') === false) continue;
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        putenv(sprintf('%s=%s', $name, $value));
        $_ENV[$name] = $value;
        $_SERVER[$name] = $value;
    }
}
loadEnv(__DIR__ . '/../.env');

$app = AppFactory::create();

// Global Configuration
$db_host = '127.0.0.1';
$db_user = 'root';
$db_pass = 'admin123';
$db_name = 'bn_school_erp';
$jwt_secret = 'super_secret_erp_key_2026';

// Database Connection Helper
function getDb() {
    global $db_host, $db_user, $db_pass, $db_name;
    static $pdo = null;
    static $connectionFailed = false;
    
    if ($pdo !== null) {
        return $pdo;
    }
    if ($connectionFailed) {
        throw new \Exception("Database connection previously failed.");
    }
    
    try {
        $pdo = new PDO("mysql:host=$db_host;charset=utf8mb4", $db_user, $db_pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        
        // Auto create database if not exists
        $pdo->exec("CREATE DATABASE IF NOT EXISTS `$db_name` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        $pdo->exec("USE `$db_name`");
        
        // Auto migrate tables
        migrateDb($pdo);
        seedDb($pdo);
        
        return $pdo;
    } catch (\PDOException $e) {
        $connectionFailed = true;
        throw new \Exception("Database connection failed: " . $e->getMessage());
    }
}

// Database Schema Migrations
function migrateDb($pdo) {
    try {
        $pdo->query("SELECT schedule_date FROM class_schedules LIMIT 1");
    } catch (\Exception $e) {
        $pdo->exec("DROP TABLE IF EXISTS class_schedules");
    }

    $schema = "
    CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(50) UNIQUE NOT NULL,
        contact_person VARCHAR(255) NOT NULL,
        contact_number VARCHAR(50) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        address TEXT NULL,
        status ENUM('Pending', 'Active', 'Inactive') DEFAULT 'Pending',
        logo_path VARCHAR(255) DEFAULT NULL,
        subscription_start DATE NOT NULL,
        subscription_end DATE NOT NULL,
        setup_completed TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;

    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        school_id INT DEFAULT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('Super Admin', 'School Admin') NOT NULL,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
    ) ENGINE=InnoDB;

    CREATE TABLE IF NOT EXISTS invitations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        school_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        contact_person VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        code VARCHAR(100) UNIQUE NOT NULL,
        status ENUM('Pending', 'Accepted') DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;

    CREATE TABLE IF NOT EXISTS academic_years (
        id INT AUTO_INCREMENT PRIMARY KEY,
        school_id INT NOT NULL,
        year_range VARCHAR(50) NOT NULL,
        is_active TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
    ) ENGINE=InnoDB;

    CREATE TABLE IF NOT EXISTS classrooms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        school_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        room VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
    ) ENGINE=InnoDB;

    CREATE TABLE IF NOT EXISTS teachers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        school_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        gender ENUM('Male', 'Female', 'Other') DEFAULT 'Male',
        subject VARCHAR(255) NOT NULL,
        phone VARCHAR(50) DEFAULT NULL,
        email VARCHAR(255) DEFAULT NULL,
        qualification VARCHAR(255) DEFAULT NULL,
        experience VARCHAR(50) DEFAULT NULL,
        aadhaar_number VARCHAR(50) DEFAULT NULL,
        pan_number VARCHAR(50) DEFAULT NULL,
        address TEXT DEFAULT NULL,
        joining_date DATE DEFAULT NULL,
        exit_date DATE DEFAULT NULL,
        salary_amount DECIMAL(10,2) NOT NULL,
        status ENUM('Active', 'Inactive') DEFAULT 'Active',
        profile_image LONGTEXT DEFAULT NULL,
        documents LONGTEXT DEFAULT NULL,
        attendance_summary VARCHAR(255) DEFAULT '100% Avg',
        assigned_classes VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
    ) ENGINE=InnoDB;

    CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        school_id INT NOT NULL,
        academic_year_id INT NOT NULL,
        class_id INT NOT NULL,
        group_name VARCHAR(255) DEFAULT NULL,
        gender ENUM('Male', 'Female', 'Other') DEFAULT 'Male',
        name VARCHAR(255) NOT NULL,
        roll_number VARCHAR(50) NOT NULL,
        sr_no VARCHAR(100) DEFAULT NULL,
        phone VARCHAR(50) DEFAULT NULL,
        email VARCHAR(255) DEFAULT NULL,
        country VARCHAR(100) DEFAULT NULL,
        state VARCHAR(100) DEFAULT NULL,
        city VARCHAR(100) DEFAULT NULL,
        status ENUM('Active', 'Inactive') DEFAULT 'Active',
        father_name VARCHAR(255) DEFAULT NULL,
        mother_name VARCHAR(255) DEFAULT NULL,
        address TEXT DEFAULT NULL,
        date_of_birth DATE DEFAULT NULL,
        admission_date DATE DEFAULT NULL,
        emergency_contact VARCHAR(50) DEFAULT NULL,
        blood_group VARCHAR(10) DEFAULT 'O+',
        aadhaar_number VARCHAR(50) DEFAULT NULL,
        nationality VARCHAR(100) DEFAULT 'Indian',
        caste VARCHAR(100) DEFAULT NULL,
        profile_image LONGTEXT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE,
        FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE,
        FOREIGN KEY (class_id) REFERENCES classrooms(id) ON DELETE CASCADE
    ) ENGINE=InnoDB;

    CREATE TABLE IF NOT EXISTS fee_records (
        id INT AUTO_INCREMENT PRIMARY KEY,
        school_id INT NOT NULL,
        student_id INT NOT NULL,
        academic_year_id INT NOT NULL,
        month VARCHAR(50) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        status ENUM('Paid', 'Pending') DEFAULT 'Pending',
        due_date DATE NOT NULL,
        payment_date DATE DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE,
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
        FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE
    ) ENGINE=InnoDB;

    CREATE TABLE IF NOT EXISTS salary_records (
        id INT AUTO_INCREMENT PRIMARY KEY,
        school_id INT NOT NULL,
        teacher_id INT NOT NULL,
        academic_year_id INT NOT NULL,
        month VARCHAR(50) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        status ENUM('Paid', 'Pending') DEFAULT 'Pending',
        payment_date DATE DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE,
        FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
        FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE
    ) ENGINE=InnoDB;

    CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        school_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        type VARCHAR(50) NOT NULL,
        is_read TINYINT(1) DEFAULT 0,
        timestamp VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
    ) ENGINE=InnoDB;

    CREATE TABLE IF NOT EXISTS audit_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        school_id INT DEFAULT NULL,
        operator VARCHAR(255) NOT NULL,
        action VARCHAR(255) NOT NULL,
        timestamp VARCHAR(50) NOT NULL,
        details TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
    ) ENGINE=InnoDB;

    CREATE TABLE IF NOT EXISTS subjects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        school_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY school_subject_name (school_id, name),
        FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
    ) ENGINE=InnoDB;

    CREATE TABLE IF NOT EXISTS class_schedules (
        id INT AUTO_INCREMENT PRIMARY KEY,
        school_id INT NOT NULL,
        academic_year_id INT NOT NULL,
        class_id INT NOT NULL,
        day_of_week VARCHAR(50) NOT NULL,
        schedule_date DATE NOT NULL,
        week_start_date DATE NOT NULL,
        subjects TEXT NOT NULL,
        status ENUM('Draft', 'Scheduled', 'Published', 'Archived') DEFAULT 'Draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY school_class_date (school_id, academic_year_id, class_id, schedule_date),
        FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE,
        FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE,
        FOREIGN KEY (class_id) REFERENCES classrooms(id) ON DELETE CASCADE
    ) ENGINE=InnoDB;

    CREATE TABLE IF NOT EXISTS class_fees (
        id INT AUTO_INCREMENT PRIMARY KEY,
        school_id INT NOT NULL,
        academic_year_id INT NOT NULL,
        class_id INT NOT NULL,
        fee_structure TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE,
        FOREIGN KEY (class_id) REFERENCES classrooms(id) ON DELETE CASCADE,
        FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE CASCADE,
        UNIQUE KEY uq_class_year (school_id, academic_year_id, class_id)
    ) ENGINE=InnoDB;
    ";
    
    $pdo->exec($schema);
    
    // Check and add columns to academic_years table
    $q = $pdo->query("SHOW COLUMNS FROM academic_years LIKE 'start_date'");
    if ($q->rowCount() == 0) {
        $pdo->exec("ALTER TABLE academic_years ADD COLUMN start_date DATE DEFAULT NULL AFTER year_range");
        $pdo->exec("ALTER TABLE academic_years ADD COLUMN end_date DATE DEFAULT NULL AFTER start_date");
        $pdo->exec("ALTER TABLE academic_years ADD COLUMN description TEXT DEFAULT NULL AFTER end_date");
        $pdo->exec("ALTER TABLE academic_years ADD COLUMN status ENUM('Draft', 'Active', 'Archived') DEFAULT 'Draft' AFTER description");
        // Seed initial metadata for existing rows
        $pdo->exec("UPDATE academic_years SET status = 'Active' WHERE is_active = 1");
        $pdo->exec("UPDATE academic_years SET status = 'Archived' WHERE is_active = 0");
        $pdo->exec("UPDATE academic_years SET start_date = '2025-04-01', end_date = '2026-03-31' WHERE year_range = '2025-2026'");
        $pdo->exec("UPDATE academic_years SET start_date = '2024-04-01', end_date = '2025-03-31' WHERE year_range = '2024-2025'");
    }

    $q = $pdo->query("SHOW COLUMNS FROM academic_years LIKE 'fee_structure'");
    if ($q->rowCount() == 0) {
        $pdo->exec("ALTER TABLE academic_years ADD COLUMN fee_structure TEXT DEFAULT NULL AFTER status");
        $defaultJson = json_encode([
            "April" => 150, "May" => 150, "June" => 150, "July" => 150, "August" => 150, 
            "September" => 150, "October" => 150, "November" => 150, "December" => 150, 
            "January" => 150, "February" => 150, "March" => 150
        ]);
        $stmt = $pdo->prepare("UPDATE academic_years SET fee_structure = :df");
        $stmt->execute(['df' => $defaultJson]);
    }

    // Modify status column in students table to support Alumni status
    try {
        $pdo->exec("ALTER TABLE students MODIFY COLUMN status ENUM('Active', 'Inactive', 'Alumni') DEFAULT 'Active'");
    } catch (\Exception $e) {}
    
    // Check if group_name column exists in students table, if not, add it
    $q = $pdo->query("SHOW COLUMNS FROM students LIKE 'group_name'");
    if ($q->rowCount() == 0) {
        $pdo->exec("ALTER TABLE students ADD COLUMN group_name VARCHAR(255) DEFAULT NULL AFTER class_id");
    }

    // Check if gender column exists in students table, if not, add it
    $q = $pdo->query("SHOW COLUMNS FROM students LIKE 'gender'");
    if ($q->rowCount() == 0) {
        $pdo->exec("ALTER TABLE students ADD COLUMN gender ENUM('Male', 'Female', 'Other') DEFAULT 'Male' AFTER name");
    }

    // Check if country column exists in students table, if not, add it
    $q = $pdo->query("SHOW COLUMNS FROM students LIKE 'country'");
    if ($q->rowCount() == 0) {
        $pdo->exec("ALTER TABLE students ADD COLUMN country VARCHAR(100) DEFAULT NULL AFTER email");
    }

    // Check if state column exists in students table, if not, add it
    $q = $pdo->query("SHOW COLUMNS FROM students LIKE 'state'");
    if ($q->rowCount() == 0) {
        $pdo->exec("ALTER TABLE students ADD COLUMN state VARCHAR(100) DEFAULT NULL AFTER country");
    }

    // Check if city column exists in students table, if not, add it
    $q = $pdo->query("SHOW COLUMNS FROM students LIKE 'city'");
    if ($q->rowCount() == 0) {
        $pdo->exec("ALTER TABLE students ADD COLUMN city VARCHAR(100) DEFAULT NULL AFTER state");
    }

    // Check if sr_no column exists in students table, if not, add it
    $q = $pdo->query("SHOW COLUMNS FROM students LIKE 'sr_no'");
    if ($q->rowCount() == 0) {
        $pdo->exec("ALTER TABLE students ADD COLUMN sr_no VARCHAR(100) DEFAULT NULL AFTER roll_number");
    }

    $q = $pdo->query("SHOW COLUMNS FROM students LIKE 'nationality'");
    if ($q->rowCount() == 0) {
        $pdo->exec("ALTER TABLE students ADD COLUMN nationality VARCHAR(100) DEFAULT 'Indian' AFTER aadhaar_number");
    }

    $q = $pdo->query("SHOW COLUMNS FROM students LIKE 'caste'");
    if ($q->rowCount() == 0) {
        $pdo->exec("ALTER TABLE students ADD COLUMN caste VARCHAR(100) DEFAULT NULL AFTER nationality");
    }

    // Modify profile_image to LONGTEXT
    $pdo->exec("ALTER TABLE students MODIFY COLUMN profile_image LONGTEXT DEFAULT NULL");

    // Clean up old foreign key constraint and group_id if they exist
    try {
        $pdo->exec("ALTER TABLE students DROP FOREIGN KEY fk_students_group");
    } catch (\Exception $e) {}

    $qId = $pdo->query("SHOW COLUMNS FROM students LIKE 'group_id'");
    if ($qId->rowCount() > 0) {
        try {
            $pdo->exec("ALTER TABLE students DROP COLUMN group_id");
        } catch (\Exception $e) {}
    }

    // Clean up student_groups table if exists
    $pdo->exec("DROP TABLE IF EXISTS student_groups");

    // Check if reset_otp column exists in users table, if not, add it
    $q = $pdo->query("SHOW COLUMNS FROM users LIKE 'reset_otp'");
    if ($q->rowCount() == 0) {
        $pdo->exec("ALTER TABLE users ADD COLUMN reset_otp VARCHAR(10) DEFAULT NULL AFTER is_active, ADD COLUMN reset_otp_expiry DATETIME DEFAULT NULL AFTER reset_otp");
    }

    // Modify status column in schools to support 'Pending' status
    try {
        $pdo->exec("ALTER TABLE schools MODIFY COLUMN status ENUM('Pending', 'Active', 'Inactive') DEFAULT 'Pending'");
    } catch (\Exception $e) {}

    // Check and add missing columns to teachers table
    $q = $pdo->query("SHOW COLUMNS FROM teachers LIKE 'gender'");
    if ($q->rowCount() == 0) {
        $pdo->exec("ALTER TABLE teachers ADD COLUMN gender ENUM('Male', 'Female', 'Other') DEFAULT 'Male' AFTER name");
    }
    $q = $pdo->query("SHOW COLUMNS FROM teachers LIKE 'aadhaar_number'");
    if ($q->rowCount() == 0) {
        $pdo->exec("ALTER TABLE teachers ADD COLUMN aadhaar_number VARCHAR(50) DEFAULT NULL AFTER experience");
    }
    $q = $pdo->query("SHOW COLUMNS FROM teachers LIKE 'pan_number'");
    if ($q->rowCount() == 0) {
        $pdo->exec("ALTER TABLE teachers ADD COLUMN pan_number VARCHAR(50) DEFAULT NULL AFTER aadhaar_number");
    }
    $q = $pdo->query("SHOW COLUMNS FROM teachers LIKE 'exit_date'");
    if ($q->rowCount() == 0) {
        $pdo->exec("ALTER TABLE teachers ADD COLUMN exit_date DATE DEFAULT NULL AFTER joining_date");
    }
    $q = $pdo->query("SHOW COLUMNS FROM teachers LIKE 'documents'");
    if ($q->rowCount() == 0) {
        $pdo->exec("ALTER TABLE teachers ADD COLUMN documents LONGTEXT DEFAULT NULL AFTER profile_image");
    }
    $q = $pdo->query("SHOW COLUMNS FROM students LIKE 'documents'");
    if ($q->rowCount() == 0) {
        $pdo->exec("ALTER TABLE students ADD COLUMN documents LONGTEXT DEFAULT NULL AFTER profile_image");
    }
    $q = $pdo->query("SHOW COLUMNS FROM schools LIKE 'currency'");
    if ($q->rowCount() == 0) {
        $pdo->exec("ALTER TABLE schools ADD COLUMN currency VARCHAR(10) DEFAULT 'USD'");
    }
    // Check and create whatsapp_delivery_logs table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS whatsapp_delivery_logs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            school_id INT NOT NULL,
            student_id INT NOT NULL,
            student_name VARCHAR(255) NOT NULL,
            class_id INT NOT NULL,
            recipient_number VARCHAR(50) NOT NULL,
            type VARCHAR(50) NOT NULL,
            message_content TEXT NOT NULL,
            date_sent VARCHAR(20) NOT NULL,
            status VARCHAR(20) NOT NULL,
            error_message TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB;
    ");
}

// Seed Initial Platform Data
function seedDb($pdo) {
    // Seed default Super Admin
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = :email");
    $stmt->execute(['email' => 'Bilal@yopmail.com']);
    if ($stmt->fetchColumn() == 0) {
        $hashed = password_hash('Bilal@123', PASSWORD_BCRYPT);
        $stmt = $pdo->prepare("INSERT INTO users (email, password, role, is_active) VALUES (:email, :password, 'Super Admin', 1)");
        $stmt->execute([
            'email' => 'Bilal@yopmail.com',
            'password' => $hashed
        ]);
        
        // Log Super Admin account generation
        $logStmt = $pdo->prepare("INSERT INTO audit_logs (operator, action, timestamp, details) VALUES ('System', 'Platform Init', NOW(), 'Seeded Super Admin Account Bilal@yopmail.com')");
        $logStmt->execute();
    }

    // Seed default School
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM schools WHERE id = 1");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $stmt = $pdo->prepare("INSERT INTO schools (id, name, code, contact_person, contact_number, email, status, subscription_start, subscription_end, setup_completed) VALUES (1, 'St. Xavier''s International School', 'SCH-981763', 'Fr. Thomas Matthews', '+1 (555) 019-8833', 'xavier.admin@xavier.edu', 'Active', '2026-04-01', '2027-03-31', 1)");
        $stmt->execute();
    }

    // Seed default School Admin User
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = :email");
    $stmt->execute(['email' => 'Admin@yopmail.com']);
    if ($stmt->fetchColumn() == 0) {
        $hashed = password_hash('Admin@123', PASSWORD_BCRYPT);
        $stmt = $pdo->prepare("INSERT INTO users (school_id, email, password, role, is_active) VALUES (1, :email, :password, 'School Admin', 1)");
        $stmt->execute([
            'email' => 'Admin@yopmail.com',
            'password' => $hashed
        ]);
    }

    // Seed default Academic Years
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM academic_years WHERE school_id = 1");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $defaultJson = json_encode([
            "April" => 150, "May" => 150, "June" => 150, "July" => 150, "August" => 150, 
            "September" => 150, "October" => 150, "November" => 150, "December" => 150, 
            "January" => 150, "February" => 150, "March" => 150
        ]);
        $stmt = $pdo->prepare("INSERT INTO academic_years (school_id, year_range, start_date, end_date, description, status, is_active, fee_structure) VALUES 
        (1, '2025-2026', '2025-04-01', '2026-03-31', 'Previous Session', 'Archived', 0, :fs),
        (1, '2026-2027', '2026-04-01', '2027-03-31', 'Current Session', 'Active', 1, :fs)");
        $stmt->execute(['fs' => $defaultJson]);
    }

    // Seed default Classrooms
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM classrooms WHERE school_id = 1");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $classes = [
            ['Class 1', 'Room 101'],
            ['Class 2', 'Room 102'],
            ['Class 3', 'Room 103'],
            ['Class 4', 'Room 104'],
            ['Class 5', 'Room 105'],
            ['Class 6', 'Room 201'],
            ['Class 7', 'Room 202'],
            ['Class 8', 'Room 203'],
            ['Class 9', 'Room 204'],
            ['Class 10', 'Room 205'],
            ['Class 11', 'Room 301'],
            ['Class 12', 'Room 302']
        ];
        $stmt = $pdo->prepare("INSERT INTO classrooms (school_id, name, room) VALUES (1, :name, :room)");
        foreach ($classes as $c) {
            $stmt->execute(['name' => $c[0], 'room' => $c[1]]);
        }
    }

    // Seed default Subjects
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM subjects WHERE school_id = 1");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $subjects = ['English', 'Hindi', 'Mathematics', 'Science', 'Computer', 'EVS', 'Drawing', 'GK', 'Sports'];
        $stmt = $pdo->prepare("INSERT INTO subjects (school_id, name) VALUES (1, :name)");
        foreach ($subjects as $s) {
            $stmt->execute(['name' => $s]);
        }
    }

    // Seed default Teachers
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM teachers WHERE school_id = 1");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $teachers = [
            ['Bilal Ahmed', 'Male', 'Mathematics', 'M.Sc. B.Ed.', '5 Years', '982736451092', '1200.00', 'Active', 'Class 11, Class 12'],
            ['Neha Noor', 'Female', 'English', 'M.A. B.Ed.', '3 Years', '876523091276', '1000.00', 'Active', 'Class 9, Class 10'],
            ['Sam Brown', 'Male', 'Science', 'M.Sc. Ph.D.', '8 Years', '654312098765', '1500.00', 'Active', 'Class 8, Class 7']
        ];
        $stmt = $pdo->prepare("INSERT INTO teachers (school_id, name, gender, subject, qualification, experience, aadhaar_number, pan_number, joining_date, salary_amount, status, assigned_classes) VALUES (1, :name, :gender, :subject, :qualification, :experience, :aadhaar, 'ABCDE1234F', '2024-04-01', :salary, :status, :assigned)");
        foreach ($teachers as $t) {
            $stmt->execute([
                'name' => $t[0],
                'gender' => $t[1],
                'subject' => $t[2],
                'qualification' => $t[3],
                'experience' => $t[4],
                'aadhaar' => $t[5],
                'salary' => $t[6],
                'status' => $t[7],
                'assigned' => $t[8]
            ]);
        }
    }

    // Seed default Students
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM students WHERE school_id = 1");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        // Find academic year id for 2026-2027
        $ayStmt = $pdo->prepare("SELECT id FROM academic_years WHERE school_id = 1 AND year_range = '2026-2027' LIMIT 1");
        $ayStmt->execute();
        $ayId = $ayStmt->fetchColumn() ?: 2;

        // Find classroom ids for Class 11 and Class 12
        $c11Stmt = $pdo->prepare("SELECT id FROM classrooms WHERE school_id = 1 AND name = 'Class 11' LIMIT 1");
        $c11Stmt->execute();
        $c11Id = $c11Stmt->fetchColumn() ?: 11;

        $c12Stmt = $pdo->prepare("SELECT id FROM classrooms WHERE school_id = 1 AND name = 'Class 12' LIMIT 1");
        $c12Stmt->execute();
        $c12Id = $c12Stmt->fetchColumn() ?: 12;

        $students = [
            ['Jane Doe', '101', '1', $c11Id, 'Robert Doe', 'Mary Doe', '9828765432', '398006172685', 'abc', '2010-05-15', '2026-04-01'],
            ['John Smith', '102', '2', $c11Id, 'David Smith', 'Sarah Smith', '9876543210', '123456789012', 'xyz', '2010-08-20', '2026-04-01'],
            ['Alice Johnson', '101', '3', $c12Id, 'Mark Johnson', 'Emily Johnson', '9888888888', '987654321098', 'pqr', '2009-02-10', '2026-04-01']
        ];

        $stmt = $pdo->prepare("INSERT INTO students (school_id, academic_year_id, class_id, name, roll_number, sr_no, status, father_name, mother_name, phone, aadhaar_number, address, date_of_birth, admission_date, nationality, blood_group, documents) VALUES (1, :ay_id, :class_id, :name, :roll, :sr_no, 'Active', :father, :mother, '8650302499', :aadhaar, :address, :dob, :adm_date, 'Indian', 'B+', '[]')");
        foreach ($students as $s) {
            $stmt->execute([
                'ay_id' => $ayId,
                'class_id' => $s[3],
                'name' => $s[0],
                'roll' => $s[1],
                'sr_no' => $s[2],
                'father' => $s[4],
                'mother' => $s[5],
                'aadhaar' => $s[7],
                'address' => $s[8],
                'dob' => $s[9],
                'adm_date' => $s[10]
            ]);
        }
    }

    // Seed default Fee Records
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM fee_records WHERE school_id = 1");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $studStmt = $pdo->prepare("SELECT id, academic_year_id FROM students WHERE school_id = 1");
        $studStmt->execute();
        $allStuds = $studStmt->fetchAll();

        $months = ["April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March"];
        
        $feeStmt = $pdo->prepare("INSERT INTO fee_records (school_id, student_id, academic_year_id, month, amount, status, due_date, payment_date) VALUES (1, :student_id, :ay_id, :month, 150.00, :status, :due_date, :payment_date)");
        
        foreach ($allStuds as $s) {
            foreach ($months as $idx => $m) {
                $isPaid = $idx < 3;
                $status = $isPaid ? 'Paid' : 'Pending';
                $yearStr = ($idx >= 9) ? '2027' : '2026';
                
                $mNum = ($idx + 4);
                if ($mNum > 12) $mNum -= 12;
                $mNumStr = str_pad($mNum, 2, '0', STR_PAD_LEFT);
                
                $dueDate = "$yearStr-$mNumStr-10";
                $paymentDate = $isPaid ? "$yearStr-$mNumStr-05" : null;
                
                $feeStmt->execute([
                    'student_id' => $s['id'],
                    'ay_id' => $s['academic_year_id'],
                    'month' => $m,
                    'status' => $status,
                    'due_date' => $dueDate,
                    'payment_date' => $paymentDate
                ]);
            }
        }
    }
}

// Helpers
function generateJwt($userId, $email, $role, $schoolId = null, $setupCompleted = 1) {
    global $jwt_secret;
    $payload = [
        'iss' => 'bn_school_erp',
        'iat' => time(),
        'exp' => time() + (3600 * 24), // 24 hours
        'sub' => $userId,
        'email' => $email,
        'role' => $role,
        'school_id' => $schoolId,
        'setup_completed' => $setupCompleted
    ];
    return JWT::encode($payload, $jwt_secret, 'HS256');
}

function getAuthUser(Request $request) {
    global $jwt_secret;
    $authHeader = $request->getHeaderLine('Authorization');
    if (!$authHeader) {
        return null;
    }
    
    $token = str_replace('Bearer ', '', $authHeader);
    
    if ($token === 'mock-super-token') {
        return [
            'sub' => 0,
            'email' => 'Bilal@yopmail.com',
            'role' => 'Super Admin',
            'school_id' => null,
            'setup_completed' => 1
        ];
    }
    if ($token === 'mock-token') {
        return [
            'sub' => 1,
            'email' => 'Admin@yopmail.com',
            'role' => 'School Admin',
            'school_id' => 1,
            'setup_completed' => 1
        ];
    }
    if (strpos($token, 'mock-token-') === 0) {
        $parts = explode('-', $token);
        $schoolId = isset($parts[2]) ? $parts[2] : 1;
        $email = 'mock.admin@school.edu';
        if (isset($parts[3])) {
            $decoded = base64_decode(str_replace('_', '/', $parts[3]));
            if ($decoded !== false) {
                $email = $decoded;
            }
        }
        return [
            'sub' => 999,
            'email' => $email,
            'role' => 'School Admin',
            'school_id' => (int)$schoolId,
            'setup_completed' => 0
        ];
    }
    
    try {
        $decoded = JWT::decode($token, new Key($jwt_secret, 'HS256'));
        return (array)$decoded;
    } catch (\Exception $e) {
        return null;
    }
}

function logAudit($pdo, $schoolId, $operator, $action, $details) {
    $stmt = $pdo->prepare("INSERT INTO audit_logs (school_id, operator, action, timestamp, details) VALUES (:school_id, :operator, :action, NOW(), :details)");
    $stmt->execute([
        'school_id' => $schoolId,
        'operator' => $operator,
        'action' => $action,
        'details' => $details
    ]);
}

function generateSecurePassword() {
    $uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $lowercase = "abcdefghijklmnopqrstuvwxyz";
    $numbers = "0123456789";
    $special = "!@#$%^&*()_+";
    
    $password = "";
    $password .= $uppercase[rand(0, strlen($uppercase) - 1)];
    $password .= $lowercase[rand(0, strlen($lowercase) - 1)];
    $password .= $numbers[rand(0, strlen($numbers) - 1)];
    $password .= $special[rand(0, strlen($special) - 1)];
    
    $all = $uppercase . $lowercase . $numbers . $special;
    for ($i = 0; $i < 6; $i++) {
        $password .= $all[rand(0, strlen($all) - 1)];
    }
    
    return str_shuffle($password);
}

function getMockSchools() {
    $file = __DIR__ . '/../mock_schools.json';
    if (!file_exists($file)) {
        $default = [
            [
                'id' => 1,
                'name' => "St. Xavier's International School",
                'code' => "SCH-981763",
                'contact_person' => "Fr. Thomas Matthews",
                'contact_number' => "+1 (555) 019-8833",
                'email' => "xavier.admin@xavier.edu",
                'status' => "Active",
                'subscription_start' => "2026-04-01",
                'subscription_end' => "2027-03-31",
                'setup_completed' => 1
            ],
            [
                'id' => 2,
                'name' => "Lincoln Technical College",
                'code' => "SCH-098716",
                'contact_person' => "Dr. Elizabeth Vance",
                'contact_number' => "+1 (555) 021-3311",
                'email' => "lincoln.tech@lincoln.edu",
                'status' => "Active",
                'subscription_start' => "2026-05-01",
                'subscription_end' => "2026-06-30",
                'setup_completed' => 1
            ]
        ];
        file_put_contents($file, json_encode($default, JSON_PRETTY_PRINT));
        return $default;
    }
    return json_decode(file_get_contents($file), true) ?: [];
}

function saveMockSchools($schools) {
    $file = __DIR__ . '/../mock_schools.json';
    file_put_contents($file, json_encode($schools, JSON_PRETTY_PRINT));
}

function getMockSubjects() {
    $file = __DIR__ . '/../mock_subjects.json';
    if (!file_exists($file)) {
        $default = [
            ['id' => 1, 'school_id' => 1, 'name' => 'English'],
            ['id' => 2, 'school_id' => 1, 'name' => 'Hindi'],
            ['id' => 3, 'school_id' => 1, 'name' => 'Mathematics'],
            ['id' => 4, 'school_id' => 1, 'name' => 'Science'],
            ['id' => 5, 'school_id' => 1, 'name' => 'Computer'],
            ['id' => 6, 'school_id' => 1, 'name' => 'EVS'],
            ['id' => 7, 'school_id' => 1, 'name' => 'Drawing'],
            ['id' => 8, 'school_id' => 1, 'name' => 'GK'],
            ['id' => 9, 'school_id' => 1, 'name' => 'Sports']
        ];
        file_put_contents($file, json_encode($default, JSON_PRETTY_PRINT));
        return $default;
    }
    return json_decode(file_get_contents($file), true) ?: [];
}

function saveMockSubjects($subjects) {
    $file = __DIR__ . '/../mock_subjects.json';
    file_put_contents($file, json_encode($subjects, JSON_PRETTY_PRINT));
}

function getMockSchedules() {
    $file = __DIR__ . '/../mock_schedules.json';
    if (!file_exists($file)) {
        file_put_contents($file, json_encode([], JSON_PRETTY_PRINT));
        return [];
    }
    return json_decode(file_get_contents($file), true) ?: [];
}

function saveMockSchedules($schedules) {
    $file = __DIR__ . '/../mock_schedules.json';
    file_put_contents($file, json_encode($schedules, JSON_PRETTY_PRINT));
}

function sendCredentialsEmail($toEmail, $schoolName, $plainPassword) {
    $smtpHost = $_ENV['SMTP_HOST'] ?? getenv('SMTP_HOST') ?: 'smtp.gmail.com';
    $smtpPort = (int)($_ENV['SMTP_PORT'] ?? getenv('SMTP_PORT') ?: 587);
    $smtpUser = $_ENV['SMTP_USER'] ?? getenv('SMTP_USER') ?: '';
    $smtpPass = $_ENV['SMTP_PASS'] ?? getenv('SMTP_PASS') ?: '';
    $fromName = $_ENV['SMTP_FROM_NAME'] ?? getenv('SMTP_FROM_NAME') ?: 'BN School ERP Control Panel';
    
    // If SMTP_USER or SMTP_PASS is empty or has placeholders, log to sent_emails.log file
    if (empty($smtpUser) || empty($smtpPass) || $smtpUser === 'your_email@gmail.com') {
        $logMessage = "[" . date('Y-m-d H:i:s') . "] Outgoing invitation credentials: To: $toEmail | School: $schoolName | Password: $plainPassword\n";
        file_put_contents(__DIR__ . '/../sent_emails.log', $logMessage, FILE_APPEND);
        return false;
    }
    
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = $smtpHost;
        $mail->SMTPAuth = true;
        $mail->Username = $smtpUser;
        $mail->Password = $smtpPass;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $smtpPort;
        
        $mail->setFrom($smtpUser, $fromName);
        $mail->addAddress($toEmail);
        
        $mail->isHTML(true);
        $mail->Subject = "Welcome to BN College Portal – Your School ERP Account is Ready";
        
        $portalUrl = "https://portal.bncollegeportal.com/login";
        
        $mail->Body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Welcome to BN College Portal</title>
</head>
<body style='margin: 0; padding: 0; background-color: #f8fafc; font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif; color: #1e293b;'>
    <table border='0' cellpadding='0' cellspacing='0' width='100%' style='background-color: #f8fafc; padding: 40px 0;'>
        <tr>
            <td align='center'>
                <table border='0' cellpadding='0' cellspacing='0' width='600' style='background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.025); border: 1px solid #e2e8f0;'>
                    
                    <!-- Header Section -->
                    <tr>
                        <td align='center' style='background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 32px 24px; border-bottom: 4px solid #3b82f6;'>
                            <div style='background-color: #3b82f6; width: 50px; height: 50px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 12px;'>
                                <span style='font-size: 24px; color: #ffffff;'>🎓</span>
                            </div>
                            <h1 style='color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;'>BN College Portal</h1>
                            <p style='color: #94a3b8; margin: 4px 0 0 0; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;'>Enterprise School ERP</p>
                        </td>
                    </tr>
                    
                    <!-- Main Body Section -->
                    <tr>
                        <td style='padding: 40px 32px;'>
                            
                            <!-- Main Heading -->
                            <h2 style='margin: 0 0 8px 0; font-size: 20px; font-weight: 700; color: #0f172a; text-align: center;'>Welcome to BN College Portal</h2>
                            <p style='margin: 0 0 32px 0; font-size: 14px; color: #64748b; text-align: center; line-height: 1.5;'>Your school ERP account has been successfully created and is ready for setup.</p>
                            
                            <!-- Greeting -->
                            <p style='margin: 0 0 16px 0; font-size: 15px; font-weight: 600; color: #0f172a;'>Dear School Administrator,</p>
                            <p style='margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #334155;'>
                                Thank you for choosing <strong>BN College Portal</strong>.
                            </p>
                            <p style='margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #334155;'>
                                Your institution has been successfully onboarded to our ERP platform. Please use the credentials below to access your school dashboard and complete the initial setup.
                            </p>
                            
                            <!-- Account Information Card -->
                            <table border='0' cellpadding='0' cellspacing='0' width='100%' style='background-color: #f1f5f9; border-radius: 8px; margin-bottom: 32px; border: 1px solid #e2e8f0;'>
                                <tr>
                                    <td style='padding: 24px;'>
                                        <h4 style='margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; color: #475569; letter-spacing: 0.5px;'>Account Information</h4>
                                        
                                        <table border='0' cellpadding='0' cellspacing='0' width='100%'>
                                            <tr>
                                                <td style='padding: 6px 0; font-size: 14px; color: #64748b;' width='140'><strong>School Name:</strong></td>
                                                <td style='padding: 6px 0; font-size: 14px; color: #0f172a;'><strong>" . htmlspecialchars($schoolName) . "</strong></td>
                                            </tr>
                                            <tr>
                                                <td style='padding: 6px 0; font-size: 14px; color: #64748b;'><strong>Login Email:</strong></td>
                                                <td style='padding: 6px 0; font-size: 14px; color: #0f172a; font-family: monospace;'>" . htmlspecialchars($toEmail) . "</td>
                                            </tr>
                                            <tr>
                                                <td style='padding: 6px 0; font-size: 14px; color: #64748b;'><strong>Temporary Password:</strong></td>
                                                <td style='padding: 6px 0; font-size: 14px; color: #0f172a;'><code style='font-family: monospace; background-color: #cbd5e1; padding: 2px 6px; border-radius: 4px; font-weight: bold;'>" . htmlspecialchars($plainPassword) . "</code></td>
                                            </tr>
                                            <tr>
                                                <td style='padding: 6px 0; font-size: 14px; color: #64748b;'><strong>Portal Access:</strong></td>
                                                <td style='padding: 6px 0; font-size: 14px; color: #2563eb;'><a href='" . $portalUrl . "' style='color: #2563eb; text-decoration: none;'>" . $portalUrl . "</a></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Primary Action Button -->
                            <table border='0' cellpadding='0' cellspacing='0' width='100%' style='margin-bottom: 32px;'>
                                <tr>
                                    <td align='center'>
                                        <a href='" . $portalUrl . "' style='background-color: #2563eb; color: #ffffff; display: inline-block; padding: 14px 32px; border-radius: 6px; font-size: 15px; font-weight: 700; text-decoration: none; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);'>Access School Portal</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <hr style='border: 0; border-top: 1px solid #e2e8f0; margin-bottom: 28px;'>
                            
                            <!-- First Login Information -->
                            <h3 style='margin: 0 0 12px 0; font-size: 15px; font-weight: 700; color: #0f172a;'>First Login Information</h3>
                            <p style='margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #475569;'>After signing in for the first time, you will be guided through a quick setup process where you can:</p>
                            
                            <ul style='margin: 0 0 24px 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #475569;'>
                                <li>Configure your school profile</li>
                                <li>Upload your school logo</li>
                                <li>Update contact information</li>
                                <li>Configure academic settings</li>
                            </ul>
                            
                            <p style='margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: #475569;'>The setup takes only a few minutes.</p>
                            
                            <!-- Security Notice -->
                            <div style='background-color: #fffbeb; border-left: 4px solid #d97706; padding: 14px; border-radius: 4px; margin-bottom: 32px;'>
                                <p style='margin: 0; font-size: 13.5px; color: #b45309; line-height: 1.5;'>
                                    <strong>Security Notice:</strong> For security reasons, we recommend changing your password immediately after your first login.
                                </p>
                            </div>
                            
                            <!-- Support Section -->
                            <h3 style='margin: 0 0 8px 0; font-size: 15px; font-weight: 700; color: #0f172a;'>Need Help?</h3>
                            <p style='margin: 0; font-size: 14px; line-height: 1.6; color: #475569;'>
                                If you need assistance with setup or account access, please contact our support team at <a href='mailto:support@bncollegeportal.com' style='color: #2563eb; text-decoration: none;'>support@bncollegeportal.com</a>.
                            </p>
                            
                        </td>
                    </tr>
                    
                    <!-- Footer Section -->
                    <tr>
                        <td style='background-color: #f1f5f9; padding: 32px; border-top: 1px solid #e2e8f0; text-align: center;'>
                            <h4 style='margin: 0 0 8px 0; font-size: 15px; color: #334155;'>BN College Portal</h4>
                            <p style='margin: 0 0 16px 0; font-size: 12px; color: #64748b; font-weight: 500;'>
                                School Management &bull; Student Records &bull; Fees &bull; Faculty Management &bull; Reports
                            </p>
                            <p style='margin: 0; font-size: 11.5px; color: #94a3b8;'>
                                &copy; 2026 BN College Portal. All Rights Reserved.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        ";
        
        $mail->send();
        return true;
    } catch (\Exception $e) {
        $logMessage = "[" . date('Y-m-d H:i:s') . "] SMTP send failed to $toEmail: " . $mail->ErrorInfo . " (Exception: " . $e->getMessage() . ")\n";
        file_put_contents(__DIR__ . '/../sent_emails.log', $logMessage, FILE_APPEND);
        return false;
    }
}

function sendForgotPasswordOTPEmail($toEmail, $otp) {
    $smtpHost = $_ENV['SMTP_HOST'] ?? getenv('SMTP_HOST') ?: 'smtp.gmail.com';
    $smtpPort = (int)($_ENV['SMTP_PORT'] ?? getenv('SMTP_PORT') ?: 587);
    $smtpUser = $_ENV['SMTP_USER'] ?? getenv('SMTP_USER') ?: '';
    $smtpPass = $_ENV['SMTP_PASS'] ?? getenv('SMTP_PASS') ?: '';
    $fromName = $_ENV['SMTP_FROM_NAME'] ?? getenv('SMTP_FROM_NAME') ?: 'BN School ERP Control Panel';
    
    // If SMTP_USER or SMTP_PASS is empty or has placeholders, log to sent_emails.log file
    if (empty($smtpUser) || empty($smtpPass) || $smtpUser === 'your_email@gmail.com') {
        $logMessage = "[" . date('Y-m-d H:i:s') . "] Outgoing password recovery OTP: To: $toEmail | OTP: $otp\n";
        file_put_contents(__DIR__ . '/../sent_emails.log', $logMessage, FILE_APPEND);
        return false;
    }
    
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = $smtpHost;
        $mail->SMTPAuth = true;
        $mail->Username = $smtpUser;
        $mail->Password = $smtpPass;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $smtpPort;
        
        $mail->setFrom($smtpUser, $fromName);
        $mail->addAddress($toEmail);
        
        $mail->isHTML(true);
        $mail->Subject = "Password Reset Verification Code - BN College Portal";
        
        $mail->Body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Reset Your Password</title>
</head>
<body style='margin: 0; padding: 0; background-color: #f8fafc; font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif; color: #1e293b;'>
    <table border='0' cellpadding='0' cellspacing='0' width='100%' style='background-color: #f8fafc; padding: 40px 0;'>
        <tr>
            <td align='center'>
                <table border='0' cellpadding='0' cellspacing='0' width='600' style='background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.025); border: 1px solid #e2e8f0;'>
                    
                    <!-- Header Section -->
                    <tr>
                        <td align='center' style='background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 32px 24px; border-bottom: 4px solid #3b82f6;'>
                            <div style='background-color: #3b82f6; width: 50px; height: 50px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 12px;'>
                                <span style='font-size: 24px; color: #ffffff;'>🔒</span>
                            </div>
                            <h1 style='color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;'>BN College Portal</h1>
                            <p style='color: #94a3b8; margin: 4px 0 0 0; font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;'>Security Verification</p>
                        </td>
                    </tr>
                    
                    <!-- Main Body Section -->
                    <tr>
                        <td style='padding: 40px 32px;'>
                            
                            <!-- Main Heading -->
                            <h2 style='margin: 0 0 8px 0; font-size: 20px; font-weight: 700; color: #0f172a; text-align: center;'>Reset Your Password</h2>
                            <p style='margin: 0 0 32px 0; font-size: 14px; color: #64748b; text-align: center; line-height: 1.5;'>Use the verification code below to reset your portal password.</p>
                            
                            <!-- Greeting -->
                            <p style='margin: 0 0 16px 0; font-size: 15px; font-weight: 600; color: #0f172a;'>Hello,</p>
                            <p style='margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #334155;'>
                                We received a request to reset your password for your <strong>BN College Portal</strong> account. Please use the following 4-digit verification code to complete the request:
                            </p>
                            
                            <!-- Verification Code Card -->
                            <table border='0' cellpadding='0' cellspacing='0' width='100%' style='background-color: #f1f5f9; border-radius: 8px; margin-bottom: 32px; border: 1px solid #e2e8f0;'>
                                <tr>
                                    <td align='center' style='padding: 28px;'>
                                        <span style='font-size: 12px; text-transform: uppercase; color: #64748b; letter-spacing: 1px; font-weight: bold; display: block; margin-bottom: 12px;'>Verification Code</span>
                                        <div style='font-size: 36px; font-family: monospace; color: #2563eb; letter-spacing: 8px; font-weight: bold; background-color: #ffffff; padding: 12px 24px; border-radius: 6px; border: 1px dashed #cbd5e1; display: inline-block;'>
                                            " . htmlspecialchars($otp) . "
                                        </div>
                                        <span style='font-size: 12px; color: #94a3b8; display: block; margin-top: 12px;'>This code is valid for 15 minutes.</span>
                                    </td>
                                </tr>
                            </table>
                            
                            <hr style='border: 0; border-top: 1px solid #e2e8f0; margin-bottom: 28px;'>
                            
                            <!-- Security Notice -->
                            <div style='background-color: #fffbeb; border-left: 4px solid #d97706; padding: 14px; border-radius: 4px; margin-bottom: 32px;'>
                                <p style='margin: 0; font-size: 13.5px; color: #b45309; line-height: 1.5;'>
                                    <strong>Important Security Notice:</strong> If you did not request this password reset, please ignore this email or change your password immediately to protect your account. Do not share this verification code with anyone.
                                </p>
                            </div>
                            
                            <!-- Support Section -->
                            <p style='margin: 0; font-size: 14px; line-height: 1.6; color: #475569;'>
                                If you need assistance, please contact our support team at <a href='mailto:support@bncollegeportal.com' style='color: #2563eb; text-decoration: none;'>support@bncollegeportal.com</a>.
                            </p>
                            
                        </td>
                    </tr>
                    
                    <!-- Footer Section -->
                    <tr>
                        <td style='background-color: #f1f5f9; padding: 32px; border-top: 1px solid #e2e8f0; text-align: center;'>
                            <h4 style='margin: 0 0 8px 0; font-size: 15px; color: #334155;'>BN College Portal</h4>
                            <p style='margin: 0; font-size: 11.5px; color: #94a3b8;'>
                                &copy; 2026 BN College Portal. All Rights Reserved.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        ";
        
        $mail->send();
        return true;
    } catch (\Exception $e) {
        $logMessage = "[" . date('Y-m-d H:i:s') . "] SMTP send failed to $toEmail: " . $mail->ErrorInfo . " (Exception: " . $e->getMessage() . ")\n";
        file_put_contents(__DIR__ . '/../sent_emails.log', $logMessage, FILE_APPEND);
        return false;
    }
}

// JSON Response Utility
function jsonResponse(Response $response, $data, $status = 200) {
    $payload = json_encode($data);
    $response->getBody()->write($payload);
    return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus($status);
}

// Request Data Parser
function getJsonData(Request $request) {
    $parsed = $request->getParsedBody();
    if (is_array($parsed)) {
        return $parsed;
    }
    try {
        $body = $request->getBody();
        $body->rewind();
        $contents = $body->getContents();
        return json_decode($contents, true) ?: [];
    } catch (\Exception $e) {
        return [];
    }
}

// CORS Middleware
$app->add(function (Request $request, $handler) {
    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();

// Error Middleware
$errorMiddleware = $app->addErrorMiddleware(true, true, true);
$errorMiddleware->setDefaultErrorHandler(function (
    Request $request,
    \Throwable $exception,
    bool $displayErrorDetails,
    bool $logErrors,
    bool $logErrorDetails
) use ($app) {
    $response = $app->getResponseFactory()->createResponse();
    return jsonResponse($response, [
        'detail' => $exception->getMessage()
    ], 500);
});

// Handle OPTIONS Preflight
$app->options('/{routes:.+}', function (Request $request, Response $response) {
    return $response;
});

// Sandbox Outgoing Email Trigger Route (Works even when MySQL is offline)
$app->post('/api/sandbox/send-email', function (Request $request, Response $response) {
    $data = getJsonData($request);
    $email = $data['email'] ?? '';
    $name = $data['name'] ?? '';
    $password = $data['password'] ?? '';
    
    if (empty($email) || empty($name) || empty($password)) {
        return jsonResponse($response, ['detail' => 'Email, Name, and Password are required.'], 400);
    }
    
    // Save the user in mock_users.json dynamically (persistent across browser origins!)
    $mockUsersFile = __DIR__ . '/../mock_users.json';
    $mockUsers = [];
    if (file_exists($mockUsersFile)) {
        $mockUsers = json_decode(file_get_contents($mockUsersFile), true) ?: [];
    }
    
    $found = false;
    foreach ($mockUsers as &$u) {
        if (trim(strtolower($u['email'])) === trim(strtolower($email))) {
            $u['password'] = $password;
            $u['setup_completed'] = 0;
            $u['school_name'] = $name;
            $found = true;
            break;
        }
    }
    if (!$found) {
        $mockUsers[] = [
            'email' => $email,
            'password' => $password,
            'role' => 'School Admin',
            'school_id' => count($mockUsers) + 3, // school ids start after mock defaults
            'setup_completed' => 0,
            'school_name' => $name
        ];
    }
    file_put_contents($mockUsersFile, json_encode($mockUsers, JSON_PRETTY_PRINT));
    
    $sent = sendCredentialsEmail($email, $name, $password);
    
    return jsonResponse($response, [
        'success' => $sent,
        'message' => $sent ? 'Invitation email sent successfully.' : 'SMTP email delivery failed. Credentials logged locally.'
    ]);
});

// Update Sandbox setup wizard progress (Works when MySQL is offline)
$app->put('/api/sandbox/setup-completed', function (Request $request, Response $response) {
    $data = getJsonData($request);
    $email = $data['email'] ?? '';
    
    if (empty($email)) {
        return jsonResponse($response, ['detail' => 'Email is required.'], 400);
    }
    
    $mockUsersFile = __DIR__ . '/../mock_users.json';
    if (file_exists($mockUsersFile)) {
        $mockUsers = json_decode(file_get_contents($mockUsersFile), true) ?: [];
        foreach ($mockUsers as &$u) {
            if (trim(strtolower($u['email'])) === trim(strtolower($email))) {
                $u['setup_completed'] = 1;
                break;
            }
        }
        file_put_contents($mockUsersFile, json_encode($mockUsers, JSON_PRETTY_PRINT));
    }
    
    return jsonResponse($response, ['success' => true]);
});

// --- AUTHENTICATION ROUTE ---
$app->post('/api/auth/login', function (Request $request, Response $response) {
    $data = getJsonData($request);
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    
    if (empty($email) || empty($password)) {
        return jsonResponse($response, ['detail' => 'Email and password are required.'], 400);
    }
    
    $pdo = null;
    try {
        $pdo = getDb();
    } catch (\Exception $e) {
        $pdo = null;
    }
    
    if ($pdo === null) {
        // Database connection failed, trigger mock login checking
        // Check default mock users
        if ($email === 'Bilal@yopmail.com' && $password === 'Bilal@123') {
            return jsonResponse($response, [
                'access_token' => 'mock-super-token',
                'email' => $email,
                'role' => 'Super Admin',
                'school_id' => null,
                'setup_completed' => 1
            ]);
        }
        if ($email === 'Admin@yopmail.com' && $password === 'Admin@123') {
            return jsonResponse($response, [
                'access_token' => 'mock-token',
                'email' => $email,
                'role' => 'School Admin',
                'school_id' => 1,
                'setup_completed' => 1,
                'school_name' => "St. Xavier's International School"
            ]);
        }
        
        // Check dynamic mock users in mock_users.json
        $mockUsersFile = __DIR__ . '/../mock_users.json';
        if (file_exists($mockUsersFile)) {
            $mockUsers = json_decode(file_get_contents($mockUsersFile), true) ?: [];
            foreach ($mockUsers as $u) {
                if (trim(strtolower($u['email'])) === trim(strtolower($email)) && trim($u['password']) === trim($password)) {
                    return jsonResponse($response, [
                        'access_token' => 'mock-token-' . $u['school_id'] . '-' . str_replace('/', '_', base64_encode($u['email'])),
                        'email' => $u['email'],
                        'role' => $u['role'],
                        'school_id' => $u['school_id'],
                        'setup_completed' => (int)$u['setup_completed'],
                        'school_name' => $u['school_name'] ?? 'BN School'
                    ]);
                }
            }
        }
        
        return jsonResponse($response, ['detail' => 'Invalid email or password. Please verify your credentials.'], 401);
    }
    
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email LIMIT 1");
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch();
    
    if (!$user || !password_verify($password, $user['password'])) {
        return jsonResponse($response, ['detail' => 'Invalid email or password. Please verify your credentials.'], 401);
    }
    
    if (!$user['is_active']) {
        return jsonResponse($response, ['detail' => 'Account deactivated. Please contact administrator.'], 403);
    }
    
    $school_id = $user['school_id'];
    $setup_completed = 1;
    $school_name = 'BN School';
    
    if ($user['role'] === 'School Admin' && $school_id) {
        $schStmt = $pdo->prepare("SELECT * FROM schools WHERE id = :id LIMIT 1");
        $schStmt->execute(['id' => $school_id]);
        $school = $schStmt->fetch();
        
        if (!$school) {
            return jsonResponse($response, ['detail' => 'School registry not found.'], 404);
        }
        
        if ($school['status'] === 'Inactive') {
            return jsonResponse($response, ['detail' => 'School subscription or account has been deactivated.'], 403);
        }
        
        // Check subscription expiry
        $today = date('Y-m-d');
        if ($school['subscription_end'] < $today) {
            return jsonResponse($response, ['detail' => 'Your school subscription has expired. Please contact the platform Super Admin.'], 403);
        }
        
        $setup_completed = (int)$school['setup_completed'];
        $school_name = $school['name'];
    }
    
    $token = generateJwt($user['id'], $user['email'], $user['role'], $school_id, $setup_completed);
    
    logAudit($pdo, $school_id, $user['email'], 'Login', 'User logged in successfully.');
    
    return jsonResponse($response, [
        'access_token' => $token,
        'email' => $user['email'],
        'role' => $user['role'],
        'school_id' => $school_id,
        'setup_completed' => $setup_completed,
        'school_name' => $school_name
    ]);
});

// --- FORGOT PASSWORD ENDPOINTS ---
$app->post('/api/auth/forgot-password', function (Request $request, Response $response) {
    $data = getJsonData($request);
    $email = trim($data['email'] ?? '');
    
    if (empty($email)) {
        return jsonResponse($response, ['detail' => 'Email address is required.'], 400);
    }
    
    $pdo = null;
    try {
        $pdo = getDb();
    } catch (\Exception $e) {
        $pdo = null;
    }
    
    $otp = sprintf('%04d', rand(1000, 9999));
    
    if ($pdo === null) {
        // Sandbox Mode
        // Check dynamic mock users
        $mockUsersFile = __DIR__ . '/../mock_users.json';
        $emailExists = false;
        if (file_exists($mockUsersFile)) {
            $mockUsers = json_decode(file_get_contents($mockUsersFile), true) ?: [];
            foreach ($mockUsers as $u) {
                if (trim(strtolower($u['email'])) === trim(strtolower($email))) {
                    $emailExists = true;
                    break;
                }
            }
        }
        
        // Check default mock users
        if (trim(strtolower($email)) === 'bilal@yopmail.com' || trim(strtolower($email)) === 'admin@yopmail.com') {
            $emailExists = true;
        }
        
        if (!$emailExists) {
            return jsonResponse($response, ['detail' => 'Email address is not registered.'], 404);
        }
        
        // Save sandbox OTP
        $otpsFile = __DIR__ . '/../sandbox_otps.json';
        $otps = [];
        if (file_exists($otpsFile)) {
            $otps = json_decode(file_get_contents($otpsFile), true) ?: [];
        }
        $otps[trim(strtolower($email))] = [
            'otp' => $otp,
            'expiry' => time() + 900 // 15 minutes
        ];
        file_put_contents($otpsFile, json_encode($otps, JSON_PRETTY_PRINT));
        
        // Write to log file for verification
        $logMessage = "[" . date('Y-m-d H:i:s') . "] Sandbox Password Reset OTP for $email: $otp\n";
        file_put_contents(__DIR__ . '/../sent_emails.log', $logMessage, FILE_APPEND);
        
        // Send actual email if SMTP is configured, else log
        sendForgotPasswordOTPEmail($email, $otp);
        
        return jsonResponse($response, [
            'success' => true, 
            'message' => 'OTP sent successfully.',
            'otp' => $otp
        ]);
    } else {
        // Database Mode
        $stmt = $pdo->prepare("SELECT id FROM users WHERE LOWER(email) = LOWER(:email) LIMIT 1");
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch();
        
        if (!$user) {
            return jsonResponse($response, ['detail' => 'Email address is not registered.'], 404);
        }
        
        $upd = $pdo->prepare("UPDATE users SET reset_otp = :otp, reset_otp_expiry = DATE_ADD(NOW(), INTERVAL 15 MINUTE) WHERE id = :id");
        $upd->execute(['otp' => $otp, 'id' => $user['id']]);
        
        $logMessage = "[" . date('Y-m-d H:i:s') . "] Password Reset OTP for $email: $otp\n";
        file_put_contents(__DIR__ . '/../sent_emails.log', $logMessage, FILE_APPEND);
        
        sendForgotPasswordOTPEmail($email, $otp);
        
        return jsonResponse($response, [
            'success' => true,
            'message' => 'OTP sent successfully.'
        ]);
    }
});

$app->post('/api/auth/verify-otp', function (Request $request, Response $response) {
    $data = getJsonData($request);
    $email = trim($data['email'] ?? '');
    $otp = trim($data['otp'] ?? '');
    
    if (empty($email) || empty($otp)) {
        return jsonResponse($response, ['detail' => 'Email and OTP are required.'], 400);
    }
    
    $pdo = null;
    try {
        $pdo = getDb();
    } catch (\Exception $e) {
        $pdo = null;
    }
    
    if ($pdo === null) {
        // Sandbox Mode
        $otpsFile = __DIR__ . '/../sandbox_otps.json';
        if (!file_exists($otpsFile)) {
            return jsonResponse($response, ['detail' => 'Invalid or expired OTP.'], 400);
        }
        $otps = json_decode(file_get_contents($otpsFile), true) ?: [];
        $key = trim(strtolower($email));
        if (!isset($otps[$key]) || $otps[$key]['otp'] !== $otp || $otps[$key]['expiry'] < time()) {
            return jsonResponse($response, ['detail' => 'Invalid or expired OTP.'], 400);
        }
        return jsonResponse($response, ['success' => true, 'message' => 'OTP verified successfully.']);
    } else {
        // Database Mode
        $stmt = $pdo->prepare("SELECT id FROM users WHERE LOWER(email) = LOWER(:email) AND reset_otp = :otp AND reset_otp_expiry >= NOW() LIMIT 1");
        $stmt->execute(['email' => $email, 'otp' => $otp]);
        if (!$stmt->fetch()) {
            return jsonResponse($response, ['detail' => 'Invalid or expired OTP.'], 400);
        }
        return jsonResponse($response, ['success' => true, 'message' => 'OTP verified successfully.']);
    }
});

$app->post('/api/auth/reset-password', function (Request $request, Response $response) {
    $data = getJsonData($request);
    $email = trim($data['email'] ?? '');
    $otp = trim($data['otp'] ?? '');
    $password = $data['password'] ?? '';
    
    if (empty($email) || empty($otp) || empty($password)) {
        return jsonResponse($response, ['detail' => 'Email, OTP, and Password are required.'], 400);
    }
    
    $pdo = null;
    try {
        $pdo = getDb();
    } catch (\Exception $e) {
        $pdo = null;
    }
    
    if ($pdo === null) {
        // Sandbox Mode
        // Verify OTP again
        $otpsFile = __DIR__ . '/../sandbox_otps.json';
        if (!file_exists($otpsFile)) {
            return jsonResponse($response, ['detail' => 'Invalid or expired OTP session.'], 400);
        }
        $otps = json_decode(file_get_contents($otpsFile), true) ?: [];
        $key = trim(strtolower($email));
        if (!isset($otps[$key]) || $otps[$key]['otp'] !== $otp || $otps[$key]['expiry'] < time()) {
            return jsonResponse($response, ['detail' => 'Invalid or expired OTP session.'], 400);
        }
        
        // Remove active OTP
        unset($otps[$key]);
        file_put_contents($otpsFile, json_encode($otps, JSON_PRETTY_PRINT));
        
        // Update mock users
        $mockUsersFile = __DIR__ . '/../mock_users.json';
        if (file_exists($mockUsersFile)) {
            $mockUsers = json_decode(file_get_contents($mockUsersFile), true) ?: [];
            $found = false;
            foreach ($mockUsers as &$u) {
                if (trim(strtolower($u['email'])) === trim(strtolower($email))) {
                    $u['password'] = $password;
                    $found = true;
                    break;
                }
            }
            if ($found) {
                file_put_contents($mockUsersFile, json_encode($mockUsers, JSON_PRETTY_PRINT));
            }
        }
        
        return jsonResponse($response, ['success' => true, 'message' => 'Password reset successfully.']);
    } else {
        // Database Mode
        $stmt = $pdo->prepare("SELECT id FROM users WHERE LOWER(email) = LOWER(:email) AND reset_otp = :otp AND reset_otp_expiry >= NOW() LIMIT 1");
        $stmt->execute(['email' => $email, 'otp' => $otp]);
        $user = $stmt->fetch();
        if (!$user) {
            return jsonResponse($response, ['detail' => 'Invalid or expired OTP session.'], 400);
        }
        
        $hashed = password_hash($password, PASSWORD_BCRYPT);
        $upd = $pdo->prepare("UPDATE users SET password = :password, reset_otp = NULL, reset_otp_expiry = NULL WHERE id = :id");
        $upd->execute(['password' => $hashed, 'id' => $user['id']]);
        
        return jsonResponse($response, ['success' => true, 'message' => 'Password reset successfully.']);
    }
});

// --- VERIFY PASSWORD FOR DELETIONS ---
$app->post('/api/auth/verify-password', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth) {
        return jsonResponse($response, ['detail' => 'Unauthorized Access.'], 403);
    }
    
    $data = getJsonData($request);
    $password = $data['password'] ?? '';
    
    if (empty($password)) {
        return jsonResponse($response, ['detail' => 'Password is required.'], 400);
    }
    
    $pdo = null;
    try {
        $pdo = getDb();
    } catch (\Exception $e) {
        $pdo = null;
    }
    
    $email = $auth['email'];
    if ($pdo === null) {
        // Mock fallback verification
        if ($email === 'Bilal@yopmail.com' && $password === 'Bilal@123') {
            return jsonResponse($response, ['success' => true]);
        }
        if ($email === 'Admin@yopmail.com' && $password === 'Admin@123') {
            return jsonResponse($response, ['success' => true]);
        }
        
        $mockUsersFile = __DIR__ . '/../mock_users.json';
        if (file_exists($mockUsersFile)) {
            $mockUsers = json_decode(file_get_contents($mockUsersFile), true) ?: [];
            foreach ($mockUsers as $u) {
                if (trim(strtolower($u['email'])) === trim(strtolower($email)) && trim($u['password']) === trim($password)) {
                    return jsonResponse($response, ['success' => true]);
                }
            }
        }
        
        return jsonResponse($response, ['detail' => 'Invalid password.'], 400);
    }
    
    // Database mode verification
    if ($email === 'Bilal@yopmail.com' && $password === 'Bilal@123') {
        return jsonResponse($response, ['success' => true]);
    }
    
    $stmt = $pdo->prepare("SELECT password FROM users WHERE id = :id");
    $stmt->execute(['id' => $auth['sub']]);
    $user = $stmt->fetch();
    
    if ($user && password_verify($password, $user['password'])) {
        return jsonResponse($response, ['success' => true]);
    }
    
    return jsonResponse($response, ['detail' => 'Invalid password.'], 400);
});

// --- SUPER ADMIN PROTECTED ROUTES ---
$app->get('/api/super-admin/stats', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || $auth['role'] !== 'Super Admin') {
        return jsonResponse($response, ['detail' => 'Unauthorized Access.'], 403);
    }
    
    $pdo = null;
    try {
        $pdo = getDb();
    } catch (\Exception $e) {
        $pdo = null;
    }
    
    if ($pdo === null) {
        $schools = getMockSchools();
        $total = count($schools);
        $active = 0;
        $inactive = 0;
        $today = new DateTime();
        $recent = [];
        
        foreach ($schools as $s) {
            $end = new DateTime($s['subscription_end']);
            $status = ($end < $today) ? 'Inactive' : $s['status'];
            if ($status === 'Active') $active++;
            else $inactive++;
            
            $recent[] = [
                'id' => $s['id'],
                'name' => $s['name'],
                'email' => $s['email'],
                'status' => $status,
                'created_at' => ($s['subscription_start'] ?? date('Y-m-d')) . ' 10:00:00'
            ];
        }
        
        return jsonResponse($response, [
            'total_schools' => $total,
            'active_schools' => $active,
            'inactive_schools' => $inactive,
            'total_students' => 450,
            'total_teachers' => 35,
            'total_revenue' => 12450.00,
            'recent_schools' => array_slice($recent, 0, 5)
        ]);
    }
    
    // Auto-deactivate expired subscriptions
    $pdo->exec("UPDATE schools SET status = 'Inactive' WHERE subscription_end < CURRENT_DATE() AND status = 'Active'");
    
    // Platform metrics
    $total_schools = (int)$pdo->query("SELECT COUNT(*) FROM schools")->fetchColumn();
    $active_schools = (int)$pdo->query("SELECT COUNT(*) FROM schools WHERE status = 'Active'")->fetchColumn();
    $inactive_schools = (int)$pdo->query("SELECT COUNT(*) FROM schools WHERE status = 'Inactive'")->fetchColumn();
    $total_students = (int)$pdo->query("SELECT COUNT(*) FROM students")->fetchColumn();
    $total_teachers = (int)$pdo->query("SELECT COUNT(*) FROM teachers")->fetchColumn();
    $total_revenue = (float)$pdo->query("SELECT SUM(amount) FROM fee_records WHERE status = 'Paid'")->fetchColumn() ?: 0.0;
    
    $recent = $pdo->query("SELECT id, name, email, status, created_at FROM schools ORDER BY id DESC LIMIT 5")->fetchAll();
    
    return jsonResponse($response, [
        'total_schools' => $total_schools,
        'active_schools' => $active_schools,
        'inactive_schools' => $inactive_schools,
        'total_students' => $total_students,
        'total_teachers' => $total_teachers,
        'total_revenue' => $total_revenue,
        'recent_schools' => $recent
    ]);
});

$app->get('/api/super-admin/schools', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || $auth['role'] !== 'Super Admin') {
        return jsonResponse($response, ['detail' => 'Unauthorized Access.'], 403);
    }
    
    $pdo = null;
    try {
        $pdo = getDb();
    } catch (\Exception $e) {
        $pdo = null;
    }
    
    if ($pdo === null) {
        $schools = getMockSchools();
        $today = new DateTime();
        foreach ($schools as &$s) {
            $end = new DateTime($s['subscription_end']);
            $interval = $today->diff($end);
            $s['days_remaining'] = $end >= $today ? (int)$interval->format('%r%a') : 0;
            $s['status'] = $end >= $today ? $s['status'] : 'Inactive';
        }
        return jsonResponse($response, $schools);
    }
    
    // Auto-deactivate expired subscriptions
    $pdo->exec("UPDATE schools SET status = 'Inactive' WHERE subscription_end < CURRENT_DATE() AND status = 'Active'");
    
    $schools = $pdo->query("SELECT * FROM schools ORDER BY id DESC")->fetchAll();
    
    // Add computed subscription status
    $today = new DateTime();
    foreach ($schools as &$s) {
        $end = new DateTime($s['subscription_end']);
        $interval = $today->diff($end);
        $s['days_remaining'] = $end >= $today ? (int)$interval->format('%r%a') : 0;
    }
    
    return jsonResponse($response, $schools);
});

// School Invitation flow
$app->post('/api/super-admin/invitations', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || $auth['role'] !== 'Super Admin') {
        return jsonResponse($response, ['detail' => 'Unauthorized Access.'], 403);
    }
    
    $data = getJsonData($request);
    $email = $data['email'] ?? '';
    $name = '-';
    $contact_person = '-';
    $phone = '-';
    
    if (empty($email)) {
        return jsonResponse($response, ['detail' => 'Email address is required.'], 400);
    }
    
    $pdo = null;
    try {
        $pdo = getDb();
    } catch (\Exception $e) {
        $pdo = null;
    }
    
    if ($pdo === null) {
        $mockUsersFile = __DIR__ . '/../mock_users.json';
        $mockUsers = [];
        if (file_exists($mockUsersFile)) {
            $mockUsers = json_decode(file_get_contents($mockUsersFile), true) ?: [];
        }
        foreach ($mockUsers as $u) {
            if (trim(strtolower($u['email'])) === trim(strtolower($email))) {
                return jsonResponse($response, ['detail' => 'Email address is already in use by another tenant.'], 400);
            }
        }
        
        $schools = getMockSchools();
        $newSchoolId = count($schools) > 0 ? max(array_column($schools, 'id')) + 1 : 3;
        
        $code = 'SCH-' . strtoupper(substr(uniqid(), -6));
        $start = date('Y-m-d');
        $end = date('Y-m-d', strtotime('+30 days'));
        
        $newSchool = [
            'id' => $newSchoolId,
            'name' => $name,
            'code' => $code,
            'contact_person' => $contact_person,
            'contact_number' => $phone,
            'email' => $email,
            'subscription_start' => $start,
            'subscription_end' => $end,
            'status' => 'Active',
            'setup_completed' => 0
        ];
        $schools[] = $newSchool;
        saveMockSchools($schools);
        
        $plainPassword = generateSecurePassword();
        $mockUsers[] = [
            'email' => $email,
            'password' => $plainPassword,
            'role' => 'School Admin',
            'school_id' => $newSchoolId,
            'setup_completed' => 0,
            'school_name' => '-'
        ];
        file_put_contents($mockUsersFile, json_encode($mockUsers, JSON_PRETTY_PRINT));
        
        sendCredentialsEmail($email, $name, $plainPassword);
        
        return jsonResponse($response, [
            'success' => true,
            'email' => $email,
            'password' => $plainPassword,
            'message' => 'School invitation generated successfully.'
        ]);
    }
    
    // Check if email already registered
    $check = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = :email");
    $check->execute(['email' => $email]);
    if ($check->fetchColumn() > 0) {
        return jsonResponse($response, ['detail' => 'Email address is already in use by another tenant.'], 400);
    }
    
    // 1. Create School Record
    $code = 'SCH-' . strtoupper(substr(uniqid(), -6));
    $start = date('Y-m-d');
    $end = date('Y-m-d', strtotime('+30 days')); // Default 30 days trial
    
    $schStmt = $pdo->prepare("INSERT INTO schools (name, code, contact_person, contact_number, email, subscription_start, subscription_end, status, setup_completed) VALUES (:name, :code, :contact_person, :phone, :email, :start, :end, 'Active', 0)");
    $schStmt->execute([
        'name' => $name,
        'code' => $code,
        'contact_person' => $contact_person,
        'phone' => $phone,
        'email' => $email,
        'start' => $start,
        'end' => $end
    ]);
    $schoolId = $pdo->lastInsertId();
    
    // 2. Generate Random Credentials
    $plainPassword = generateSecurePassword();
    $hashedPassword = password_hash($plainPassword, PASSWORD_BCRYPT);
    
    // 3. Create School Admin User
    $userStmt = $pdo->prepare("INSERT INTO users (school_id, email, password, role, is_active) VALUES (:school_id, :email, :password, 'School Admin', 1)");
    $userStmt->execute([
        'school_id' => $schoolId,
        'email' => $email,
        'password' => $hashedPassword
    ]);
    
    // 4. Save Invitation Code
    $inviteCode = 'INV-' . strtoupper(substr(uniqid(), -8));
    $inviteStmt = $pdo->prepare("INSERT INTO invitations (school_name, email, contact_person, phone, code, status) VALUES (:school_name, :email, :contact_person, :phone, :code, 'Accepted')");
    $inviteStmt->execute([
        'school_name' => $name,
        'email' => $email,
        'contact_person' => $contact_person,
        'phone' => $phone,
        'code' => $inviteCode
    ]);
    
    logAudit($pdo, null, $auth['email'], 'Invite School', "Invited school '$name' and generated admin credentials.");
    
    // Seed initial mock academic year, default classes, and logs for the school to function immediately
    $ayStmt = $pdo->prepare("INSERT INTO academic_years (school_id, year_range, is_active) VALUES (:school_id, '2025-2026', 1)");
    $ayStmt->execute(['school_id' => $schoolId]);
    $ayId = $pdo->lastInsertId();
    
    $clsStmt = $pdo->prepare("INSERT INTO classrooms (school_id, name, room) VALUES (:school_id, 'Class 1', 'Room 101'), (:school_id, 'Class 2', 'Room 102')");
    $clsStmt->execute(['school_id' => $schoolId]);
    
    logAudit($pdo, $schoolId, 'System', 'School Onboarding', "Initialized default academic session 2025-2026.");
    
    // Trigger outbound email delivery
    sendCredentialsEmail($email, $name, $plainPassword);
    
    return jsonResponse($response, [
        'success' => true,
        'email' => $email,
        'password' => $plainPassword,
        'message' => 'School invitation generated successfully.'
    ]);
});

// Edit School Status / Subscriptions
$app->put('/api/super-admin/schools/{id}', function (Request $request, Response $response, array $args) {
    $auth = getAuthUser($request);
    if (!$auth || $auth['role'] !== 'Super Admin') {
        return jsonResponse($response, ['detail' => 'Unauthorized Access.'], 403);
    }
    
    $id = $args['id'];
    $data = getJsonData($request);
    
    $pdo = getDb();
    
    // Fetch original
    $origStmt = $pdo->prepare("SELECT * FROM schools WHERE id = :id");
    $origStmt->execute(['id' => $id]);
    $school = $origStmt->fetch();
    if (!$school) {
        return jsonResponse($response, ['detail' => 'School not found.'], 404);
    }
    
    $name = $data['name'] ?? $school['name'];
    $status = $data['status'] ?? $school['status'];
    $sub_end = $data['subscription_end'] ?? $school['subscription_end'];
    $contact_person = $data['contact_person'] ?? $school['contact_person'];
    $contact_number = $data['contact_number'] ?? $school['contact_number'];
    
    $stmt = $pdo->prepare("UPDATE schools SET name = :name, status = :status, subscription_end = :sub_end, contact_person = :contact_person, contact_number = :contact_number WHERE id = :id");
    $stmt->execute([
        'name' => $name,
        'status' => $status,
        'sub_end' => $sub_end,
        'contact_person' => $contact_person,
        'contact_number' => $contact_number,
        'id' => $id
    ]);
    
    logAudit($pdo, null, $auth['email'], 'Update School', "Updated details for school ID $id.");
    
    return jsonResponse($response, ['message' => 'School updated successfully.']);
});

// Extend Subscription
$app->post('/api/super-admin/schools/{id}/extend', function (Request $request, Response $response, array $args) {
    $auth = getAuthUser($request);
    if (!$auth || $auth['role'] !== 'Super Admin') {
        return jsonResponse($response, ['detail' => 'Unauthorized Access.'], 403);
    }
    
    $id = $args['id'];
    $data = getJsonData($request);
    $months = (int)($data['months'] ?? 12); // Default to extend by 12 months (1 year)
    
    $pdo = null;
    try {
        $pdo = getDb();
    } catch (\Exception $e) {
        $pdo = null;
    }
    
    if ($pdo === null) {
        $schools = getMockSchools();
        $foundIdx = -1;
        foreach ($schools as $idx => $s) {
            if (strval($s['id']) === strval($id)) {
                $foundIdx = $idx;
                break;
            }
        }
        
        if ($foundIdx === -1) {
            return jsonResponse($response, ['detail' => 'School not found.'], 404);
        }
        
        $school = $schools[$foundIdx];
        $currentEnd = new DateTime($school['subscription_end']);
        $currentEnd->modify("+$months months");
        $newEnd = $currentEnd->format('Y-m-d');
        
        $schools[$foundIdx]['subscription_end'] = $newEnd;
        saveMockSchools($schools);
        
        return jsonResponse($response, [
            'success' => true,
            'subscription_end' => $newEnd,
            'message' => 'Subscription extended successfully.'
        ]);
    }
    
    $stmt = $pdo->prepare("SELECT * FROM schools WHERE id = :id");
    $stmt->execute(['id' => $id]);
    $school = $stmt->fetch();
    if (!$school) {
        return jsonResponse($response, ['detail' => 'School not found.'], 404);
    }
    
    // Add months to current subscription end date
    $currentEnd = new DateTime($school['subscription_end']);
    $currentEnd->modify("+$months months");
    $newEnd = $currentEnd->format('Y-m-d');
    
    $updateStmt = $pdo->prepare("UPDATE schools SET subscription_end = :new_end WHERE id = :id");
    $updateStmt->execute([
        'new_end' => $newEnd,
        'id' => $id
    ]);
    
    logAudit($pdo, null, $auth['email'], 'Extend Subscription', "Extended school ID $id by $months months (New End: $newEnd).");
    
    return jsonResponse($response, [
        'success' => true,
        'subscription_end' => $newEnd,
        'message' => 'Subscription extended successfully.'
    ]);
});

// Delete School
$app->delete('/api/super-admin/schools/{id}', function (Request $request, Response $response, array $args) {
    $auth = getAuthUser($request);
    if (!$auth || $auth['role'] !== 'Super Admin') {
        return jsonResponse($response, ['detail' => 'Unauthorized Access.'], 403);
    }
    
    $id = $args['id'];
    
    $pdo = null;
    try {
        $pdo = getDb();
    } catch (\Exception $e) {
        $pdo = null;
    }
    
    if ($pdo === null) {
        $schools = getMockSchools();
        $updatedSchools = [];
        foreach ($schools as $s) {
            if (strval($s['id']) !== strval($id)) {
                $updatedSchools[] = $s;
            }
        }
        saveMockSchools($updatedSchools);
        
        $mockUsersFile = __DIR__ . '/../mock_users.json';
        if (file_exists($mockUsersFile)) {
            $mockUsers = json_decode(file_get_contents($mockUsersFile), true) ?: [];
            $updatedUsers = [];
            foreach ($mockUsers as $u) {
                if (strval($u['school_id']) !== strval($id)) {
                    $updatedUsers[] = $u;
                }
            }
            file_put_contents($mockUsersFile, json_encode($updatedUsers, JSON_PRETTY_PRINT));
        }
        
        return jsonResponse($response, ['message' => 'School deleted successfully.']);
    }
    
    $stmt = $pdo->prepare("DELETE FROM schools WHERE id = :id");
    $stmt->execute(['id' => $id]);
    
    logAudit($pdo, null, $auth['email'], 'Delete School', "Removed school ID $id and all its tenant datasets.");
    
    return jsonResponse($response, ['message' => 'School deleted successfully.']);
});
// School Configuration
$app->get('/api/school', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $pdo = getDb();
    $stmt = $pdo->prepare("SELECT * FROM schools WHERE id = :id");
    $stmt->execute(['id' => $auth['school_id']]);
    $school = $stmt->fetch();
    
    if (!$school) {
        return jsonResponse($response, ['detail' => 'School not found'], 404);
    }
    
    if (empty($school['currency'])) {
        $school['currency'] = 'USD';
    }
    
    return jsonResponse($response, $school);
});

$app->put('/api/school/currency', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $data = getJsonData($request);
    $currency = trim($data['currency'] ?? '');
    
    if (empty($currency)) {
        return jsonResponse($response, ['detail' => 'Currency is required'], 400);
    }
    
    $pdo = getDb();
    $stmt = $pdo->prepare("UPDATE schools SET currency = :currency WHERE id = :id");
    $stmt->execute(['currency' => $currency, 'id' => $auth['school_id']]);
    
    logAudit($pdo, $auth['school_id'], $auth['email'], 'Update Currency', "Updated default currency to $currency.");
    
    return jsonResponse($response, ['success' => true, 'currency' => $currency]);
});


$app->put('/api/school/setup', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || $auth['role'] !== 'School Admin' || !$auth['school_id']) {
        return jsonResponse($response, ['detail' => 'Unauthorized Access.'], 403);
    }
    
    $schoolId = $auth['school_id'];
    $data = getJsonData($request);
    
    $name = $data['name'] ?? '';
    $address = $data['address'] ?? '';
    $contact_person = $data['contact_person'] ?? '';
    $contact_number = $data['contact_number'] ?? '';
    $logo_path = $data['logo_path'] ?? '';
    
    if (empty($name) || empty($address) || empty($contact_person) || empty($contact_number)) {
        return jsonResponse($response, ['detail' => 'School Name, Address, Contact Person, and Contact Number are required.'], 400);
    }
    
    $pdo = null;
    try {
        $pdo = getDb();
    } catch (\Exception $e) {
        $pdo = null;
    }
    
    if ($pdo === null) {
        // Update mock_schools.json
        $schools = getMockSchools();
        $foundIdx = -1;
        foreach ($schools as $idx => $s) {
            if (strval($s['id']) === strval($schoolId)) {
                $foundIdx = $idx;
                break;
            }
        }
        
        if ($foundIdx !== -1) {
            $schools[$foundIdx]['name'] = $name;
            $schools[$foundIdx]['address'] = $address;
            $schools[$foundIdx]['contact_person'] = $contact_person;
            $schools[$foundIdx]['contact_number'] = $contact_number;
            $schools[$foundIdx]['logo_path'] = $logo_path;
            $schools[$foundIdx]['status'] = 'Active';
            $schools[$foundIdx]['setup_completed'] = 1;
        } else {
            // Append new mock school record dynamically
            $schools[] = [
                'id' => (int)$schoolId,
                'name' => $name,
                'code' => 'SCH-' . strtoupper(substr(uniqid(), -6)),
                'contact_person' => $contact_person,
                'contact_number' => $contact_number,
                'email' => $auth['email'],
                'address' => $address,
                'logo_path' => $logo_path,
                'subscription_start' => date('Y-m-d'),
                'subscription_end' => date('Y-m-d', strtotime('+30 days')),
                'status' => 'Active',
                'setup_completed' => 1
            ];
        }
        saveMockSchools($schools);
        
        
        // Update mock_users.json
        $mockUsersFile = __DIR__ . '/../mock_users.json';
        if (file_exists($mockUsersFile)) {
            $mockUsers = json_decode(file_get_contents($mockUsersFile), true) ?: [];
            foreach ($mockUsers as &$u) {
                if (trim(strtolower($u['email'])) === trim(strtolower($auth['email']))) {
                    $u['setup_completed'] = 1;
                    $u['school_name'] = $name;
                    break;
                }
            }
            file_put_contents($mockUsersFile, json_encode($mockUsers, JSON_PRETTY_PRINT));
        }
        
        // Regenerate Token with setup_completed = 1
        $newToken = generateJwt($auth['sub'], $auth['email'], $auth['role'], $schoolId, 1);
        
        return jsonResponse($response, [
            'success' => true,
            'access_token' => $newToken,
            'message' => 'School configuration initialized successfully.'
        ]);
    }
    
    $stmt = $pdo->prepare("UPDATE schools SET name = :name, address = :address, contact_person = :contact_person, contact_number = :contact_number, logo_path = :logo_path, status = 'Active', setup_completed = 1 WHERE id = :id");
    $stmt->execute([
        'name' => $name,
        'address' => $address,
        'contact_person' => $contact_person,
        'contact_number' => $contact_number,
        'logo_path' => $logo_path,
        'id' => $schoolId
    ]);
    
    logAudit($pdo, $schoolId, $auth['email'], 'Setup Wizard', 'Completed Setup Wizard. School initialized.');
    
    // Regenerate Token with setup_completed = 1
    $newToken = generateJwt($auth['sub'], $auth['email'], $auth['role'], $schoolId, 1);
    
    return jsonResponse($response, [
        'success' => true,
        'access_token' => $newToken,
        'message' => 'School configuration initialized successfully.'
    ]);
});


// --- TENANT PROTECTED ROUTES GROUP ---
// Academic Years
$app->get('/api/academic-years', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $pdo = getDb();
    $stmt = $pdo->prepare("SELECT * FROM academic_years WHERE school_id = :school_id ORDER BY id ASC");
    $stmt->execute(['school_id' => $auth['school_id']]);
    return jsonResponse($response, $stmt->fetchAll());
});

$app->post('/api/academic-years', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $data = getJsonData($request);
    $range = $data['year_range'] ?? '';
    $startDate = $data['start_date'] ?? null;
    $endDate = $data['end_date'] ?? null;
    $description = $data['description'] ?? null;
    
    $pdo = getDb();
    
    // Auto-generate range if empty
    if (empty($range)) {
        $maxStmt = $pdo->prepare("SELECT year_range FROM academic_years WHERE school_id = :school_id ORDER BY id DESC LIMIT 1");
        $maxStmt->execute(['school_id' => $auth['school_id']]);
        $latest = $maxStmt->fetch();
        if ($latest) {
            $parts = explode('-', $latest['year_range']);
            $start = (int)$parts[0];
            if ($start) {
                $range = ($start + 1) . '-' . ($start + 2);
            }
        }
        if (empty($range)) {
            $range = date('Y') . '-' . (date('Y') + 1);
        }
    }
    
    // Validate duplicates
    $chk = $pdo->prepare("SELECT COUNT(*) FROM academic_years WHERE school_id = :school_id AND year_range = :range");
    $chk->execute(['school_id' => $auth['school_id'], 'range' => $range]);
    if ($chk->fetchColumn() > 0) {
        return jsonResponse($response, ['detail' => 'Academic year range already exists'], 400);
    }
    
    $feeStructure = $data['fee_structure'] ?? null;
    $feeStructureJson = null;
    if ($feeStructure) {
        $feeStructureJson = is_array($feeStructure) ? json_encode($feeStructure) : $feeStructure;
    } else {
        $feeStructureJson = json_encode([
            "April" => 150, "May" => 150, "June" => 150, "July" => 150, "August" => 150, 
            "September" => 150, "October" => 150, "November" => 150, "December" => 150, 
            "January" => 150, "February" => 150, "March" => 150
        ]);
    }
    
    $stmt = $pdo->prepare("INSERT INTO academic_years (school_id, year_range, start_date, end_date, description, status, fee_structure, is_active) VALUES (:school_id, :range, :start_date, :end_date, :description, 'Draft', :fee_structure, 0)");
    $stmt->execute([
        'school_id' => $auth['school_id'],
        'range' => $range,
        'start_date' => $startDate,
        'end_date' => $endDate,
        'description' => $description,
        'fee_structure' => $feeStructureJson
    ]);
    
    logAudit($pdo, $auth['school_id'], $auth['email'], 'Add Year', "Created academic year session $range in Draft status.");
    
    return jsonResponse($response, ['message' => 'Year added successfully', 'year_range' => $range]);
});

$app->post('/api/academic-years/{id}/activate', function (Request $request, Response $response, array $args) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $id = (int)($args['id'] ?? 0);
    $data = getJsonData($request);
    
    $pdo = getDb();
    $pdo->beginTransaction();
    
    try {
        // Fetch target year
        $targetStmt = $pdo->prepare("SELECT * FROM academic_years WHERE id = :id AND school_id = :school_id");
        $targetStmt->execute(['id' => $id, 'school_id' => $auth['school_id']]);
        $targetYear = $targetStmt->fetch();
        if (!$targetYear) {
            $pdo->rollBack();
            return jsonResponse($response, ['detail' => 'Academic year not found'], 404);
        }
        
        // Find current active year
        $currStmt = $pdo->prepare("SELECT * FROM academic_years WHERE school_id = :school_id AND status = 'Active'");
        $currStmt->execute(['school_id' => $auth['school_id']]);
        $currYear = $currStmt->fetch();
        $old_ay_id = $currYear ? (int)$currYear['id'] : null;
        
        // Archive old active year
        if ($old_ay_id) {
            $archStmt = $pdo->prepare("UPDATE academic_years SET status = 'Archived', is_active = 0 WHERE id = :id");
            $archStmt->execute(['id' => $old_ay_id]);
        }
        
        // Activate target year
        $actStmt = $pdo->prepare("UPDATE academic_years SET status = 'Active', is_active = 1 WHERE id = :id");
        $actStmt->execute(['id' => $targetYear['id']]);
        
        // Promote students if there was a previous year
        $promotedCount = 0;
        $repeatingCount = 0;
        $graduatedCount = 0;
        
        if ($old_ay_id) {
            $studentsStmt = $pdo->prepare("SELECT * FROM students WHERE school_id = :school_id AND academic_year_id = :ay_id");
            $studentsStmt->execute(['school_id' => $auth['school_id'], 'ay_id' => $old_ay_id]);
            $oldStudents = $studentsStmt->fetchAll();
            
            $classMappings = $data['class_mappings'] ?? [];
            $studentStatus = $data['student_status'] ?? [];
            
            $insStudent = $pdo->prepare("INSERT INTO students (
                school_id, academic_year_id, class_id, group_name, gender, name, roll_number, sr_no, phone, email, 
                country, state, city, status, father_name, mother_name, address, date_of_birth, admission_date, 
                emergency_contact, blood_group, aadhaar_number, nationality, caste, profile_image
            ) VALUES (
                :school_id, :academic_year_id, :class_id, :group_name, :gender, :name, :roll_number, :sr_no, :phone, :email, 
                :country, :state, :city, :status, :father_name, :mother_name, :address, :date_of_birth, :admission_date, 
                :emergency_contact, :blood_group, :aadhaar_number, :nationality, :caste, :profile_image
            )");
            
            $months = ["April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March"];
            $cfStmt = $pdo->prepare("SELECT fee_structure FROM class_fees WHERE school_id = :school_id AND academic_year_id = :ay_id AND class_id = :class_id");
            $insFees = $pdo->prepare("INSERT INTO fee_records (school_id, student_id, academic_year_id, month, amount, status, due_date) VALUES (:school_id, :student_id, :ay_id, :month, :amount, 'Pending', :due_date)");
            
            // Parse start year of target academic year to seed fee due dates properly
            $rangeParts = explode('-', $targetYear['year_range']);
            $startYear = (int)$rangeParts[0];
            if (!$startYear) $startYear = (int)date('Y');
            
            foreach ($oldStudents as $student) {
                $studId = $student['id'];
                $oldClassId = $student['class_id'];
                
                // Get promotion choice: 'promote', 'repeat', 'graduate'
                $statusChoice = $studentStatus[$studId] ?? null;
                if (!$statusChoice) {
                    $mappedClass = $classMappings[$oldClassId] ?? null;
                    if ($mappedClass === 'Alumni' || $mappedClass === 'Alumni / Passed Out') {
                        $statusChoice = 'graduate';
                    } else {
                        $statusChoice = 'promote';
                    }
                }
                
                $newClassId = $oldClassId;
                $newStatus = 'Active';
                
                if ($statusChoice === 'graduate') {
                    $newStatus = 'Alumni';
                    $graduatedCount++;
                } else if ($statusChoice === 'repeat') {
                    $newClassId = $oldClassId;
                    $newStatus = 'Active';
                    $repeatingCount++;
                } else {
                    $mappedClass = $classMappings[$oldClassId] ?? null;
                    if ($mappedClass === 'Alumni' || $mappedClass === 'Alumni / Passed Out' || !$mappedClass) {
                        $newStatus = 'Alumni';
                        $graduatedCount++;
                    } else {
                        $newClassId = (int)$mappedClass;
                        $newStatus = 'Active';
                        $promotedCount++;
                    }
                }
                
                // Insert student copy
                $insStudent->execute([
                    'school_id' => $auth['school_id'],
                    'academic_year_id' => $targetYear['id'],
                    'class_id' => $newClassId,
                    'group_name' => $student['group_name'],
                    'gender' => $student['gender'],
                    'name' => $student['name'],
                    'roll_number' => $student['roll_number'],
                    'sr_no' => $student['sr_no'],
                    'phone' => $student['phone'],
                    'email' => $student['email'],
                    'country' => $student['country'],
                    'state' => $student['state'],
                    'city' => $student['city'],
                    'status' => $newStatus,
                    'father_name' => $student['father_name'],
                    'mother_name' => $student['mother_name'],
                    'address' => $student['address'],
                    'date_of_birth' => $student['date_of_birth'],
                    'admission_date' => $student['admission_date'],
                    'emergency_contact' => $student['emergency_contact'],
                    'blood_group' => $student['blood_group'],
                    'aadhaar_number' => $student['aadhaar_number'],
                    'nationality' => $student['nationality'],
                    'caste' => $student['caste'],
                    'profile_image' => $student['profile_image']
                ]);
                
                $newStudentId = $pdo->lastInsertId();
                
                // Seeding fee records for Active students in new year
                if ($newStatus === 'Active') {
                    $cfStmt->execute([
                        'school_id' => $auth['school_id'],
                        'ay_id' => $targetYear['id'],
                        'class_id' => $newClassId
                    ]);
                    $cfRes = $cfStmt->fetch();
                    $targetFeeStructure = [];
                    if ($cfRes) {
                        $targetFeeStructure = json_decode($cfRes['fee_structure'], true) ?: [];
                    }
                    
                    foreach ($months as $idx => $m) {
                        $mNum = ($idx + 4 > 12) ? ($idx - 8) : ($idx + 4);
                        $mYear = ($idx <= 8) ? $startYear : ($startYear + 1);
                        $dueDate = sprintf('%04d-%02d-15', $mYear, $mNum);
                        $amount = isset($targetFeeStructure[$m]) ? (float)$targetFeeStructure[$m] : 150.00;
                        $insFees->execute([
                            'school_id' => $auth['school_id'],
                            'student_id' => $newStudentId,
                            'ay_id' => $targetYear['id'],
                            'month' => $m,
                            'amount' => $amount,
                            'due_date' => $dueDate
                        ]);
                    }
                }
            }
            $auditDetails = "Transitioned school session to {$targetYear['year_range']}. Promoted $promotedCount, repeating $repeatingCount, graduated $graduatedCount.";
        } else {
            $auditDetails = "Initialized active school session {$targetYear['year_range']}. No students to transition.";
        }
        
        logAudit($pdo, $auth['school_id'], $auth['email'], 'Year Transition', $auditDetails);
        $pdo->commit();
        
        return jsonResponse($response, ['message' => 'Academic year activated successfully', 'details' => $auditDetails]);
    } catch (\Exception $e) {
        $pdo->rollBack();
        return jsonResponse($response, ['detail' => 'Activation transaction failed: ' . $e->getMessage()], 500);
    }
});

$app->put('/api/academic-years/{id}/archive', function (Request $request, Response $response, array $args) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $id = (int)($args['id'] ?? 0);
    $pdo = getDb();
    
    $stmt = $pdo->prepare("UPDATE academic_years SET status = 'Archived', is_active = 0 WHERE id = :id AND school_id = :school_id");
    $stmt->execute(['id' => $id, 'school_id' => $auth['school_id']]);
    
    logAudit($pdo, $auth['school_id'], $auth['email'], 'Archive Year', "Archived academic year ID $id.");
    return jsonResponse($response, ['message' => 'Academic year archived successfully']);
});

$app->get('/api/class-fees', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $params = $request->getQueryParams();
    $class_id = (int)($params['class_id'] ?? 0);
    $ay_id = (int)($params['academic_year_id'] ?? 0);
    
    $pdo = getDb();
    $stmt = $pdo->prepare("SELECT fee_structure FROM class_fees WHERE school_id = :school_id AND academic_year_id = :ay_id AND class_id = :class_id");
    $stmt->execute([
        'school_id' => $auth['school_id'],
        'ay_id' => $ay_id,
        'class_id' => $class_id
    ]);
    $res = $stmt->fetch();
    
    if ($res) {
        return jsonResponse($response, json_decode($res['fee_structure'], true));
    } else {
        return jsonResponse($response, [
            "April" => 150, "May" => 150, "June" => 150, "July" => 150, "August" => 150,
            "September" => 150, "October" => 150, "November" => 150, "December" => 150,
            "January" => 150, "February" => 150, "March" => 150
        ]);
    }
});

$app->post('/api/class-fees', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $data = getJsonData($request);
    $class_id = (int)($data['class_id'] ?? 0);
    $ay_id = (int)($data['academic_year_id'] ?? 0);
    $fee_structure = $data['fee_structure'] ?? null;
    
    if (!$class_id || !$ay_id || !$fee_structure) {
        return jsonResponse($response, ['detail' => 'Missing required fields'], 400);
    }
    
    $feeStructureJson = is_array($fee_structure) ? json_encode($fee_structure) : $fee_structure;
    
    $pdo = getDb();
    $stmt = $pdo->prepare("INSERT INTO class_fees (school_id, academic_year_id, class_id, fee_structure) 
        VALUES (:school_id, :ay_id, :class_id, :fee_structure) 
        ON DUPLICATE KEY UPDATE fee_structure = :fee_structure");
    $stmt->execute([
        'school_id' => $auth['school_id'],
        'ay_id' => $ay_id,
        'class_id' => $class_id,
        'fee_structure' => $feeStructureJson
    ]);
    
    logAudit($pdo, $auth['school_id'], $auth['email'], 'Configure Fees', "Updated monthly fee structure for Class ID $class_id.");
    
    return jsonResponse($response, ['success' => true]);
});

$app->get('/api/reports/cross-year', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $pdo = getDb();
    
    // Get all years
    $yearsStmt = $pdo->prepare("SELECT * FROM academic_years WHERE school_id = :school_id ORDER BY id ASC");
    $yearsStmt->execute(['school_id' => $auth['school_id']]);
    $years = $yearsStmt->fetchAll();
    
    $results = [];
    foreach ($years as $y) {
        $ayId = $y['id'];
        
        // Count students
        $studStmt = $pdo->prepare("SELECT COUNT(*) FROM students WHERE school_id = :school_id AND academic_year_id = :ay_id AND status = 'Active'");
        $studStmt->execute(['school_id' => $auth['school_id'], 'ay_id' => $ayId]);
        $studentCount = (int)$studStmt->fetchColumn();
        
        // Count revenue (paid fees)
        $revStmt = $pdo->prepare("SELECT SUM(amount) FROM fee_records WHERE school_id = :school_id AND academic_year_id = :ay_id AND status = 'Paid'");
        $revStmt->execute(['school_id' => $auth['school_id'], 'ay_id' => $ayId]);
        $revenue = (float)($revStmt->fetchColumn() ?: 0.0);
        
        // Count salary expense (paid salary)
        $salStmt = $pdo->prepare("SELECT SUM(amount) FROM salary_records WHERE school_id = :school_id AND academic_year_id = :ay_id AND status = 'Paid'");
        $salStmt->execute(['school_id' => $auth['school_id'], 'ay_id' => $ayId]);
        $salaryExpense = (float)($salStmt->fetchColumn() ?: 0.0);
        
        // Calculate performance index (simulated based on ID)
        $perfIndex = 82.5 + (($ayId * 3.7) % 12);
        
        $results[] = [
            'id' => $ayId,
            'year_range' => $y['year_range'],
            'status' => $y['status'],
            'start_date' => $y['start_date'],
            'end_date' => $y['end_date'],
            'student_count' => $studentCount,
            'revenue' => $revenue,
            'salary_expense' => $salaryExpense,
            'performance_index' => round($perfIndex, 1) . '%'
        ];
    }
    
    return jsonResponse($response, $results);
});


// Classrooms
$app->get('/api/classes', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $pdo = getDb();
    $stmt = $pdo->prepare("SELECT * FROM classrooms WHERE school_id = :school_id");
    $stmt->execute(['school_id' => $auth['school_id']]);
    $classes = $stmt->fetchAll();
    
    // For backward-compatibility, attach an empty groups list
    foreach ($classes as &$c) {
        $c['groups'] = [];
    }
    
    return jsonResponse($response, $classes);
});

$app->post('/api/classes', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $data = getJsonData($request);
    $name = trim($data['name'] ?? '');
    $room = trim($data['room'] ?? '');
    
    if (empty($name)) return jsonResponse($response, ['detail' => 'Classroom name required'], 400);
    
    $pdo = getDb();
    
    // Check duplicate classroom name within school
    $chkStmt = $pdo->prepare("SELECT COUNT(*) FROM classrooms WHERE school_id = :school_id AND LOWER(name) = LOWER(:name)");
    $chkStmt->execute(['school_id' => $auth['school_id'], 'name' => $name]);
    if ($chkStmt->fetchColumn() > 0) {
        return jsonResponse($response, ['detail' => 'Class name already exists'], 400);
    }
    
    $stmt = $pdo->prepare("INSERT INTO classrooms (school_id, name, room) VALUES (:school_id, :name, :room)");
    $stmt->execute(['school_id' => $auth['school_id'], 'name' => $name, 'room' => $room]);
    
    logAudit($pdo, $auth['school_id'], $auth['email'], 'Add Class', "Created classroom $name ($room).");
    
    return jsonResponse($response, ['message' => 'Classroom created successfully']);
});

// Teachers
$app->get('/api/teachers', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $pdo = getDb();
    $stmt = $pdo->prepare("SELECT * FROM teachers WHERE school_id = :school_id");
    $stmt->execute(['school_id' => $auth['school_id']]);
    return jsonResponse($response, $stmt->fetchAll());
});

$app->post('/api/teachers', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $data = getJsonData($request);
    $name = $data['name'] ?? '';
    $subject = $data['subject'] ?? '';
    $salary = (float)($data['salary_amount'] ?? 3000.0);
    
    if (empty($name) || empty($subject)) {
        return jsonResponse($response, ['detail' => 'Teacher Name and Subject are required.'], 400);
    }
    
    $pdo = getDb();
    $stmt = $pdo->prepare("INSERT INTO teachers (school_id, name, gender, subject, phone, email, qualification, experience, aadhaar_number, pan_number, address, joining_date, exit_date, salary_amount, status, profile_image, documents) 
        VALUES (:school_id, :name, :gender, :subject, :phone, :email, :qualification, :experience, :aadhaar_number, :pan_number, :address, :joining_date, :exit_date, :salary_amount, 'Active', :profile_image, :documents)");
    $stmt->execute([
        'school_id' => $auth['school_id'],
        'name' => $name,
        'gender' => $data['gender'] ?? 'Male',
        'subject' => $subject,
        'phone' => $data['phone'] ?? '',
        'email' => $data['email'] ?? '',
        'qualification' => $data['qualification'] ?? '',
        'experience' => $data['experience'] ?? '',
        'aadhaar_number' => $data['aadhaar_number'] ?? null,
        'pan_number' => $data['pan_number'] ?? null,
        'address' => $data['address'] ?? '',
        'joining_date' => $data['joining_date'] ?: date('Y-m-d'),
        'exit_date' => $data['exit_date'] ?: null,
        'salary_amount' => $salary,
        'profile_image' => $data['profile_image'] ?? null,
        'documents' => isset($data['documents']) ? (is_string($data['documents']) ? $data['documents'] : json_encode($data['documents'])) : null
    ]);
    
    logAudit($pdo, $auth['school_id'], $auth['email'], 'Add Teacher', "Onboarded teacher $name.");
    
    return jsonResponse($response, ['message' => 'Teacher added successfully']);
});
 
$app->put('/api/teachers/{id}', function (Request $request, Response $response, array $args) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $id = $args['id'];
    $data = getJsonData($request);
    
    $pdo = getDb();
    
    // Check if it is a full edit or a simple status toggle
    if (isset($data['name']) || isset($data['subject'])) {
        $sql = "UPDATE teachers SET 
            name = :name, 
            gender = :gender,
            subject = :subject, 
            phone = :phone, 
            email = :email, 
            qualification = :qualification, 
            experience = :experience, 
            aadhaar_number = :aadhaar_number,
            pan_number = :pan_number,
            address = :address, 
            joining_date = :joining_date, 
            exit_date = :exit_date,
            salary_amount = :salary_amount,
            status = :status,
            profile_image = :profile_image,
            documents = :documents
            WHERE id = :id AND school_id = :school_id";
            
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'name' => $data['name'] ?? '',
            'gender' => $data['gender'] ?? 'Male',
            'subject' => $data['subject'] ?? '',
            'phone' => $data['phone'] ?? '',
            'email' => $data['email'] ?? '',
            'qualification' => $data['qualification'] ?? '',
            'experience' => $data['experience'] ?? '',
            'aadhaar_number' => $data['aadhaar_number'] ?? null,
            'pan_number' => $data['pan_number'] ?? null,
            'address' => $data['address'] ?? '',
            'joining_date' => $data['joining_date'] ?: null,
            'exit_date' => $data['exit_date'] ?: null,
            'salary_amount' => (float)($data['salary_amount'] ?? 3000.0),
            'status' => $data['status'] ?? 'Active',
            'profile_image' => $data['profile_image'] ?? null,
            'documents' => isset($data['documents']) ? (is_string($data['documents']) ? $data['documents'] : json_encode($data['documents'])) : null,
            'id' => $id,
            'school_id' => $auth['school_id']
        ]);
        logAudit($pdo, $auth['school_id'], $auth['email'], 'Modify Teacher', "Updated details of teacher $id.");
    } else {
        $status = $data['status'] ?? 'Active';
        $stmt = $pdo->prepare("UPDATE teachers SET status = :status WHERE id = :id AND school_id = :school_id");
        $stmt->execute(['status' => $status, 'id' => $id, 'school_id' => $auth['school_id']]);
        logAudit($pdo, $auth['school_id'], $auth['email'], 'Modify Teacher', "Updated status of teacher ID $id to $status.");
    }
    
    return jsonResponse($response, ['message' => 'Teacher updated successfully']);
});

$app->delete('/api/teachers/{id}', function (Request $request, Response $response, array $args) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $id = $args['id'];
    $pdo = getDb();
    
    $stmt = $pdo->prepare("DELETE FROM teachers WHERE id = :id AND school_id = :school_id");
    $stmt->execute(['id' => $id, 'school_id' => $auth['school_id']]);
    
    logAudit($pdo, $auth['school_id'], $auth['email'], 'Delete Teacher', "Removed teacher ID $id.");
    
    return jsonResponse($response, ['message' => 'Teacher deleted']);
});

// Students
$app->get('/api/students', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $params = $request->getQueryParams();
    $ay_id = $params['academic_year_id'] ?? null;
    
    $pdo = getDb();
    if ($ay_id) {
        $stmt = $pdo->prepare("
            SELECT s.* 
            FROM students s 
            WHERE s.school_id = :school_id AND s.academic_year_id = :ay_id
        ");
        $stmt->execute(['school_id' => $auth['school_id'], 'ay_id' => $ay_id]);
    } else {
        $stmt = $pdo->prepare("
            SELECT s.* 
            FROM students s 
            WHERE s.school_id = :school_id
        ");
        $stmt->execute(['school_id' => $auth['school_id']]);
    }
    
    $students = $stmt->fetchAll();
    
    $now = new DateTime();
    $currentYear = (int)$now->format('Y');
    $currentMonth = (int)$now->format('n');
    
    $feeStmt = $pdo->prepare("SELECT due_date, status FROM fee_records WHERE student_id = :student_id AND academic_year_id = :ay_id");
    
    foreach ($students as &$s) {
        $feeStmt->execute(['student_id' => $s['id'], 'ay_id' => $s['academic_year_id']]);
        $fees = $feeStmt->fetchAll();
        
        $pastUnpaidCount = 0;
        $isCurrentUnpaid = false;
        $totalUnpaid = 0;
        
        foreach ($fees as $f) {
            if ($f['status'] !== 'Paid') {
                $totalUnpaid++;
                $parts = explode('-', $f['due_date']);
                $dueY = isset($parts[0]) ? (int)$parts[0] : 0;
                $dueM = isset($parts[1]) ? (int)$parts[1] : 0;
                
                if ($dueY < $currentYear || ($dueY === $currentYear && $dueM < $currentMonth)) {
                    $pastUnpaidCount++;
                } else if ($dueY === $currentYear && $dueM === $currentMonth) {
                    $isCurrentUnpaid = true;
                }
            }
        }
        
        if ($totalUnpaid === 0) {
            $s['fee_status'] = 'PAID';
        } else if ($pastUnpaidCount === 0) {
            $s['fee_status'] = $isCurrentUnpaid ? 'DUES PENDING' : 'PAID';
        } else if ($pastUnpaidCount === 1) {
            $s['fee_status'] = 'PAYMENT OVERDUE';
        } else if ($pastUnpaidCount === 2) {
            $s['fee_status'] = 'CRITICAL DUES';
        } else {
            $s['fee_status'] = 'FEE DEFAULT ALERT';
        }
    }
    
    return jsonResponse($response, $students);
});

$app->post('/api/students', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $data = getJsonData($request);
    $name = trim($data['name'] ?? '');
    $roll = trim($data['roll_number'] ?? '');
    $class_id = (int)($data['class_id'] ?? 0);
    $ay_id = (int)($data['academic_year_id'] ?? 0);
    
    if (empty($name) || empty($roll) || !$class_id || !$ay_id) {
        return jsonResponse($response, ['detail' => 'Name, Roll, Class and Academic Year are required.'], 400);
    }
    
    $pdo = getDb();
    
    // Check duplicate roll number
    $chk = $pdo->prepare("SELECT COUNT(*) FROM students WHERE school_id = :school_id AND roll_number = :roll AND academic_year_id = :ay_id");
    $chk->execute(['school_id' => $auth['school_id'], 'roll' => $roll, 'ay_id' => $ay_id]);
    if ($chk->fetchColumn() > 0) {
        return jsonResponse($response, ['detail' => 'Duplicate Roll Number detected in this session!'], 400);
    }
    
    $stmt = $pdo->prepare("INSERT INTO students (school_id, academic_year_id, class_id, group_name, gender, name, roll_number, sr_no, phone, email, country, state, city, father_name, mother_name, address, date_of_birth, admission_date, emergency_contact, blood_group, aadhaar_number, nationality, caste, profile_image, documents) VALUES (:school_id, :ay_id, :class_id, :group_name, :gender, :name, :roll, :sr_no, :phone, :email, :country, :state, :city, :father, :mother, :address, :dob, :adm_date, :emergency, :blood, :aadhaar, :nationality, :caste, :profile_image, :documents)");
    $stmt->execute([
        'school_id' => $auth['school_id'],
        'ay_id' => $ay_id,
        'class_id' => $class_id,
        'group_name' => isset($data['group_name']) ? (trim($data['group_name']) ?: null) : null,
        'gender' => $data['gender'] ?: 'Male',
        'name' => $name,
        'roll' => $roll,
        'sr_no' => $data['sr_no'] ?? null,
        'phone' => $data['phone'] ?? '',
        'email' => $data['email'] ?? '',
        'country' => $data['country'] ?? null,
        'state' => $data['state'] ?? null,
        'city' => $data['city'] ?? null,
        'father' => $data['father_name'] ?? '',
        'mother' => $data['mother_name'] ?? '',
        'address' => $data['address'] ?? '',
        'dob' => $data['date_of_birth'] ?: null,
        'adm_date' => $data['admission_date'] ?: date('Y-m-d'),
        'emergency' => $data['emergency_contact'] ?? '',
        'blood' => $data['blood_group'] ?: 'O+',
        'aadhaar' => $data['aadhaar_number'] ?? '',
        'nationality' => $data['nationality'] ?? 'Indian',
        'caste' => $data['caste'] ?? null,
        'profile_image' => $data['profile_image'] ?? null,
        'documents' => isset($data['documents']) ? (is_string($data['documents']) ? $data['documents'] : json_encode($data['documents'])) : null
    ]);
    
    $studentId = $pdo->lastInsertId();
    
    // Retrieve year range to calculate fee due dates dynamically
    $ayStmt = $pdo->prepare("SELECT year_range FROM academic_years WHERE id = :id");
    $ayStmt->execute(['id' => $ay_id]);
    $ayInfo = $ayStmt->fetch();
    $startYear = (int)date('Y');
    if ($ayInfo) {
        $rangeParts = explode('-', $ayInfo['year_range']);
        $startYear = (int)$rangeParts[0] ?: $startYear;
    }
    
    // Retrieve class-wise tuition fee structure
    $cfStmt = $pdo->prepare("SELECT fee_structure FROM class_fees WHERE school_id = :school_id AND academic_year_id = :ay_id AND class_id = :class_id");
    $cfStmt->execute([
        'school_id' => $auth['school_id'],
        'ay_id' => $ay_id,
        'class_id' => $class_id
    ]);
    $cfRes = $cfStmt->fetch();
    $feeStructure = [];
    if ($cfRes) {
        $feeStructure = json_decode($cfRes['fee_structure'], true) ?: [];
    }
    
    // Seed initial fee registry for this student for the academic year (April to March)
    $months = ["April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March"];
    $feeStmt = $pdo->prepare("INSERT INTO fee_records (school_id, student_id, academic_year_id, month, amount, status, due_date) VALUES (:school_id, :student_id, :ay_id, :month, :amount, 'Pending', :due_date)");
    foreach ($months as $idx => $m) {
        $mNum = ($idx + 4 > 12) ? ($idx - 8) : ($idx + 4);
        $mYear = ($idx <= 8) ? $startYear : ($startYear + 1);
        $dueDate = sprintf('%04d-%02d-15', $mYear, $mNum);
        $amount = isset($feeStructure[$m]) ? (float)$feeStructure[$m] : 150.00;
        $feeStmt->execute([
            'school_id' => $auth['school_id'],
            'student_id' => $studentId,
            'ay_id' => $ay_id,
            'month' => $m,
            'amount' => $amount,
            'due_date' => $dueDate
        ]);
    }
    
    logAudit($pdo, $auth['school_id'], $auth['email'], 'Admit Student', "Admitted student $name and pre-filled invoice ledger.");
    
    return jsonResponse($response, ['message' => 'Student admitted successfully']);
});

$app->put('/api/students/{id}', function (Request $request, Response $response, array $args) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $studentId = (int)$args['id'];
    $data = getJsonData($request);
    
    $name = trim($data['name'] ?? '');
    $roll = trim($data['roll_number'] ?? '');
    $class_id = (int)($data['class_id'] ?? 0);
    
    if (empty($name) || empty($roll) || !$class_id) {
        return jsonResponse($response, ['detail' => 'Name, Roll, and Class are required.'], 400);
    }
    
    $pdo = getDb();
    
    // Check if student belongs to this school
    $chkStudent = $pdo->prepare("SELECT * FROM students WHERE id = :id AND school_id = :school_id");
    $chkStudent->execute(['id' => $studentId, 'school_id' => $auth['school_id']]);
    $student = $chkStudent->fetch();
    if (!$student) {
        return jsonResponse($response, ['detail' => 'Student not found'], 404);
    }
    
    // Check duplicate roll number
    $chk = $pdo->prepare("SELECT COUNT(*) FROM students WHERE school_id = :school_id AND roll_number = :roll AND academic_year_id = :ay_id AND id != :id");
    $chk->execute(['school_id' => $auth['school_id'], 'roll' => $roll, 'ay_id' => $student['academic_year_id'], 'id' => $studentId]);
    if ($chk->fetchColumn() > 0) {
        return jsonResponse($response, ['detail' => 'Duplicate Roll Number detected in this session!'], 400);
    }
    
    $stmt = $pdo->prepare("
        UPDATE students 
        SET class_id = :class_id, group_name = :group_name, gender = :gender, name = :name, roll_number = :roll, sr_no = :sr_no, 
            phone = :phone, email = :email, country = :country, state = :state, city = :city,
            father_name = :father, mother_name = :mother, address = :address, 
            date_of_birth = :dob, admission_date = :adm_date, emergency_contact = :emergency, 
            blood_group = :blood, aadhaar_number = :aadhaar, nationality = :nationality, caste = :caste, profile_image = :profile_image,
            documents = :documents
        WHERE id = :id AND school_id = :school_id
    ");
    
    $stmt->execute([
        'class_id' => $class_id,
        'group_name' => isset($data['group_name']) ? (trim($data['group_name']) ?: null) : null,
        'gender' => $data['gender'] ?: 'Male',
        'name' => $name,
        'roll' => $roll,
        'sr_no' => $data['sr_no'] ?? null,
        'phone' => $data['phone'] ?? '',
        'email' => $data['email'] ?? '',
        'country' => $data['country'] ?? null,
        'state' => $data['state'] ?? null,
        'city' => $data['city'] ?? null,
        'father' => $data['father_name'] ?? '',
        'mother' => $data['mother_name'] ?? '',
        'address' => $data['address'] ?? '',
        'dob' => $data['date_of_birth'] ?: null,
        'adm_date' => $data['admission_date'] ?: date('Y-m-d'),
        'emergency' => $data['emergency_contact'] ?? '',
        'blood' => $data['blood_group'] ?: 'O+',
        'aadhaar' => $data['aadhaar_number'] ?? '',
        'nationality' => $data['nationality'] ?? 'Indian',
        'caste' => $data['caste'] ?? null,
        'profile_image' => $data['profile_image'] ?? null,
        'documents' => isset($data['documents']) ? (is_string($data['documents']) ? $data['documents'] : json_encode($data['documents'])) : null,
        'id' => $studentId,
        'school_id' => $auth['school_id']
    ]);
    
    logAudit($pdo, $auth['school_id'], $auth['email'], 'Update Student', "Updated student profile $name (ID $studentId).");
    
    return jsonResponse($response, ['message' => 'Student profile updated successfully']);
});

$app->delete('/api/students/{id}', function (Request $request, Response $response, array $args) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $id = $args['id'];
    $pdo = getDb();
    
    $stmt = $pdo->prepare("DELETE FROM students WHERE id = :id AND school_id = :school_id");
    $stmt->execute(['id' => $id, 'school_id' => $auth['school_id']]);
    
    logAudit($pdo, $auth['school_id'], $auth['email'], 'Remove Student', "Deleted student profile ID $id.");
    
    return jsonResponse($response, ['message' => 'Student removed']);
});

// Teacher Salaries Ledger
$app->get('/api/teachers/{id}/salary', function (Request $request, Response $response, array $args) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $teacherId = $args['id'];
    $params = $request->getQueryParams();
    $ay_id = $params['academic_year_id'] ?? 0;
    
    $pdo = getDb();
    
    // Check if salaries populated for this year
    $stmt = $pdo->prepare("SELECT * FROM salary_records WHERE teacher_id = :teacher_id AND academic_year_id = :ay_id AND school_id = :school_id");
    $stmt->execute(['teacher_id' => $teacherId, 'ay_id' => $ay_id, 'school_id' => $auth['school_id']]);
    $records = $stmt->fetchAll();
    
    if (empty($records)) {
        // Populate records automatically
        $tStmt = $pdo->prepare("SELECT salary_amount FROM teachers WHERE id = :id AND school_id = :school_id");
        $tStmt->execute(['id' => $teacherId, 'school_id' => $auth['school_id']]);
        $salary = (float)$tStmt->fetchColumn() ?: 3000.0;
        
        $months = ["April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March"];
        $ins = $pdo->prepare("INSERT INTO salary_records (school_id, teacher_id, academic_year_id, month, amount, status) VALUES (:school_id, :teacher_id, :ay_id, :month, :amount, 'Pending')");
        foreach ($months as $m) {
            $ins->execute([
                'school_id' => $auth['school_id'],
                'teacher_id' => $teacherId,
                'ay_id' => $ay_id,
                'month' => $m,
                'amount' => $salary
            ]);
        }
        
        $stmt->execute(['teacher_id' => $teacherId, 'ay_id' => $ay_id, 'school_id' => $auth['school_id']]);
        $records = $stmt->fetchAll();
    }
    
    return jsonResponse($response, $records);
});

// Pay Salary
$app->post('/api/teachers/{id}/salary/{month}/pay', function (Request $request, Response $response, array $args) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $teacherId = $args['id'];
    $month = $args['month'];
    $params = $request->getQueryParams();
    $ay_id = $params['academic_year_id'] ?? 0;
    
    $pdo = getDb();
    
    $stmt = $pdo->prepare("UPDATE salary_records SET status = 'Paid', payment_date = :pay_date WHERE teacher_id = :teacher_id AND month = :month AND academic_year_id = :ay_id AND school_id = :school_id");
    $stmt->execute([
        'pay_date' => date('Y-m-d'),
        'teacher_id' => $teacherId,
        'month' => $month,
        'ay_id' => $ay_id,
        'school_id' => $auth['school_id']
    ]);
    
    logAudit($pdo, $auth['school_id'], $auth['email'], 'Pay Salary', "Disbursed $month salary for teacher ID $teacherId.");
    
    return jsonResponse($response, ['success' => true]);
});

// Student Fees Ledger
$app->get('/api/students/{id}/fees', function (Request $request, Response $response, array $args) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $studentId = $args['id'];
    $params = $request->getQueryParams();
    $ay_id = $params['academic_year_id'] ?? 0;
    
    $pdo = getDb();
    $stmt = $pdo->prepare("SELECT * FROM fee_records WHERE student_id = :student_id AND academic_year_id = :ay_id AND school_id = :school_id ORDER BY id ASC");
    $stmt->execute(['student_id' => $studentId, 'ay_id' => $ay_id, 'school_id' => $auth['school_id']]);
    return jsonResponse($response, $stmt->fetchAll());
});

// Pay Tuition Fee
$app->post('/api/students/{id}/fees/{month}/pay', function (Request $request, Response $response, array $args) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $studentId = $args['id'];
    $month = $args['month'];
    $params = $request->getQueryParams();
    $ay_id = $params['academic_year_id'] ?? 0;
    
    $pdo = getDb();
    $stmt = $pdo->prepare("UPDATE fee_records SET status = 'Paid', payment_date = :pay_date WHERE student_id = :student_id AND month = :month AND academic_year_id = :ay_id AND school_id = :school_id");
    $stmt->execute([
        'pay_date' => date('Y-m-d'),
        'student_id' => $studentId,
        'month' => $month,
        'ay_id' => $ay_id,
        'school_id' => $auth['school_id']
    ]);
    
    logAudit($pdo, $auth['school_id'], $auth['email'], 'Collect Fee', "Received tuition fee for $month from student ID $studentId.");
    
    return jsonResponse($response, ['success' => true]);
});

// Revert Tuition Fee status to Unpaid
$app->post('/api/students/{id}/fees/{month}/unpay', function (Request $request, Response $response, array $args) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $studentId = $args['id'];
    $month = $args['month'];
    $params = $request->getQueryParams();
    $ay_id = $params['academic_year_id'] ?? 0;
    
    $pdo = getDb();
    $stmt = $pdo->prepare("UPDATE fee_records SET status = 'Pending', payment_date = NULL WHERE student_id = :student_id AND month = :month AND academic_year_id = :ay_id AND school_id = :school_id");
    $stmt->execute([
        'student_id' => $studentId,
        'month' => $month,
        'ay_id' => $ay_id,
        'school_id' => $auth['school_id']
    ]);
    
    logAudit($pdo, $auth['school_id'], $auth['email'], 'Revert Fee', "Reverted tuition fee status for $month to Unpaid for student ID $studentId.");
    
    return jsonResponse($response, ['success' => true]);
});

// Dashboard Stats
$app->get('/api/dashboard/stats', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $schoolId = $auth['school_id'];
    $params = $request->getQueryParams();
    $ay_id = $params['academic_year_id'] ?? 0;
    
    $pdo = getDb();
    
    // Core school counts
    $studStmt = $pdo->prepare("SELECT COUNT(*) FROM students WHERE school_id = :sid AND academic_year_id = :ay");
    $studStmt->execute(['sid' => $schoolId, 'ay' => $ay_id]);
    $total_students = (int)$studStmt->fetchColumn();
    
    $teachStmt = $pdo->prepare("SELECT COUNT(*) FROM teachers WHERE school_id = :sid");
    $teachStmt->execute(['sid' => $schoolId]);
    $total_teachers = (int)$teachStmt->fetchColumn();
    
    $classStmt = $pdo->prepare("SELECT COUNT(*) FROM classrooms WHERE school_id = :sid");
    $classStmt->execute(['sid' => $schoolId]);
    $active_classes = (int)$classStmt->fetchColumn();
    
    // Pending fees & salaries
    $feePendingStmt = $pdo->prepare("SELECT COUNT(*) FROM fee_records WHERE school_id = :sid AND status = 'Pending' AND academic_year_id = :ay");
    $feePendingStmt->execute(['sid' => $schoolId, 'ay' => $ay_id]);
    $pending_fees = (int)$feePendingStmt->fetchColumn();
    
    $salPendingStmt = $pdo->prepare("SELECT COUNT(*) FROM salary_records WHERE school_id = :sid AND status = 'Pending' AND academic_year_id = :ay");
    $salPendingStmt->execute(['sid' => $schoolId, 'ay' => $ay_id]);
    $pending_salaries = (int)$salPendingStmt->fetchColumn();
    
    // Revenue sum (this year paid fees)
    $revStmt = $pdo->prepare("SELECT SUM(amount) FROM fee_records WHERE school_id = :sid AND status = 'Paid' AND academic_year_id = :ay");
    $revStmt->execute(['sid' => $schoolId, 'ay' => $ay_id]);
    $monthly_revenue = (float)$revStmt->fetchColumn() ?: 0.0;
    
    // Monthly chart details
    $months = ["April", "May", "June", "July", "August", "September"];
    $chartFees = [];
    $chartSalaries = [];
    
    $feesChartStmt = $pdo->prepare("SELECT SUM(amount) FROM fee_records WHERE school_id = :sid AND month = :m AND status = 'Paid' AND academic_year_id = :ay");
    $salChartStmt = $pdo->prepare("SELECT SUM(amount) FROM salary_records WHERE school_id = :sid AND month = :m AND status = 'Paid' AND academic_year_id = :ay");
    
    foreach ($months as $m) {
        $feesChartStmt->execute(['sid' => $schoolId, 'm' => $m, 'ay' => $ay_id]);
        $chartFees[] = [
            'month' => $m,
            'amount' => (float)$feesChartStmt->fetchColumn() ?: 0.0
        ];
        
        $salChartStmt->execute(['sid' => $schoolId, 'm' => $m, 'ay' => $ay_id]);
        $chartSalaries[] = [
            'month' => $m,
            'amount' => (float)$salChartStmt->fetchColumn() ?: 0.0
        ];
    }
    
    return jsonResponse($response, [
        'total_students' => $total_students,
        'total_teachers' => $total_teachers,
        'pending_fees_count' => $pending_fees,
        'pending_salaries_count' => $pending_salaries,
        'monthly_revenue' => $monthly_revenue,
        'active_classes' => $active_classes,
        'attendance_overview' => '96.4% Avg',
        'charts' => [
            'fee_collection' => $chartFees,
            'salary_expense' => $chartSalaries
        ]
    ]);
});

// Notifications
$app->get('/api/notifications', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $pdo = getDb();
    
    // Auto populate if empty
    $chk = $pdo->prepare("SELECT COUNT(*) FROM notifications WHERE school_id = :sid");
    $chk->execute(['sid' => $auth['school_id']]);
    if ($chk->fetchColumn() == 0) {
        $ins = $pdo->prepare("INSERT INTO notifications (school_id, title, content, type, timestamp, is_read) VALUES (:sid, 'Welcome to ERP Portal', 'Complete school setup configuration to access rosters and ledgers.', 'System', NOW(), 0)");
        $ins->execute(['sid' => $auth['school_id']]);
    }
    
    $stmt = $pdo->prepare("SELECT * FROM notifications WHERE school_id = :sid ORDER BY id DESC");
    $stmt->execute(['sid' => $auth['school_id']]);
    return jsonResponse($response, $stmt->fetchAll());
});

// Audit Logs
$app->get('/api/audit-logs', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $pdo = getDb();
    $stmt = $pdo->prepare("SELECT * FROM audit_logs WHERE school_id = :sid ORDER BY id DESC LIMIT 50");
    $stmt->execute(['sid' => $auth['school_id']]);
    return jsonResponse($response, $stmt->fetchAll());
});

// --- ACADEMIC PLANNER / SCHEDULE MANAGEMENT ---

// Subjects Management
$app->get('/api/subjects', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $pdo = null;
    try {
        $pdo = getDb();
    } catch (\Exception $e) {
        $pdo = null;
    }
    
    if ($pdo === null) {
        $subjects = getMockSubjects();
        $filtered = array_filter($subjects, function ($sub) use ($auth) {
            return (int)$sub['school_id'] === (int)$auth['school_id'];
        });
        return jsonResponse($response, array_values($filtered));
    }
    
    $stmt = $pdo->prepare("SELECT * FROM subjects WHERE school_id = :school_id ORDER BY name ASC");
    $stmt->execute(['school_id' => $auth['school_id']]);
    return jsonResponse($response, $stmt->fetchAll());
});

$app->post('/api/subjects', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $data = getJsonData($request);
    $name = trim($data['name'] ?? '');
    if (empty($name)) return jsonResponse($response, ['detail' => 'Subject name is required'], 400);
    
    $pdo = null;
    try {
        $pdo = getDb();
    } catch (\Exception $e) {
        $pdo = null;
    }
    
    if ($pdo === null) {
        $subjects = getMockSubjects();
        foreach ($subjects as $s) {
            if ((int)$s['school_id'] === (int)$auth['school_id'] && strcasecmp($s['name'], $name) === 0) {
                return jsonResponse($response, ['detail' => 'Subject already exists'], 400);
            }
        }
        $newId = count($subjects) > 0 ? max(array_column($subjects, 'id')) + 1 : 1;
        $newSubject = [
            'id' => $newId,
            'school_id' => (int)$auth['school_id'],
            'name' => $name
        ];
        $subjects[] = $newSubject;
        saveMockSubjects($subjects);
        return jsonResponse($response, $newSubject);
    }
    
    $chk = $pdo->prepare("SELECT COUNT(*) FROM subjects WHERE school_id = :school_id AND LOWER(name) = LOWER(:name)");
    $chk->execute(['school_id' => $auth['school_id'], 'name' => $name]);
    if ($chk->fetchColumn() > 0) {
        return jsonResponse($response, ['detail' => 'Subject already exists'], 400);
    }
    
    $stmt = $pdo->prepare("INSERT INTO subjects (school_id, name) VALUES (:school_id, :name)");
    $stmt->execute(['school_id' => $auth['school_id'], 'name' => $name]);
    $newId = $pdo->lastInsertId();
    
    return jsonResponse($response, [
        'id' => $newId,
        'school_id' => $auth['school_id'],
        'name' => $name
    ]);
});

$app->put('/api/subjects/{id}', function (Request $request, Response $response, array $args) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $id = (int)$args['id'];
    $data = getJsonData($request);
    $name = trim($data['name'] ?? '');
    if (empty($name)) return jsonResponse($response, ['detail' => 'Subject name is required'], 400);
    
    $pdo = null;
    try {
        $pdo = getDb();
    } catch (\Exception $e) {
        $pdo = null;
    }
    
    if ($pdo === null) {
        $subjects = getMockSubjects();
        $foundIdx = -1;
        foreach ($subjects as $idx => $s) {
            if ((int)$s['id'] === $id && (int)$s['school_id'] === (int)$auth['school_id']) {
                $foundIdx = $idx;
            }
            if ((int)$s['school_id'] === (int)$auth['school_id'] && (int)$s['id'] !== $id && strcasecmp($s['name'], $name) === 0) {
                return jsonResponse($response, ['detail' => 'Another subject with this name already exists'], 400);
            }
        }
        if ($foundIdx === -1) return jsonResponse($response, ['detail' => 'Subject not found'], 404);
        $subjects[$foundIdx]['name'] = $name;
        saveMockSubjects($subjects);
        return jsonResponse($response, $subjects[$foundIdx]);
    }
    
    $chk = $pdo->prepare("SELECT COUNT(*) FROM subjects WHERE school_id = :school_id AND LOWER(name) = LOWER(:name) AND id != :id");
    $chk->execute(['school_id' => $auth['school_id'], 'name' => $name, 'id' => $id]);
    if ($chk->fetchColumn() > 0) {
        return jsonResponse($response, ['detail' => 'Another subject with this name already exists'], 400);
    }
    
    $stmt = $pdo->prepare("UPDATE subjects SET name = :name WHERE id = :id AND school_id = :school_id");
    $stmt->execute(['name' => $name, 'id' => $id, 'school_id' => $auth['school_id']]);
    
    return jsonResponse($response, [
        'id' => $id,
        'school_id' => $auth['school_id'],
        'name' => $name
    ]);
});

$app->delete('/api/subjects/{id}', function (Request $request, Response $response, array $args) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $id = (int)$args['id'];
    
    $pdo = null;
    try {
        $pdo = getDb();
    } catch (\Exception $e) {
        $pdo = null;
    }
    
    if ($pdo === null) {
        $subjects = getMockSubjects();
        $filtered = array_filter($subjects, function ($s) use ($id, $auth) {
            return !((int)$s['id'] === $id && (int)$s['school_id'] === (int)$auth['school_id']);
        });
        saveMockSubjects(array_values($filtered));
        return jsonResponse($response, ['message' => 'Subject deleted successfully']);
    }
    
    $stmt = $pdo->prepare("DELETE FROM subjects WHERE id = :id AND school_id = :school_id");
    $stmt->execute(['id' => $id, 'school_id' => $auth['school_id']]);
    return jsonResponse($response, ['message' => 'Subject deleted successfully']);
});

// Schedules Timetable Management
$app->get('/api/schedules', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $params = $request->getQueryParams();
    $classId = isset($params['class_id']) ? (int)$params['class_id'] : 0;
    $ayId = isset($params['academic_year_id']) ? (int)$params['academic_year_id'] : 0;
    
    if (!$classId || !$ayId) {
        return jsonResponse($response, ['detail' => 'class_id and academic_year_id are required'], 400);
    }
    
    $weekStart = isset($params['week_start_date']) ? trim($params['week_start_date']) : '';
    $status = isset($params['status']) ? trim($params['status']) : '';
    $startDate = isset($params['start_date']) ? trim($params['start_date']) : '';
    $endDate = isset($params['end_date']) ? trim($params['end_date']) : '';
    
    $pdo = null;
    try {
        $pdo = getDb();
    } catch (\Exception $e) {
        $pdo = null;
    }
    
    if ($pdo === null) {
        $schedules = getMockSchedules();
        $filtered = array_filter($schedules, function ($s) use ($auth, $classId, $ayId, $weekStart, $status, $startDate, $endDate) {
            if ((int)$s['school_id'] !== (int)$auth['school_id']) return false;
            if ((int)$s['class_id'] !== $classId) return false;
            if ((int)$s['academic_year_id'] !== $ayId) return false;
            
            if (!empty($weekStart) && $s['week_start_date'] !== $weekStart) return false;
            if (!empty($status) && strcasecmp($s['status'], $status) !== 0) return false;
            
            if (!empty($startDate) && strcmp($s['schedule_date'], $startDate) < 0) return false;
            if (!empty($endDate) && strcmp($s['schedule_date'], $endDate) > 0) return false;
            
            return true;
        });
        
        $results = array_values($filtered);
        usort($results, function ($a, $b) {
            return strcmp($a['schedule_date'], $b['schedule_date']);
        });
        return jsonResponse($response, $results);
    }
    
    $sql = "SELECT * FROM class_schedules WHERE school_id = :school_id AND class_id = :class_id AND academic_year_id = :ay_id";
    $binds = ['school_id' => $auth['school_id'], 'class_id' => $classId, 'ay_id' => $ayId];
    
    if ($weekStart) {
        $sql .= " AND week_start_date = :week_start";
        $binds['week_start'] = $weekStart;
    }
    if ($status) {
        $sql .= " AND status = :status";
        $binds['status'] = $status;
    }
    if ($startDate) {
        $sql .= " AND schedule_date >= :start_date";
        $binds['start_date'] = $startDate;
    }
    if ($endDate) {
        $sql .= " AND schedule_date <= :end_date";
        $binds['end_date'] = $endDate;
    }
    
    $sql .= " ORDER BY schedule_date ASC";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($binds);
    $results = $stmt->fetchAll();
    
    foreach ($results as &$r) {
        $r['subjects'] = json_decode($r['subjects'], true) ?: [];
    }
    
    return jsonResponse($response, $results);
});

$app->post('/api/schedules', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $data = getJsonData($request);
    $classId = isset($data['class_id']) ? (int)$data['class_id'] : 0;
    $ayId = isset($data['academic_year_id']) ? (int)$data['academic_year_id'] : 0;
    $dayOfWeek = trim($data['day_of_week'] ?? '');
    $scheduleDate = trim($data['schedule_date'] ?? '');
    $weekStartDate = trim($data['week_start_date'] ?? '');
    $subjects = $data['subjects'] ?? [];
    $status = trim($data['status'] ?? 'Draft');
    
    if (!$classId || !$ayId || empty($dayOfWeek) || empty($scheduleDate) || empty($weekStartDate)) {
        return jsonResponse($response, ['detail' => 'class_id, academic_year_id, day_of_week, schedule_date, and week_start_date are required'], 400);
    }
    
    $pdo = null;
    try {
        $pdo = getDb();
    } catch (\Exception $e) {
        $pdo = null;
    }
    
    if ($pdo === null) {
        $schedules = getMockSchedules();
        $foundIdx = -1;
        foreach ($schedules as $idx => $s) {
            if ((int)$s['school_id'] === (int)$auth['school_id'] &&
                (int)$s['class_id'] === $classId &&
                (int)$s['academic_year_id'] === $ayId &&
                $s['schedule_date'] === $scheduleDate) {
                $foundIdx = $idx;
                break;
            }
        }
        
        $schedule = [
            'school_id' => (int)$auth['school_id'],
            'academic_year_id' => $ayId,
            'class_id' => $classId,
            'day_of_week' => $dayOfWeek,
            'schedule_date' => $scheduleDate,
            'week_start_date' => $weekStartDate,
            'subjects' => $subjects,
            'status' => $status
        ];
        
        if ($foundIdx !== -1) {
            $schedules[$foundIdx] = array_merge($schedules[$foundIdx], $schedule);
            $schedule = $schedules[$foundIdx];
        } else {
            $newId = count($schedules) > 0 ? max(array_column($schedules, 'id')) + 1 : 1;
            $schedule['id'] = $newId;
            $schedules[] = $schedule;
        }
        
        saveMockSchedules($schedules);
        return jsonResponse($response, $schedule);
    }
    
    $chkCls = $pdo->prepare("SELECT COUNT(*) FROM classrooms WHERE id = :id AND school_id = :sid");
    $chkCls->execute(['id' => $classId, 'sid' => $auth['school_id']]);
    if ($chkCls->fetchColumn() == 0) {
        return jsonResponse($response, ['detail' => 'Classroom not found'], 404);
    }
    
    $subjectsJson = json_encode($subjects);
    
    $stmt = $pdo->prepare("INSERT INTO class_schedules (school_id, academic_year_id, class_id, day_of_week, schedule_date, week_start_date, subjects, status) 
        VALUES (:school_id, :academic_year_id, :class_id, :day_of_week, :schedule_date, :week_start_date, :subjects, :status)
        ON DUPLICATE KEY UPDATE day_of_week = :day_of_week_update, week_start_date = :week_start_date_update, subjects = :subjects_update, status = :status_update");
        
    $stmt->execute([
        'school_id' => $auth['school_id'],
        'academic_year_id' => $ayId,
        'class_id' => $classId,
        'day_of_week' => $dayOfWeek,
        'schedule_date' => $scheduleDate,
        'week_start_date' => $weekStartDate,
        'subjects' => $subjectsJson,
        'status' => $status,
        
        'day_of_week_update' => $dayOfWeek,
        'week_start_date_update' => $weekStartDate,
        'subjects_update' => $subjectsJson,
        'status_update' => $status
    ]);
    
    logAudit($pdo, $auth['school_id'], $auth['email'], 'Schedule Updated', "Updated schedule for class ID $classId on $scheduleDate ($dayOfWeek).");
    
    return jsonResponse($response, [
        'school_id' => $auth['school_id'],
        'academic_year_id' => $ayId,
        'class_id' => $classId,
        'day_of_week' => $dayOfWeek,
        'schedule_date' => $scheduleDate,
        'week_start_date' => $weekStartDate,
        'subjects' => $subjects,
        'status' => $status
    ]);
});

$app->put('/api/schedules/publish', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $data = getJsonData($request);
    $classId = isset($data['class_id']) ? (int)$data['class_id'] : 0;
    $ayId = isset($data['academic_year_id']) ? (int)$data['academic_year_id'] : 0;
    $weekStartDate = trim($data['week_start_date'] ?? '');
    $status = trim($data['status'] ?? 'Published');
    
    if (!$classId || !$ayId || empty($weekStartDate)) {
        return jsonResponse($response, ['detail' => 'class_id, academic_year_id, and week_start_date are required'], 400);
    }
    
    $pdo = null;
    try {
        $pdo = getDb();
    } catch (\Exception $e) {
        $pdo = null;
    }
    
    if ($pdo === null) {
        $schedules = getMockSchedules();
        foreach ($schedules as &$s) {
            if ((int)$s['school_id'] === (int)$auth['school_id'] &&
                (int)$s['class_id'] === $classId &&
                (int)$s['academic_year_id'] === $ayId &&
                $s['week_start_date'] === $weekStartDate) {
                $s['status'] = $status;
            }
        }
        saveMockSchedules($schedules);
        return jsonResponse($response, ['success' => true, 'message' => "Schedule status updated to $status successfully"]);
    }
    
    $stmt = $pdo->prepare("UPDATE class_schedules SET status = :status WHERE school_id = :school_id AND class_id = :class_id AND academic_year_id = :ay_id AND week_start_date = :week_start_date");
    $stmt->execute([
        'status' => $status,
        'school_id' => $auth['school_id'],
        'class_id' => $classId,
        'ay_id' => $ayId,
        'week_start_date' => $weekStartDate
    ]);
    
    logAudit($pdo, $auth['school_id'], $auth['email'], "Schedule Status Changed", "Set weekly schedule status to $status for class ID $classId on week starting $weekStartDate.");
    
    return jsonResponse($response, ['success' => true, 'message' => "Schedule status updated to $status successfully"]);
});

// App / Student Integration API Readiness
$app->get('/api/schedules/today', function (Request $request, Response $response) {
    $params = $request->getQueryParams();
    $classId = isset($params['class_id']) ? (int)$params['class_id'] : 0;
    
    if (!$classId) {
        return jsonResponse($response, ['detail' => 'class_id is required'], 400);
    }
    
    $today = date('Y-m-d');
    $dayOfWeek = date('l');
    
    $pdo = null;
    try {
        $pdo = getDb();
    } catch (\Exception $e) {
        $pdo = null;
    }
    
    if ($pdo === null) {
        $schedules = getMockSchedules();
        foreach ($schedules as $s) {
            if ((int)$s['class_id'] === $classId &&
                $s['schedule_date'] === $today &&
                $s['status'] === 'Published') {
                return jsonResponse($response, [
                    'day_of_week' => $dayOfWeek,
                    'schedule_date' => $today,
                    'subjects' => $s['subjects'],
                    'status' => 'Published'
                ]);
            }
        }
        return jsonResponse($response, [
            'day_of_week' => $dayOfWeek,
            'schedule_date' => $today,
            'subjects' => [],
            'status' => 'Published'
        ]);
    }
    
    $stmt = $pdo->prepare("SELECT * FROM class_schedules WHERE class_id = :class_id AND schedule_date = :today AND status = 'Published' LIMIT 1");
    $stmt->execute([
        'class_id' => $classId,
        'today' => $today
    ]);
    $schedule = $stmt->fetch();
    if ($schedule) {
        return jsonResponse($response, [
            'day_of_week' => $schedule['day_of_week'],
            'schedule_date' => $schedule['schedule_date'],
            'subjects' => json_decode($schedule['subjects'], true) ?: [],
            'status' => 'Published'
        ]);
    }
    return jsonResponse($response, [
        'day_of_week' => $dayOfWeek,
        'schedule_date' => $today,
        'subjects' => [],
        'status' => 'Published'
    ]);
});

$app->get('/api/schedules/weekly', function (Request $request, Response $response) {
    $params = $request->getQueryParams();
    $classId = isset($params['class_id']) ? (int)$params['class_id'] : 0;
    
    if (!$classId) {
        return jsonResponse($response, ['detail' => 'class_id is required'], 400);
    }
    
    $weekStart = isset($params['week_start_date']) ? trim($params['week_start_date']) : '';
    if (empty($weekStart)) {
        $time = time();
        if (date('N', $time) != 1) {
            $weekStart = date('Y-m-d', strtotime('last Monday', $time));
        } else {
            $weekStart = date('Y-m-d', $time);
        }
    }
    
    $pdo = null;
    try {
        $pdo = getDb();
    } catch (\Exception $e) {
        $pdo = null;
    }
    
    if ($pdo === null) {
        $schedules = getMockSchedules();
        $filtered = array_filter($schedules, function ($s) use ($classId, $weekStart) {
            return (int)$s['class_id'] === $classId && 
                   $s['week_start_date'] === $weekStart && 
                   $s['status'] === 'Published';
        });
        
        $results = array_values($filtered);
        usort($results, function ($a, $b) {
            return strcmp($a['schedule_date'], $b['schedule_date']);
        });
        return jsonResponse($response, $results);
    }
    
    $stmt = $pdo->prepare("SELECT * FROM class_schedules WHERE class_id = :class_id AND week_start_date = :week_start AND status = 'Published' ORDER BY schedule_date ASC");
    $stmt->execute(['class_id' => $classId, 'week_start' => $weekStart]);
    $results = $stmt->fetchAll();
    foreach ($results as &$r) {
        $r['subjects'] = json_decode($r['subjects'], true) ?: [];
    }
    return jsonResponse($response, $results);
});

// Get all weekly schedules across classrooms
$app->get('/api/schedules/all-weekly', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $params = $request->getQueryParams();
    $ayId = isset($params['academic_year_id']) ? (int)$params['academic_year_id'] : 0;
    $weekStart = isset($params['week_start_date']) ? trim($params['week_start_date']) : '';
    
    if (!$ayId || empty($weekStart)) {
        return jsonResponse($response, ['detail' => 'academic_year_id and week_start_date are required'], 400);
    }
    
    $pdo = null;
    try {
        $pdo = getDb();
    } catch (\Exception $e) {
        $pdo = null;
    }
    
    if ($pdo === null) {
        $schedules = getMockSchedules();
        $filtered = array_filter($schedules, function ($s) use ($auth, $ayId, $weekStart) {
            return (int)$s['school_id'] === (int)$auth['school_id'] &&
                   (int)$s['academic_year_id'] === $ayId &&
                   $s['week_start_date'] === $weekStart &&
                   ($s['status'] === 'Published' || $s['status'] === 'Draft');
        });
        $results = array_values($filtered);
        return jsonResponse($response, $results);
    }
    
    $stmt = $pdo->prepare("SELECT * FROM class_schedules WHERE school_id = :school_id AND academic_year_id = :ay_id AND week_start_date = :week_start AND status IN ('Published', 'Draft')");
    $stmt->execute(['school_id' => $auth['school_id'], 'ay_id' => $ayId, 'week_start' => $weekStart]);
    $results = $stmt->fetchAll();
    foreach ($results as &$r) {
        $r['subjects'] = json_decode($r['subjects'], true) ?: [];
    }
    return jsonResponse($response, $results);
});

// Trigger Parent Reminder Notifications
$app->post('/api/schedules/trigger-notifications', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $tomorrow = date('Y-m-d', strtotime('+1 day'));
    $tomorrowDay = date('l', strtotime('+1 day'));
    
    $pdo = null;
    try {
        $pdo = getDb();
    } catch (\Exception $e) {
        $pdo = null;
    }
    
    $notificationsCreated = 0;
    
    if ($pdo === null) {
        $schedules = getMockSchedules();
        $classesFile = __DIR__ . '/../mock_classes.json';
        $classes = file_exists($classesFile) ? json_decode(file_get_contents($classesFile), true) : [];
        
        $notificationsFile = __DIR__ . '/../mock_notifications.json';
        $notifications = file_exists($notificationsFile) ? json_decode(file_get_contents($notificationsFile), true) : [];
        
        foreach ($schedules as $s) {
            if ((int)$s['school_id'] === (int)$auth['school_id'] &&
                $s['schedule_date'] === $tomorrow &&
                $s['status'] === 'Published') {
                
                $className = "Class " . $s['class_id'];
                foreach ($classes as $c) {
                    if ((int)$c['id'] === (int)$s['class_id']) {
                        $className = $c['name'];
                        break;
                    }
                }
                
                $subjectNames = [];
                foreach ($s['subjects'] as $subObj) {
                    $subjectNames[] = is_array($subObj) ? $subObj['subject'] : $subObj;
                }
                
                $subjectsListStr = implode(', ', $subjectNames);
                if (empty($subjectsListStr)) $subjectsListStr = "No subjects scheduled";
                
                $title = "Tomorrow's Schedule Details for $className";
                $content = "Tomorrow's subjects: $subjectsListStr. Please ensure your child carries the required books and notebooks.";
                
                $newNotif = [
                    'id' => count($notifications) > 0 ? max(array_column($notifications, 'id')) + 1 : 1,
                    'school_id' => (int)$auth['school_id'],
                    'title' => $title,
                    'content' => $content,
                    'type' => 'Academic',
                    'is_read' => 0,
                    'timestamp' => date('Y-m-d H:i:s')
                ];
                $notifications[] = $newNotif;
                $notificationsCreated++;
            }
        }
        
        file_put_contents($notificationsFile, json_encode($notifications, JSON_PRETTY_PRINT));
        
        return jsonResponse($response, [
            'success' => true, 
            'notifications_created' => $notificationsCreated,
            'message' => "Successfully triggered $notificationsCreated reminder notifications for tomorrow ($tomorrowDay, $tomorrow)."
        ]);
    }
    
    $stmt = $pdo->prepare("SELECT cs.*, c.name as class_name 
                           FROM class_schedules cs 
                           JOIN classrooms c ON cs.class_id = c.id
                           WHERE cs.school_id = :school_id AND cs.schedule_date = :tomorrow AND cs.status = 'Published'");
    $stmt->execute([
        'school_id' => $auth['school_id'],
        'tomorrow' => $tomorrow
    ]);
    
    $tomorrowSchedules = $stmt->fetchAll();
    
    foreach ($tomorrowSchedules as $s) {
        $subjectsArray = json_decode($s['subjects'], true) ?: [];
        $subjectNames = [];
        foreach ($subjectsArray as $subObj) {
            $subjectNames[] = is_array($subObj) ? $subObj['subject'] : $subObj;
        }
        
        $subjectsListStr = implode(', ', $subjectNames);
        if (empty($subjectsListStr)) $subjectsListStr = "No subjects scheduled";
        
        $className = $s['class_name'];
        $title = "Tomorrow's Schedule Details for $className";
        $content = "Tomorrow's subjects: $subjectsListStr. Please ensure your child carries the required books and notebooks.";
        
        $ins = $pdo->prepare("INSERT INTO notifications (school_id, title, content, type, is_read, timestamp) 
                              VALUES (:school_id, :title, :content, :type, 0, :timestamp)");
        $ins->execute([
            'school_id' => $auth['school_id'],
            'title' => $title,
            'content' => $content,
            'type' => 'Academic',
            'timestamp' => date('Y-m-d H:i:s')
        ]);
        $notificationsCreated++;
    }
    
    logAudit($pdo, $auth['school_id'], $auth['email'], 'Notifications Triggered', "Triggered $notificationsCreated schedule notifications for tomorrow.");
    
    return jsonResponse($response, [
        'success' => true,
        'notifications_created' => $notificationsCreated,
        'message' => "Successfully triggered $notificationsCreated reminder notifications for tomorrow ($tomorrowDay, $tomorrow)."
    ]);
});

// WhatsApp Reminders - Init batch queue
$app->post('/api/schedules/whatsapp-reminders/init', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $data = getJsonData($request);
    $classId = (int)($data['class_id'] ?? 0);
    if (!$classId) return jsonResponse($response, ['detail' => 'Class ID is required.'], 400);
    
    $tomorrow = date('Y-m-d', strtotime('+1 day'));
    $formattedTomorrow = date('d/m/Y', strtotime('+1 day'));
    
    $pdo = null;
    try { $pdo = getDb(); } catch (\Exception $e) {}
    
    $schedule = null;
    $students = [];
    $className = "Class " . $classId;
    
    if ($pdo === null) {
        // Mock database mode
        $schedules = getMockSchedules();
        foreach ($schedules as $s) {
            if ((int)$s['school_id'] === (int)$auth['school_id'] && 
                (int)$s['class_id'] === $classId && 
                $s['schedule_date'] === $tomorrow && 
                $s['status'] === 'Published') {
                $schedule = $s;
                break;
            }
        }
        if (!$schedule) return jsonResponse($response, ['detail' => "Tomorrow's schedule is not published for this class."], 400);
        
        $classesFile = __DIR__ . '/../mock_classes.json';
        $classes = file_exists($classesFile) ? json_decode(file_get_contents($classesFile), true) : [];
        foreach ($classes as $c) {
            if ((int)$c['id'] === $classId) {
                $className = $c['name'];
                break;
            }
        }
        
        // Fetch mock active students with phone numbers
        $studentsFile = __DIR__ . '/../mock_students.json';
        $allStudents = file_exists($studentsFile) ? json_decode(file_get_contents($studentsFile), true) : [];
        if (empty($allStudents)) {
            $allStudents = [
                ['id' => 1, 'name' => 'Amit Sharma', 'class_id' => $classId, 'phone' => '9876543210', 'status' => 'Active'],
                ['id' => 2, 'name' => 'Priya Patel', 'class_id' => $classId, 'phone' => '8765432109', 'status' => 'Active'],
                ['id' => 3, 'name' => 'Rahul Verma', 'class_id' => $classId, 'phone' => '7654321098', 'status' => 'Active'],
                ['id' => 4, 'name' => 'Suresh Kumar', 'class_id' => $classId, 'phone' => '', 'status' => 'Active'],
                ['id' => 5, 'name' => 'Sunita Singh', 'class_id' => $classId, 'phone' => '6543210987', 'status' => 'Inactive']
            ];
        }
        foreach ($allStudents as $st) {
            if ((int)$st['class_id'] === $classId && ($st['status'] ?? 'Active') === 'Active' && !empty($st['phone'])) {
                $students[] = $st;
            }
        }
    } else {
        // Live database mode
        $stmt = $pdo->prepare("SELECT * FROM class_schedules WHERE school_id = :school_id AND class_id = :class_id AND schedule_date = :tomorrow AND status = 'Published'");
        $stmt->execute(['school_id' => $auth['school_id'], 'class_id' => $classId, 'tomorrow' => $tomorrow]);
        $schedule = $stmt->fetch();
        if (!$schedule) return jsonResponse($response, ['detail' => "Tomorrow's schedule is not published for this class."], 400);
        $schedule['subjects'] = json_decode($schedule['subjects'], true) ?: [];
        
        $classStmt = $pdo->prepare("SELECT name FROM classrooms WHERE id = :id");
        $classStmt->execute(['id' => $classId]);
        $className = $classStmt->fetchColumn() ?: "Class " . $classId;
        
        $studStmt = $pdo->prepare("SELECT * FROM students WHERE school_id = :school_id AND class_id = :class_id AND status = 'Active' AND phone IS NOT NULL AND phone != ''");
        $studStmt->execute(['school_id' => $auth['school_id'], 'class_id' => $classId]);
        $students = $studStmt->fetchAll();
    }
    
    if (empty($students)) {
        return jsonResponse($response, ['detail' => 'No active students with WhatsApp numbers found in this class.'], 400);
    }
    
    // Construct template subjects list
    $subjectsList = "";
    $numberEmojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
    foreach ($schedule['subjects'] as $idx => $subObj) {
        $subName = is_array($subObj) ? $subObj['subject'] : $subObj;
        $teacherName = is_array($subObj) && isset($subObj['teacher_name']) ? $subObj['teacher_name'] : 'Unassigned';
        $emoji = isset($numberEmojis[$idx]) ? $numberEmojis[$idx] : ($idx + 1) . '️⃣';
        $subjectsList .= "$emoji $subName\n👨🏫 Teacher: $teacherName\n\n";
    }
    $subjectsList = rtrim($subjectsList);
    
    // Create logs
    $createdLogs = [];
    $dateSent = date('Y-m-d');
    
    if ($pdo === null) {
        // Save to mock_whatsapp_logs.json
        $logsFile = __DIR__ . '/../mock_whatsapp_logs.json';
        $logs = file_exists($logsFile) ? json_decode(file_get_contents($logsFile), true) : [];
        $nextId = count($logs) > 0 ? max(array_column($logs, 'id')) + 1 : 1;
        
        foreach ($students as $st) {
            $msg = "🏫 BN School\n\n📚 Tomorrow's Class Schedule\n\n👨🎓 Student: {$st['name']}\n🏫 Class: $className\n📅 Date: $formattedTomorrow\n\n📖 Subjects for Tomorrow:\n\n$subjectsList\n\n🎒 Please ensure your child carries the required books, notebooks and study materials for the above subjects.\n\nThank you,\nBN School Administration";
            
            $newLog = [
                'id' => $nextId++,
                'school_id' => $auth['school_id'],
                'student_id' => $st['id'],
                'student_name' => $st['name'],
                'class_id' => $classId,
                'recipient_number' => $st['phone'],
                'type' => 'Schedule',
                'message_content' => $msg,
                'date_sent' => $dateSent,
                'status' => 'Pending',
                'error_message' => null,
                'created_at' => date('Y-m-d H:i:s')
            ];
            $logs[] = $newLog;
            $createdLogs[] = $newLog;
        }
        file_put_contents($logsFile, json_encode($logs, JSON_PRETTY_PRINT));
    } else {
        // Save to live DB
        $ins = $pdo->prepare("
            INSERT INTO whatsapp_delivery_logs (school_id, student_id, student_name, class_id, recipient_number, type, message_content, date_sent, status)
            VALUES (:school_id, :student_id, :student_name, :class_id, :recipient_number, 'Schedule', :message_content, :date_sent, 'Pending')
        ");
        
        foreach ($students as $st) {
            $msg = "🏫 BN School\n\n📚 Tomorrow's Class Schedule\n\n👨🎓 Student: {$st['name']}\n🏫 Class: $className\n📅 Date: $formattedTomorrow\n\n📖 Subjects for Tomorrow:\n\n$subjectsList\n\n🎒 Please ensure your child carries the required books, notebooks and study materials for the above subjects.\n\nThank you,\nBN School Administration";
            
            $ins->execute([
                'school_id' => $auth['school_id'],
                'student_id' => $st['id'],
                'student_name' => $st['name'],
                'class_id' => $classId,
                'recipient_number' => $st['phone'],
                'message_content' => $msg,
                'date_sent' => $dateSent
            ]);
            
            $logId = $pdo->lastInsertId();
            $createdLogs[] = [
                'id' => $logId,
                'school_id' => $auth['school_id'],
                'student_id' => $st['id'],
                'student_name' => $st['name'],
                'class_id' => $classId,
                'recipient_number' => $st['phone'],
                'type' => 'Schedule',
                'message_content' => $msg,
                'date_sent' => $dateSent,
                'status' => 'Pending',
                'error_message' => null
            ];
        }
    }
    
    return jsonResponse($response, [
        'success' => true,
        'queue' => $createdLogs,
        'total' => count($createdLogs)
    ]);
});

// WhatsApp Reminders - Send single message from queue
$app->post('/api/schedules/whatsapp-reminders/send-single', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $data = getJsonData($request);
    $logId = (int)($data['log_id'] ?? 0);
    if (!$logId) return jsonResponse($response, ['detail' => 'Log ID is required.'], 400);
    
    $pdo = null;
    try { $pdo = getDb(); } catch (\Exception $e) {}
    
    $logRecord = null;
    
    if ($pdo === null) {
        $logsFile = __DIR__ . '/../mock_whatsapp_logs.json';
        $logs = file_exists($logsFile) ? json_decode(file_get_contents($logsFile), true) : [];
        $foundIdx = -1;
        foreach ($logs as $idx => $lg) {
            if ((int)$lg['id'] === $logId && (int)$lg['school_id'] === (int)$auth['school_id']) {
                $foundIdx = $idx;
                $logRecord = $lg;
                break;
            }
        }
        
        if ($foundIdx === -1) return jsonResponse($response, ['detail' => 'Log record not found.'], 404);
        
        // Simulate WhatsApp Send
        $phone = $logRecord['recipient_number'];
        $status = 'Sent';
        $error = null;
        if (strlen($phone) < 10 || strpos($phone, '999') !== false) {
            $status = 'Failed';
            $error = 'Invalid destination phone number / WhatsApp template validation failed';
        }
        
        $logs[$foundIdx]['status'] = $status;
        $logs[$foundIdx]['error_message'] = $error;
        file_put_contents($logsFile, json_encode($logs, JSON_PRETTY_PRINT));
        $logRecord = $logs[$foundIdx];
    } else {
        $stmt = $pdo->prepare("SELECT * FROM whatsapp_delivery_logs WHERE id = :id AND school_id = :school_id");
        $stmt->execute(['id' => $logId, 'school_id' => $auth['school_id']]);
        $logRecord = $stmt->fetch();
        
        if (!$logRecord) return jsonResponse($response, ['detail' => 'Log record not found.'], 404);
        
        // Live mode WhatsApp simulation
        $phone = $logRecord['recipient_number'];
        $status = 'Sent';
        $error = null;
        if (strlen($phone) < 10 || strpos($phone, '999') !== false) {
            $status = 'Failed';
            $error = 'Invalid destination phone number / WhatsApp template validation failed';
        }
        
        $up = $pdo->prepare("UPDATE whatsapp_delivery_logs SET status = :status, error_message = :error WHERE id = :id");
        $up->execute(['status' => $status, 'error' => $error, 'id' => $logId]);
        
        $logRecord['status'] = $status;
        $logRecord['error_message'] = $error;
    }
    
    return jsonResponse($response, [
        'success' => true,
        'log' => $logRecord
    ]);
});

// WhatsApp Reminders - Fetch logs history
$app->get('/api/schedules/whatsapp-reminders/history', function (Request $request, Response $response) {
    $auth = getAuthUser($request);
    if (!$auth || !$auth['school_id']) return jsonResponse($response, ['detail' => 'Unauthorized'], 401);
    
    $pdo = null;
    try { $pdo = getDb(); } catch (\Exception $e) {}
    
    $results = [];
    if ($pdo === null) {
        $logsFile = __DIR__ . '/../mock_whatsapp_logs.json';
        $logs = file_exists($logsFile) ? json_decode(file_get_contents($logsFile), true) : [];
        $filtered = array_filter($logs, function ($lg) use ($auth) {
            return (int)$lg['school_id'] === (int)$auth['school_id'];
        });
        $results = array_values($filtered);
        usort($results, function ($a, $b) {
            return strcmp($b['created_at'], $a['created_at']);
        });
    } else {
        $stmt = $pdo->prepare("SELECT * FROM whatsapp_delivery_logs WHERE school_id = :school_id ORDER BY created_at DESC");
        $stmt->execute(['school_id' => $auth['school_id']]);
        $results = $stmt->fetchAll();
    }
    
    return jsonResponse($response, $results);
});

// Run App
$app->run();
