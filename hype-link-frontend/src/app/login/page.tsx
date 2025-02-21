"use client";
import { signInWithGoogle, logOut } from "@/lib/auth"; // Import dynamically selected auth
import { useState } from "react";

export default function LoginPage() {
  const [user, setUser] = useState<any>(null);

  const handleLogin = async () => {
    const userData = await signInWithGoogle();
    setUser(userData);
  };

  const handleLogout = async () => {
    await logOut();
    setUser(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {user ? (
        <div className="text-center">
          <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full" />
          <h2>Welcome, {user.displayName}</h2>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 mt-4">
            Log Out
          </button>
        </div>
      ) : (
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2">
          Sign in with Google
        </button>
      )}
    </div>
  );
}