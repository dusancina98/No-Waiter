--authorities
insert into authority (id, name) values ('7852aa5e-7040-4d99-8255-537a0b226c75','ROLE_SYSADMIN');
insert into authority (id, name) values ('563e9925-cff6-42b7-99fa-6b1235f67655','ROLE_OBJADMIN');
insert into authority (id, name) values ('f98f5538-4d52-4e3e-bae3-598e523a6200','ROLE_DELIVERER');
insert into authority (id, name) values ('f98f5538-4d52-4e3e-bae3-598e523a6222','ROLE_WAITER');
insert into authority (id, name) values ('f98f5538-4d52-4e3e-bae3-598e523a6111','ROLE_CUSTOMER');


-- user example@example.com password: 123
insert into users (id, email, name,password,surname,active,deleted) values ('22793162-52d3-11eb-ae93-0242ac130002','example@example.com','Stefan','$2a$10$sqes3IpPL4mBgAAmimisyOWj5DlqPRndrJFNFw9zWiJjyNa5ozKS6','Stefic', true, false);

-- object admins
-- loft
insert into users (id, email, name,password,surname,active,deleted) values ('22793162-52d3-11eb-ae93-0242ac130111','loftadmin@example.com','Djura','$2a$10$sqes3IpPL4mBgAAmimisyOWj5DlqPRndrJFNFw9zWiJjyNa5ozKS6','Djuric',true, false);
-- petrus
insert into users (id, email, name,password,surname,active,deleted) values ('c6b7c313-42d9-4cc2-b057-e566dca31875','petrusadmin@example.com','Mika','$2a$10$sqes3IpPL4mBgAAmimisyOWj5DlqPRndrJFNFw9zWiJjyNa5ozKS6','Mikic',true, false);
-- atina
insert into users (id, email, name,password,surname,active,deleted) values ('2478a4b8-0deb-4d14-bba7-a28cf2639633','atinaadmin@example.com','Petar','$2a$10$sqes3IpPL4mBgAAmimisyOWj5DlqPRndrJFNFw9zWiJjyNa5ozKS6','Petrovic',true, false);

-- restoran waiter
insert into users (id, email, name,password,surname,active,deleted) values ('22793162-52d3-11eb-ae93-0242ac130222','example1@example.com','Nikola','$2a$10$sqes3IpPL4mBgAAmimisyOWj5DlqPRndrJFNFw9zWiJjyNa5ozKS6','Djuric',true, false);

-- deliveres
insert into users (id, email, name,password,surname,active,deleted) values ('29363b4f-8fb9-4d3d-8785-d7235ecc8286','example2@example.com','Petar','$2a$10$sqes3IpPL4mBgAAmimisyOWj5DlqPRndrJFNFw9zWiJjyNa5ozKS6','Petrovic',true, false);
insert into users (id, email, name,password,surname,active,deleted) values ('739ebff1-a0a6-4c1d-b93f-23c5225c0ba0','example3@example.com','Dusan','$2a$10$sqes3IpPL4mBgAAmimisyOWj5DlqPRndrJFNFw9zWiJjyNa5ozKS6','Dusanic',true, false);

-- customers
insert into users (id, email, name,password,surname,active,deleted) values ('739ebff1-a0a6-4c1d-b93f-23c5225c0cc1','example4@example.com','Dusan','$2a$10$sqes3IpPL4mBgAAmimisyOWj5DlqPRndrJFNFw9zWiJjyNa5ozKS6','Dusanic',true, false);

insert into user_authority (user_id, authority_id) values ('22793162-52d3-11eb-ae93-0242ac130002', '7852aa5e-7040-4d99-8255-537a0b226c75');
insert into user_authority (user_id, authority_id) values ('22793162-52d3-11eb-ae93-0242ac130222', 'f98f5538-4d52-4e3e-bae3-598e523a6222');
insert into user_authority (user_id, authority_id) values ('739ebff1-a0a6-4c1d-b93f-23c5225c0cc1', 'f98f5538-4d52-4e3e-bae3-598e523a6111');

