import axios from "axios";

export const POST_BOOKS="POST_BOOKS"
export const CONTRIBUTE_BOOK="CONTRIBUTE_BOOK"
export const FETCH_POSTS="FETCH_POSTS"
export const DELETE_POSTS="DELETE_POSTS"
export const ADD_TO_FINISHED="ADD_TO_FINISHED"
export const REMOVE_FROM_ONGOING="REMOVE_FROM_ONGOING"

export const ADDBOOK=(books,userId)=>{
    return async(dispatch)=>{
        try {
            const response =  await axios.post("https://story-creation-6aff7-default-rtdb.firebaseio.com/books.json", {
                ...books,userId
            });
            dispatch({
                type:POST_BOOKS ,
                payload:{id: response.data.name || "", ...books,userId} ,
            });
            // console.log(response.data.name)
        } catch (error) {
            console.error("Error creating post", error);
        }
}
}

export const contributeToBook = (bookId, user, sentence)=>{
    return async(dispatch)=>{
        console.log("contributecalled")
        try{
   const res=await axios .post(`https://story-creation-6aff7-default-rtdb.firebaseio.com/books/${bookId}/contributions.json`,
    {
        author: user.fullName, // Contributor name
        text:sentence ,
        
    }

);
dispatch({
        type: CONTRIBUTE_BOOK,
        payload: {
            bookId,
            contribution:{
            id: res.data.name, // Unique ID
            text:sentence,
            author: user.fullName
            },

        },
        
})
      dispatch(fetchPosts())
}
        catch(err){
         console.log(err, "error is contributing to books")
        }

    }
}



// FetchData
export const fetchPosts = () => async (dispatch) => {
	try {
		const response = await axios .get("https://story-creation-6aff7-default-rtdb.firebaseio.com/books.json");
		const data = response.data;
		const posts = data
			? Object.entries(data).map(([id, val]) => ({
					id,
					...val,
					
			  }))
			: [];
		dispatch({ type: FETCH_POSTS, payload: posts });
	} catch (error) {
		console.error("Error Fetching Posts", error);
	}
};

// Delete Post
export const DeletePost=(dataId)=> async (dispatch)=>{
  try{
    await axios.delete (`https://story-creation-6aff7-default-rtdb.firebaseio.com/books/${dataId}/.json`)
    dispatch({type:DELETE_POSTS,payload:dataId})
  }
     catch(err){
        alert("Error in Deleting the Story")
        console.log(err, "Delete Err")
     }
  }

// Moive to finished Book 

export const moveToFinishedStories =(Id)=>{
    return async(dispatch)=>{
        try{
     await axios.patch (`https://story-creation-6aff7-default-rtdb.firebaseio.com/books/${Id}/.json`,
        { isGoing: false }
     )


  dispatch({type:ADD_TO_FINISHED,payload:Id})
//   dispatch({type:REMOVE_FROM_ONGOING,payload:Id})

        }
        catch(err){
       console.log(err,"Fininsh Book")
       alert("Something went wrong in moving the story to finsh ")

        }
    }
}

// export const removeItem=()=>{
//     return async (dispatch)=>{
//         await axios .delete (`https://story-creation-6aff7-default-rtdb.firebaseio.com/`)
//     }
// } 



