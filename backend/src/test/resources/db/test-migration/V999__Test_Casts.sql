-- Adiciona casts implícitos para permitir que o Hibernate envie Strings para colunas de ENUM no PostgreSQL
-- Isso resolve o erro "column is of type role_enum but expression is of type character varying" sem alterar o código Java.

CREATE CAST (varchar AS role_enum) WITH INOUT AS IMPLICIT;
CREATE CAST (varchar AS education_type_enum) WITH INOUT AS IMPLICIT;
CREATE CAST (varchar AS status_message_enum) WITH INOUT AS IMPLICIT;
CREATE CAST (varchar AS stack_type_enum) WITH INOUT AS IMPLICIT;
CREATE CAST (varchar AS section_type_enum) WITH INOUT AS IMPLICIT;
