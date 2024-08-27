import { ForgotPassword } from "../components/forgotPassword";
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
    },
    FetchMyReferals: async (data) => {
        return await axios.get(api + `/myreferals?page=${data.page || 1}`); 
    },
    ConnectPlugin : async (data) => {
        return await axios.post(api + "/connectplugin",{...data})
    },
    fetchUser: async () => {
        return await axios.get(api+"/userdata");
    },
    UpdateStudent: async (data) => {
        return await axios.post(api+"/updateuser",{...data});
    },
    resetPassword: async (data) => {
        return await axios.post(api+"/resetpassword",{...data});
    },
    forgotPassword: async (data) => {
        return await axios.post(api+"/forgotpassword",{...data});
    },
    resendVerification: async (data) => {
        return await axios.post(api+"/resendverification",{...data});
    },
    reportIncident : async (data) => {
        return await axios.post(api+"/reportincident",{...data});

    },


}