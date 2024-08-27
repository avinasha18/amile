import { api } from "./apis"
import axios from "axios";

export const Actions = {
    Login : async(data)=>{
        return await axios.post(api+"/login",{...data})
    },
    Register : async(data)=>{
        if(data.accountType === "Student"){
            return await axios.post(api+`/register/student?refrelid=${data.refrelid}`,{...data})

        }else {
            return await axios.post(api+"/register",{...data})

        }
    },
    VerifyAccount : async(data)=>{
        return await axios.post(api+`/verifyaccount?token=${data.accountid}`)
    }
}