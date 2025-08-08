"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  loginWithEmail,
  signupWithEmail,
  loginWithGoogle,
} from "@/lib/auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignup) {
        await signupWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
      onLoginSuccess?.();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to authenticate");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      onLoginSuccess?.();
      onClose();
    } catch (err: any) {
      setError(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
              leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {isSignup ? "Sign Up" : "Log In"}
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {error && <p className="text-red-600">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? "Please wait..." : isSignup ? "Sign Up" : "Log In"}
                  </button>
                </form>

                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="mt-4 w-full border border-gray-300 rounded py-2 flex justify-center items-center gap-2 hover:bg-gray-100 disabled:opacity-50"
                >
                  <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
                  Continue with Google
                </button>

                <p className="mt-4 text-center text-sm text-gray-600">
                  {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => setIsSignup(!isSignup)}
                  >
                    {isSignup ? "Log In" : "Sign Up"}
                  </button>
                </p>

              </Dialog.Panel>
            </Transition.Child>

          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
