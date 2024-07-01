import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';

export default function CheckoutForm() {
    const location = useLocation();
    console.log(location.state);
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentMode, setPaymentMode] = useState(null);
    const [balance, setBalance] = useState(location.state.balance);
    const [user, setUser] = useState(location.state.user);

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!paymentMode) {
            Swal.fire({
                title: "Error!",
                text: "Please select a payment mode.",
                icon: "error"
            });
            return;
        }

        Swal.fire({
            title: "Processing Payment",
            text: `You selected ${paymentMode}. Please wait...`,
            icon: "info",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            let response;
            if (paymentMode === "Stripe") {
                response = await axios.post("http://localhost:5000/stripe-payment", {
                    amount: balance,
                    user: user,
                });
            } else if (paymentMode === "SSL Commerz") {
                response = await axios.post("http://localhost:5000/sslcommerz-payment", {
                    amount: balance,
                    email: user.email,
                });
            }

            if (response) {
                console.log(response.data.clientSecret);
                Swal.fire({
                    title: "Payment Successful",
                    text: `Transaction Id : ${response.data.clientSecret}`,
                    icon: "success"
                });
            } else {
                throw new Error(response.data.message || "Payment failed");
            }
        } catch (error) {
            Swal.fire({
                title: "Payment Failed",
                text: error.message,
                icon: "error"
            });
        }
    };

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:5000",
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message);
            } else {
                setMessage("An unexpected error occurred.");
            }
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}
