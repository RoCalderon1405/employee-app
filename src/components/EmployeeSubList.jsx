import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const EmployeeSubList = () => {

    const location = useLocation()
    console.log("employee info", location.state)
    const employeeInfo = location.state.employeeData

  return (
    <>
    <div className="flex gap-4 pt-4">
      {employeeInfo &&
        employeeInfo.map(({ _id, name, position, age, code }) => (
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
          </div>
        ))}
    </div>
  </>
  )
}
