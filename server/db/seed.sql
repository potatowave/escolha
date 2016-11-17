/* Users */
INSERT INTO users VALUES(1, 'mail@mail.com', 'Bob');

/* Cases */
INSERT INTO cases VALUES(1, 1, 'Jobs', '2016-12-17', NULL);
INSERT INTO cases VALUES(2, 1, 'Cars', '2016-12-17', NULL);

/* Criterias */
INSERT INTO criterias VALUES(1, 'Salary',   1, 'Salary + benefits',   false,  1, NULL, 'Money',   '$',  null, '2016-12-17', NULL);
INSERT INTO criterias VALUES(2, 'Location', 1, 'Distance from home',  true,   2, NULL, 'Meters',  null, 'm',  '2016-12-17', NULL);

INSERT INTO criterias VALUES(3, 'Price',   2, 'Some stuff',   true,   1, NULL, 'Money',   '$',  null, '2016-12-17', NULL);
INSERT INTO criterias VALUES(4, 'Mileage', 2, 'Used car',     false,  2, NULL, 'Meters',  null, 'm',  '2016-12-17', NULL);

/* Alternatives */
INSERT INTO alternatives VALUES(1, 'Facebook',  1, 1);
INSERT INTO alternatives VALUES(2, 'Google',    1, 2);
INSERT INTO alternatives VALUES(3, 'LightHouse',1, 3);

INSERT INTO alternatives VALUES(4, 'Ferrari',     2, 1);
INSERT INTO alternatives VALUES(5, 'Maserati',    2, 2);
INSERT INTO alternatives VALUES(6, 'Lamborghini', 2, 3);

/* Alternatives_Criterias */

/* JOBS */
  /* For Salary */
  INSERT INTO alternatives_criterias VALUES(1, 1, 120000);
  INSERT INTO alternatives_criterias VALUES(2, 1, 150000);
  INSERT INTO alternatives_criterias VALUES(3, 1, 95000);

  /* For Location */
  INSERT INTO alternatives_criterias VALUES(1, 2, 10);
  INSERT INTO alternatives_criterias VALUES(2, 2, 25);
  INSERT INTO alternatives_criterias VALUES(3, 2, 5);

/* CARS */
  /* For Price */
  INSERT INTO alternatives_criterias VALUES(4, 3, 550000);
  INSERT INTO alternatives_criterias VALUES(5, 3, 420000);
  INSERT INTO alternatives_criterias VALUES(6, 3, 650000);

  /* For Mileage */
  INSERT INTO alternatives_criterias VALUES(4, 4, 10);
  INSERT INTO alternatives_criterias VALUES(5, 4, 25);
  INSERT INTO alternatives_criterias VALUES(6, 4, 5);
