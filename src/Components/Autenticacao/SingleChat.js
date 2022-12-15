import { Box, FormControl, Input, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import { api } from "../../API/API.js";
import Scroll from "../Scroll";
import { io } from "socket.io-client";

const ENDPOINT = "quiet-star-3608.fly.dev";
let socket, selectedChatComp;

function SingleChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);

  const {
    user,
    selectedChat,
    setSelectedChat,
    setChats,
    notification,
    setNotification,
  } = ChatState();

  async function fetchMessages() {
    try {
      const { data } = await api.get(`api/message/${selectedChat._id}`);

      setMessages(data);
      socket.emit("join chat", selectedChat._id);
    } catch (err) {
      console.log(err);
    }
  }
  //socket.io - conexao
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  // socket.io - mensagem recebida
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatComp ||
        selectedChatComp._id !== newMessageRecieved.chat._id
      ) {
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  useEffect(() => {
    fetchMessages();
    selectedChatComp = selectedChat;
  }, [selectedChat]);

  async function sendMessage(e) {
    if (e.key === "Enter") {
      try {
        setNewMessage("");
        const { data } = await api.post("api/message", {
          content: newMessage,
          chatId: selectedChat._id,
        });
        setMessages([...messages, data]);

        //socket.io - send
        socket.emit("new message", data);
      } catch (err) {
        console.log(err);
      }
    }
  }

  function typingHandler(e) {
    setNewMessage(e.target.value);
  }

  return (
    <>
      <Text p="4px" fontSize="1.55rem" color="black">
        {selectedChat && user
          ? user.data._id === selectedChat.users[0]._id
            ? selectedChat.users[1].name
            : selectedChat.users[0].name
          : "Selecione uma Conversa..."}
      </Text>
      <Box
        display="flex"
        flexDir="column"
        justifyContent="flex-end"
        p={3}
        bg="#E8E8E8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        <div className="messages">
          <Scroll messages={messages} />
        </div>
        <FormControl onKeyDown={sendMessage}>
          <Input
            variant="filled"
            _placeholder="Digite..."
            onChange={typingHandler}
            value={newMessage}
          />
        </FormControl>
      </Box>
    </>
  );
}
export default SingleChat;
