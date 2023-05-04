import React, { useState, useEffect } from "react";
import { CREATE_EMPLOYEE } from "../graphql/Mutation";
import { UPDATE_EMPLOYEE } from "../graphql/Mutation";
import { useMutation } from "@apollo/client";
import { useNavigate, useLocation } from "react-router-dom";

export const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("employeeInfo", location.state);

  // Variables globales
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [position, setPosition] = useState("");
  const [code, setCode] = useState("");
  const [_id, setId] = useState("");
  // Variables globales

  // Variables de estado de useLocation
  const currentState = location.state;

  const employeeId =
    currentState && currentState !== undefined ? currentState._id : _id;

  const employeeName =
    currentState && currentState !== undefined ? currentState.name : name;

  const employeeAge =
    currentState && currentState !== undefined ? currentState.age : age;

  const employeePosition =
    currentState && currentState !== undefined
      ? currentState.position : position;

  const employeeCode =
    currentState && currentState !== undefined ? currentState.code : code;

  // Variables de estado de useLocation

  // Área de mutaciones
  const [createEmployee] = useMutation(CREATE_EMPLOYEE, {});
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {});
  // Área de mutaciones

  useEffect(() => {

    if (currentState) {
      setName(employeeName);
      setAge(employeeAge);
      setCode(employeeCode);
      setPosition(employeePosition);
      setId(employeeId);
    }

  }, []);

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          if (currentState) {
            // Llamar al mutation para actualizar al empleado
            await updateEmployee({
              variables: { _id, name: name.toLowerCase(), age, code, position },
            });
          } else {
            //Llamar al mutation para crear el employee
            await createEmployee({
              variables: { name: name.toLowerCase(), age, position, code },
            });
            // Redirigiar al usuario hacia /home
          }
          navigate("/home");
        }}
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="name"
            value={name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Employee Name"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="Age"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Age
          </label>
          <input
            type="Number"
            onChange={(e) => {
              setAge(e.target.value);
            }}
            id="Age"
            value={age}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Employee age"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="Number"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Position
          </label>
          <input
            type="String"
            onChange={(e) => {
              setPosition(e.target.value);
            }}
            id="Position"
            value={position}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Employee position"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="Number"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Code
          </label>
          <input
            type="String"
            onChange={(e) => {
              setCode(e.target.value);
            }}
            id="Code"
            value={code}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Employee code"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {currentState ? "Update Employee" : "Create Employee"}
        </button>
      </form>
    </>
  );
};
