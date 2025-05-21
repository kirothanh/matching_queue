import { useSelector } from "react-redux";

function useCurrentUser() {
  const currentUser = useSelector((state) => state.user.userValue);
  return currentUser;
}

export default useCurrentUser;
