import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import { messageContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import "./styles.css"
import { errorDisplay } from "../../Components/Utillities/errorDisplay";
import { whatsapp } from "../../Components/Utillities/icons";
import { LINK } from "../../ConstantString";
import { SENT_VERIFICATION_LINK } from "../../Components/ConstantStrings";
function SignIn() {
  const [verificationMessage, setVerificationMessage] = useState("");
  const navigate = useNavigate();
  // const [userDetailsObj, setUserDetailsObj] = useState({});
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const {
    errorMessage,
    setErrorMessage,
    email,
    setEmail,
    password,
    setPassword,
    name,
    setWelcomeChatPage,
    activeUser,
    setActiveUser,
    loading, setLoading
  } = useContext(messageContext);

  useEffect(() => {
    setErrorMessage("");
    return setLoading(false)
  }, []);

  // connectAuthEmulator(auth, "http://localhost:9899");
  const handleSignIn = () => {
    setLoading(true);
    // e.preventDefault();
    setWelcomeChatPage(true);
    loginEmailPassword();
  };
  // const displayLoginStatus = () => {

  // };
  // const auth = getAuth();
  // signUpEmailPassword

  const loginEmailPassword = async () => {
    // console.log(emailExists)
    const loginEmail = email;
    const loginPassword = password;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      // const actionCodeSettings = {
      //   url: LINK.AFTER_VERIFICATION_REDIRECT_TO_URL,
      //   handleCodeInApp: true
      // };
      // await sendEmailVerification(auth.currentUser, actionCodeSettings)
      // setDisplayError("Messages.sentVerification")

      // await sendEmailVerification(auth.currentUser, actionCodeSettings)
      // setVerificationMessage(SENT_VERIFICATION_LINK)

      console.log("userCredential signup", userCredential);
      const { uid } = auth.currentUser;

      console.log("userCredential signin ", userCredential);
      setErrorMessage("");
      navigate(`/LiveChat/${auth.currentUser.uid}`);
    } catch (error) {
      console.log(error, "in signin error");
      // showLoginError(error);
      errorDisplay(error, email, setErrorMessage);
    }
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        setErrorMessage("");
        // navigate("/LiveChat")
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <>
      {/* {loading ? :} */}
        {loading ? <div className="lds-ellipsis" style={{ "font-size": "15rem", "margin":"auto","height":"100vh","width":"100vw" }}>
          <div>.</div><div>.</div><div>.</div><div>.</div>
        </div> :
      <div className="signIn">
        <div className="registerHeader"><h2>Whatsapp-Web</h2></div>
          <div className="form">
            <h3>Please SignIn...</h3>

            <input
              className="textInput"
              id="userEmail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              placeholder="Enter email..."
            // onKeyDown={handleEnter}
            />

            <input
              className="textInput"
              id="userPassword"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter Password..."
            // onKeyDown={handleEnter}
            />

            <br /><br />
            <p style={{ color: "red" }}>{errorMessage}</p>
            {/* <button onClick={googleSignIn}>Sign In G</button> */}
            <div className="">
              <button className="registration" onClick={handleSignIn}>Sign In</button>
              {/* {!user && <button onClick={handleSignUp}>Sign Up</button>} */}
              <button className="registration" onClick={() => navigate("/SignUp")}>New User, SignUp</button>
            </div>
          </div>
        
        <div className="icon">
          {/* <p className="whatsapp_label"></p> */}
          <label className="whatsapp_logo">{whatsapp}</label>
        </div>
      </div>
    }
    </>
  );
}
export default SignIn;

// import { errorDisplay } from "../Utillities/errorDisplay";
// // import { signUpEmailPassword } from "../Utillities/signUpEmailPassword";
// import { IMAGES } from "../Utillities/Images";
// import { whatsapp } from "../Utillities/icons";