import { VStack ,Flex ,Text,Link,Input, Button} from '@chakra-ui/react'
import { useState } from 'react';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReLogIn } from '@/redux/action/authaction';

export default function Login() {
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
		dispatch(ReLogIn(email, password,navigate));
	};



  return (
   <Flex align="center" 
   justify="center" 
   height="100vh" 
   bg="gray.100"
 >
    <VStack     spacing={4} 
    p={8} 
    boxShadow="lg" 
    bg="white"
    width={{ base: "90%", md: "400px" }}
>
    <Input
	type="text"
		placeholder="Enter email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					size="md"
					focusbordercolor="teal.400"
			  
				/>
				<Input
					type="password"
					placeholder="Enter Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					size="md"
					focusbordercolor="teal.400"
			  
				/>
				<Button colorPalette ="teal" 
      width="full" onClick={handleLogin}> LogIn</Button>


    </VStack>
   </Flex>
  )
}
