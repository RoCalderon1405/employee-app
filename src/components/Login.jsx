import React, { useState } from "react";
import { LOGIN } from "../graphql/Queries";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { userState } from "../config/UserState";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState("");

  const setUserSession = userState((state) => state.addSession)
  const verifySession = userState((state) => state.session);
  console.log("Get current session y login",verifySession);

  const [login, { data, error }] = useLazyQuery(LOGIN, {
    variables: { email, password },
  });

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await login().then(function (response) {
            var data = response.data.login;
            console.log(data);

            if (data) {
              navigate("/home");
              //Setear el estado del usuario
              setUserSession({isValid: true})
            } else {
              setIsValid("Invalid credentials");
            }
          });
        }}
      >
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <div className="mb-6">
          <p className="text-sm text"></p>
          <span>{isValid}</span>
        </div>
      </form>
    </>
  );
};
