
-- Ensure contact_message table is dropped before creation (for dev resets)
DROP TABLE IF EXISTS contact_message;

CREATE TABLE IF NOT EXISTS admin_user (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS education (
    id SERIAL PRIMARY KEY,
    school VARCHAR(255),
    degree VARCHAR(255),
    field VARCHAR(255),
    start_year INT,
    end_year INT
);

CREATE TABLE IF NOT EXISTS work_experience (
    id SERIAL PRIMARY KEY,
    company VARCHAR(255),
    position VARCHAR(255),
    start_date DATE,
    end_date DATE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS skill (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    level VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS feedback (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    comment TEXT,
    created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonial (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    content TEXT,
    created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS message (
    id SERIAL PRIMARY KEY,
    sender VARCHAR(255),
    content TEXT,
    created_at TIMESTAMP
);

-- Contact Message Table (merged)
CREATE TABLE IF NOT EXISTS contact_message (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS hobby (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT
);

CREATE TABLE IF NOT EXISTS contact_info (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50),
    value VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS resume (
    id SERIAL PRIMARY KEY,
    url VARCHAR(255)
);
