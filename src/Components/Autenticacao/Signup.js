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

export function Signup() {
  const toast = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function HandleSubmit(e) {
    e.preventDefault();
    try {
      const dados = await axios.post(
        "https://quiet-star-3608.fly.dev/api/user",
        form
      );

      toast({
        title: "Cadastro Realizado!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("userInfo", JSON.stringify(dados));
      console.log(dados);
    } catch (err) {
      toast({
        title: "Todos os campos precisam ser preenchidos",
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
      <FormControl id="first-name" isRequired>
        <FormLabel>Nome</FormLabel>
        <Input
          placeholder="Informe seu nome"
          onChange={handleChange}
          name="name"
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>E-mail</FormLabel>
        <Input
          placeholder="Informe seu e-mail"
          onChange={handleChange}
          name="email"
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Senha</FormLabel>
        <Input
          type={"password"}
          placeholder="Informe sua senha"
          onChange={handleChange}
          name="password"
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={HandleSubmit}
      >
        Cadastrar!
      </Button>
    </VStack>
  );
}
