import Instance from "./axiosInstance";

export const fetchSessionInfo = async () => {
    try {
        const response = await Instance.get('/api/sessionInfo');
        console.log("FSI를 통한 세션 정보 가져오기:", response.data);
    } catch (error) {
        console.error("FSI 정보 가져오기 실패:", error);
    }
};