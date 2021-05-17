--authorities
insert into authority (id, name) values ('7852aa5e-7040-4d99-8255-537a0b226c75','ROLE_SYSADMIN');
insert into authority (id, name) values ('563e9925-cff6-42b7-99fa-6b1235f67655','ROLE_OBJADMIN');

-- user example@example.com password: 123
insert into users (id, email, name,password,surname,active) values ('22793162-52d3-11eb-ae93-0242ac130002','example@example.com','Stefan','$2a$10$sqes3IpPL4mBgAAmimisyOWj5DlqPRndrJFNFw9zWiJjyNa5ozKS6','Stefic', true);

-- restoran admin
insert into users (id, email, name,password,surname,active) values ('22793162-52d3-11eb-ae93-0242ac130111','nikoladskv@hotmail.rs','Djura','$2a$10$sqes3IpPL4mBgAAmimisyOWj5DlqPRndrJFNFw9zWiJjyNa5ozKS6','Djuric',false);

insert into user_authority (user_id, authority_id) values ('22793162-52d3-11eb-ae93-0242ac130002', '7852aa5e-7040-4d99-8255-537a0b226c75');
insert into user_authority (user_id, authority_id) values ('22793162-52d3-11eb-ae93-0242ac130111', '563e9925-cff6-42b7-99fa-6b1235f67655');

insert into object_admin (id, object_id, object_name, address) values ('22793162-52d3-11eb-ae93-0242ac130111', '11193162-52d3-11eb-ae93-0242ac130111', 'Loft' , 'Novi Sad');