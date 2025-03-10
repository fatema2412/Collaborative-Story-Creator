import React, { useEffect, useState } from 'react'
import { Button, Heading, Input,Flex ,Text, Container,Box,Grid} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { ADDBOOK, fetchPosts } from '@/redux/action/bookaction'
import BookCard from '@/components/features/BookCard'
import FinishedStories from './FinishedStories'


export default function Books() {
      const user= useSelector((state)=>state.auth.user)
      const books=useSelector((state)=>state.books.books)
      console.log(books)
      console.log(books)
      const ongoingStories = books.filter((ele) => ele.isGoing);
      console.log(ongoingStories)

      

     const [title,setTitle]=useState("")
    const [sentence,setSentence]=useState("")
    const dispatch=useDispatch()

    useEffect(() => {
		dispatch(fetchPosts());
	},[dispatch] );

  

    const handleAddBook=()=>{
        if(!title || !sentence){
      alert("Please enter both a title and a sentence.");
      return
       }
        const BooksObj={title,sentence,author:user.fullName,contributions:{},isGoing:true }
        dispatch(ADDBOOK(BooksObj,user.uid))
        setTitle(""); 
    setSentence("");
    }
  return ( 
  <Container maxW="container.xl" mt="80px">
  {/* Input Fields and Button */}
  <Flex direction={{ base: "column", md: "row" }} gap={4}>
    <Input
      type="text"
      placeholder="Enter a title of the story you want to create"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      focusbordercolor="teal.400"

      flex={{ md: 1 }} // Takes 1 part of space on medium screens+
    />
    <Input
      type="text"
      value={sentence}
      onChange={(e) => setSentence(e.target.value)}
      focusbordercolor="teal.400"

      placeholder="Enter the initial sentence of your story"
      flex={{ md: 2 }} // Takes 2 parts of space on medium screens+
    />
    <Button
       colorPalette="teal" 
       onClick={handleAddBook}
      width={{ base: "100%", md: "auto" }} // Full width on small screens, auto on medium+
    >
      Add a book
    </Button>
  </Flex>

  {/* Ongoing Stories Section */}
  <Box mt={8} textAlign={"center"}>
    <Heading as="h2" size={{ base: "xl", md: "2xl" }} alignItems={"center"} justifyContent={"center"}>
      Ongoing Stories:
    </Heading>
    {books.length === 0 ? (
      <Text mt={4}>No stories yet.</Text>
    ) : (
      <Grid
        templateColumns={{
          base: "1fr",         // 1 column on small screens
          md: "repeat(2, 1fr)", // 2 columns on medium screens
          lg: "repeat(3, 1fr)", // 3 columns on large screens
        }}
        gap={6}
        mt={4}
      >
          {ongoingStories.map((ele) => (
      <BookCard data={ele} key={ele.id} />
    ))}

       </Grid>


        
      
    )}
  </Box>



</Container>
);
}

