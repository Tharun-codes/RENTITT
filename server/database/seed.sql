-- server/database/seed.sql

INSERT INTO users (email)
VALUES ('demo@rentit.com')
ON CONFLICT (email) DO NOTHING;

INSERT INTO listings (
  owner_id, title, description, price, transaction_type,
  property_type, location, bedrooms, area_sqft, image_url
)
VALUES
(
  1,
  '2BHK Apartment in Chennai',
  'Spacious 2BHK near metro station, semi-furnished.',
  18000,
  'rent',
  'apartment',
  'Velachery, Chennai',
  2,
  950,
  'https://via.placeholder.com/600x400'
),
(
  1,
  '3BHK Independent House',
  'Corner plot, calm residential area, perfect for families.',
  9500000,
  'sale',
  'house',
  'Anna Nagar, Chennai',
  3,
  1600,
  'https://via.placeholder.com/600x400'
);
