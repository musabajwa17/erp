// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   User,
//   Lock,
//   Eye,
//   EyeOff,
//   AlertTriangle,
//   CheckCircle,
// } from "lucide-react";
// import Image from "next/image";
// import GuestRoute from "../contact/ProtectedPage/GuestRoute";

// export default function Form() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
// const [showPassword, setShowPassword] = useState(false);
// const [errors, setErrors] = useState({});
// const [apiError, setApiError] = useState("");
// const [loading, setLoading] = useState(false);
// console.log(email, password);

//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setApiError("");
//     const newErrors = {};
//     if (!email.trim()) newErrors.email = "Email is required";
//     if (!password.trim()) newErrors.password = "Password is required";
//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       try {
//         setLoading(true);
//         const response = await fetch("https://earthscansystems.com/auth/login/", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email, password }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//           // Assuming the API returns access and refresh tokens
//           localStorage.setItem("access", data.token.access);
//           localStorage.setItem("refresh", data.token.refresh);
//           router.push("/dashboard"); // Redirect to dashboard
//         } else {
//           setApiError(data.detail || "Invalid credentials. Please try again.");
//         }
//       } catch (err) {
//         setApiError("An error occurred. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <GuestRoute redirectTo="/dashboard/fields">
//     <section className="w-full flex items-center justify-center bg-[#f7f7f7]">
//       <div className="w-full min-h-[600px] flex flex-col lg:flex-row items-center justify-center shadow-2xl overflow-hidden bg-white/90 backdrop-blur-md">
        
//         {/* Left Side */}
//         <div className="hidden lg:flex w-1/2 h-[600px] relative  bg-gray-100">
//           <Image src="/crop1.jpg" alt="Login" fill className="object-cover" />
//           <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40 px-12 text-center">
//             <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">Welcome Back!</h2>
//             <p className="text-xl opacity-90 mb-6 drop-shadow-md">Log in to access your dashboard</p>
//             <div className="w-16 h-1 bg-white rounded-full mb-6"></div>
//             <p className="text-lg opacity-80 drop-shadow-sm">Enter your credentials to continue your journey with us</p>
//           </div>
//         </div>

//         {/* Right Side - Login Form */}
//         <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-8 lg:p-12">
//           <div className="w-full max-w-md">
//             <div className="text-center mb-8">
//               <h1 className="text-4xl text-green-600 font-extrabold mb-2">Login</h1>
//               <p className="text-gray-600">Welcome back! Please login to your account.</p>
//             </div>

//             {apiError && (
//               <p className="text-red-500 text-center mb-4 flex items-center gap-1">
//                 <AlertTriangle className="h-4 w-4" /> {apiError}
//               </p>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Email Field */}
//               <div>
//                 <div
//                   className={`flex items-center gap-3 border-2 bg-white px-4 py-3 rounded-xl shadow-sm transition-all ${
//                     errors.email
//                       ? "border-red-500"
//                       : email
//                       ? "border-green-500"
//                       : "border-gray-200"
//                   }`}
//                 >
//                   <User className={`h-6 w-6 ${
//                     errors.email ? "text-red-500" : email ? "text-green-500" : "text-gray-400"
//                   }`} />
//                   <input
//                     className="w-full p-2 outline-none bg-transparent text-gray-700 placeholder-gray-400 text-lg"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                     type="email"
//                   />
//                   {email && (
//                     <div className="flex-shrink-0">
//                       {errors.email ? <AlertTriangle className="h-5 w-5 text-red-500" /> : <CheckCircle className="h-5 w-5 text-green-500" />}
//                     </div>
//                   )}
//                 </div>
//                 {errors.email && (
//                   <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
//                     <AlertTriangle className="h-4 w-4" /> {errors.email}
//                   </p>
//                 )}
//               </div>

//               {/* Password Field */}
//               <div>
//                 <div
//                   className={`flex items-center gap-3 border-2 bg-white px-4 py-3 rounded-xl shadow-sm transition-all ${
//                     errors.password
//                       ? "border-red-500"
//                       : password
//                       ? "border-green-500"
//                       : "border-gray-200"
//                   }`}
//                 >
//                   <Lock className={`h-6 w-6 ${
//                     errors.password ? "text-red-500" : password ? "text-green-500" : "text-gray-400"
//                   }`} />
//                   <input
//                     className="w-full p-2 outline-none bg-transparent text-gray-700 placeholder-gray-400 text-lg"
//                     type={showPassword ? "text" : "password"}
//                       value={password}
//                       onChange={(e) => {
//                         setPassword(e.target.value);
//                         if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
//                       }}
//                     placeholder="Password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="text-gray-400 hover:text-gray-600 transition-colors p-1"
//                   >
//                     {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
//                   </button>
//                   {password && (
//                     <div className="flex-shrink-0">
//                       {errors.password ? <AlertTriangle className="h-5 w-5 text-red-500" /> : <CheckCircle className="h-5 w-5 text-green-500" />}
//                     </div>
//                   )}
//                 </div>
//                 {errors.password && (
//                   <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
//                     <AlertTriangle className="h-4 w-4" /> {errors.password}
//                   </p>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition-all text-lg"
//               >
//                 {loading ? "Logging in..." : "Login"}
//               </button>

