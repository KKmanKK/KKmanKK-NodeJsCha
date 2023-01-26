import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

export const Login = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [show, setShow] = useState(false);

  const showPass = () => setShow(!show);
  const submitHeandler = () => {};
  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Введите свою почту"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl id="pass" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Введите пароль"
            onChange={(e) => setPass(e.target.value)}
          ></Input>
          <InputRightElement w="4.5rem">
            <Button h="1.7em" size="sm" onClick={showPass}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        w="100%"
        marginTop={15}
        onClick={submitHeandler}
      >
        Login
      </Button>
    </VStack>
  );
};
