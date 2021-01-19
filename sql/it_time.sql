create table `q&aboard` (
`idx` int(11) not null auto_increment,
`name` varchar(50) not null,
`title` varchar(50) not null,
`content` mediumtext not null,
`regdate` datetime not null,
`modidate` datetime not null,
`vote` int(11) not null default '0',
`comment` int(11) not null default '0',
primary key(`idx`)
);

select * from `q&aboard`;

select idx,title,content,date_format(regdate,'%Y-%m-%d %H:%i,%s') regdate, name,vote,comment from `q&aboard`;

insert into `q&aboard`(name, title, content, regdate, modidate, vote, comment) values('wkdud','안녕하세요','hello!',now(),now(),1,1);

