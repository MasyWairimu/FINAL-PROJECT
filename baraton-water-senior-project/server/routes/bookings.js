import express from "express";
import { deleteBooking, getBookingById,  getAllBookingsAdmin, getBookingsVendor, getBooking, newBooking, updateBooking } from "../controllers/bookingController.js";

const router = express.Router();

// CREATE BOOKING
router.post("/", newBooking);

// UPDATE
router.put("/:id/grab", updateBooking);

// GET BOOKING BY ID
router.get("/:id", getBookingById);

// GET ALL FOR A USER
router.get("/user/:userId", getBooking);

// GET ALL (ADMIN)
router.get("/", getAllBookingsAdmin);

// GET ALL BOOKINGS GRABBED BY VENDOR
router.get("/vendor/:userId", getBookingsVendor)

// DELETE
router.delete("/:id", deleteBooking);

export default router