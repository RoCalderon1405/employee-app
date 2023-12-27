import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_EMPLOYEE } from "../graphql/Queries";
import { REMOVE_EMPLOYEE } from "../graphql/Mutation";
import { Link, useNavigate } from "react-router-dom";
import { userState } from "../config/UserState";

export const Home = () => {
  const navigate = useNavigate()
  const [searchEmployees, { data, error }] = useLazyQuery(GET_EMPLOYEE);
  const verifySession = userState((state) => state.session);
  console.log("session from home", verifySession);

  const [removeEmployee] = useMutation(REMOVE_EMPLOYEE, {
    // Ejecutar el query despues de eliminar el empleado de la base de datos
    refetchQueries: [{ query: GET_EMPLOYEE }],
  });

  useEffect(() => {
    if (verifySession.isValid) {
      searchEmployees();
    } else {
      return navigate("/");
    }
  }, []);

  if (data) {
    console.log(data);
  }

  if (error) return <h1>Error: {error} </h1>;

  return (
    <>
      <div className="flex gap-4 pt-4">
        {data &&
          data.getEmployees.map(({ _id, name, position, age, code }) => (
            <div>
              <Link
                to="/create-employee"
                state={{ _id, name, code, position, age }}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <a href="#">
                  <img
                    className="rounded-t-lg"
                    src="https://www.pokemon.com/static-assets/app/static3/img/og-default-image.jpeg"
                  />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {name}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {position} <br />
                    Edad: {age}
                  </p>
                </div>
              </Link>
              <button
                onClick={async (e) => {
                  await removeEmployee({
                    variables: { _id: _id },
                  });
                }}
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Remove
              </button>
            </div>
          ))}
      </div>
    </>
  );
};
