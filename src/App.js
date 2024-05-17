import {auth} from "./firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import "./App.css";
import {createContext, useEffect, useState} from "react";

// import SendMessage from "./Components/Cells/SendMessage";
import SideBar from "./Components/SideBar";
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import SignUp from "./View/SignUp";
import {onAuthStateChanged} from "firebase/auth";
import LiveChat from "./View/LiveChat";
import SignIn from "./View/SignIn";

export const messageContext = createContext();

function App() {
  const [user] = useAuthState(auth);
  const [chatDisplay, setChatDisplay] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recieverDetails, setRecieverDetails] = useState({});
  const [activeUser, setActiveUser] = useState({});
  const [welcomeChatPage, setWelcomeChatPage] = useState(true);
  const [actualDbId, setActualDbId] = useState("");
  const [messages, setMessages] = useState([]);
  const [actualDbGroupId, setActualDbGroupId] = useState("");
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastMessage, setLastMessage] = useState("");
  const [unseenCounter, setUnseenCounter] = useState({});
  const [lastTextMessage, setLastTextMessage] = useState("");
  const defaultRec = () =>
    users?.find((user) => user.uid !== auth.currentUser?.uid);

  useEffect(() => {
    const clear = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setActiveUser();
        setWelcomeChatPage(true);
        // ...
      } else {
        setWelcomeChatPage(true);
        // User is signed out
        // ...
      }
    });
    return () => clear();
  }, []);
  return (
    <messageContext.Provider
      value={{
        welcomeChatPage,
        setWelcomeChatPage,
        message,
        setMessage,
        errorMessage,
        setErrorMessage,
        email,
        setEmail,
        password,
        setPassword,
        chatDisplay,
        setChatDisplay,
        recieverDetails,
        setRecieverDetails,
        activeUser,
        setActiveUser,
        actualDbId,
        setActualDbId,
        messages,
        setMessages,
        actualDbGroupId,
        setActualDbGroupId,
        users,
        setUsers,
        loading,
        setLoading,
        chats,
        setChats,
        unseenCounter,
        setUnseenCounter,
        lastMessage,
        setLastMessage,
        lastTextMessage,
        setLastTextMessage,
      }}
    >
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route
              path="/LiveChat/:uid"
              element={user ? <LiveChat /> : <SignUp />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </messageContext.Provider>
  );
}

export default App;
