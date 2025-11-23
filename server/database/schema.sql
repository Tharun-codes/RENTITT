-- server/database/schema.sql

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS listings (
  id SERIAL PRIMARY KEY,
  owner_id INT REFERENCES users(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(15,2) NOT NULL,
  transaction_type VARCHAR(50) NOT NULL, -- rent / sale
  property_type VARCHAR(50) NOT NULL,    -- apartment / house / plot
  location VARCHAR(255) NOT NULL,
  bedrooms SMALLINT,
  area_sqft INT NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  posted_at TIMESTAMPTZ DEFAULT NOW()
);
