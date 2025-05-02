import { AppDispatch } from "@/lib/store";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../AuthSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface AuthProps {
    // isLoginPage: boolean;
    // setIsLoginPage: React.Dispatch<React.SetStateAction<boolean>>;
  }

interface  IFormInput {
  email: string
  password: string
  confirmpassword: string
}
const SignupPage: React.FC<AuthProps> = ({}) =>{
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const dispatch:AppDispatch=useDispatch();
  const user = useSelector(selectLoggedInUser);
  const router = useRouter();

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
            Sign Up to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit(async (data)=>{ 
              const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email:data.email,password:data.password,addresses:[]}),
              });
          
              if (res.ok) {
                router.push('/login'); // Redirect to login after successful signup
              } else {
                const data = await res.json();
                toast.error(data.message || 'Signup failed');
              }
            })}>
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    {...register("email", { required: "Email is required",pattern:{value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: "Email Not Valid"}})}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.email && <p className="text-red-500">{String(errors.email.message)}</p>}
                </div>
              </div>
  
                <div>
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                        id="password"
                        {...register("password", { 
                          required: "Password is required",
                          pattern:{
                            value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/gm,
                            message:"Password must contain at least one number and one uppercase and lowercase letter and one special character, and at least 8 or more characters"
                          }
                        })}
                        type="password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  {errors.password && <p className="text-red-500">{String(errors.password.message)}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                        id="confirmpassword"
                        {...register("confirmpassword", { required: "Confirm Password is required",validate:(value,formValues)=>value === formValues.password || 'password not matching' })}
                        type="password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  {errors.confirmpassword && <p className="text-red-500">{String(errors.confirmpassword.message)}</p>}
                  </div>
                </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              already an member?{' '}
              <Link href={"/login"}>
                <button className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Login
                </button>
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }
  
export default SignupPage;