import { useState } from "react";
import Username from "../components/Username";
import Password from "../components/Password";
import PasswordReset from "../components/PasswordReset";
import LoginButton from "../components/LoginButton";
import { loginUser } from "../components/ApiHelpers";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [reset, setReset] = useState(false);
  const handleLogin = async (username, password) => {
    // Validate input fields
    if (username === "") {
      setErrorMessage("Please enter a username.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }
    const success = await loginUser(username);
    if (success.statusText == "OK") {
      toast.success("Logged in");
      // Redirect to dashboard
      router.push("/dashboard");
    } else {
      setErrorMessage("Incorrect login or password");
      // Reset password field
      document.getElementById("password").value = "";
    }
  };
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
        DriveGauge
      </h1>
      <div className="w-full bg-slate-800 rounded-lg shadow dark:border md:mt-1 sm:max-w-md xl:p-0  border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 h-96 items-center justify-center flex-col">
          <div className="flex items-center justify-center w-full text-center">
            {!reset ? (
              <div id="loginContainer" className="w-full">
                <Username />
                <Password />
                <p className="text-red-600 mt-2 mb-2 h-6">{errorMessage}</p>
                <div className="flex items-center justify-center">
                  <span
                    href="#"
                    className="cursor-pointer text-sm font-medium text-primary-600 hover:underline text-primary-500"
                    onClick={() => setReset(true)}
                  >
                    Reset Password
                  </span>
                </div>
                <div className="mt-6 flex items-center justify-center">
                  <LoginButton handleLogin={handleLogin} />
                </div>
              </div>
            ) : (
              <PasswordReset setReset={setReset} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
