-- Flyway migration: Remove duplicate skills and add unique constraint on name

-- Remove duplicates, keep the lowest id for each name
DELETE FROM skill
WHERE id NOT IN (
  SELECT min_id FROM (
    SELECT MIN(id) as min_id FROM skill GROUP BY name
  ) AS keep_ids
);

-- Add unique constraint to prevent future duplicates
ALTER TABLE skill ADD CONSTRAINT unique_skill_name UNIQUE (name);
