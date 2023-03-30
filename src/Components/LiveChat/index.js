import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import dp from "../../Assets/dp1.png"
// "src/Assets/dp1.svg"
import "./styles.css";
import { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  where
} from "firebase/firestore";
import SendMessage from "../Cells/SendMessage";
import SignOut from "../Atoms/SignOut";
import { messageContext } from "../../App";
import { getAuth } from "firebase/auth";
import SideBar from "../SideBar";
import { useParams } from "react-router-dom";
import { IMAGES } from "../Utillities/Images";

function LiveChat() {
  const param = useParams()
  // const [user] = useAuthState(auth);
  // console.log("user<><><><.", user, param)
  const docRef = collection(db, "messages");


  const { setErrorMessage, recieverDetails, setRecieverDetails,welcomeChatPage, setWelcomeChatPage,activeUser} = useContext(messageContext);
  setErrorMessage("");
  // param = activeUser.name
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (Object.keys(recieverDetails)?.length > 0) {
      setWelcomeChatPage(false);
      const q = query(
        collection(db, "messages"),
        orderBy("createdAt"),
        // limit(50),
        // auth?.currentUser?.uid && where("uid","==",onSnapshot?.currentUser?.uid),
      );

      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        let messagesList = [];
        console.log("<>snapshot<>", QuerySnapshot);

        QuerySnapshot.forEach((doc) => {
          console.log("<>snapshot foreach<>", doc, doc.id, typeof doc);
          messagesList.push({ ...doc.data(), id: doc.id });
          console.log("messages<>: ", messagesList)
        });
        setMessages(messagesList);
      });
      console.log("recieverDetails ",recieverDetails)
      return () => unsubscribe;
    }
    else{
      setWelcomeChatPage(true)
    }
    console.log("recieverDetails ",recieverDetails)
  }, [recieverDetails])

  return (
    //RecieveChat
    <div className="liveChat">
      {/* {!auth.currentUser.uid && console.log("null chak")} */}
      <SignOut />
      <div class="d-flex justify-content-start">
        <SideBar />

        <div>
        {welcomeChatPage && <div class="align-middle w-100 h-50"> Select a contact to chat</div>}
          <ul>
            {messages?.map((message) => (
              <li>{message.text}</li>
            ))}
          </ul>
          <div className="container">
            <img
              src={IMAGES.DP1}
              alt="Avatar"
              style={{ width: "100%" }}
            />
            <p>Hello. How are you today?</p>
            <span className="time-right">11:00</span>
          </div>
          {/* src/Assets/dp1.jpeg */}
          <div className="container darker">
            <img
              src="https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-66609.jpg?w=2000"
              alt="Avatar"
              className="right"
              style={{ width: "100%" }}
            />
            <p>fine. Thanks for asking!</p>
            <span className="time-left">11:01</span>
          </div>
          {/* <img src={dp}/> */}
          <SendMessage />
        </div>
      </div>
      {/* {setRecieverDetails?.map()} */}
    </div>
  );
}

export default LiveChat;
