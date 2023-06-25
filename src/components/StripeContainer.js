import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY = "pk_test_51NLt2OKmoH5B0QYknN9smjj7thMiUTLwiSc165S46h2xiXQMzr4D1z4ZOycD9AbhtLJHHmyIEFm2wcFLlZOGsZ9R00liVXedvO"
const stripeTestPromise = loadStripe(PUBLIC_KEY)

const StripeContainer = (props) => {
    return(
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    )
}

export default StripeContainer