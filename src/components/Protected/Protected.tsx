import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../Auth/AuthSlice";
import { usePathname, useRouter } from "next/navigation";

interface Props{
    children?:ReactNode,
    redirectPath?:string,
}

const Protected: React.FC<Props> = ({children,redirectPath = "/"}) =>{
    const user = useSelector(selectLoggedInUser);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // If user exists and they access a protected page (e.g., "/login"), redirect to the dashboard or previous page
        if (user && user.role!=="admin" && (pathname === "/login" || pathname === "/signup" || pathname === "/forgotpassword")) {
            router.push(redirectPath);
        }
        // If no user and the page is protected, redirect to the login page
        if (!user && pathname !== "/login") {
            router.push("/login");
        }
    }, [user, router, pathname, redirectPath]);

    // Show content only if the user exists
    if (!user) return null;

    return <>{children}</>;
}

export default Protected;