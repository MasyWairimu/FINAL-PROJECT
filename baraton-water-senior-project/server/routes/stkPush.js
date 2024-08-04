// stkPush.js
import express from "express";
import axios from "axios";
import moment from "moment";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

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

// STK Push Route
router.post("/stkpush", (req, res) => {
    let phoneNumber = req.body.phone;
    const accountNumber = req.body.accountNumber;
    const amount = req.body.amount;

    if (phoneNumber.startsWith("0")) {
        phoneNumber = "254" + phoneNumber.slice(1);
    }

    getAccessToken()
        .then((accessToken) => {
            const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
            const auth = "Bearer " + accessToken;
            const timestamp = moment().format("YYYYMMDDHHmmss");
            const password = Buffer.from(
                process.env.BUSINESS_SHORT_CODE +
                process.env.PASS_KEY +
                timestamp
            ).toString("base64");

            axios.post(
                url,
                {
                    BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
                    Password: password,
                    Timestamp: timestamp,
                    TransactionType: "CustomerPayBillOnline",
                    Amount: amount,
                    PartyA: phoneNumber,
                    PartyB: process.env.BUSINESS_SHORT_CODE,
                    PhoneNumber: phoneNumber,
                    CallBackURL: "https://your-ngrok-url/api/callback",
                    AccountReference: accountNumber,
                    TransactionDesc: "Mpesa Daraja API stk push test",
                },
                {
                    headers: { Authorization: auth },
                }
            )
                .then((response) => {
                    console.log("STK Push Response:", response.data);
                    res.status(200).json({
                        msg: "Request is successfully done. Please enter mpesa pin to complete the transaction",
                        status: true,
                        data: response.data,
                    });
                })
                .catch((error) => {
                    console.error("Error in STK Push request:", error);
                    res.status(500).json({
                        msg: "Request failed",
                        status: false,
                        error: error.response ? error.response.data : error.message,
                    });
                });
        })
        .catch(error => {
            console.error("Error in getting access token:", error);
            res.status(500).json({ msg: "Error getting access token", status: false, error });
        });
});

// STK Push Callback Route
router.post("/callback", (req, res) => {
    console.log("STK PUSH CALLBACK");
    const merchantRequestID = req.body.Body.stkCallback.MerchantRequestID;
    const checkoutRequestID = req.body.Body.stkCallback.CheckoutRequestID;
    const resultCode = req.body.Body.stkCallback.ResultCode;
    const resultDesc = req.body.Body.stkCallback.ResultDesc;
    const callbackMetadata = req.body.Body.stkCallback.CallbackMetadata;
    const amount = callbackMetadata.Item[0].Value;
    const mpesaReceiptNumber = callbackMetadata.Item[1].Value;
    const transactionDate = callbackMetadata.Item[3].Value;
    const phoneNumber = callbackMetadata.Item[4].Value;

    console.log("MerchantRequestID:", merchantRequestID);
    console.log("CheckoutRequestID:", checkoutRequestID);
    console.log("ResultCode:", resultCode);
    console.log("ResultDesc:", resultDesc);
    console.log("Amount:", amount);
    console.log("MpesaReceiptNumber:", mpesaReceiptNumber);
    console.log("TransactionDate:", transactionDate);
    console.log("PhoneNumber:", phoneNumber);

    const json = JSON.stringify(req.body);
    fs.writeFile("stkcallback.json", json, "utf8", function (err) {
        if (err) {
            console.log("Error writing callback data to file:", err);
        } else {
            console.log("STK PUSH CALLBACK STORED SUCCESSFULLY");
        }
    });

    res.status(200).json({ message: "Callback received successfully" });
});

export default router;
