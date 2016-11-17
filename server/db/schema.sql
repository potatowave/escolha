DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS cases;
DROP TABLE IF EXISTS criteria;
DROP TABLE IF EXISTS alternatives;
DROP TABLE IF EXISTS alternatives_criterias;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255),
  name VARCHAR(255)
);

CREATE TABLE cases (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255),
  name VARCHAR(255),
  create_at DATE,
  update_at DATE
);

CREATE TABLE criterias (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(75),
  case_id INTEGER REFERENCES cases(id) ON DELETE CASCADE,
  description VARCHAR(255),
  low BOOLEAN,
  parent INTEGER REFERENCES criterias(id),
  unit_name VARCHAR(75),
  unit_prefix VARCHAR(75),
  unit_suffix VARCHAR(75),
  create_at DATE,
  update_at DATE
);


CREATE TABLE alternatives (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(75),
  case_id INTEGER REFERENCES cases(id) ON DELETE CASCADE,
  order INTEGER
);

CREATE TABLE alternatives_criterias (
  alternative_id INTEGER REFERENCES alternatives(id) ON DELETE CASCADE,
  criteria_id INTEGER REFERENCES criterias(id) ON DELETE CASCADE,
  value REAL
);