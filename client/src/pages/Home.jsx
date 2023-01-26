import React from "react";
import {
  Box,
  Container,
  Text,
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
  Tab,
} from "@chakra-ui/react";
import { Login } from "../components/aunthetication/Login";
import { SignUp } from "../components/aunthetication/SignUp";
export const Home = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        backgroundColor="white"
        d="flex"
        justifyContent="center"
        textAlign="center"
        p={3}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="3xl">Chat</Text>
      </Box>
      <Box bg="white" p={4} w="100%" borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};
