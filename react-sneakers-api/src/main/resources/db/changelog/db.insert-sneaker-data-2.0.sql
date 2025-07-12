delete from sneaker_item;
delete from sneaker;
delete from firm;

insert into firm (name, image_url) values
('Nike', '/resources/firm/nike.jpg'),
('Reebok', '/resources/firm/reebok.jpg'),
('The North Face', '/resources/firm/the-north-face.jpg'),
('PUMA', '/resources/firm/puma.jpg'),
('New Balance', '/resources/firm/new-balance.jpg'),
('Vans', '/resources/firm/vans.jpg'),
('Jordan', '/resources/firm/jordan.jpg'),
('Converse', '/resources/firm/converse.jpg');

insert into sneaker (name, image_url, price, description, firm_id)
values
('Мужские кроссовки Nike Zoom Vomero 5', '/resources/sneaker/nike-zoom-vomero-5.jpg', 17499,
'Легкие и комфортные кроссовки Nike Zoom Vomero 5 идеально подойдут для повседневной активности и бега.',
(select id from firm where name = 'Nike')),

('Мужские кроссовки Nike Air Pegasus 2005', '/resources/sneaker/nike-air-pegasus-2005.jpg', 16799,
'Легендарная модель от Nike с отличной амортизацией и классическим стилем.',
(select id from firm where name = 'Nike')),

('Мужские кроссовки Reebok Club C Grounds UK', '/resources/sneaker/reebok-club-c-grounds-uk.jpg', 7499,
'Стильная классика от Reebok в минималистичном дизайне и высоком качестве.',
(select id from firm where name = 'Reebok')),

('Мужские кроссовки The North Face Vectiv Enduris 4', '/resources/sneaker/the-north-face-vectiv-enduris-4.jpg', 11499,
'Невероятная устойчивость и комфорт для любителей трекинга и приключений.',
(select id from firm where name = 'The North Face')),

('Мужские кроссовки Nike Giannis Immortality 4', '/resources/sneaker/nike-giannis-immortality-4.jpg', 11199,
'Созданы для быстроты, поддержки и контроля на площадке. Одобрено Яннисом.',
(select id from firm where name = 'Nike')),

('Кроссовки PUMA CA Pro Classic II', '/resources/sneaker/puma-ca-pro-classic-2.jpg', 14999,
'Современное переосмысление классической модели с акцентом на комфорт и стиль.',
(select id from firm where name = 'PUMA')),

('Мужские кроссовки PUMA 180', '/resources/sneaker/puma-180.jpg', 16999,
'Вдохновлены скейтерской культурой 2000-х и идеально подходят для уличного стиля.',
(select id from firm where name = 'PUMA')),

('Кроссовки New Balance 480', '/resources/sneaker/new-balance-480.jpg', 17499,
'Ретро-баскетбольный стиль с современным комфортом и амортизацией.',
(select id from firm where name = 'New Balance')),

('Мужские кроссовки Nike SB Force 58 Premium Leather', '/resources/sneaker/nike-sb-force-58-premium-leather.jpg', 7999,
'Совмещение баскетбольной прочности и скейтерской гибкости.',
(select id from firm where name = 'Nike')),

('Мужские кроссовки PUMA Palermo Vintage Update', '/resources/sneaker/puma-palermo-vintage-update.jpg', 9799,
'Возвращение легенды — обновленный силуэт для ценителей ретро.',
(select id from firm where name = 'PUMA')),

('Кеды Vans Old Skool', '/resources/sneaker/vans-old-skool.jpg', 9999,
'Классика от Vans — узнаваемый силуэт и прочная конструкция.',
(select id from firm where name = 'Vans')),

('Мужские кроссовки Jordan Air Jordan 1 Mid', '/resources/sneaker/jordan-air-jordan-1-mid.jpg', 23999,
'Легендарный стиль Майкла Джордана в современной интерпретации.',
(select id from firm where name = 'Jordan')),

('Мужские кроссовки Jordan Air Jordan 4 RM', '/resources/sneaker/jordan-air-jordan-4-rm.jpg', 24999,
'Новая эра легенды с улучшенной посадкой и технологичными материалами.',
(select id from firm where name = 'Jordan')),

('Мужские кроссовки Jordan 6 Rings', '/resources/sneaker/jordan-6-rings.jpg', 25999,
'Модель, сочетающая элементы всех шести чемпионских кроссовок Джордана.',
(select id from firm where name = 'Jordan')),

('Кеды Vans Knu Skool', '/resources/sneaker/vans-knu-skool.jpg', 7799,
'Свежий взгляд на классику с объемным языком и ретро-стилем.',
(select id from firm where name = 'Vans')),

('Кеды Converse Chuck Taylor As Core', '/resources/sneaker/converse-chuck-taylor-as-core.jpg', 7699,
'Вневременная классика, узнаваемая во всем мире.',
(select id from firm where name = 'Converse')),

('Мужские кроссовки Nike Air Force 1 Mid 07', '/resources/sneaker/nike-air-force-1-mid-07.jpg', 22999,
'Легендарный силуэт с завышенной посадкой и высоким уровнем комфорта.',
(select id from firm where name = 'Nike'));

insert into sneaker_item (sneaker_id, size)
select s.id, sz.size
from sneaker s,
(values (38), (42), (44)) as sz(size);
