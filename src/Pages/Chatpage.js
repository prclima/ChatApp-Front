

import { ChatState } from "../Context/ChatProvider";
import { Box } from '@chakra-ui/react'
import SideDrawer from "../Layout/SideDrawer";
import MyChats from "../Layout/MyChats";
import ChatBox from "../Layout/ChatBox";
import bkimg from "../img/bkimg.jpg"


export function Chatpage() {
  const { user } = ChatState();
  
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}

      <Box  
      display="flex"
        justifyContent="space-between"
        p="10px"
        w="100%"
       h="91.5vh"
       
       >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
}


