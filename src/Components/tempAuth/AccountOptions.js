import { UserAuth } from "../../Contexts/AuthContext";

const AccountOptions = () => {
  const { logout } = UserAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div>
      {/* <button onClick={handleLogin}>Login</button> */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default AccountOptions;