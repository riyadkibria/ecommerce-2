"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect, FC } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { loginWithEmail, signupWithEmail, loginWithGoogle } from "@/lib/auth";
import { app } from "@/lib/firebase";
import { Mail, Lock } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState("");

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      // handle auth state if needed
    });
    return () => unsubscribe();
  }, [auth]);

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    try {
      if (isLoginMode) {
        await loginWithEmail(email, password);
      } else {
        await signupWithEmail(email, password);
      }
      setError("");
      onClose();
      setEmail("");
      setPassword("");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-6"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-6"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-8 shadow-2xl transition-all">
                <Dialog.Title className="text-2xl font-semibold text-gray-900 mb-4 select-none">
                  {isLoginMode ? "Welcome Back!" : "Create Your Account"}
                </Dialog.Title>

                {error && (
                  <p className="mb-4 text-center text-sm font-medium text-red-600 select-none">
                    {error}
                  </p>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAuth();
                  }}
                  className="space-y-5"
                >
                  <label className="relative block">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition"
                      autoComplete="email"
                      required
                    />
                  </label>

                  <label className="relative block">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition"
                      autoComplete={isLoginMode ? "current-password" : "new-password"}
                      required
                    />
                  </label>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-blue-600 py-3 text-white font-semibold shadow-md shadow-blue-400 transition hover:bg-blue-700 active:scale-[0.98]"
                  >
                    {isLoginMode ? "Log In" : "Sign Up"}
                  </button>
                </form>

                <button
                  onClick={loginWithGoogle}
                  className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100 active:scale-[0.98]"
                >
                  <img
                    src="/google-logo.svg"
                    alt="Google Logo"
                    className="h-5 w-5"
                    loading="lazy"
                    draggable={false}
                  />
                  Continue with Google
                </button>

                <div className="mt-6 text-center text-sm text-gray-600 select-none">
                  {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    onClick={() => {
                      setIsLoginMode(!isLoginMode);
                      setError("");
                    }}
                    className="ml-1 font-semibold text-blue-600 underline hover:text-blue-700"
                  >
                    {isLoginMode ? "Sign Up" : "Log In"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LoginModal;
