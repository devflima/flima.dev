-- Corrigindo o check constraint do subtitle na tabela contents que apontava erroneamente para 'title'
ALTER TABLE contents DROP CONSTRAINT IF EXISTS contents_subtitle_check;
ALTER TABLE contents ADD CONSTRAINT contents_subtitle_check CHECK (trim(subtitle) <> '');
