// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import Login from "./components/Login";
// import Register from "./components/Register";

// const queryClient = new QueryClient();

// const isAuthenticated = () => localStorage.getItem("authenticated") === "true";

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route
//             path="/"
//             element={
//               isAuthenticated() ? <Index /> : <Navigate to="/login" replace />
//             }
//           />
//           {/* Catch-all route */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//       <Toaster />
//       <Sonner />
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;
// src/App.jsx

 // src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";

const queryClient = new QueryClient();

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  try {
    const [, payload] = token.split(".");
    const { exp } = JSON.parse(atob(payload));
    if (exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  } catch {
    localStorage.removeItem("token");
    return false;
  }
};

export default function App() {
  const [authState, setAuthState] = useState(isAuthenticated());

  // Listen for storage changes to update auth state
  useEffect(() => {
    const handleStorageChange = () => {
      setAuthState(isAuthenticated());
    };

    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);
    
    // Also check auth state periodically
    const interval = setInterval(() => {
      setAuthState(isAuthenticated());
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                authState ? <Navigate to="/" replace /> : <Login />
              }
            />
            <Route
              path="/register"
              element={
                authState ? <Navigate to="/" replace /> : <Register />
              }
            />
            <Route
              path="/"
              element={
                authState ? <Index /> : <Navigate to="/login" replace />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}