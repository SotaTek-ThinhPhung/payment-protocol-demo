// This is your test secret API key.
require('dotenv').config({ path: "./.env" });
const apiKey = process.env.STRIPE_API_KEY
const endpointKey = process.env.STRIPE_ENDPOINT_KEY
const domain = process.env.DOMAIN
const stripe = require('stripe')(apiKey);
const express = require('express');
const app = express();
app.use(express.static('stripe-payment/fe'));

const endpointSecret = endpointKey;

const bodyParser = require('body-parser');

const fulfillOrder = (session) => {
    // TODO: fill me in
    console.log("Fulfilling order", session);
}

app.post('/create-checkout-session', async (req, res) => {
    console.log("Create checkout session")
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: process.env.PRODUCT_ID,
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${domain}/success.html`,
        cancel_url: `${domain}/cancel.html`,
    });

    res.redirect(303, session.url);
});

app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
    console.log("Someone calls webhook")
    const payload = request.body;
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
        console.log(`event error: ${err.message}`)
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }
    console.log(event.type)
    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Fulfill the purchase...
        fulfillOrder(session);
    }

    response.status(200);
});

app.listen(4242, () => console.log('Running on port 4242'));