--object admins authority
insert into user_authority (user_id, authority_id) values ('22793162-52d3-11eb-ae93-0242ac130111', '563e9925-cff6-42b7-99fa-6b1235f67655');
insert into user_authority (user_id, authority_id) values ('c6b7c313-42d9-4cc2-b057-e566dca31875', '563e9925-cff6-42b7-99fa-6b1235f67655');
insert into user_authority (user_id, authority_id) values ('2478a4b8-0deb-4d14-bba7-a28cf2639633', '563e9925-cff6-42b7-99fa-6b1235f67655');

--deliverers authority
insert into user_authority (user_id, authority_id) values ('29363b4f-8fb9-4d3d-8785-d7235ecc8286', 'f98f5538-4d52-4e3e-bae3-598e523a6200');
insert into user_authority (user_id, authority_id) values ('739ebff1-a0a6-4c1d-b93f-23c5225c0ba0', 'f98f5538-4d52-4e3e-bae3-598e523a6200');

--object admins
insert into object_admin (id, object_id, object_name, address, phone_number) values ('22793162-52d3-11eb-ae93-0242ac130111', '11193162-52d3-11eb-ae93-0242ac130111', 'Loft' , 'Bulevar oslobodjenja 12, Novi Sad', '063765534');
insert into object_admin (id, object_id, object_name, address, phone_number) values ('c6b7c313-42d9-4cc2-b057-e566dca31875', '65256cdc-d375-4856-9a51-2dbbec4613f5', 'Petrus' , 'Bulevar narodnog fronta 17, Novi Sad', '061276544');
insert into object_admin (id, object_id, object_name, address, phone_number) values ('2478a4b8-0deb-4d14-bba7-a28cf2639633', '15bf954b-c7ab-484e-9dfb-3431b9502a81', 'Atina' , 'Bulevar cara lazara 17, Novi Sad' , '064345344');


insert into waiter (id, object_id, address, phone_number) values ('22793162-52d3-11eb-ae93-0242ac130222', '11193162-52d3-11eb-ae93-0242ac130111', 'Novi Sad' , '123123123123');

-- customers
insert into customer (id, phone_number,penalties) values ('739ebff1-a0a6-4c1d-b93f-23c5225c0cc1', '065324235', 0);
-- customer addresses
insert into address (id, name) values ('123ebff1-a0a6-4c1d-b93f-23c5225c0cc1', 'Novosadskog sajma 2');
insert into customer_addresses (customer_id, addresses_id) values ('739ebff1-a0a6-4c1d-b93f-23c5225c0cc1', '123ebff1-a0a6-4c1d-b93f-23c5225c0cc1');

-- favourite objects
insert into favourite_objects (user_id, favourite_objects) values ('739ebff1-a0a6-4c1d-b93f-23c5225c0cc1', '11193162-52d3-11eb-ae93-0242ac130111');

--deliverer requests
insert into deliverer_request (id, email, name, surname, phone_number, reference, request_status) values ('1334cf36-af66-4a38-8e59-475d33798341', 'requestexample@example.com', 'Pera' , 'Peric' ,'065324235','Najbolji deliverer', 'PENDING');
insert into deliverer_request (id, email, name, surname, phone_number, reference, request_status) values ('065e478a-a0fc-485b-bfe9-1b274fc19399', 'requestexample2@example.com', 'Djura' , 'Djuric' ,'065756535','Najgori deliverer', 'PENDING');
insert into deliverer_request (id, email, name, surname, phone_number, reference, request_status) values ('76f91951-34fc-4fbc-9684-597307975ed3', 'requestexample3@example.com', 'Mika' , 'Mikic' ,'063676535','Radio za wolt', 'PENDING');

--deliverers
insert into worker (id,phone_number) values ('29363b4f-8fb9-4d3d-8785-d7235ecc8286','062490393');
insert into deliverer (id,status) values ('29363b4f-8fb9-4d3d-8785-d7235ecc8286', 'ACTIVE');

insert into worker (id,phone_number) values ('739ebff1-a0a6-4c1d-b93f-23c5225c0ba0','0655532134');
insert into deliverer (id,status) values ('739ebff1-a0a6-4c1d-b93f-23c5225c0ba0', 'INACTIVE');