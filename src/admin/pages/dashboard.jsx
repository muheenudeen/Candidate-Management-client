// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "./authcontext";
// import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
// import { toast } from "react-hot-toast";

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [isAdmin, setIsAdmin] = useState(true);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const bgColor = isAdmin ? "bg-red-500" : "bg-green-500";

//   const handleToggle = () => {
//     setIsAdmin(!isAdmin);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const endpoint = isAdmin
//         ? "http://localhost:3000/api/candidate/login"
//         : "http://localhost:3000/api/admin/login";
//       const response = await axios.post(endpoint, { email, password });

//       if (response.data.success) {
//         login(response.data.data, response.data.token);
//         toast.success(
//           `Welcome back, ${
//             isAdmin ? "Admin" : "Candidate"
//           }! Redirecting to your dashboard...`
//         );
//         navigate(isAdmin ? "/admin/dashboard" : "/candidate/dashboard");
//       }
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || "An error occurred";
//       setError(errorMessage);
//       toast.error(errorMessage);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
//         <div>
//           <h2 className="text-3xl font-bold text-gray-900">Log in</h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Enter your credentials to access your account
//           </p>
//         </div>

//         <div className="flex items-center justify-between">
//           <div
//             className={`inline-flex items-center px-4 py-2 rounded-full ${bgColor} text-white`}
//           >
//             <button onClick={handleToggle} className="flex items-center">
//               <span className="mr-2">{isAdmin ? "Candidate" : "Admin"}</span>
//               <FaUser className="w-4 h-4" />
//             </button>
//           </div>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm space-y-4">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaEnvelope className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 placeholder="Email"
//               />
//             </div>

//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaLock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 placeholder="Password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//               >
//                 {showPassword ? (
//                   <FaEyeSlash className="h-5 w-5 text-gray-400" />
//                 ) : (
//                   <FaEye className="h-5 w-5 text-gray-400" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {error && (
//             <div className="text-red-500 text-sm text-center">{error}</div>
//           )}

//           <button
//             type="submit"
//             className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${bgColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
//           >
//             Log in
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
