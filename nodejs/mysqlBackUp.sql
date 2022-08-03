create database GameSpring;

create table user (
	idx int(10) auto_increment primary key,
    user_id varchar(20) not null,
    user_password varchar(20) not null
);

drop table user;

select * from user;