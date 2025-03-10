import React from "react";
import { useSelector } from "react-redux";
import { Box, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "@/redux/action/bookaction";


 export default function  FinishedStories ()  {
  const dispatch=useDispatch()
  const books=useSelector((state)=>state.books.books)
   const finishedStory = books.filter((ele) => ele.isGoing === false);

  
  useEffect(() => {
    dispatch(fetchPosts());
  },[dispatch] );




  return (
    <VStack p={6}>
    <Heading as="h2" size={{ base: "xl", md: "2xl" }} alignItems={"center"} justifyContent={"center"} color={"teal.600"}>
      Finished Stories
    </Heading>
    <SimpleGrid columns={{ base: 1, m: 2, md: 3 }} spacing={6} w="full" gap={"10"}>
        {finishedStory.map((data) => (
          <Box
            key={data.id}
            p={4}
            border="1px solid #ccc"
            borderRadius="md"
            bg="white"
            boxShadow="md"
            _hover={{ boxShadow: "lg", bg: "teal.50" }}
          >
            <Text fontSize="2xl" fontWeight="bold" color="teal.600" mb={2}>
              Title: '{data.title}'
            </Text>
            <Text fontSize="lg" color="teal.200" mb={3}>
              Created by <strong>{data.author}</strong>
            </Text>
            <Text fontSize="lg"  p={3} borderRadius="md">
              <strong>Initial Sentence:</strong> {data.sentence}
            </Text>

            {/* Contributions in Grid Format */}
            {data.contributions && Object.entries(data.contributions).length > 0 && (
              <Box mt={4} bg="gray.100" p={3} borderRadius="md">
                <Heading size="xl" color="teal.500" mb={2}>
                  Contributions
                </Heading>
                  {Object.entries(data.contributions).map(([id, contribution]) => (
                    <Box

                      key={id}
                      p={3}
                      mt={"15px"}
                      border="1px solid #ccc"
                      borderRadius="md"
                      bg="white"
                      boxShadow="sm"
                      _hover={{ boxShadow: "md", bg: "gray.50" }}
                    >
                      <Text fontSize="md">
                        <strong>{contribution.author}:</strong> {contribution.text}
                      </Text>
                    </Box>
                  ))}
            
              </Box>
            )}
          </Box>
        ))}
      </SimpleGrid>

      {finishedStory.length === 0 && <Text>No stories yet</Text>}
    </VStack>



  )
  }
        


