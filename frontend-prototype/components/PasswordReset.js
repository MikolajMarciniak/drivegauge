import { useState } from "react";
// import { sendPasswordResetEmail } from "../components/ApiHelpers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PasswordReset(props) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleResetPassword = async () => {
    const email = document.getElementById("email").value;
    const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (email === "") {
      setErrorMessage("Email field is empty");
      return;
    }

    if (!pattern.test(email)) {
      setErrorMessage("Email address is not valid");
    }

    setLoading(true);
    // TODO function to send email if requested

    // const success = await sendPasswordResetEmail(email);
    // if (success) {
    toast.success("Password reset email sent!");
    setErrorMessage("");
    // } else {
    //   toast.error("Failed to send password reset email.");
    // }
    setLoading(false);
  };

  return (
    <div className="form-control w-full h-full mt-12">
      <label className="label mt-2">
        <span className="label-text font-bold">
          Please enter your email address
        </span>
        <span className="label-text-alt"></span>
      </label>
      <input
        type="email"
        id="email"
        placeholder="Email"
        className="input input-bordered w-full"
      />
      <p className="text-red-600 mt-2 mb-2 h-6">{errorMessage}</p>
      <div className="flex items-center justify-center">
        <span
          href="#"
          className="cursor-pointer text-sm font-medium text-primary-600 hover:underline text-primary-500"
          onClick={() => props.setReset(false)}
        >
          Back to login
        </span>
      </div>
      <div className="mt-6 flex items-center justify-center">
        <button
          onClick={() => handleResetPassword()}
          className="btn btn-secondary"
          disabled={loading}
        >
          {loading ? "Loading..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}

export default PasswordReset;
