import React from 'react'
import { Button ,Box,Text,Heading,VStack,} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Home() {
  const user= useSelector((state)=>state.auth.user)

  const navigate=useNavigate()
  const handleNavigate = () => {
    if (!user) {
      alert("Please log in to view ongoing books.");
      navigate("/login"); 
    } else {
      navigate("/Books");
    }
  };
  const handleViewCompleteStory=()=>{
    if (!user) {
      alert("Please log in to view ongoing books.");
      navigate("/login"); 
    } else {
      navigate("/completeStory");
    }
  };


  
  return (
    <Box 
      textAlign="center" 
      mx="auto" 
      mt={{ base: 10, md: 16 }} 
      p={{ base: 8, md: 10 }} 
    
      borderRadius="lg" 
      
    >
      <Heading as="h1" size="xl" color="teal.600" mb={4}>
        Unleash Your Creativity with Collaborative Story Creator!
      </Heading>

      <Text fontSize="lg" color="gray.700" mb={6}>
        Do you love writing? Ever wanted to contribute to an evolving story?  
        Collaborative Story Creator lets you craft innovative stories and contribute to narratives written by others.  
        Discover unique storytelling perspectives from people across the world and watch stories unfold in exciting new ways!
      </Text>

      <Text fontSize="lg" fontWeight="semibold" color="teal.700" mb={6}>
        Ready to dive into a world of imagination? Start exploring ongoing stories and contribute your creativity today!
      </Text>

      <VStack>
        <Button 
          onClick={handleNavigate}
          colorPalette="teal" 
 
          size="lg"
          px={8}
          _hover={{ bg: "teal.700" }}
        >
          View Ongoing Stories
        </Button>
        <Button 
          onClick={handleViewCompleteStory}
          colorPalette="teal" 
 
          size="lg"
          px={8}
          _hover={{ bg: "teal.700" }}
        >
            View Finished  Stories

        </Button>
      </VStack>
    </Box>
  );
}