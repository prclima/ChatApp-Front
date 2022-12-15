import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip, Text, Input } from "@chakra-ui/react";
import { Button, Box, Avatar, AvatarBadge } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../Context/ChatProvider";
import Perfil from "../Layout/Perfil";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/hooks";
import UserListItem from "../Components/Autenticacao/userListItem.js";
import { api } from "../API/API";
import { useToast } from "@chakra-ui/react";
import { getSender } from "../NameChat";

export default function SideDrawer() {
  const [search, setSearch] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loadingChat, setLoadingChat] = useState(true);
  const toast = useToast();

  // contexto
  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function HandleSearch() {
    try {
      const { data } = await api.get(`api/user?search=${search}`);
      setSearchResult(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  async function acessChat(userId) {
    try {
      const { data } = await api.post(`api/chat`, { userId });
      console.log(data);
      if (!chats.find((item) => item._id === data._id))
        setChats([data, ...chats]);

      setSelectedChat(data);
      onClose();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Procurar usuário" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <Text p="4px">Procurar Usuários</Text>
          </Button>
        </Tooltip>

        <Text fontSize="2x1" fontFamily="Work sans">
          <ChatIcon mr={2} />
          Chat App
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon boxSize={7} p={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "Sem novas mensagens"}
              {notification.map((item) => (
                <MenuItem>
                  {`Nova mensagem de: ${getSender(user, item.chat.users)}`}
                  {console.log(notification)}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar size="sm" cursor="pointer">
                <AvatarBadge boxSize="1.25em" bg="green.500" />
              </Avatar>
            </MenuButton>
            <MenuList>
              <Perfil user={user}>
                <MenuItem> Perfil </MenuItem>
              </Perfil>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  localStorage.setItem("userInfo", JSON.stringify(null));
                  navigate("/");
                  toast({
                    title: "Tchau, até mais...",
                    status: "info",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                  });
                }}
              >
                {" "}
                Sair{" "}
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Buscar Usuário</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Procure o Usuário pelo nome ou e-mail"
                mr={2}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Button onClick={HandleSearch}>Buscar</Button>
            </Box>
            {searchResult.map((item) => {
              return (
                <UserListItem
                  key={item._id}
                  item={item}
                  HandleFunction={() => acessChat(item._id)}
                />
              );
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
