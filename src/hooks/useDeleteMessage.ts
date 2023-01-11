import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWindowContext } from "./useWindowContext";
import { useMessageContext } from "./useMessageContext";

export const useDeleteMessage = () => {
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { authState } = useAuthContext();
  const user = authState.user;

  const { windowState } = useWindowContext();
  const activeMessage = windowState.activeMessage;

  const { messageState, messageDispatch } = useMessageContext();
  const messages = messageState.messages;

  const msgId: string = (activeMessage ? activeMessage._id : "");

  const deleteMessage = async () => {
    setIsLoading(true);
    setError(null);

    if(!user){
      setError("Please Log In");
      setIsLoading(false);
      return
    }

    if(!activeMessage){
      setError("No message selected");
      setIsLoading(false);
      return
    }

    if(!messages){
      setError("No messages");
      setIsLoading(false);
      return
    }

    const reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    reqHeaders.append("Authorization", `Bearer ${user.accessToken}`);

    const response: globalThis.Response = await fetch(`http://localhost:1337/api/messages/${msgId}`, {
      method: "DELETE",
      headers: reqHeaders
    });

    if(!response.ok){
      setIsLoading(false);
      console.log(error);
    }

    if(response.ok){
      messageDispatch({type: "DELETE-MESSAGE", payload: {messages: [activeMessage, ...messages]}})
      setIsLoading(false);
    }
  }

  return { deleteMessage, isLoading, error }
}