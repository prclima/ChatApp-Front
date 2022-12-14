import { ChatState } from "../Context/ChatProvider";
import { Box, Button, Text } from "@chakra-ui/react";
import SingleChat from "../Components/Autenticacao/SingleChat.js";

export default function ChatBox() {
  const { setSelectedChat, selectedChat, user } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
     
      <Text>
     
      </Text>
      <SingleChat />
    </Box>
  );
}
