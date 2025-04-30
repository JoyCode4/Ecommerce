'use client'
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { loginFailure, loginStart, loginSuccess, selectErrors, selectLoggedInUser } from "../AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
interface AuthProps {
  // isLoginPage: boolean;
  // setIsLoginPage: React.Dispatch<React.SetStateAction<boolean>>;
}
interface  IFormInput {
  email: string
  password: string
}

  const LoginPage: React.FC<AuthProps> = ({}) =>{
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const user = useSelector(selectLoggedInUser)
    const loginErrors = useSelector(selectErrors)
    const dispatch:AppDispatch = useDispatch();
    const router = useRouter();

    useEffect(()=>{
      if(user){
        if(user.role === 'user'){
          router.push("/");
        }else if(user.role === 'admin'){
          router.push("/admin");
        }
        toast.success("Login as "+user.role);
      }
      else{
        // toast.error("User not logged In");
      }
    },[user])

    useEffect(()=>{
      if(loginErrors){
        toast.error("Unable to login");
      }
    },[loginErrors])

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Login to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit(async (data)=>{
              dispatch(loginStart());
              try {
                const res = await fetch('/api/auth/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ email:data.email,password:data.password}),
                });
                const result = await res.json();
                if (res.ok) {
                  dispatch(loginSuccess(result.user));
                  router.push('/profile');
                } else {
                  dispatch(loginFailure(result.error));
                }
              } catch (err) {
                dispatch(loginFailure('Network error'));
              }
            })}>
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register("email", { required: "Email is required",pattern:{value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: "Email Not Valid"}})}
                    type="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                   {errors.email && <p className="text-red-500">{String(errors.email.message)}</p>}
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <Link href="/forgotpassword" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password", { 
                      required: "Password is required",
                      // pattern:{
                      //   value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/gm,
                      //   message:"Password must contain at least one number and one uppercase and lowercase letter and one special character, and at least 8 or more characters"
                      // }
                    })}
                    type="password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                   {errors.password && <p className="text-red-500">{String(errors.password.message)}</p>}
                   {loginErrors && <p className="text-red-500">{String(loginErrors.message)}</p>}
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?{' '}
              <Link href={"/signup"}>
                <button className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer">
                  Create an Account
                </button>
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }
  
export default LoginPage;