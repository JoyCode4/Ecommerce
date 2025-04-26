'use client'
import ForgotPassword from "@/components/Auth/Pages/ForgotPassword";
import { usePageTitle } from "@/hooks/usePageTitle";



export default function Login() {
    usePageTitle("Forgot Password");
    return (
        <div className=""> 
          <ForgotPassword/>
        </div>
    );
  }