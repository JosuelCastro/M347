CREATE TABLE IF NOT EXISTS "user" (
  id INT NOT NULL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  mail VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  profilepictureurl VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS role (
  id INT NOT NULL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS  authority (
  id INT NOT NULL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS  role_authority (
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (authority_id) REFERENCES authority(id)
);

CREATE TABLE IF NOT EXISTS  category (
  id INT NOT NULL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS item (
  id INT NOT NULL PRIMARY KEY,
  user_id INT NOT NULL,
  category_id INT NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  description TEXT,
  FOREIGN KEY (user_id) REFERENCES "user"(id),
  FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE IF NOT EXISTS  shopping_cart (
  id INT NOT NULL PRIMARY KEY,
  user_id INT NOT NULL,
  item_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES "user"(id),
  FOREIGN KEY (item_id) REFERENCES item(id)
);

CREATE TABLE IF NOT EXISTS  user_profile (
  id INT NOT NULL PRIMARY KEY,
  profile_picture_url VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  address VARCHAR(255) NOT NULL,
  birth_date DATE NOT NULL,
  created_date DATE,
  last_modified_date DATE,
  FOREIGN KEY (user_id) REFERENCES "user"(id)
);

--USERS
insert into users (id, email,first_name,last_name, password)
values ('ba804cb9-fa14-42a5-afaf-be488742fc54', 'admin@example.com', 'James','Bond', '1234' ),
('0d8fa44c-54fd-4cd0-ace9-2a7da57992de', 'user@example.com', 'Tyler','Durden', '1234')
 ON CONFLICT DO NOTHING;


--ROLES
INSERT INTO role(id, name)
VALUES ('d29e709c-0ff1-4f4c-a7ef-09f656c390f1', 'DEFAULT'),
('ab505c92-7280-49fd-a7de-258e618df074', 'USER_MODIFY'),
('c6aee32d-8c35-4481-8b3e-a876a39b0c02', 'USER_DELETE')
ON CONFLICT DO NOTHING;

--AUTHORITIES
INSERT INTO authority(id, name)
VALUES ('2ebf301e-6c61-4076-98e3-2a38b31daf86', 'DEFAULT'),
('76d2cbf6-5845-470e-ad5f-2edb9e09a868', 'USER_MODIFY'),
('21c942db-a275-43f8-bdd6-d048c21bf5ab', 'USER_DELETE')
ON CONFLICT DO NOTHING;

--assign roles to users
insert into users_role (users_id, role_id)
values ('ba804cb9-fa14-42a5-afaf-be488742fc54', 'd29e709c-0ff1-4f4c-a7ef-09f656c390f1'),
       ('0d8fa44c-54fd-4cd0-ace9-2a7da57992de', 'd29e709c-0ff1-4f4c-a7ef-09f656c390f1'),
       ('ba804cb9-fa14-42a5-afaf-be488742fc54', 'ab505c92-7280-49fd-a7de-258e618df074'),
       ('ba804cb9-fa14-42a5-afaf-be488742fc54', 'c6aee32d-8c35-4481-8b3e-a876a39b0c02')
 ON CONFLICT DO NOTHING;

--assign authorities to roles
INSERT INTO role_authority(role_id, authority_id)
VALUES ('d29e709c-0ff1-4f4c-a7ef-09f656c390f1', '2ebf301e-6c61-4076-98e3-2a38b31daf86'),
('ab505c92-7280-49fd-a7de-258e618df074', '76d2cbf6-5845-470e-ad5f-2edb9e09a868'),
('c6aee32d-8c35-4481-8b3e-a876a39b0c02', '21c942db-a275-43f8-bdd6-d048c21bf5ab')
 ON CONFLICT DO NOTHING;
 
