import { VStack ,Flex ,Text,Input,Box,Button} from '@chakra-ui/react'
import { Link  } from 'react-router-dom';
import { useState } from 'react';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogIn } from '@/redux/action/authaction';

export default function SignUp() {
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log("click")
		dispatch(LogIn(email, password, firstName, lastName, navigate));
	};



  return (
   <Flex align="center" 
   justify="center" 
   height="100vh" 
   bg="gray.100">
          <Box 
        p={8} 
        boxShadow="lg" 
        borderRadius="lg" 
        bg="white" 
        width={{ base: "90%", md: "400px" }}
      >

    <VStack         
        spacing={4} align="stretch">
          <Text 
            fontSize="2xl" 
            fontWeight="bold" 
            textAlign="center" 
            color="teal.600"
          >
            Create an Account
          </Text>

    <Input
                    type="text"
                    placeholder="Enter First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    focusBorderColor="teal.400"
                    size="lg"
                />
                
                {/* Last Name Input */}
                <Input
                    type="text"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    focusbordercolor="teal.400"
                    size="lg"
                />
    <Input
					type="text"
					placeholder="Enter email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
                    focusbordercolor="teal.400"
                    size="lg"

				/>
				<Input
					type="password"
					placeholder="Enter Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
                    focusbordercolor="teal.400"
                    size="lg"

				/>


				<Button onClick={handleLogin} colorPalette="teal" 
            width="full" 
            size="lg"  mt="xl"> SignUp</Button>
                <Text fontSize="md" textAlign="center">
                    Already Registered?{" "}
                    <Link to="/login" style={{ color: "blue", textDecoration: "underline" }}>
                        Log In
                    </Link>
                </Text>


    </VStack>
    </Box>

   </Flex>
  )
}
