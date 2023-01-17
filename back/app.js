require("./db/server");
const express = require("express");
// const razorUser = require("./model/user");
const PaymentDetail = require("./model/data")
const contactdetails = require("./model/contac")

var cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const Razorpay = require("razorpay")
const crypto = require("crypto");
const hmac = crypto.createHmac('sha256', 'GAf2uBKYHqxCtYwPL8BdnJ2h');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const { Contact } = require("razorpayx-nodejs-sdk")("rzp_test_hYOABKStQQJGFI", "GAf2uBKYHqxCtYwPL8BdnJ2h");

const { FundAccount } = require("razorpayx-nodejs-sdk")("rzp_test_hYOABKStQQJGFI", "GAf2uBKYHqxCtYwPL8BdnJ2h");

const { Payout } = require("razorpayx-nodejs-sdk")("rzp_test_hYOABKStQQJGFI", "GAf2uBKYHqxCtYwPL8BdnJ2h");



let razorPayInstance = new Razorpay({
    key_id: 'rzp_test_hYOABKStQQJGFI',
    key_secret: 'GAf2uBKYHqxCtYwPL8BdnJ2h'
})


app.post('/verification', (req, res) => {
    const secret = '123456789'
    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')

    console.log(digest, req.headers['x-razorpay-signature'])

    if (digest === req.headers['x-razorpay-signature']) {
        console.log('webhook work')
        // process it
        // require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
    } else {
        // pass it
    }
    res.json({ status: 'ok' })
})


app.post('/verify', function (req, res, next) {
    console.log('req.body', req.body)

    body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    let crypto = require("crypto");
    let expectedSignature = crypto.createHmac('sha256', 'GAf2uBKYHqxCtYwPL8BdnJ2h')
        .update(body.toString())
        .digest('hex');

    // Compare the signatures
    if (expectedSignature === req.body.razorpay_signature) {
        // console.log('webhook work')
        PaymentDetail.findOneAndUpdate(

            { orderId: req.body.razorpay_order_id },
            {
                paymentId: req.body.razorpay_payment_id,
                signature: req.body.razorpay_signature,
                status: "paid"
            },
            { new: true },
            function (err, doc) {
                if (err) {
                    throw err
                }
                res.status(200).send({
                    title: "Payment verification successful",
                    paymentDetail: doc
                })
            }
        );
    } else {
        res.status(400).send({
            title: "Payment verification failed",
        })
    }
});


app.post("/razorPay", async (req, res) => {
    // console.log(req.body)
    try {
        let amount = req.body.amount
        var instance = new Razorpay({ key_id: 'rzp_test_hYOABKStQQJGFI', key_secret: 'GAf2uBKYHqxCtYwPL8BdnJ2h' })

        let order = await instance.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: "receipt#1",
        })
        const paymentDetail = new PaymentDetail({
            orderId: order.id,
            receiptId: order.receipt,
            amount: order.amount,
            currency: order.currency,
            createdAt: order.created_at,
            status: order.status
        })
        paymentDetail.save(function (err, doc) {
            if (err) {
                return console.error(err);
            }
            console.log("order inserted succussfully!", paymentDetail);
        });
        return res.status(201).json({
            success: true,
            order,
            amount
        })
    } catch (err) {
        console.log(err)
    }
})


app.post("/razorPayy", async (req, res) => {
    // console.log(req.body)
    try {
        let amount = req.body.amount
        var instance = new Razorpay({ key_id: 'rzp_test_hYOABKStQQJGFI', key_secret: 'GAf2uBKYHqxCtYwPL8BdnJ2h' })

        let order = await instance.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: "receipt#1",
            transfers: [
                {
                    account: "acc_L3bpSmR7M6gge2",
                    amount: 1000,
                    currency: "INR",
                    notes: {
                        branch: "Acme Corp Bangalore North",
                        name: "Gaurav Kumar"
                    },
                    linked_account_notes: [
                        "branch"
                    ],
                    on_hold: 1,
                    // 1 week hold
                    on_hold_until: 1674213346
                    //  1 day hold
                    // on_hold_until: 1673694946
                },
                {
                    account: "acc_L3fTk8Mp4WbSug",
                    amount: 1000,
                    currency: "INR",
                    notes: {
                        branch: "wheat Corp Bangalore South",
                        name: "Saurav Kumar"
                    },
                    linked_account_notes: [
                        "branch"
                    ],
                    on_hold: 1,
                    on_hold_until: 1674213346
                }
            ]
        })
        const paymentDetail = new PaymentDetail({
            orderId: order.id,
            receiptId: order.receipt,
            amount: order.amount,
            currency: order.currency,
            createdAt: order.created_at,
            status: order.status
        })
        paymentDetail.save(function (err, doc) {
            if (err) {
                return console.error(err);
            }
            console.log("order inserted succussfully!", paymentDetail);
        });
        return res.status(201).json({
            success: true,
            order,
            amount
        })
    } catch (err) {
        console.log(err)
    }
})


