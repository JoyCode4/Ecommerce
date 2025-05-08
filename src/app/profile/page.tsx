'use client'

import Protected from "../../components/Protected/Protected";
import UserProfile from "../../components/User/Pages/UserProfile";
import { usePageTitle } from "../../hooks/usePageTitle";


export default function Login() {
    usePageTitle("Profile");

    return (
      <Protected>
        <div className="">
          <UserProfile/>
        </div>
      </Protected>
    );
  }