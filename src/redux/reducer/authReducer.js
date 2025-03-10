import { LOGIN_SUCESS, LOGOUT_SUCESS,RELOGIN_SUCESS } from "../action/authaction"

export const initalState={user:JSON.parse(localStorage.getItem("user"))||null}

export const authReducer=(state=initalState,action)=>{
    switch(action.type){
        case LOGIN_SUCESS:
        case RELOGIN_SUCESS:
        localStorage.setItem("user",JSON.stringify(action.payload))
        console.log(action.payload)
            return {...state,user:action.payload}
        case LOGOUT_SUCESS:
        localStorage.removeItem("user")
        return{...state,user:null}
        default :
        return state
    }

}