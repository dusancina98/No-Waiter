--worktime
insert into work_time (id) values ('64c77f36-c53c-49ff-a02a-2a751a2677ea');

--workdays
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('64c77f36-c53c-49ff-a02a-2a751a2677ea','10:00:00', '22:00:00', 0, true, 0);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('64c77f36-c53c-49ff-a02a-2a751a2677ea','10:00:00', '22:00:00', 1, true, 1);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('64c77f36-c53c-49ff-a02a-2a751a2677ea','10:00:00', '22:00:00', 2, true, 2);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('64c77f36-c53c-49ff-a02a-2a751a2677ea','10:00:00', '22:00:00', 3, true, 3);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('64c77f36-c53c-49ff-a02a-2a751a2677ea','12:00:00', '23:00:00', 4, true, 4);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('64c77f36-c53c-49ff-a02a-2a751a2677ea','12:00:00', '23:00:00', 5, true, 5);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('64c77f36-c53c-49ff-a02a-2a751a2677ea','10:00:00', '22:00:00', 6, false, 6);

-- object 
insert into object (id, email, name, address,phone_number, image_path, blocked ,active ,work_time_id,deleted) values ('11193162-52d3-11eb-ae93-0242ac130111','loft@loft.com','Loft','Novi Sad','021 225 226','assets/images/restaurant.jpg', false, true, '64c77f36-c53c-49ff-a02a-2a751a2677ea',false);

-- object - admin
insert into object_admin (id, object_id) values ('22793162-52d3-11eb-ae93-0242ac130111','11193162-52d3-11eb-ae93-0242ac130111');
