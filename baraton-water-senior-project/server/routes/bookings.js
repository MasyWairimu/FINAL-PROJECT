import express from "express";
import { deleteBooking,  getAllBookingsAdmin, getBookingsVendor, getBooking, newBooking, updateBooking } from "../controllers/bookingController.js";

const router = express.Router();

// CREATE BOOKING
router.post("/", newBooking);

// UPDATE
router.put("/:id/grab", updateBooking);

// GET ALL FOR USER
router.get("/user/:userId", getBooking);

// GET ALL
router.get("/", getAllBookingsAdmin);

// GET ALL BOOKINGS GRABBED BY VENDOR
router.get("/vendor/:userId", getBookingsVendor)

// DELETE
router.delete("/id", deleteBooking);

export default router