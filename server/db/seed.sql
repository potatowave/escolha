DELETE FROM alternatives_objectives;
DELETE FROM alternatives;
DELETE FROM objectives;
DELETE FROM cases;


/* Users */
INSERT INTO users VALUES(1, 'mail@mail.com', 'Bob');

/* Cases */
INSERT INTO cases VALUES(1, 1, 'Jobs', '2016-12-17', NULL);
INSERT INTO cases VALUES(2, 1, 'Cars', '2016-12-17', NULL);

/* Criterias */
INSERT INTO objectives VALUES(1, 1, 'Cost', 'Salary', 'Salary + benefits',       false,  1, 'Money',   '$',  null, '2016-12-17', NULL);
INSERT INTO objectives VALUES(2, 1, 'Location', 'Distance', 'Distance from home',  true,   2, 'Meters',  null, 'm',  '2016-12-17', NULL);

INSERT INTO objectives VALUES(3, 2, 'Cost', 'Price',  'Some stuff',   true,   1, 'Money',   '$',  null, '2016-12-17', NULL);
INSERT INTO objectives VALUES(4, 2, 'Cost', 'Mileage', 'Used car',     false,  2, 'Meters',  null, 'm',  '2016-12-17', NULL);

/* Alternatives */
INSERT INTO alternatives VALUES(1, 1, 'Facebook',   1);
INSERT INTO alternatives VALUES(2, 1, 'Google',     2);
INSERT INTO alternatives VALUES(3, 1, 'LightHouse', 3);

INSERT INTO alternatives VALUES(4, 2, 'Ferrari',    1);
INSERT INTO alternatives VALUES(5, 2, 'Maserati',    2);
INSERT INTO alternatives VALUES(6, 2, 'Lamborghini', 3);

/* Alternatives_objectives */

/* JOBS */
  /* For Salary */
  INSERT INTO alternatives_objectives VALUES(1, 1, 120000);
  INSERT INTO alternatives_objectives VALUES(2, 1, 150000);
  INSERT INTO alternatives_objectives VALUES(3, 1, 95000);

  /* For Location */
  INSERT INTO alternatives_objectives VALUES(1, 2, 10);
  INSERT INTO alternatives_objectives VALUES(2, 2, 25);
  INSERT INTO alternatives_objectives VALUES(3, 2, 5);

/* CARS */
  /* For Price */
  INSERT INTO alternatives_objectives VALUES(4, 3, 550000);
  INSERT INTO alternatives_objectives VALUES(5, 3, 420000);
  INSERT INTO alternatives_objectives VALUES(6, 3, 650000);

  /* For Mileage */
  INSERT INTO alternatives_objectives VALUES(4, 4, 10);
  INSERT INTO alternatives_objectives VALUES(5, 4, 25);
  INSERT INTO alternatives_objectives VALUES(6, 4, 5);
