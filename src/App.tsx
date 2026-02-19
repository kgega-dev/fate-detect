import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

/* Components */
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { Background } from "./components/Background";
import { ToastHost } from "./components/ToastHost";

/* Pages */
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Tools } from "./pages/Tools";
import { CustomStrings } from "./pages/CustomStrings";
import { SavedScans } from "./pages/SavedScans";
import { Affiliate } from "./pages/Affiliate";
import { Changelogs } from "./pages/Changelogs";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";

/* Context */
import { useAuth } from "./context/AuthContext";

/** PageWrapper - Framer Motion za glatke prijelaze izmedu stranica **/
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

/** ProtectedRoute - Ako korisnik nije logiran, preusmjeri na /login **/
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex min-h-screen bg-black text-[#e8e6e3] font-sans selection:bg-[#39de7f]/30">
      <Background />

      {!isLoginPage && <Sidebar />}

      <main className={`flex-1 relative z-10 ${!isLoginPage ? "ml-72" : ""}`}>
        {!isLoginPage && <Navbar />}

        <div className={!isLoginPage ? "p-10" : ""}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Public ruta */}
              <Route path="/login" element={<Login />} />

              {/* Protected rute */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <PageWrapper>
                      <Dashboard />
                    </PageWrapper>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/tools"
                element={
                  <ProtectedRoute>
                    <PageWrapper>
                      <Tools />
                    </PageWrapper>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/custom-strings"
                element={
                  <ProtectedRoute>
                    <PageWrapper>
                      <CustomStrings />
                    </PageWrapper>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/saved-scans"
                element={
                  <ProtectedRoute>
                    <PageWrapper>
                      <SavedScans />
                    </PageWrapper>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/affiliate"
                element={
                  <ProtectedRoute>
                    <PageWrapper>
                      <Affiliate />
                    </PageWrapper>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/changelogs"
                element={
                  <ProtectedRoute>
                    <PageWrapper>
                      <Changelogs />
                    </PageWrapper>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <PageWrapper>
                      <Profile />
                    </PageWrapper>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <PageWrapper>
                      <Settings />
                    </PageWrapper>
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </div>
      </main>
      <ToastHost />

      {!isLoginPage && (
        <footer className="fixed bottom-4 right-4 text-[10px] text-gray-600 pointer-events-none">
          Developed by: [Gega]
        </footer>
      )}
    </div>
  );
}