import React, { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import * as Yup from "yup"

import { useRouter } from "next/router"

const Login = () => {
  // form validation rules 
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$&*_])(?=.*[0-9]).*$/,
        "Password must contain at least one uppercase letter, one special character (such as !@#$&*_), and one digit"
      ),
  })
  const formOptions = { resolver: yupResolver(validationSchema) }

    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState
  const router = useRouter()

  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
//   const isFormValid = formState.isValid


  const handleEmailChange = (e) => {
    // setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    // setPassword(e.target.value)
  }

  const onSubmit = (e) => {
    console.log("submit fait");
    router.push("/Home")
    console.log(email,password);
  }

  return (
    <div className="bg-blue-950 flex min-h-full flex-1 flex-col justify-center px-48 py-48 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <img
          className="mx-auto h-20 w-auto"
          src="/shark.PNG"
          alt="Your Company"
        />

        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-rose-50">
          Connectez-vous à votre compte
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-rose-50"
            >
              Adresse mail
            </label>

            <div className="mt-2">
              <input
                id="email"
                name="email"
                // value={email}
                type="text"
                {...register("email")}
                // onChange={handleEmailChange}
                required
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.email ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>
          </div>

          <div>
            <div className="block text-sm font-medium leading-6 text-rose-50">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-rose-50"
              >
                Mot de passe
              </label>
            </div>

            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                {...register("password")}
                // value={password}
                // onChange={handlePasswordChange}
                autoComplete="current-password"
                required
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
          </div>

          <div>
            <button
              type="submit"
            //   disabled={!isFormValid}
              className={"flex w-full justify-center rounded-md bg-rose-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      <style>
      </style>
    </div>
  )
}

Login.isPublic = true

export default Login
