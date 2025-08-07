"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/lib/firebase";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose(); // close modal on success
  } catch (err) {
  const error = err as FirebaseError;

      if (err.code === "auth/user-not-found") {
        setError("User not found.");
      } else if (err.code === "auth/wrong-password") {
        setError("Wrong password.");
      } else {
        setError("Login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose(); // close modal on success
    } catch (err) {
      setError("Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
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
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
              <Dialog.Title className="text-lg font-bold text-center">
                Login
              </Dialog.Title>

              {error && (
                <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
              )}

              <div className="mt-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 mb-3 border rounded-md outline-none"
                  disabled={loading}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 mb-4 border rounded-md outline-none"
                  disabled={loading}
                />
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                <div className="flex items-center justify-center mt-4">
                  <span className="text-gray-500 text-sm">OR</span>
                </div>

                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full mt-3 border py-2 rounded hover:bg-gray-100 transition"
                >
                  {loading ? "Please wait..." : "Login with Google"}
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
