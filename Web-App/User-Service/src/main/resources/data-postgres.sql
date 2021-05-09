--authorities
insert into authority (id, name) values ('7852aa5e-7040-4d99-8255-537a0b226c75','ROLE_SYSADMIN');
insert into authority (id, name) values ('563e9925-cff6-42b7-99fa-6b1235f67655','ROLE_RESADMIN');

-- user example@example.com password: 123
insert into users (id, email, name,password,surname) values ('22793162-52d3-11eb-ae93-0242ac130002','example@example.com','Stefan','$2a$10$sqes3IpPL4mBgAAmimisyOWj5DlqPRndrJFNFw9zWiJjyNa5ozKS6','Stefic');

-- dodela rola
insert into user_authority (user_id, authority_id) values ('22793162-52d3-11eb-ae93-0242ac130002', '7852aa5e-7040-4d99-8255-537a0b226c75');
