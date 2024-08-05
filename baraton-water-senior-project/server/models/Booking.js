import mongoose from 'mongoose';

const BookingSchema =  new mongoose.Schema({
    
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    area:{
        type:String,
        required: true,
    },
    plot:{
        type:String,
        required: true,
    },
    amount:{
        type:Number,
        required: true,
    },
    status:{
        type:String,
        enum: ['not-grabbed', 'grabbed', 'pending', 'delivered'],
        default: 'not-grabbed',
    },
    vendor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default:null,
    }
}
);

export default mongoose.model("Booking", BookingSchema)