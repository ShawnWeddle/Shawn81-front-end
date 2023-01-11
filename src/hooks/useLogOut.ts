import { useAuthContext } from "./useAuthContext";

export const useLogOut = () => {
  const { authDispatch } = useAuthContext();

  const logOut = () => {
    localStorage.removeItem("user");

    authDispatch({type: "LOGOUT", payload: null});
  }

  return {logOut};
}