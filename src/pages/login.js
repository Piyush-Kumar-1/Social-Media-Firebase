import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as Routes from "../constants/routes";

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(Routes.DASHBOARD);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Login-Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iphone" />
      </div>
      <div className="flex flex-col w-2/5 mr-2">
        <div className="flex flex-col p-4 items-center border border-gray-primary mb-4 bg-white">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleLogin}>
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email"
              value={emailAddress}
              onChange={({ target }) => {
                setError("");
                setEmailAddress(target.value);
              }}
              className={`outline-none text-sm text-gray-base w-full mr-3 py-2 h2 border border-gray-primary rounded-lg mb-2 ${
                error.includes("email" || "user") && "border border-red-primary"
              }`}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={({ target }) => {
                setError("");
                setPassword(target.value);
              }}
              className={`text-sm text-gray-base w-full mr-3 py-2 h2 border border-gray-primary rounded-lg mb-2 ${
                error.includes("password") && "border-red-primary"
              }`}
            />
            <button
              type="submit"
              disabled={isInvalid}
              className={`bg-blue-medium text-white w-full rounded h-8 ${
                isInvalid && "cursor-not-allowed"
              }`}
            >
              Login
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary ">
          <p className="text-sm">
            Don't have an account?{` `}
            <Link
              to={Routes.SIGN_UP}
              className="font-bold text-blue-medium border-none"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
