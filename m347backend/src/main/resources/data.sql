create table if not exists role (
  id uuid not null primary key,
  "name" varchar(255) not null
);

create table if not exists authority (
  id uuid not null primary key,
  "name" varchar(255) not null
);

create table if not exists role_authority (
  foreign key (role_id) references role(id),
  foreign key (authority_id) references authority(id)
);

create table if not exists item (
  id uuid not null primary key,
  "name" varchar(255) not null,
  picture_url varchar(255) not null,
  description text,
  foreign key (users_id) references "user"(id)
);

create table if not exists cartitem (
  id uuid not null primary key,
  quantity FLOAT not null,
  foreign key (item_id) references item(id),
  foreign key (cart_id) references shopping_cart(id)
);

create table if not exists shopping_cart (
  id uuid not null primary key,
  foreign key (users_id) references "user"(id),
  foreign key (cartitem_id) references cartitem(id)
);

--USERS
insert into users (id, email,first_name,last_name, password)
values ('ba804cb9-fa14-42a5-afaf-be488742fc54', 'admin@example.com', 'James','Bond', '1234' ),
('0d8fa44c-54fd-4cd0-ace9-2a7da57992de', 'user@example.com', 'Tyler','Durden', '1234')
 ON CONFLICT DO NOTHING;


--ROLES
insert into role(id, name)
values ('d29e709c-0ff1-4f4c-a7ef-09f656c390f1', 'DEFAULT'),
('ab505c92-7280-49fd-a7de-258e618df074', 'USER_MODIFY'),
('c6aee32d-8c35-4481-8b3e-a876a39b0c02', 'USER_DELETE')
ON CONFLICT DO NOTHING;

--AUTHORITIES
insert into authority(id, name)
values ('2ebf301e-6c61-4076-98e3-2a38b31daf86', 'DEFAULT'),
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
insert into role_authority(role_id, authority_id)
values ('d29e709c-0ff1-4f4c-a7ef-09f656c390f1', '2ebf301e-6c61-4076-98e3-2a38b31daf86'),
('ab505c92-7280-49fd-a7de-258e618df074', '76d2cbf6-5845-470e-ad5f-2edb9e09a868'),
('c6aee32d-8c35-4481-8b3e-a876a39b0c02', '21c942db-a275-43f8-bdd6-d048c21bf5ab')
 ON CONFLICT DO NOTHING;

insert into item(id, "name", picture_url, description, price, user_id)
values ('d29e709c-0ff1-4f4c-a7ef-09f656c390f1', 'Iphone 2', 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-iphone-13-pro-max-graphite-2023?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1679072989055', 'new Iphone 3', 3.30, 'ba804cb9-fa14-42a5-afaf-be488742fc54')
ON CONFLICT DO NOTHING;

insert into shopping_cart(id, user_id)
values ('167a7ab4-1097-4fbb-9373-3cbb483c3366', 'ba804cb9-fa14-42a5-afaf-be488742fc54')
ON CONFLICT DO NOTHING;