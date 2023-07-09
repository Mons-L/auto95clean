import Stripe from "stripe"

export const handleInvoicePaid = async (event, stripe) => {
    const invoice = event.data.object
    const subscriptionId = invoice.subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    const userId = subscription.metadata.userId
    console.log("infos", invoice, subscriptionId, subscription, userId)
    console.log("store in db what you want")
}