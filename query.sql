CREATE TABLE "talents"(
    "id" VARCHAR(255) PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "phone" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "photo" VARCHAR(255) DEFAULT 'photo.jpg',
    "jobdesk" VARCHAR(255),
    "domicile" VARCHAR(255),
    "jobtype" VARCHAR(255),
    "description" TEXT
);

CREATE TABLE "recruiters"(
    "id" VARCHAR(255) PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "company_name" VARCHAR(255) NOT NULL,
    "jobdesk" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "photo" VARCHAR(255) DEFAULT 'photo.jpg',
    "company_field" VARCHAR(255),
    "domicile" VARCHAR(255),
    "description" TEXT
);

CREATE TABLE "skills"(
    "id" VARCHAR(255) PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE "hires"(
    "id" VARCHAR(255) PRIMARY KEY,
    "id_talent" VARCHAR(255) NOT NULL,
    "id_recruiter" VARCHAR(255) NOT NULL,
    "reason" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT fk_talent_id
        FOREIGN KEY (id_talent)
        REFERENCES talents(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_recruiter_id
        FOREIGN KEY (id_recruiter)
        REFERENCES recruiters(id)
        ON DELETE CASCADE
);

CREATE TABLE "portfolios"(
    "id" VARCHAR(255) PRIMARY KEY,
    "id_talent" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "link" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "photo" VARCHAR(255) NOT NULL,
    CONSTRAINT fk_talent_id
        FOREIGN KEY (id_talent)
        REFERENCES talents(id)
        ON DELETE CASCADE
);

CREATE TABLE "talent_skills"(
    "id" VARCHAR(255) PRIMARY KEY,
    "id_skill" VARCHAR(255) NOT NULL,
    "id_talent" VARCHAR(255) NOT NULL,
    CONSTRAINT fk_talent_id
        FOREIGN KEY (id_talent)
        REFERENCES talents(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_skill_id
        FOREIGN KEY (id_skill)
        REFERENCES skills(id)
        ON DELETE CASCADE
);

CREATE TABLE "experiences"(
    "id" VARCHAR(255) PRIMARY KEY,
    "id_talent" VARCHAR(255) NOT NULL,
    "jobdesk" VARCHAR(255) NOT NULL,
    "company_name" VARCHAR(255) NOT NULL,
    "date_start" TIMESTAMP NOT NULL,
    "date_end" TIMESTAMP DEFAULT NULL,
    "description" TEXT NOT NULL,
    "photo" VARCHAR(255) NOT NULL,
    CONSTRAINT fk_talent_id
        FOREIGN KEY (id_talent)
        REFERENCES talents(id)
        ON DELETE CASCADE
);
