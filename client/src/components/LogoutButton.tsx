"use client";

import { useAuth } from "../context/auth-context";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    logout();
    router.push("/login");
  };

  return <button onClick={handleClick}>Logout</button>;
}
