import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import bookingsRoute from "./routes/bookings.js";
import cors from 'cors';
import axios from "axios";
import moment from "moment";
// import http from "http";
import bodyParser from "body-parser";
// import fs from "fs";
import stkPushRoute from './routes/stkPush.js';

dotenv.config();

const app = express();

// MongoDB connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB!");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected");
});

mongoose.connection.on("connected", () => {
    console.log("mongoDB connected");
});

connect();

// Middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cookie parser and JSON middleware
app.use(express.json());

// Routes
app.use("/api/authentication", authRoute);
app.use("/api/users", userRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api", stkPushRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Oops! Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

// Root endpoint
app.get("/", (req, res) => {
    res.send("MAJI BOOKING API WITH NODE JS");
    const timeStamp = moment().format("YYYYMMDDHHmmss");
    console.log(timeStamp);
});

// Register URL for C2B
app.get("/registerurl", (req, resp) => {
    getAccessToken()
        .then((accessToken) => {
            const url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";
            const auth = "Bearer " + accessToken;
            axios.post(
                url,
                {
                    ShortCode: process.env.BUSINESS_SHORT_CODE,
                    ResponseType: "Complete",
                    ConfirmationURL: "http://example.com/confirmation",
                    ValidationURL: "http://example.com/validation",
                },
                {
                    headers: { Authorization: auth },
                }
            )
                .then((response) => {
                    resp.status(200).json(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    resp.status(500).send("❌ Request failed");
                });
        })
        .catch(console.log);
});

app.get("/confirmation", (req, res) => {
    console.log("All transactions will be sent to this URL");
    console.log(req.body);
});

app.get("/validation", (req, resp) => {
    console.log("Validating payment");
    console.log(req.body);
});

// Start server
const port = process.env.PORT;
app.listen(port, () => {
    console.log("App listening on port " + port);
});

// Access Token Function
async function getAccessToken() {
    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    const auth = "Basic " + Buffer.from(process.env.SAFARICOM_CONSUMER_KEY + ":" + process.env.SAFARICOM_CONSUMER_SECRET).toString("base64");

    try {
        const response = await axios.get(url, {
            headers: { Authorization: auth },
        });
        const accessToken = response.data.access_token;
        return accessToken;
    } catch (error) {
        console.error("Error in getAccessToken:", error);
        throw error;
    }
}

















// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import authRoute from "./routes/auth.js";
// import userRoute from "./routes/users.js";
// import bookingsRoute from "./routes/bookings.js";
// import cookieParser from "cookie-parser";
// import cors from 'cors';
// import axios from "axios";
// import moment from "moment";
// import http from "http";
// import bodyParser from "body-parser";
// import fs from "fs"

// const app = express()
// dotenv.config()


// const connect = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO);
//         console.log("Connected to mongoDB!")
//     } catch (error) {
//         throw error;
//     }
// };

// connect();

// mongoose.connection.on("disconnected", () => {
//     console.log("mongoDB disconnected")
// })

// mongoose.connection.on("connected", () => {
//     console.log("mongoDB connected")
// })

// // middlewares
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }));
// app.use(cookieParser());
// app.use(express.json());

// // MongoDB Atlas Connection


// // Routes
// app.use("/api/authentication", authRoute);
// app.use("/api/users", userRoute);
// app.use("/api/bookings", bookingsRoute);

// app.use((err, req, res, next) => {
//     const errorStatus = err.status || 500;
//     const errorMessage = err.message || "Oops! Something went wrong!"
//     return res.status(errorStatus).json({
//         success: false,
//         status: errorStatus,
//         message: errorMessage,
//         stack: err.stack,
//     })
// });



// // ACCESS TOKEN FUNCTION
// async function getAccessToken() {
//     const url =
//       "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
//     const auth =
//       "Basic " +
//       new Buffer.from(process.env.SAFARICOM_CONSUMER_KEY + ":" + SAFARICOM_CONSUMER_SECRET).toString("base64");
  
