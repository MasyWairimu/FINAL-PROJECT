import Booking from "../models/Booking.js";
import User from "../models/User.js"
import mongoose from 'mongoose';
import IntaSend from "intasend-node";


// Initialize IntaSend
const intasend = new IntaSend(
    'ISPubKey_test_7735ad61-8dbd-4fbc-9199-cbbee44475d4',
    'ISSecretKey_test_31dfe9fa-3725-4d03-8243-958723929462',
    true // Test environment
);

// CREATE BOOKING
export const newBooking = async (req, res, next) => {
    const newOrder = new Booking({
        userId: req.body.userId,
        area: req.body.area,
        plot: req.body.plot,
        amount: req.body.amount,
    });

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        next(err);
    }
};



// UPDATE BOOKING STATUS AND ASSIGN TO VENDOR
export const updateBooking = async (req, res, next) => {
    const {bookingId} = req.params;
    const { userId, status } = req.body;

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status: status, vendor: status === 'grabbed' ? userId : null },
            { new: true }
        );

        if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });

        if (status === 'delivered') {
            // Fetch user details for the payment
            const user = await User.findById(updatedBooking.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Initiate payment
            let collection = intasend.collection();
            collection
                .mpesaStkPush({
                    first_name: user.username.split(' ')[0],
                    last_name: user.username.split(' ')[1] || '',
                    email: user.email,
                    host: 'https://yourwebsite.com',
                    amount: updatedBooking.amount,
                    phone_number: user.phoneNumber,
                    api_ref: updatedBooking._id.toString(),
                })
                .then((resp) => {
                    console.log(`STK Push Response:`, resp);
                    res.status(200).json({ updatedBooking, paymentResponse: resp });
                })
                .catch((err) => {
                    console.error(`STK Push Error:`, err);
                    res.status(500).json({ message: 'Payment initiation failed', error: err });
                });
        } else {
            res.status(200).json(updatedBooking);
        }
    } catch (err) {
        next(err);
    }
};


// GET BOOKING BY ID
export const getBookingById = async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.json(booking);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


// GET BOOKING FOR A USER
export const getBooking = async (req, res, next) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.userId);
        const getBooking = await Booking.find({ userId }).populate('userId', 'username phoneNumber');
        if (!getBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(getBooking);
    } catch (err) {
        next(err);
    }
};

// GET ALL AVAILABLE BOOKINGS
export const getAllBookingsAdmin = async (req, res, next) => {
    try {
        const allBookingsAdmin = await Booking.find({ status: 'not-grabbed' }).populate('userId', 'username phoneNumber');
        res.status(200).json(allBookingsAdmin);
    } catch (err) {
        next(err);
    }
};

// GET ALL BOOKINGS FOR A VENDOR
export const getBookingsVendor = async (req, res, next) => {
    try {
        const deliveries = await Booking.find({ vendor: req.params.userId }).populate('userId', 'username phoneNumber');
        res.status(200).json(deliveries);
    } catch (err) {
        next(err);
    }
};

// DELETE BOOKING
export const deleteBooking = async (req, res, next) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json("Booking has been deleted");
    } catch (err) {
        next(err);
    }
};
