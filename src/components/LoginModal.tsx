"use client";

import { useState, useEffect, Fragment, FC } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { loginWithEmail, signupWithEmail, loginWithGoogle } from "@/lib/auth";
import { app } from "@/lib/firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const LoginModal: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      if (isLoginMode) {
        await loginWithEmail(email, password);
      } else {
        await signupWithEmail(email, password);
      }
      setError("");
      handleClose(); // close modal on success
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {isLoginMode ? "Login" : "Sign Up"}
                  </Dialog.Title>
                  <button onClick={handleClose}>
                    <XMarkIcon className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                <div className="mt-2">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded mb-3"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded mb-3"
                  />

                  {error && (
                    <div className="text-red-500 text-sm mb-2">{error}</div>
                  )}

                  <button
                    onClick={handleAuth}
                    className="w-full bg-blue-600 text-white py-2 rounded mb-2"
                  >
                    {isLoginMode ? "Login" : "Sign Up"}
                  </button>

                  <button
                    onClick={loginWithGoogle}
                    className="w-full bg-red-500 text-white py-2 rounded"
                  >
                    Continue with Google
                  </button>

                  <p className="text-sm text-center mt-4">
                    {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                    <button
                      onClick={() => setIsLoginMode(!isLoginMode)}
                      className="ml-2 text-blue-600 underline"
                    >
                      {isLoginMode ? "Sign Up" : "Login"}
                    </button>
                  </p>
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