//     try {
//       const response = await axios.get(url, {
//         headers: {
//           Authorization: auth,
//         },
//       });
     
//       const dataresponse = response.data;
//       // console.log(data);
//       const accessToken = dataresponse.access_token;
//       return accessToken;
//     } catch (error) {
//       throw error;
//     }
//   }

//   app.get("/", (req, res) => {
//     res.send("MAJI BOOKING API WITH NODE JS");
//     var timeStamp = moment().format("YYYYMMDDHHmmss");
//     console.log(timeStamp);
//   });
  

// //MPESA STK PUSH ROUTE
// app.get("/stkpush", (req, res) => {
//     getAccessToken()
//       .then((accessToken) => {
//         const url =
//           "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
//         const auth = "Bearer " + accessToken;
//         const timestamp = moment().format("YYYYMMDDHHmmss");
//         const password = new Buffer.from(
//             process.env.BUSINESS_SHORT_CODE +
//             process.env.PASS_KEY +
//             timestamp
//         ).toString("base64");
  
//         axios
//           .post(
//             url,
//             {
//               BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
//               Password: password,
//               Timestamp: timestamp,
//               TransactionType: "CustomerPayBillOnline",
//               Amount: "10",
//               PartyA: "0114097019", //phone number to receive the stk push
//               PartyB: process.env.BUSINESS_SHORT_CODE,
//               PhoneNumber: "",
//               CallBackURL: "https://dd3d-105-160-22-207.ngrok-free.app/callback",
//               AccountReference: "BARAMAJI",
//               TransactionDesc: "Mpesa Daraja API stk push",
//             },
//             {
//               headers: {
//                 Authorization: auth,
//               },
//             }
//           )
//           .then((response) => {
//             res.send("😀 Request is successful done ✔✔. Please enter mpesa pin to complete the transaction");
//           })
//           .catch((error) => {
//             console.log(error);
//             res.status(500).send("❌ Request failed");
//           });
//       })
//       .catch(console.log);
//   });



//   //STK PUSH CALLBACK ROUTE
// app.post("/callback", (req, res) => {
//     console.log("STK PUSH CALLBACK");
//     const CheckoutRequestID = req.body.Body.stkCallback.CheckoutRequestID;
//     const ResultCode = req.body.Body.stkCallback.ResultCode;
//     var json = JSON.stringify(req.body);
//     fs.writeFile("stkcallback.json", json, "utf8", function (err) {
//       if (err) {
//         return console.log(err);
//       }
//       console.log("STK PUSH CALLBACK JSON FILE SAVED");
//     });
//     console.log(req.body);
//   });
  
//   // REGISTER URL FOR C2B
//   app.get("/registerurl", (req, resp) => {
//     getAccessToken()
//       .then((accessToken) => {
//         const url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";
//         const auth = "Bearer " + accessToken;
//         axios
//           .post(
//             url,
//             {
//               ShortCode: "174379",
//               ResponseType: "Complete",
//               ConfirmationURL: "http://example.com/confirmation",
//               ValidationURL: "http://example.com/validation",
//             },
//             {
//               headers: {
//                 Authorization: auth,
//               },
//             }
//           )
//           .then((response) => {
//             resp.status(200).json(response.data);
//           })
//           .catch((error) => {
//             console.log(error);
//             resp.status(500).send("❌ Request failed");
//           });
//       })
//       .catch(console.log);
//   });

//   app.get("/confirmation", (req, res) => {
//     console.log("All transaction will be sent to this URL");
//     console.log(req.body);
//   });
  
//   app.get("/validation", (req, resp) => {
//     console.log("Validating payment");
//     console.log(req.body);
//   });
  


// const port = process.env.PORT
// const hostname = "localhost";
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());

// const server = http.createServer(app);

// app.listen(port, () => {
//     connect()
//     console.log("connected to backend!, App listening on port " +port)
// })