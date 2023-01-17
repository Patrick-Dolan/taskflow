import { AuthProvider } from "./Contexts/AuthContext";
import RegisterUser from "./Components/tempAuth/RegisterUser";
import AccountOptions from "./Components/tempAuth/AccountOptions";

const App = () => {
  return (
    <AuthProvider>
      <h1>TaskFlow</h1>
      <RegisterUser />
      <AccountOptions />
    </AuthProvider>
  );
}

export default App;
