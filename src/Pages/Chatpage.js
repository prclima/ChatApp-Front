import { useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../Layout/SideDrawer";
import MyChats from "../Layout/MyChats";
import ChatBox from "../Layout/ChatBox";

export function Chatpage() {
  const { user } = ChatState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
  }, [user]);

  return (
    <div style={{ width: "100%" }}>
      <SideDrawer />

      <Box
        display="flex"
        justifyContent="space-between"
        p="10px"
        w="100%"
        h="91.5vh"
      >
        {/* {user && <MyChats />}
        {user && <ChatBox />} */}
        <MyChats />
        <ChatBox />
      </Box>
    </div>
  );
}
