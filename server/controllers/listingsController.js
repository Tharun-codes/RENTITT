// server/controllers/listingsController.js
import * as Listings from '../models/listingsModel.js';

export const getAllListings = async (req, res, next) => {
  try {
    const listings = await Listings.getActiveListings();
    res.json(listings);
  } catch (err) {
    next(err);
  }
};

export const getListingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listings.getListingById(id);

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.json(listing);
  } catch (err) {
    next(err);
  }
};

export const createListing = async (req, res, next) => {
  try {
    const ownerId = req.user.id;

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

    const listing = await Listings.createListing({
      owner_id: ownerId,
      title,
      description,
      price,
      transaction_type,
      property_type,
      location,
      bedrooms,
      area_sqft,
      image_url
    });

    res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
};
