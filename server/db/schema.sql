DROP TABLE IF EXISTS alternatives_objectives;
DROP TABLE IF EXISTS objectives;
DROP TABLE IF EXISTS alternatives;
DROP TABLE IF EXISTS cases;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255),
  name VARCHAR(255)
);

CREATE TABLE cases (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255),
  description VARCHAR(255),
  create_at DATE,
  update_at DATE
);

CREATE TABLE objectives (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(75),
  sub_name VARCHAR(75),
  case_id INTEGER REFERENCES cases(id) ON DELETE CASCADE,
  evaluation_objective VARCHAR(255),
  low_is_better BOOLEAN,
  "order" INTEGER,
  unit_name VARCHAR(75),
  unit_prefix VARCHAR(75),
  unit_suffix VARCHAR(75),
  create_at DATE,
  update_at DATE
);


CREATE TABLE alternatives (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(75),
  image_url TEXT,
  case_id INTEGER REFERENCES cases(id) ON DELETE CASCADE,
  "order" INTEGER
);

CREATE TABLE alternatives_objectives (
  alternative_id INTEGER REFERENCES alternatives(id) ON DELETE CASCADE,
  objective_id INTEGER REFERENCES objectives(id) ON DELETE CASCADE,
  value REAL
);
