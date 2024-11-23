import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipient = (chat,user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const getRecipient = async () => {
            setIsRecipientLoading(true);
            const response = await getRequest(`${baseUrl}/users/${chat.userIds.find((id) => id !== user._id)}`);
            setRecipient(response.data);
            setIsRecipientLoading(false);
        }
        getRecipient();
    },[chat,user]);
}