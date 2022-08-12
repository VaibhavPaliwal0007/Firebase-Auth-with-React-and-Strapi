import { useEffect, useRef, useState } from "react";
import { auth } from "../config/firebase-config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function Form(props) {
    const numberRef = useRef();
    const otpRef = useRef();
    const [showOtp, setShowOtp] = useState(false);
    const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
    const [confirmationResult, setConfirmationResult] = useState(null);

    const generateRecaptcha = async () => {
        try {
            const recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: function (response) {
                        console.log(response);
                    },
                },
                auth
            );
            setRecaptchaVerifier(recaptchaVerifier);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        generateRecaptcha();
    }, []);

    const requestOtp = async (e) => {
        e.preventDefault();

        const recaptcha = recaptchaVerifier;
        const phoneNumber = "+91" + numberRef.current.value;

        console.log(phoneNumber);
        console.log(recaptcha);

        try {
            const confirmationResult = await signInWithPhoneNumber(
                auth,
                phoneNumber,
                recaptcha
            );
            console.log(confirmationResult);
            setConfirmationResult(confirmationResult);
            setShowOtp(true);
        } catch (error) {
            console.log(error);
            setShowOtp(false);
        }
    };

    const loginViaOtp = async (e) => {
        e.preventDefault();

        const otp = otpRef.current.value;
        try {
            if (otp.length === 6) {
                const user = await confirmationResult.confirm(otp);
                // get access token or jwt token
                const token = await user.getIdToken();
                props.setToken(token);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="m-5">
            <form className="w-full max-w-sm">
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-2/3">
                        <input
                            ref={numberRef}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-number"
                            type="number"
                            placeholder="enter number"
                        />
                    </div>
                </div>
                {showOtp && (
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-2/3">
                            <input
                                ref={otpRef}
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                id="inline-password"
                                type="number"
                            />
                        </div>
                    </div>
                )}
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        {!showOtp && (
                            <button
                                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                type="button"
                                onClick={requestOtp}
                            >
                                Send OTP
                            </button>
                        )}
                        {showOtp && (
                            <button
                                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                type="button"
                                onClick={loginViaOtp}
                            >
                                Verify OTP
                            </button>
                        )}
                    </div>
                    <div id="recaptcha-container" />
                </div>
            </form>
        </div>
    );
}
