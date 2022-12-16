import {
  VStack,
  FormControl,
  Input,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  // http://localhost:8080
  // "https://quiet-star-3608.fly.dev/api/user/login",
  async function HandleSubmit(e) {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:8080/api/user/login", {
        email,
        password,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chats");
    } catch (err) {
      toast({
        title: "Ops... usuário/senha não encotrados",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.log(err);
    }
  }
  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>E-mail de Cadastro</FormLabel>
        <Input
          name="email"
          type={"email"}
          placeholder="Informe seu e-mail"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Senha</FormLabel>
        <Input
          name="password"
          type={"password"}
          placeholder="Informe sua senha"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={HandleSubmit}
      >
        Entrar!
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("convidado@seguro.com");
          setPassword("Senha@Segura123");
        }}
      >
        Entrar como convidado
      </Button>
    </VStack>
  );
}
