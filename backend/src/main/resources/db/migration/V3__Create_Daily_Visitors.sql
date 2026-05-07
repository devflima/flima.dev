CREATE TABLE daily_visitors (
    id UUID PRIMARY KEY,
    ip_address VARCHAR(255) NOT NULL,
    visit_date DATE NOT NULL,
    UNIQUE(ip_address, visit_date)
);
