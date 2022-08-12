import { useState, useEffect } from "react";
import { auth } from "./config/firebase-config";

import Form from "./components/Form";
import Button from "./components/Button";
import { onAuthStateChanged } from "firebase/auth";

function App() {
    const [, setAuth] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        try {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setAuth(true);
                    console.log(user);
                    user.getIdToken().then((token) => setToken(token));
                } else {
                    setAuth(false);
                    setToken(null);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchData(token);
    }, [token]);

    const fetchData = async (token) => {
        if(token === null){
            return;
        }
       
        try {
            const res = await fetch("http://localhost:1337/api/user-registrations/verifytoken", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    token: token,
                }),
            });

            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="mt-10 flex-col items-center justify-center">
            <Button setAuth={setAuth} />
            <Form setToken={setToken}/>
        </div>
    );
}

export default App;
