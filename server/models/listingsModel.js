// server/models/listingsModel.js
import pool from '../db.js';

export const getActiveListings = async () => {
  const result = await pool.query(
    `SELECT * FROM listings
     WHERE is_active = true
     ORDER BY posted_at DESC`
  );
  return result.rows;
};

export const getListingById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM listings WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
};

export const createListing = async (data) => {
  const {
    owner_id,
    title,
    description,
    price,
    transaction_type,
    property_type,
    location,
    bedrooms,
    area_sqft,
    image_url
  } = data;

  const result = await pool.query(
    `INSERT INTO listings
    (owner_id, title, description, price, transaction_type, property_type,
     location, bedrooms, area_sqft, image_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     RETURNING *`,
    [
      owner_id,
      title,
      description,
      price,
      transaction_type,
      property_type,
      location,
      bedrooms,
      area_sqft,
      image_url
    ]
  );

  return result.rows[0];
};
