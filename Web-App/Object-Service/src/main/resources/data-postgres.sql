--worktime
insert into work_time (id) values ('64c77f36-c53c-49ff-a02a-2a751a2677ea');
insert into work_time (id) values ('31131137-76e7-4c9f-93b1-282d71f71305');
insert into work_time (id) values ('7b71f5e0-a094-483c-83ac-ea5b980cffba');

--workdays
--for worktime1
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('64c77f36-c53c-49ff-a02a-2a751a2677ea','10:00', '17:00', 0, false, 0);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('64c77f36-c53c-49ff-a02a-2a751a2677ea','10:00', '22:00', 1, true, 1);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('64c77f36-c53c-49ff-a02a-2a751a2677ea','10:00', '22:00', 2, true, 2);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('64c77f36-c53c-49ff-a02a-2a751a2677ea','10:00', '22:00', 3, true, 3);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('64c77f36-c53c-49ff-a02a-2a751a2677ea','10:00', '22:00', 4, true, 4);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('64c77f36-c53c-49ff-a02a-2a751a2677ea','10:00', '24:00', 5, true, 5);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('64c77f36-c53c-49ff-a02a-2a751a2677ea','10:00', '24:00', 6, true, 6);

--for worktime2
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('31131137-76e7-4c9f-93b1-282d71f71305','08:00', '20:00', 0, false, 0);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('31131137-76e7-4c9f-93b1-282d71f71305','08:00', '20:00', 1, true, 1);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('31131137-76e7-4c9f-93b1-282d71f71305','08:00', '20:00', 2, true, 2);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('31131137-76e7-4c9f-93b1-282d71f71305','08:00', '20:00', 3, true, 3);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('31131137-76e7-4c9f-93b1-282d71f71305','08:00', '20:00', 4, true, 4);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('31131137-76e7-4c9f-93b1-282d71f71305','08:00', '20:00', 5, true, 5);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('31131137-76e7-4c9f-93b1-282d71f71305','08:00', '20:00', 6, true, 6);

--for worktime3
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('7b71f5e0-a094-483c-83ac-ea5b980cffba','08:00', '20:00', 0, false, 0);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('7b71f5e0-a094-483c-83ac-ea5b980cffba','08:00', '20:00', 1, true, 1);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('7b71f5e0-a094-483c-83ac-ea5b980cffba','08:00', '20:00', 2, true, 2);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('7b71f5e0-a094-483c-83ac-ea5b980cffba','08:00', '20:00', 3, true, 3);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('7b71f5e0-a094-483c-83ac-ea5b980cffba','08:00', '20:00', 4, true, 4);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('7b71f5e0-a094-483c-83ac-ea5b980cffba','08:00', '20:00', 5, true, 5);
insert into work_days (worktime_id, time_from, time_to, week_day, working, work_days_key) values ('7b71f5e0-a094-483c-83ac-ea5b980cffba','08:00', '20:00', 6, true, 6);


-- object 
insert into object (id, email, name, address, phone_number, image_path, blocked, active, work_time_id, deleted) values ('11193162-52d3-11eb-ae93-0242ac130111','loft@loft.com','Loft','Bulevar oslobodjenja 18, Novi Sad','021 225 226','./object-api/api/objects/object-images/11193162-52d3-11eb-ae93-0242ac130111.jpg', false, true, '64c77f36-c53c-49ff-a02a-2a751a2677ea',false);
insert into object (id, email, name, address, phone_number, image_path, blocked, active, work_time_id, deleted) values ('65256cdc-d375-4856-9a51-2dbbec4613f5','petrus@petrus.com','Petrus','Bulevar oslobodjenja 18, Novi Sad','021 225 226','./object-api/api/objects/object-images/65256cdc-d375-4856-9a51-2dbbec4613f5.jpg', false, true, '31131137-76e7-4c9f-93b1-282d71f71305',false);
insert into object (id, email, name, address, phone_number, image_path, blocked, active, work_time_id, deleted) values ('15bf954b-c7ab-484e-9dfb-3431b9502a81','atina@atina.com','Atina','Katolicka porta 1, Novi Sad','021 333 222','./object-api/api/objects/object-images/15bf954b-c7ab-484e-9dfb-3431b9502a81.jpg', false, true, '7b71f5e0-a094-483c-83ac-ea5b980cffba',false);

-- object - admin
insert into object_admin (id, object_id, deleted) values ('22793162-52d3-11eb-ae93-0242ac130111','11193162-52d3-11eb-ae93-0242ac130111',false);
insert into object_admin (id, object_id, deleted) values ('c6b7c313-42d9-4cc2-b057-e566dca31875','65256cdc-d375-4856-9a51-2dbbec4613f5',false);
insert into object_admin (id, object_id, deleted) values ('2478a4b8-0deb-4d14-bba7-a28cf2639633','15bf954b-c7ab-484e-9dfb-3431b9502a81',false);
