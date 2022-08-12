import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default function Button(props) {
    const loginWithGoogle = () => {
        firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((userCred) => {
                if (userCred) {
                    props.setAuth(true);
                }
            });
    };

    const loginWithTwitter = () => {
        firebase
            .auth()
            .signInWithPopup(new firebase.auth.TwitterAuthProvider())
            .then((result) => {
                const {user, token, secret} = result;

                console.log(token, secret, user);
                
                if (user) {
                    props.setAuth(true);
                }
            }).catch((error) => {
                console.log(error);
            });
    };

    const loginWithFacebook = () => {
        alert("Copy your api key from developers.facebook.com and then try");
    };

    return (
        <>
            <div className="m-5">
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={loginWithGoogle}
                >
                    Login with Google
                </button>
            </div>
            <div className="m-5">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={loginWithFacebook}>
                    Login with Facebook
                </button>
            </div>
            <div className="m-5">
                <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded" onClick={loginWithTwitter}>
                    Login with Twitter
                </button>
            </div>
        </>
    );
}
