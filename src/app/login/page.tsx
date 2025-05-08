'use client'
import LoginPage from "../../components/Auth/Pages/LoginPage";
import Protected from "../../components/Protected/Protected";
import { usePageTitle } from "../../hooks/usePageTitle";



export default function Login() {
    usePageTitle("Authentication");
    return (
        <div className=""> 
          <LoginPage/>
        </div>
    );
  }