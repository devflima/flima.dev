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
    title VARCHAR(255) NOT NULL CHECK (length(trim(title)) > 0),
    subtitle VARCHAR(255) NOT NULL CHECK (length(trim(subtitle)) > 0)
);

CREATE TABLE educations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    education_type education_type_enum NOT NULL,
    degree VARCHAR(255) NOT NULL CHECK (length(trim(degree)) > 0),
    title VARCHAR(255) NOT NULL CHECK (length(trim(title)) > 0),
    institution VARCHAR(255) NOT NULL CHECK (length(trim(institution)) > 0),
    period VARCHAR(100) NOT NULL CHECK (length(trim(period)) > 0),
    specialization VARCHAR(255) NOT NULL CHECK (length(trim(specialization)) > 0)
);

CREATE TABLE education_skills (
    education_id UUID NOT NULL,
    skill VARCHAR(150) NOT NULL CHECK (length(trim(skill)) > 0),

    PRIMARY KEY (education_id, skill),

    CONSTRAINT fk_education_skills
        FOREIGN KEY (education_id)
            REFERENCES educations (id)
            ON DELETE CASCADE
);

CREATE TABLE education_architectures (
    education_id UUID NOT NULL,
    architecture VARCHAR(150) NOT NULL CHECK (length(trim(architecture)) > 0),

    PRIMARY KEY (education_id, architecture),

    CONSTRAINT fk_education_architectures
        FOREIGN KEY (education_id)
            REFERENCES educations (id)
            ON DELETE CASCADE
);

CREATE TABLE experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL CHECK (length(trim(title)) > 0),
    company VARCHAR(255) NOT NULL CHECK (length(trim(company)) > 0),
    period VARCHAR(100) NOT NULL CHECK (length(trim(period)) > 0),
    icon VARCHAR(50) NOT NULL CHECK (length(trim(icon)) > 0)
);

CREATE TABLE experience_bullets (
    experience_id UUID NOT NULL,
    bullet VARCHAR(150) NOT NULL CHECK (length(trim(bullet)) > 0),

    PRIMARY KEY (experience_id, bullet),

    CONSTRAINT fk_experience_bullets
        FOREIGN KEY (experience_id)
            REFERENCES experiences (id)
            ON DELETE CASCADE
);

CREATE TABLE experience_technologies (
    experience_id UUID NOT NULL,
    technology VARCHAR(150) NOT NULL CHECK (length(trim(technology)) > 0),

    PRIMARY KEY (experience_id, technology),

    CONSTRAINT fk_experience_technologies
        FOREIGN KEY (experience_id)
            REFERENCES experiences (id)
            ON DELETE CASCADE
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(150) NOT NULL CHECK (length(trim(username)) > 0),
    email VARCHAR(255) NOT NULL CHECK (length(trim(email)) > 0) CHECK (position('@' in email) > 1),
    subject VARCHAR(255) NOT NULL CHECK (length(trim(subject)) > 0),
    message TEXT NOT NULL CHECK (length(trim(message)) > 0),
    timestamp TIMESTAMP NOT NULL,
    status_message status_message_enum NOT NULL
);

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL CHECK (length(trim(title)) > 0),
    subtitle VARCHAR(255) NOT NULL CHECK (length(trim(subtitle)) > 0),
    description VARCHAR(255) NOT NULL CHECK (length(trim(description)) > 0),
    codeSnippet VARCHAR(200),
    icon VARCHAR(50)
);

CREATE TABLE project_technologies (
    project_id UUID NOT NULL,
    technology VARCHAR(150) NOT NULL CHECK (length(trim(technology)) > 0),

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
    technology VARCHAR(150) NOT NULL CHECK (length(trim(technology)) > 0),

    PRIMARY KEY (stack_id, technology),

    CONSTRAINT fk_stack_technologies
      FOREIGN KEY (stack_id)
          REFERENCES stacks (id)
          ON DELETE CASCADE
);

CREATE TABLE stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    yearsExperience VARCHAR(10) NOT NULL CHECK (length(trim(yearsExperience)) > 0),
    systemDeployed VARCHAR(10) NOT NULL CHECK (length(trim(systemDeployed)) > 0),
    uptimeSLA VARCHAR(15) NOT NULL CHECK (length(trim(uptimeSLA)) > 0),
    commitsLogged VARCHAR(10) NOT NULL CHECK (length(trim(commitsLogged)) > 0),
    status VARCHAR(10) NOT NULL CHECK (length(trim(status)) > 0),
    objective VARCHAR(10) NOT NULL CHECK (length(trim(objective)) > 0)
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(15) UNIQUE NOT NULL CHECK (length(trim(username)) > 0),
    name VARCHAR(15) NOT NULL CHECK (length(trim(name)) > 0),
    last_name VARCHAR(15) NOT NULL CHECK (length(trim(last_name)) > 0),
    email VARCHAR(255) UNIQUE NOT NULL CHECK (length(trim(email)) > 0) CHECK (position('@' in email) > 1),
    role role_enum NOT NULL,
    password VARCHAR(255) NOT NULL CHECK (length(trim(password)) > 0)
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