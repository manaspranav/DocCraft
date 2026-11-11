  "use client";

  import { Mail, Lock } from "lucide-react";
  import { useState } from "react";
  import { useRouter } from "next/navigation";
  import { useAuth } from "../../context/auth-context";
  import { toast } from "react-hot-toast";
  import ntl from "@/../public/ntl_logo.jpg";

  export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok && data.access_token) {
          login(data.access_token);
          router.push("/dashboard");
        } else {
          toast.error(data.message || "Login failed");
        }
      } catch {
        toast.error("Could not connect to server");
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f2fe] via-[#d8b4fe] to-[#f0abfc] px-6 py-10">
        <div className="w-full max-w-5xl flex rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-lg">
          {/* Left Panel - Branding */}
          <div className="hidden md:flex flex-col justify-between bg-[#1e1e2f] text-white p-10 w-1/2">
            <div>
              <div className="flex items-center gap-4 mb-6 mt-7">
                <img
                  src={ntl.src}
                  alt="DocCraft Logo"
                  className="w-12 h-12 object-contain"
                />
                <h1 className="text-3xl font-bold">DocCraft</h1>
              </div>

              <div className="mt-12">
              <p className="text-lg font-light">Welcome Back!</p>
              <p className="text-xs text-gray-400 mt-1">
                Login to manage your documents & forms seamlessly.
              </p>
            </div>
            </div>
            
          </div>

          {/* Right Panel - Login Form */}
          <div className="w-full md:w-1/2 bg-white bg-opacity-30 p-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Login to DocCraft
            </h2>

            <div className="space-y-4">
              <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 bg-white/60">
                <Mail className="text-gray-500 w-5 h-5 mr-2" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 bg-white/60">
                <Lock className="text-gray-500 w-5 h-5 mr-2" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-transparent focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-purple-600 text-white py-2 rounded-xl font-semibold"
              >
                Login
              </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                Don’t have an account?{" "}
                <span
                  className="text-purple-700 cursor-pointer font-medium"
                  onClick={() => router.push("/register")}
                >
                  Register
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
