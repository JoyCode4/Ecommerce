"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { AppDispatch } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { resetCartAsync } from "../Cart/CartSlice";
import { selectLoggedInUser } from "../Auth/AuthSlice";
import { resetOrder } from "./OrderSlice";
import Link from "next/link";
interface Props{
  
}
const Order: React.FC<Props> = ({}) => {
  const {id} = useParams() as { id?: string };
  const router = useRouter();
  const dispatch:AppDispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(()=>{
    //reset Cart after order completed
    dispatch(resetCartAsync(user.id));
    //delete CurrentOrder Details after order completed
    dispatch(resetOrder())
  },[dispatch,user])

  useEffect(()=>{
    if(!id){
      router.push("/");
    }
  },[id])
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">Order Successfully Placed</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Order Number #{id}
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            {'You can check your order in My Account > My Orders'}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <Link href="/" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default Order;