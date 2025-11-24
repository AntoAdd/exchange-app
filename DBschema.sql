CREATE TABLE counteroffers (
  id            SERIAL NOT NULL, 
  creation_date date NOT NULL, 
  offer_id      int4 NOT NULL, 
  user_id       int4 NOT NULL, 
  state         varchar(20)  DEFAULT 'Pending' NOT NULL CHECK (state IN ('Pending', 'Accepted')), 
  PRIMARY KEY (id));
CREATE TABLE item_images (
  id         SERIAL NOT NULL, 
  image_file bytea NOT NULL, 
  item_id    int4 NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE items (
  id              SERIAL NOT NULL, 
  name            varchar(255) NOT NULL, 
  description     varchar(255) NOT NULL, 
  category        varchar(255) NOT NULL, 
  user_id         int4 NOT NULL, 
  counteroffer_id int4, 
  PRIMARY KEY (id));
CREATE TABLE notifications (
  id      SERIAL NOT NULL, 
  message varchar(255) NOT NULL, 
  user_id int4 NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE offers (
  id            SERIAL NOT NULL, 
  user_id       int4 NOT NULL, 
  creation_date date, 
  item_id       int4 NOT NULL, 
  state         varchar(20) DEFAULT 'Published' NOT NULL CHECK (state IN ('Published', 'Closed')), 
  PRIMARY KEY (id));
CREATE TABLE roles (
  id   SERIAL NOT NULL, 
  name varchar(255) NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE users (
  id         SERIAL NOT NULL, 
  first_name varchar(255) NOT NULL, 
  last_name  varchar(255) NOT NULL, 
  address    varchar(255) NOT NULL, 
  username   varchar(255) NOT NULL, 
  password   varchar(255) NOT NULL, 
  PRIMARY KEY (id));
CREATE TABLE users_roles (
  user_id int4 NOT NULL, 
  role_id int4 NOT NULL, 
  PRIMARY KEY (user_id, 
  role_id));
CREATE TABLE trades (
  id               SERIAL NOT NULL,
  offer_id         int4 NOT NULL,
  counteroffer_id  int4 NOT NULL,
  offer_user_id         int4 NOT NULL,
  counteroffer_user_id         int4 NOT NULL,
  closed_date      date NOT NULL,
  deleted_by_offer_user boolean DEFAULT false NOT NULL,
  deleted_by_counteroffer_user boolean DEFAULT false NOT NULL,
  PRIMARY KEY (id));
ALTER TABLE items ADD CONSTRAINT FKitems975154 FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE item_images ADD CONSTRAINT FKitem_image385675 FOREIGN KEY (item_id) REFERENCES items (id);
ALTER TABLE users_roles ADD CONSTRAINT FKusers_role898181 FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE users_roles ADD CONSTRAINT FKusers_role236949 FOREIGN KEY (role_id) REFERENCES roles (id);
ALTER TABLE offers ADD CONSTRAINT FKoffers344982 FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE offers ADD CONSTRAINT FKoffers942565 FOREIGN KEY (item_id) REFERENCES items (id);
ALTER TABLE counteroffers ADD CONSTRAINT FKcounteroff468692 FOREIGN KEY (offer_id) REFERENCES offers (id);
ALTER TABLE items ADD CONSTRAINT FKitems357700 FOREIGN KEY (counteroffer_id) REFERENCES counteroffers (id);
ALTER TABLE counteroffers ADD CONSTRAINT FKcounteroff318118 FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE notifications ADD CONSTRAINT FKnotificati823554 FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE trades ADD CONSTRAINT FKtrades_offer FOREIGN KEY (offer_id) REFERENCES offers (id);
ALTER TABLE trades ADD CONSTRAINT FKtrades_counteroffer FOREIGN KEY (counteroffer_id) REFERENCES counteroffers (id);
ALTER TABLE trades ADD CONSTRAINT FKtrades_user1 FOREIGN KEY (offer_user_id) REFERENCES users (id);
ALTER TABLE trades ADD CONSTRAINT FKtrades_user2 FOREIGN KEY (counteroffer_user_id) REFERENCES users (id);
