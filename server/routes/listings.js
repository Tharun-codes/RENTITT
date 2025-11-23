// server/routes/listings.js
import express from 'express';
import {
  getAllListings,
  getListingById,
  createListing
} from '../controllers/listingsController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

// GET /api/listings
router.get('/', getAllListings);

// GET /api/listings/:id
router.get('/:id', getListingById);

// POST /api/listings
router.post('/', isAuthenticated, createListing);

router.post("/", isAuthenticated, async (req, res) => {
  const {
    title,
    description,
    price,
    transaction_type,
    property_type,
    location,
    bedrooms,
    area_sqft,
    image_url
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO listings
       (owner_id, title, description, price, transaction_type,
        property_type, location, bedrooms, area_sqft, image_url)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING *`,
      [
        req.user.id,
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

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
