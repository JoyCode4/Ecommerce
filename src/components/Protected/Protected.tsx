"use client"
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, setUser } from "../Auth/AuthSlice";
import { usePathname, useRouter } from "next/navigation";
import { AppDispatch } from "../../lib/store";

interface Props {
  children?: ReactNode;
  redirectPath?: string;
}

const Protected: React.FC<Props> = ({ children, redirectPath = "/" }) => {
  const user = useSelector(selectLoggedInUser);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch: AppDispatch = useDispatch();

  const [loading, setLoading] = useState(true); // Show spinner until fetch completes

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          dispatch(setUser(data));
        } else {
          dispatch(setUser(null));
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        dispatch(setUser(null));
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    if (loading) return; // Wait for user fetch to complete

    if (user && user.role !== "admin" && ["/login", "/signup", "/forgotpassword"].includes(pathname)) {
      router.push(redirectPath);
    } else if (!user && pathname !== "/login") {
      router.push("/login");
    }
  }, [user, pathname, redirectPath, router, loading]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
};

export default Protected;
