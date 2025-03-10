import {POST_BOOKS ,FETCH_POSTS,CONTRIBUTE_BOOK,DELETE_POSTS,REMOVE_FROM_ONGOING,ADD_TO_FINISHED} from "../action/bookaction";
export const initialState = {
    books: []
  };
  
  export const bookReducer = (state = initialState, action) => {
    switch (action.type) {
      case POST_BOOKS:
        console.log(action.payload)
        return {
          ...state,
          
          books: [...state.books, action.payload], // Add new book
        };
        case FETCH_POSTS:
			return { ...state,books:action.payload };
      case CONTRIBUTE_BOOK:
       let updatePost=state.books.map((elem)=> elem.id==action.payload.bookID ? 
      {...post,contribution:[...(elem.contribution ?? []), action.payload.contribution]}:elem)
      console.log(updatePost)
      return {...state,books:updatePost}
      case DELETE_POSTS:
      case REMOVE_FROM_ONGOING:
        let deletePost=state.books.filter((elem)=> elem.id !=action.payload)
        console.log(deletePost)
        return {...state,books:deletePost}
      case  ADD_TO_FINISHED:
        return { ...state,books:state.books.map((elem)=> elem.id==action.payload? 
          { ...elem, isGoing: false } : elem
        )}
      

       
      
      default:
        return state;
    }
  };
  