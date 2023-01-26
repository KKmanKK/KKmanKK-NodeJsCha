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

export const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);

  const showPass = () => setShow(!show);
  const postDetails = () => {};
  const submitHeandler = () => {};
  return (
    <VStack spacing="5px">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Введите свое имя"
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </FormControl>

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

      <FormControl id="confirm-pass" isRequired>
        <FormLabel>Confirm-Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Введите свое имя"
            onChange={(e) => setConfirmPass(e.target.value)}
          ></Input>
          <InputRightElement w="4.5rem">
            <Button h="1.7em" size="sm" onClick={showPass}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic" isRequired>
        <FormLabel>Pic</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => {
            postDetails(e.target.files[0]);
          }}
        ></Input>
      </FormControl>

      <Button
        colorScheme="blue"
        w="100%"
        marginTop={15}
        onClick={submitHeandler}
      >
        SignUp
      </Button>
    </VStack>
  );
};
