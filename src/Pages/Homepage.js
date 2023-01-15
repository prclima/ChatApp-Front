import { Box, Container, Text } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Login } from "../Components/Autenticacao/Login";
import { Signup } from "../Components/Autenticacao/Signup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Homepage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      navigate("/chats");
    }
  }, []);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        w="100%"
        bg="white"
        m="4px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text md={50} fontSize="4xl" align="center">
          <ChatIcon color="#ED8936" /> {""} Chat App
        </Text>
      </Box>
      <Box w="100%" borderRadius="lg" borderWidth="1px" bg="white">
        <Tabs variant="soft-rounded">
          <TabList>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>

            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
