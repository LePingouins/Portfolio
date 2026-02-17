-- Work Experience Table Update for V1 (Since we reset DB, we can just fix schema here or add new migration)
-- Adding a robust migration since V1 might have created the old table.
DROP TABLE IF EXISTS work_experience CASCADE;
DROP TABLE IF EXISTS work_experience_responsibilities CASCADE;

CREATE TABLE IF NOT EXISTS work_experience (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    company VARCHAR(255),
    period VARCHAR(255),
    location VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS work_experience_responsibilities (
    work_experience_id BIGINT REFERENCES work_experience(id),
    responsibility TEXT
);
