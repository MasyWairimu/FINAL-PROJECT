import Booking from "../models/Booking.js";
import User from "../models/User.js"
import mongoose from 'mongoose';

// CREATE BOOKING
export const newBooking = async (req, res, next) => {

    const newOrder = new Booking({
        userId:req.body.userId,
        area:req.body.area,
        plot:req.body.plot,
        amount:req.body.amount,
    })

    try{
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    }catch(err){
        next(err)
    }
}

// UPDATE BOOKING STATUS AND ASSIGN TO VENDOR
export const updateBooking = async (req, res, next) => {
    const {userId} = req.body;
    try {
        const updateBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status: 'grabbed', vendor: userId},
            { new: true }
        );
        if (!updateBooking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(updateBooking)

    } catch (err) {
        next(err)
    }
}

// GET BOOKING FOR A USER
export const getBooking = async (req, res, next) => {
    try {
        // Convert the userId to an ObjectId using mongoose.Types.ObjectId
        const userId = new mongoose.Types.ObjectId(req.params.userId);
        const getBooking = await Booking.find({userId});
        if(!getBooking){
            return res.status(404).json({message: 'Booking not found'})
        }
        res.status(200).json(getBooking);
    } catch (err) {
        next(err);
    }
}

// GET ALL AVAILABLE BOOKINGS
export const getAllBookingsAdmin = async (req, res, next) => {
    try {
        const allBookingsAdmin = await Booking.find({status: 'pending', vendor: null}).populate('userId', 'username phoneNumber');
        res.status(200).json(allBookingsAdmin)

    } catch (err) {
        next(err)
    }
}

// GET ALL BOOKINGS FOR VENDOR
export const getBookingsVendor = async(req, res, next) => {
    try{
        const deliveries = await Booking.find({vendor: req.params.userId});
        res.status(200).json(deliveries);
    }catch (err) {
        next(err);
    }
}

// DELETE BOOKING
export const deleteBooking = async (req, res, next) => {

    try {
        await Booking.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Booking has been deleted")

    } catch (err) {
        next(err)
    }
}
