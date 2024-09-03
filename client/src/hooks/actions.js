import axios from "axios";
import { api } from "./apis";

export const Actions = {
    Login: async (data) => {
        return await axios.post(`${api}/login`, { ...data });
    },
    Register: async (data) => {
        const endpoint = data.accountType === "Student"
            ? `/register/student?refrelid=${data.refrelid}`
            : `/register/mentor?refrelid=${data.refrelid}`;
        return await axios.post(`${api}${endpoint}`, { ...data });
    },
    VerifyAccount: async (data) => {
        return await axios.post(`${api}/verifyaccount?token=${data.accountid}`);
    },
    VerifyMentorAccount: async (data) => {
        return await axios.post(`${api}/mentor/verifyaccount?token=${data.accountid}`);
    },
    FetchMyReferals: async (data) => {
        return await axios.get(`${api}/myreferals?page=${data.page || 1}`);
    },
    ConnectPlugin: async (data) => {
        return await axios.post(`${api}/connectplugin`, { ...data });
    },
    fetchUser: async () => {
        return await axios.get(`${api}/userdata`);
    },
    fetchMentor: async () => {
        return await axios.get(`${api}/mentordata`);
    },
    UpdateStudent: async (data) => {
        return await axios.post(`${api}/updateuser`, { ...data });
    },
    updateMentor: async (data) => {
        return await axios.post(`${api}/updatementor`, { ...data });
    },
    resetPassword: async (data) => {
        return await axios.post(`${api}/resetpassword`, { ...data });
    },
    forgotPassword: async (data) => {
        return await axios.post(`${api}/forgotpassword`, { ...data });
    },
    resendVerification: async (data) => {
        return await axios.post(`${api}/resendverification`, { ...data });
    },
    reportIncident: async (data) => {
        return await axios.post(`${api}/reportincident`, { ...data });
    },
    fetchCourse: async (data) => {
        return await axios.get(`${api}/course?courseid=${data.courseid}`);
    }
};

export const getApplicationStatistics = async (userId) => {
    try {
        const response = await axios.get(`${api}/statistics/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch application statistics');
    }
};