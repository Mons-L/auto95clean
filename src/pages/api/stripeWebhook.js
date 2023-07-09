import {buffer} from "micro";
import {Stripe} from "stripe";
import {stripe} from "../../services/stripe/client"
import {handleInvoicePaid} from "../../services/stripe/stripWebhookHandlers";

// Stripe requires the raw body to construct the event.
export const config = {
    api: {
        bodyParser: false
    }
}

const webHookSecret = process.env.STRIPE_SECRET_WEBHOOK

export default async function handler(req, res){
    const method = req.method;

    switch(method){
        case 'POST': return handlePost(req, res);
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).json({
                data: null,
                error: { message: 'Method ' + method + ' not allowed' }
            });
    }
}

const handlePost = async (req, res) => {
    const buf = await buffer(req)
    const signature = req.headers["stripe-signature"]
    let event = null

    try{
        event = stripe.webhooks.constructEvent(buf, signature, webHookSecret)

        switch (event.type){
            case "invoice.paid":
                await handleInvoicePaid(event, stripe)
                break
            default:
                break
        }

        // Record the event in database
        const insertedId = "fictif"
        return res.status(200).json({
            data: { message: "Event received and saved successfully in database", insertedId: insertedId },
            error: null
        });
    }
    catch (err) {
        const message = "[stripeWebhook] " + err
        console.error(message);
        return res.status(500).json({
            data: null,
            error: { message: message }
        });
    }
}
