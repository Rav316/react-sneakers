WITH sneaker_type_mapping AS (
    SELECT id, type
    FROM sneaker_type
)
UPDATE sneaker s
SET
    sneaker_type_id = st.id,
    name = REGEXP_REPLACE(s.name, '^(Мужские кроссовки|Кеды|Кроссовки)\s+', '', 'g')
FROM sneaker_type_mapping st
WHERE
    s.name LIKE st.type || '%';
