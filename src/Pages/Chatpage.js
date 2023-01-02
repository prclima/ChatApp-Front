import { useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../Layout/SideDrawer";
import MyChats from "../Layout/MyChats";
import ChatBox from "../Layout/ChatBox";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Chatpage() {
  const [fetchAgain, setFetchAgain] = useState(false);
  const navigate = useNavigate();
  const { user } = ChatState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      navigate("/chats");
    }
  }, []);

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
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
}
