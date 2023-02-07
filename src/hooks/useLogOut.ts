import { useAuthContext } from "./useAuthContext";
import { useWindowContext } from "./useWindowContext";

export const useLogOut = () => {
  const { authDispatch } = useAuthContext();
  const { windowDispatch} = useWindowContext();

  const logOut = () => {
    localStorage.removeItem("user");
    authDispatch({type: "LOGOUT", payload: null});
    windowDispatch({
      type: "CLOSED",
      payload: { mode: "closed", activeMessage: null },
    });
  }
  return {logOut};
}