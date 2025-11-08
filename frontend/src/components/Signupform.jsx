import React from "react"
import {User,Lock , Mail, FileText} from 'lucide-react'
import {useState,useEffect} from "react"
import {signup}from "../utils/api"

export default function Signupform(){
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const [confirm , setConfirm]=useState("")
    const[error,setError]=useState("");
    const[loading ,setLoading]=useState(false)
    const [focusedInput, setFocusedInput] = useState(null);


    useEffect(()=>{
        document.title="Signup | summerizer "
    },[]);
    const handleSubmit = async(e) =>{
        e.preventDefault();

        if(!email.includes("@")){
            setError("Please enter a valid ")
            return;
        }
        if(password.length<6){
            setError("password must be 6 characters")
            return;
        }
        if(password!==confirm){
            setError("password do not match");
            return
        }
        setError("")
        setLoading(true)

        //simulating api call

      setTimeout(()=>{
        alert("Signup Successful")
        setLoading(false);
      },2000)

    
    
    try {
      const res = await signup({ username, email, password });
      alert(res.message || "Signup Successful");
      window.location.href = "/login";
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gray-700 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gray-600 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Title Section */}
        <div className="text-center mb-8 transform transition-all duration-700 hover:scale-105">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-gray-700 to-gray-900 rounded-2xl shadow-2xl mb-4 transform transition-all duration-500 hover:rotate-12 border border-gray-600">
            <FileText className="w-10 h-10 text-gray-300" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            Summerizer App
          </h1>
          <p className="text-gray-400 text-sm">Transform your content into insights</p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-700 transform transition-all duration-500 hover:shadow-gray-900">
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            Create Account
          </h2>
          <p className="text-center text-gray-400 mb-6 text-sm">Join us and start summarizing</p>

          <div className="space-y-4">
            {/* Username Input */}
            <div
              className={`flex items-center border-2 rounded-xl p-3 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-all duration-300 ${
                focusedInput === "username"
                  ? "border-gray-500 shadow-lg shadow-gray-700 scale-105"
                  : "border-gray-700 hover:border-gray-600"
              }`}
            >
              <User className={`mr-3 transition-colors duration-300 ${focusedInput === "username" ? "text-gray-400" : "text-gray-500"}`} size={20} />
              <input
                type="text"
                placeholder="Full name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setFocusedInput("username")}
                onBlur={() => setFocusedInput(null)}
                className="w-full bg-transparent focus:outline-none text-white placeholder-gray-500"
                required
              />
            </div>

            {/* Email Input */}
            <div
              className={`flex items-center border-2 rounded-xl p-3 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-all duration-300 ${
                focusedInput === "email"
                  ? "border-gray-500 shadow-lg shadow-gray-700 scale-105"
                  : "border-gray-700 hover:border-gray-600"
              }`}
            >
              <Mail className={`mr-3 transition-colors duration-300 ${focusedInput === "email" ? "text-gray-400" : "text-gray-500"}`} size={20} />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput(null)}
                className="w-full bg-transparent focus:outline-none text-white placeholder-gray-500"
                required
              />
            </div>

            {/* Password Input */}
            <div
              className={`flex items-center border-2 rounded-xl p-3 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-all duration-300 ${
                focusedInput === "password"
                  ? "border-gray-500 shadow-lg shadow-gray-700 scale-105"
                  : "border-gray-700 hover:border-gray-600"
              }`}
            >
              <Lock className={`mr-3 transition-colors duration-300 ${focusedInput === "password" ? "text-gray-400" : "text-gray-500"}`} size={20} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
                className="w-full bg-transparent focus:outline-none text-white placeholder-gray-500"
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div
              className={`flex items-center border-2 rounded-xl p-3 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-all duration-300 ${
                focusedInput === "confirm"
                  ? "border-gray-500 shadow-lg shadow-gray-700 scale-105"
                  : "border-gray-700 hover:border-gray-600"
              }`}
            >
              <Lock className={`mr-3 transition-colors duration-300 ${focusedInput === "confirm" ? "text-gray-400" : "text-gray-500"}`} size={20} />
              <input
                type="password"
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onFocus={() => setFocusedInput("confirm")}
                onBlur={() => setFocusedInput(null)}
                className="w-full bg-transparent focus:outline-none text-white placeholder-gray-500"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900 bg-opacity-30 border border-red-700 rounded-lg p-3 animate-pulse">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 bg-linear-to-r from-gray-700 to-gray-900 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl hover:from-gray-600 hover:to-gray-800 hover:scale-105 transform active:scale-95 border border-gray-600"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center mt-6 text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-gray-300 font-semibold hover:text-white transition-colors duration-300 hover:underline"
            >
              Login
            </a>
          </p>
        </div>

        {/* Footer Text */}
        <p className="text-center mt-6 text-gray-500 text-xs">
          By signing up, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
    

}