//               <div className="text-center pt-4">
//                 <p className="text-gray-600">
//                   Don&apos;t have an account?{" "}
//                   <a href="/register" className="text-green-600 hover:underline font-semibold">
//                     Register here
//                   </a>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//     </GuestRoute>
//   );
// }



"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import GuestRoute from "../contact/ProtectedPage/GuestRoute";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [errors, setErrors] = useState({});
const [apiError, setApiError] = useState("");
const [loading, setLoading] = useState(false);
console.log(email, password);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);
        const response = await fetch("https://earthscansystems.com/auth/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // Assuming the API returns access and refresh tokens
          localStorage.setItem("access", data.tokens.access);
          console.log("Tokens", data.tokens)
          localStorage.setItem("refresh", data.tokens.refresh);
          router.push("/dashboard"); // Redirect to dashboard
        } else {
          setApiError(data.detail || "Invalid credentials. Please try again.");
        }
      } catch (err) {
        setApiError("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
    <GuestRoute redirectTo="/dashboard">
    <section className="w-full flex items-center justify-center bg-[#f7f7f7]">
      <div className="w-full flex flex-col lg:flex-row items-center justify-center shadow-2xl overflow-hidden bg-white/90 backdrop-blur-md">
        
        {/* Left Side */}
        <div className="hidden lg:flex w-1/2 h-[600px] relative border-r border-green-200 bg-gray-100">
          <Image src="/crop1.jpg" alt="Login" fill className="object-cover" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/40 px-12 text-center">
            <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">Welcome Back!</h2>
            <p className="text-xl opacity-90 mb-6 drop-shadow-md">Log in to access your dashboard</p>
            <div className="w-16 h-1 bg-white rounded-full mb-6"></div>
            <p className="text-lg opacity-80 drop-shadow-sm">Enter your credentials to continue your journey with us</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-4xl text-green-600 font-extrabold mb-2">Login</h1>
              <p className="text-gray-600">Welcome back! Please login to your account.</p>
            </div>

            {apiError && (
              <p className="text-red-500 text-center mb-4 flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" /> {apiError}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <div
                  className={`flex items-center gap-3 border-2 bg-white px-4 py-3 rounded-xl shadow-sm transition-all ${
                    errors.email
                      ? "border-red-500"
                      : email
                      ? "border-green-500"
                      : "border-gray-200"
                  }`}
                >
                  <User className={`h-6 w-6 ${
                    errors.email ? "text-red-500" : email ? "text-green-500" : "text-gray-400"
                  }`} />
                  <input
                    className="w-full p-2 outline-none bg-transparent text-gray-700 placeholder-gray-400 text-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                  />
                  {email && (
                    <div className="flex-shrink-0">
                      {errors.email ? <AlertTriangle className="h-5 w-5 text-red-500" /> : <CheckCircle className="h-5 w-5 text-green-500" />}
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div
                  className={`flex items-center gap-3 border-2 bg-white px-4 py-3 rounded-xl shadow-sm transition-all ${
                    errors.password
                      ? "border-red-500"
                      : password
                      ? "border-green-500"
                      : "border-gray-200"
                  }`}
                >
                  <Lock className={`h-6 w-6 ${
                    errors.password ? "text-red-500" : password ? "text-green-500" : "text-gray-400"
                  }`} />
                  <input
                    className="w-full p-2 outline-none bg-transparent text-gray-700 placeholder-gray-400 text-lg"
                    type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                      }}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                  {password && (
                    <div className="flex-shrink-0">
                      {errors.password ? <AlertTriangle className="h-5 w-5 text-red-500" /> : <CheckCircle className="h-5 w-5 text-green-500" />}
                    </div>
                  )}
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" /> {errors.password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition-all text-lg"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="text-center pt-4">
                <p className="text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-green-600 hover:underline font-semibold">
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    </GuestRoute>
    </>
  );
}
