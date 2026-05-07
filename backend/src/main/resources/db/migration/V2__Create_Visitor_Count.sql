CREATE TABLE visitor_counts (
    id UUID PRIMARY KEY,
    count BIGINT NOT NULL
);

-- Initialize with the constant UUID used in the application
INSERT INTO visitor_counts (id, count) VALUES ('00000000-0000-0000-0000-000000000000', 0);
