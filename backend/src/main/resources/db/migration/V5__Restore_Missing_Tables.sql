-- Ensure tables exist that were missing
-- We use DROP IF EXISTS to ensure clean slate for missing tables if they existed partially
DROP TABLE IF EXISTS project CASCADE;
DROP TABLE IF EXISTS admin_user CASCADE;
DROP TABLE IF EXISTS project_tech_stack CASCADE;
DROP TABLE IF EXISTS skill CASCADE;

CREATE TABLE IF NOT EXISTS admin_user (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS project (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    project_link VARCHAR(255),
    website_link VARCHAR(255),
    image_url TEXT,
    archived BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS project_tech_stack (
    project_id BIGINT REFERENCES project(id),
    tech_stack VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS skill (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE
);
