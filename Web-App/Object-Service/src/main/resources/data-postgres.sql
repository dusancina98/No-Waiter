-- object 
insert into object (id, email, name, address,phone_number, image_path, blocked ,active) values ('11193162-52d3-11eb-ae93-0242ac130111','loft@loft.com','Loft','Novi Sad','021 225 226','assets/images/restaurant.jpg', false, true);

-- object - admin
insert into object_admin (id, object_id) values ('22793162-52d3-11eb-ae93-0242ac130111','11193162-52d3-11eb-ae93-0242ac130111');
