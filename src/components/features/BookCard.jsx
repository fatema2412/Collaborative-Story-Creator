import React, { useEffect, useState } from 'react'
import { Box,Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { Input,Button,HStack,VStack,Heading } from '@chakra-ui/react'
import { contributeToBook } from '@/redux/action/bookaction'
import { DeletePost } from '@/redux/action/bookaction'
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { moveToFinishedStories } from '@/redux/action/bookaction'
import { useNavigate } from 'react-router-dom'


export default function BookCard({data}) {
  console.log(data)
    const person= useSelector((state)=>state.auth.user)
    // console.log(person.fullname)
    // const fullName=person.fullname
    
    console.log(data.author , person.fullName)  
    const contributionsArray =data.contributions? Object.entries(data.contributions).map(([id, contribution]) => ({
      id,      ...contribution
    })) : "";
    // console.log(contributionsArray)
        
    // console.log(data)
    
    const [sentence,setSentence]=useState("")
    // For setting wordLimit
    const [word,setWord]=useState(0)      
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [finished,setFinished]=useState(data.isGoing==false)

    const handleContribute=()=>{
       if(!sentence){
        alert("Please enter a contribution sentence.")
        return
       }
       if(contributionsArray && contributionsArray.length>=10  ){
        alert("This story has reached its contribution limit!");

        return;
  
       }
    dispatch(contributeToBook(data.id, person, sentence)) 
    //  dispatch(fetchPosts());
    setSentence (""); 
  
  };
  //  Check word limit 
  const handleInput=(e)=>{
    const data = e.target.value.trim().split(" ");

    if (data.length <=20) {
      setSentence  (e.target.value);
        setWord(data.length);
        
        if (e.target.value.trim() === '') {
            setWord(0);
        }
    } else {
        alert("You can type only 20 words");
        return
    }

  }

  // Handle Delete
  const handleDelete=()=>{
  console.log(person.fullName,"who deleted the strory  " )
  console.log (data.author ,"who created the story ")
  if (person.fullName== data.author  ){
    alert("Are you sure you want to delete")
      dispatch(DeletePost(data.id))
  }
  else {
    alert("User who has created story can only deleted the story !!")
  }
  }

  // Moive to finsh Story

  useEffect(()=>{
    if(data.isGoing && contributionsArray.length>=10){
    dispatch(moveToFinishedStories(data.id))
  }
 },[contributionsArray.length,dispatch,data.id,data.isGoing])

  // Navigate to finsh Page
    
  // useEffect(() => {
  //   if (finished) {
  //     navigate("/FinishedStories"); // Redirect user
  //   }
  // }, [finished, navigate]);


    

  return (
    <Box border="1px solid #ccc" padding="10px" borderRadius="10px"  boxShadow="lg" 
    margin={5} bg="white"
    maxW="500px"
    mx="auto"
>
    <Text fontSize="2xl" fontWeight="bold" color="teal.600" mb={2}> Title of the story is "{data.title}"</Text>
    <Text fontSize="lg" color="gray.600" mb={3}  > Created by  <strong > {data.author} </strong>  </Text>
    <Text fontSize="lg"  p={3} borderRadius="md"> <strong > Inital Sentence  is </strong> {data.sentence}</Text>
    {data.contributions && contributionsArray.length>0 && 
                   
      <Box mt={4} bg="teal.50" p={3} borderRadius="md">
                        <Heading size="xl" color="teal.500" mb={2}>
                          Contributions
                        </Heading>
                    {contributionsArray.map((ele) => (
                      <Box key={ele.id} p={3}
                      border="1px solid #ccc"
                      borderRadius="md"
                      bg="white"
                      boxShadow="sm"
                      mt={"15px"}
                      _hover={{ boxShadow: "md", bg: "gray.50" }}>
                      <Text key={ele.id} fontSize="md" p={1}>
                        <strong>{ele.author} </strong> has contributed 
                      </Text>
                        <Text fontSize="lg" pl={4}>{ele.text}</Text>
                        </Box>
                    ))}
                  </Box>
               }
        <Text fontSize="md"  color="gray.700" mt={2} fontWeight={"bold"}>Contributions Count : {data.contributions?contributionsArray.length:0}/10</Text>

    <VStack mt={6} spacing={3}>

              <Input
                type="text"
                placeholder="Add your sentence..."
                value={sentence}
                onChange={handleInput}
                focusbordercolor="teal.400"

              />
              <Button bg={"teal.600"}  mt={"5"}width={"70%"} onClick={handleContribute} 
              isDisabled={data.contributions && contributionsArray.length >= 10}
              ><MdAdd/> Contribute to the story </Button>
              </VStack>
              
              <HStack justify="center" mt={4} align={"center"} height={"50px"} >
         <Button bg={"teal.600"}  onClick={() => handleDelete(data)}  width={"70%"} height={"100%"}>
          <RiDeleteBin6Line /> 
          Delete this Story
          </Button>
      </HStack>


           
     {!data && <Text>No Stories Yet</Text>}     

    </Box>
   
)
}


