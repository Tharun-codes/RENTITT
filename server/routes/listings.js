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

export default router;
