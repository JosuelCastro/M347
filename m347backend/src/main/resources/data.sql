CREATE TABLE IF NOT EXISTS role (
  id UUID NOT NULL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS authority (
  id UUID NOT NULL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS role_authority (
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (authority_id) REFERENCES authority(id)
);

CREATE TABLE IF NOT EXISTS item (
  id UUID NOT NULL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  picture_url VARCHAR(255) NOT NULL,
  description TEXT,
  FOREIGN KEY (users_id) REFERENCES "user"(id)
);

CREATE TABLE IF NOT EXISTS cartitem (
  id UUID NOT NULL PRIMARY KEY,
  quantity FLOAT NOT NULL,
  FOREIGN KEY (item_id) REFERENCES item(id),
  FOREIGN KEY (cart_id) REFERENCES shopping_cart(id)
);

CREATE TABLE IF NOT EXISTS shopping_cart (
  id UUID NOT NULL PRIMARY KEY,
  FOREIGN KEY (users_id) REFERENCES "user"(id),
  FOREIGN KEY (cartitem_id) REFERENCES cartitem(id)
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

INSERT INTO item(id, "name", picture_url, description, price, user_id)
VALUES ('d29e709c-0ff1-4f4c-a7ef-09f656c390f1', 'Iphone 2', 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-iphone-13-pro-max-graphite-2023?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1679072989055', 'new Iphone 3', 3.30, 'ba804cb9-fa14-42a5-afaf-be488742fc54')
ON CONFLICT DO NOTHING;