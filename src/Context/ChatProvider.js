import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ChatContext = createContext()


function ChatProvider({children}) {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats]= useState([]);
    const [notification, setNotification] = useState([])


    useEffect(()=> {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo)
        if (!userInfo)
        {
            navigate("/")
        }
    },[navigate])

    return (
        <ChatContext.Provider value={{user, setUser, selectedChat, setSelectedChat, chats, setChats, notification, setNotification}}>
            {children}
        </ChatContext.Provider>
    );
}

function ChatState(){
    return useContext(ChatContext)
}

export  { ChatState, ChatContext, ChatProvider };