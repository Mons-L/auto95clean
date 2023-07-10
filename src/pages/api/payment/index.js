const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

export default async function handler(req, res){
    const method = req.method;

    switch(method){
        case 'PUT': return handlePut(req, res);
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).json({
                data: null,
                error: { message: 'Method ' + method + ' not allowed' }
            });
    }
}

const handlePut = (req, res) => {
    const {id} = req.body

    try{
        /*const payment = await stripe.paymentIntents.create({
            unit_amount: amount,
            quantity: quantity,
            currency: "eur",
            description: "the description",
            payment_method: id,
            confirm: true
        })
        console.log("Payment", payment)*/
        return res.json({message: "reussi"})
    }
    catch (error){
        console.log("error", error)
        return res.json({message: "errorrrrr"})
    }
}