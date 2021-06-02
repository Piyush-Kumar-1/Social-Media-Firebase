import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as Routes from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";

export default function Signup() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "" || username === "";

  let disabled = false;

  const handleSignup = async (e) => {
    e.preventDefault();
    disabled = true;
    const usernameExists = await doesUsernameExist(username);
    if (usernameExists.length > 0) {
      setError("Username exists");
      return;
    }
    try {
      const createdUserResult = await firebase
        .auth()
        .createUserWithEmailAndPassword(emailAddress, password);
      await createdUserResult.user.updateProfile({
        displayName: username,
      });

      await firebase.firestore().collection("users").add({
        userId: createdUserResult.user.uid,
        username,
        fullName,
        emailAddress,
        following: [],
        dateCreated: Date.now(),
      });
      history.push(Routes.DASHBOARD);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
    disabled = false;
  };

  useEffect(() => {
    document.title = "Signup-Instagram";
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

          <form onSubmit={handleSignup}>
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email"
              value={emailAddress}
              onChange={({ target }) => {
                error && setError("");
                setEmailAddress(target.value);
              }}
              className={`outline-none text-sm text-gray-base w-full mr-3 py-2 h2 border border-gray-primary rounded-lg mb-2 ${
                error.includes("email" || "user") && "border border-red-primary"
              }`}
            />
            <input
              aria-label="Enter your fullname"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={({ target }) => {
                setFullName(target.value);
              }}
              className={`outline-none text-sm text-gray-base w-full mr-3 py-2 h2 border border-gray-primary rounded-lg mb-2 `}
            />
            <input
              aria-label="Enter your name"
              type="text"
              placeholder="Username"
              value={username}
              onChange={({ target }) => {
                error && setError("");
                setUsername(target.value);
              }}
              className={`outline-none text-sm text-gray-base w-full mr-3 py-2 h2 border border-gray-primary rounded-lg mb-2 ${
                error.includes("Username") && "border-red-primary"
              }`}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={({ target }) => {
                error && setError("");
                setPassword(target.value);
              }}
              className={`outline-none mb-4 text-sm text-gray-base w-full mr-3 py-2 h2 border border-gray-primary rounded-lg mb-2${
                error.includes("password") && "border-red-primary"
              }`}
            />

            <button
              type="submit"
              disabled={isInvalid || disabled}
              className={`bg-blue-medium text-white w-full rounded h-8 ${
                isInvalid && "cursor-not-allowed"
              }`}
            >
              Register
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
          <p className="text-sm">
            Have an account?{` `}
            <Link
              to={Routes.LOGIN}
              className="font-bold text-blue-medium border-none"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
