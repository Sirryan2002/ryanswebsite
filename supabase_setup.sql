CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  website VARCHAR(255),
  github VARCHAR(255),
  image VARCHAR(255),
  category VARCHAR(50) NOT NULL
);

CREATE TABLE blogposts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  project_id INTEGER REFERENCES projects(id)
);