//create contact
app.post('/contacts', async (req, res) => {
    try {
        let name = req.body.name;
        let email = req.body.email;
        let contact = req.body.contact;
        let type = req.body.type;

        let contacts = await Contact.create({
            name: name,
            email: email,
            contact: contact,
            type: type
        })
        const contactdetail = new contactdetails({
            contactId: contacts.id,
            name: contacts.name,
            contact: contacts.contact,
            type: contacts.type,
        })
        contactdetail.save(function (err, doc) {
            if (err) {
                return console.error(err);
            }
            console.log("contact created succussfully!", contactdetail);
        });
        return res.status(201).json({
            success: true,
            contacts
        })
    } catch (err) {
        console.log(err)
    }
})

// create fund account by bank transfer
app.post('/FundAccount', async (req, res) => {
    try {
        let contact_id = req.body.contact_id;
        let account_type = req.body.account_type;
        let bank_account = req.body.bank_account;
        let FundAccounts = await FundAccount.create({
            contact_id: contact_id,
            account_type: account_type,
            bank_account: {
                name: bank_account.name,
                ifsc: bank_account.ifsc,
                account_number: bank_account.account_number
            }
        })
        console.log("fund acc created succussfully!", FundAccounts);
        return res.status(201).json({
            success: true,
            FundAccounts
        })
    } catch (err) {
        console.log(err)
    }
})

// create fund account by upi transfer
app.post('/FundAccountupi', async (req, res) => {
    try {
        let contact_id = req.body.contact_id;
        let account_type = req.body.account_type;
        let vpa = req.body.vpa;
        let FundAccounts = await FundAccount.create({
            contact_id: contact_id,
            account_type: account_type,
            vpa: {
                address: vpa.address,
            }
        })
        console.log("fund acc by upi created succussfully!", FundAccounts);
        return res.status(201).json({
            success: true,
            FundAccounts
        })
    } catch (err) {
        console.log(err)
    }
})


//create payout for fund account
app.post('/payout', async (req, res) => {
    try {
        // let account_number = req.body.account_number;
        let fund_account_id = req.body.fund_account_id;
        let amount = req.body.amount;
        let mode = req.body.mode;
        let purpose = req.body.purpose

        let payouts = await Payout.create({
            account_number: "2323230071661424",
            fund_account_id: fund_account_id,
            amount: amount,
            currency: "INR",
            mode: mode,
            purpose: purpose,
        })
        console.log(payouts);
        console.log("payouts succussfully!", payouts);

        return res.status(201).json({
            success: true,
            payouts
        })
    } catch (err) {
        console.log(err)
    }
})




app.get('/getContacts', async (req, res) => {
    const contacts = await contactdetails.find();
    res.send(contacts)
})


// app.post('/razorPay', function (req, res, next) {
//     params = {
//         amount: req.body.amount * 100,
//         currency: "INR",
//         receipt: 'receipt##111',
//         payment_capture: "1"
//     }
//     razorPayInstance.orders.create(params)
//         .then(async (response) => {
//             const razorpayKeyId = 'rzp_test_hYOABKStQQJGFI'
//             // Save orderId and other payment details
//             const paymentDetail = new PaymentDetail({
//                 orderId: response.id,
//                 receiptId: response.receipt,
//                 amount: req.body.amountt,
//                 currency: response.currency,
//                 createdAt: response.created_at,
//                 status: response.status
//             })
//             try {

//                 await paymentDetail.save()
//                 res.status(201).send({
//                     title: "Confirm Order",
//                     razorpayKeyId: razorpayKeyId,
//                     paymentDetail: paymentDetail,
//                     amount :
//                 })
//             } catch (err) {
//                 console.log('er', err)
//             }
//         }).catch((err) => {
//             console.log('err', errrrrrrrrrrrr)
//         })
// });

// app.post('/verifyPayment', async (req, res) => {
//     try {
//         const { razorPay_order_id, razorPay_payment_id, razorpay_signature } = req.body;
//         const sign = razorPay_order_id + "|" + razorPay_payment_id;
//         const expectedSign = crypto.createHmac("sha256", 'GAf2uBKYHqxCtYwPL8BdnJ2h').update(sign.toString()).digest("hex");

//         if(razorpay_signature===expectedSign){
//             return res.status(200).json({message : "payment verified successfully"})
//         }else{
//             return res.status(400).json({message:"invalid signature sent!"})
//         }

//     } catch (err) {
//         console.log(err)
//     }
// })


// app.post('/payment',async(req,res)=>{
//     console.log('reqqqqqqqqqqqqqqqqqqq payment',req);
// })


// app.post('/signup', async (req, res) => {
//     try {
//         const { name, email, password, payment_Status } = req.body
//         if (!(name && email && password)) {
//             res.status(400).send("All input is required");
//         }
//         // const existUser = await razorUser.findOne({ email: body.email });
//         // if (existUser) {
//         //     return res.status(409).json({ status: false, error: "USER ALREADY REGISTER", data: [] })
//         // }
//         encryptedPassword = await bcrypt.hash(password, Number(10));
//         const user = await razorUser.create({
//             name: name,
//             email: email.toLowerCase(),
//             password: encryptedPassword,
//             payment_Status: payment_Status
//         })
//         return res.status(200).json({ message: "sucess", data: user })

//     } catch (err) {
//         console.log(err)
//         return res.status(401).json({ message: "failed to signup" })
//     }
// })












app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})