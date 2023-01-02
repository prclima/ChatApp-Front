import { Box, FormControl, Input, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import { api } from "../../API/API.js";
import Scroll from "../Scroll";
import { io } from "socket.io-client";

const ENDPOINT = "quiet-star-3608.fly.dev";
let socket, selectedChatComp;

function SingleChat({ fetchAgain, setFetchAgain }) {
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
    if (!selectedChat) return;
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
      {selectedChat ? (
        <>
          <Text
            display="flex"
            p="4px"
            fontSize="1.55rem"
            color="black"
            fontFamily="Work sans"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
            w="100%"
          >
            {selectedChat && user
              ? user.data._id === selectedChat.users[0]._id
                ? selectedChat.users[1].name
                : selectedChat.users[0].name
              : "Selecione uma Conversa"}
            <IconButton
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
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
      ) : (
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Selecione uma conversa
          </Text>
        </Box>
      )}
    </>
  );
}
export default SingleChat;

// <>

// <Text p="4px" fontSize="1.55rem" color="black" fontFamily="Work sans">

//   {selectedChat && user
//     ? user.data._id === selectedChat.users[0]._id
//       ? selectedChat.users[1].name
//       : selectedChat.users[0].name
//     : "Selecione uma Conversa"}
// </Text>

// <Box
//   display="flex"
//   flexDir="column"
//   justifyContent="flex-end"
//   p={3}
//   bg="#E8E8E8"
//   w="100%"
//   h="100%"
//   borderRadius="lg"
//   overflowY="hidden"
// >
//   <div className="messages">
//     <Scroll messages={messages} />
//   </div>
//   <FormControl onKeyDown={sendMessage}>
//     <Input
//       variant="filled"
//       _placeholder="Digite..."
//       onChange={typingHandler}
//       value={newMessage}
//     />
//   </FormControl>
// </Box>
// </>
// );
