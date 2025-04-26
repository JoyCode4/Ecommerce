'use client'
import SignupPage from "@/components/Auth/Pages/SignupPage";
import Protected from "@/components/Protected/Protected";
import { usePageTitle } from "@/hooks/usePageTitle";



export default function Login() {
    usePageTitle("Authentication");
    return (
        <div className="">
          <SignupPage/>
        </div>
    );
  }