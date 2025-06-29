
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  User,
  Lock,
  ArrowRight,
  UserPlus,
  Mail,
  Shield,
  LogIn,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) =>
    setFormData((f) => ({ ...f, [field]: value }));

  const handleRegister = async () => {
    const { username, email, password, confirmPassword } = formData;
    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill in all fields."); return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match."); return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long."); return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(" https://looper-task1-2.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Registration successful!");
        navigate("/login", { replace: true });
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Registration failed");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleRegister();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* …same decorative background… */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white border-opacity-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400 rounded-full mb-4 shadow-lg">
              <UserPlus className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-purple-200 via-pink-200 to-fuchsia-200 bg-clip-text text-transparent">
              Join Us Today
            </h2>
            <p className="text-purple-200 text-sm">
              Create your account to get started
            </p>
          </div>

          <div className="space-y-6">
            {/* Username */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-purple-300" />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-filter backdrop-blur-sm transition-all hover:bg-opacity-20"
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-purple-300" />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-filter backdrop-blur-sm transition-all hover:bg-opacity-20"
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-purple-300" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-12 py-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-filter backdrop-blur-sm transition-all hover:bg-opacity-20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 pr-4 text-purple-300"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Shield className="h-5 w-5 text-purple-300" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-12 py-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-filter backdrop-blur-sm transition-all hover:bg-opacity-20"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute inset-y-0 right-0 pr-4 text-purple-300"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-fuchsia-500 text-white font-semibold rounded-2xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 group relative overflow-hidden"
            >
              <div className="relative flex items-center justify-center space-x-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-purple-200 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-pink-300 hover:text-pink-200 underline"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
