import ButtonIcon from "../../ui/ButtonIcon";
import { useLogOut } from "./useLogOut";
import SpinnerMini from "../../ui/SpinnerMini";
import { HiOutlineLogout } from "react-icons/hi";

function LogOut() {
  const { isLoggingOut, logOut } = useLogOut();
  return (
    <ButtonIcon onClick={logOut} disabled={isLoggingOut}>
      {!isLoggingOut ? <HiOutlineLogout /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default LogOut;
