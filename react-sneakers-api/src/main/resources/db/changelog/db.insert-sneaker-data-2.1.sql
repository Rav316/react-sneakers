update firm
set image_url = regexp_replace(image_url, '^/resources', '');

update sneaker
set image_url = regexp_replace(image_url, '^/resources', '');
