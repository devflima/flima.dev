-- Increase Project fields size to accommodate detailed descriptions and code snippets
ALTER TABLE projects ALTER COLUMN description TYPE TEXT;
ALTER TABLE projects ALTER COLUMN codeSnippet TYPE TEXT;
ALTER TABLE projects ALTER COLUMN subtitle TYPE TEXT;

-- Also increase contents subtitle as it often contains descriptive text
ALTER TABLE contents ALTER COLUMN subtitle TYPE TEXT;

-- Increase Education and Experience fields for better flexibility
ALTER TABLE educations ALTER COLUMN specialization TYPE TEXT;
ALTER TABLE experience_bullets ALTER COLUMN bullet TYPE TEXT;

