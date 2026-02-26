-- Flyway migration: Add category and proficiency to skill table, and update existing rows
ALTER TABLE skill ADD COLUMN IF NOT EXISTS category VARCHAR(32);
ALTER TABLE skill ADD COLUMN IF NOT EXISTS proficiency INTEGER;

-- Set default values for existing skills if needed
UPDATE skill SET category = 'Languages' WHERE category IS NULL;
UPDATE skill SET proficiency = 80 WHERE proficiency IS NULL;
