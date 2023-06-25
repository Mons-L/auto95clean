import {useState} from "react";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import axios from "axios";
import {Button, Form, FormGroup} from "react-bootstrap";

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Sergoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": {color: "#fce883"},
            "::placeholder": {color: "#87bbfd"}
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }


}

const PaymentForm = (props) => {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if (!error) {
            try {
                const {id} = paymentMethod
                const response = await axios.post("http://localhost:8080/payment", {
                    amount: 1000,
                    id: id
                })

                if (response.data.success) {
                    console.log("success payment")
                    setSuccess(true)
                }
            } catch (error) {
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
    }

    return(
        <>
            {
                !success?
                    <Form onSubmit={handleSubmit}>
                        <fieldset className={"FormGroup"}>
                            <CardElement options={CARD_OPTIONS} onChange={() => console.log("event")} />
                        </fieldset>
                        <Button>Payer</Button>
                    </Form>
                :
                    <div>
                        <h2>Vous venez d'acheter</h2>
                    </div>
            }
        </>
    )
}

export default PaymentForm