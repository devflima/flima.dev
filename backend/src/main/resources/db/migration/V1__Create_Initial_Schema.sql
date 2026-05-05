-- Configurações
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TYPE section_type_enum AS ENUM ('HOME', 'PROJECTS', 'EXPERIENCE', 'EDUCATION', 'CONTACT');
CREATE TYPE education_type_enum AS ENUM ('DEGREE', 'CERTIFICATION');
CREATE TYPE status_message_enum AS ENUM ('REPLIED', 'UNREAD', 'READ');
CREATE TYPE stack_type_enum AS ENUM ('LANGUAGES', 'DATABASES', 'INFRASTRUCTURE', 'MESSAGING');
CREATE TYPE role_enum AS ENUM ('OWNER');

-- Tabelas
CREATE TABLE contents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_type section_type_enum NOT NULL,
    title VARCHAR(255) NOT NULL CHECK (trim(title) <> ''),
    subtitle VARCHAR(255) NOT NULL CHECK (trim(title) <> '')
);

CREATE TABLE educations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    education_type education_type_enum NOT NULL,
    degree VARCHAR(255) NOT NULL CHECK (trim(degree) <> ''),
    title VARCHAR(255) NOT NULL CHECK (trim(title) <> ''),
    institution VARCHAR(255) NOT NULL CHECK (trim(institution) <> ''),
    period VARCHAR(100) NOT NULL CHECK (trim(period) <> ''),
    specialization VARCHAR(255) NOT NULL CHECK (trim(specialization) <> '')
);

CREATE TABLE education_skills (
    education_id UUID NOT NULL,
    skill VARCHAR(150) NOT NULL CHECK (trim(skill) <> ''),

    PRIMARY KEY (education_id, skill),

    CONSTRAINT fk_education_skills
        FOREIGN KEY (education_id)
            REFERENCES educations (id)
            ON DELETE CASCADE
);

CREATE TABLE education_architectures (
    education_id UUID NOT NULL,
    architecture VARCHAR(150) NOT NULL CHECK (trim(architecture) <> ''),

    PRIMARY KEY (education_id, architecture),

    CONSTRAINT fk_education_architectures
        FOREIGN KEY (education_id)
            REFERENCES educations (id)
            ON DELETE CASCADE
);

CREATE TABLE experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL CHECK (trim(title) <> ''),
    company VARCHAR(255) NOT NULL CHECK (trim(company) <> ''),
    period VARCHAR(100) NOT NULL CHECK (trim(period) <> ''),
    icon VARCHAR(50) NOT NULL CHECK (trim(icon) <> '')
);

CREATE TABLE experience_bullets (
    experience_id UUID NOT NULL,
    bullet VARCHAR(150) NOT NULL CHECK (trim(bullet) <> ''),

    PRIMARY KEY (experience_id, bullet),

    CONSTRAINT fk_experience_bullets
        FOREIGN KEY (experience_id)
            REFERENCES experiences (id)
            ON DELETE CASCADE
);

CREATE TABLE experience_technologies (
    experience_id UUID NOT NULL,
    technology VARCHAR(150) NOT NULL CHECK (trim(technology) <> ''),

    PRIMARY KEY (experience_id, technology),

    CONSTRAINT fk_experience_technologies
        FOREIGN KEY (experience_id)
            REFERENCES experiences (id)
            ON DELETE CASCADE
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(150) NOT NULL CHECK (trim(username) <> ''),
    email VARCHAR(255) NOT NULL CHECK (trim(email) <> '') CHECK (position('@' in email) > 1),
    subject VARCHAR(255) NOT NULL CHECK (trim(subject) <> ''),
    message TEXT NOT NULL CHECK (trim(message) <> ''),
    timestamp TIMESTAMP NOT NULL,
    status_message status_message_enum NOT NULL
);

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL CHECK (trim(title) <> ''),
    subtitle VARCHAR(255) NOT NULL CHECK (trim(subtitle) <> ''),
    description VARCHAR(255) NOT NULL CHECK (trim(description) <> ''),
    codeSnippet VARCHAR(200),
    icon VARCHAR(50)
);

CREATE TABLE project_technologies (
    project_id UUID NOT NULL,
    technology VARCHAR(150) NOT NULL CHECK (trim(technology) <> ''),

    PRIMARY KEY (project_id, technology),

    CONSTRAINT fk_project_technologies
        FOREIGN KEY (project_id)
            REFERENCES projects (id)
            ON DELETE CASCADE
);

CREATE TABLE stacks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stack_type stack_type_enum NOT NULL
);

CREATE TABLE stack_technologies (
    stack_id UUID NOT NULL,
    technology VARCHAR(150) NOT NULL CHECK (trim(technology) <> ''),

    PRIMARY KEY (stack_id, technology),

    CONSTRAINT fk_stack_technologies
      FOREIGN KEY (stack_id)
          REFERENCES stacks (id)
          ON DELETE CASCADE
);

CREATE TABLE stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    yearsExperience VARCHAR(10) NOT NULL CHECK (trim(yearsExperience) <> ''),
    systemDeployed VARCHAR(10) NOT NULL CHECK (trim(systemDeployed) <> ''),
    uptimeSLA VARCHAR(15) NOT NULL CHECK (trim(uptimeSLA) <> ''),
    commitsLogged VARCHAR(10) NOT NULL CHECK (trim(commitsLogged) <> ''),
    status VARCHAR(10) NOT NULL CHECK (trim(status) <> ''),
    objective VARCHAR(10) NOT NULL CHECK (trim(objective) <> '')
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(15) UNIQUE NOT NULL CHECK (trim(username) <> ''),
    name VARCHAR(15) NOT NULL CHECK (trim(name) <> ''),
    last_name VARCHAR(15) NOT NULL CHECK (trim(last_name) <> ''),
    email VARCHAR(255) UNIQUE NOT NULL CHECK (trim(email) <> '') CHECK (position('@' in email) > 1),
    role role_enum NOT NULL,
    password VARCHAR(255) NOT NULL CHECK (trim(password) <> '')
);

-- Índices
CREATE INDEX idx_contents_section_type
    ON contents (section_type);

CREATE INDEX idx_educations_education_type
    ON educations (education_type);

CREATE INDEX idx_education_skills_education_id
    ON education_skills (education_id);

CREATE INDEX idx_education_architectures_education_id
    ON education_architectures (education_id);

CREATE INDEX idx_experience_bullets_education_id
    ON experience_bullets (experience_id);

CREATE INDEX idx_experience_technologies_education_id
    ON experience_technologies (experience_id);

CREATE INDEX idx_messages_status_message
    ON messages (status_message);

CREATE INDEX idx_messages_timestamp
    ON messages (timestamp);

CREATE INDEX idx_stacks_stack_type
    ON stacks (stack_type);

CREATE INDEX idx_users_role
    ON users (role);