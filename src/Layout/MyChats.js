import { ChatState } from "../Context/ChatProvider.js";
import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { api } from "../API/API.js";
import { getSender } from "../../src/NameChat.js";

export default function MyChats({ fetchAgain }) {
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const [lodUser, setLogUser] = useState();

  async function fetchChats(req, res) {
    try {
      const { data } = await api.get(`api/chat`);
      setChats(data);
      setLogUser(JSON.parse(localStorage.getItem("userInfo")));
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    setLogUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        Minhas Conversas
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats.map((chat) => {
          return (
            <Box
              onClick={() => setSelectedChat(chat)}
              cursor="pointer"
              bg="#E8E8E8"
              display="flex"
              ustifyContent="space-between"
              alignItems="center"
              _hover={{
                background: "#FF8261",
                color: "black",
              }}
              color={"black"}
              m={1}
              px={2}
              py={2}
              borderRadius="lg"
              key={chat._id}
            >
              <Text>{getSender(lodUser, chat.users)}</Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
