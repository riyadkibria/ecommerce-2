"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect, FC } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { loginWithEmail, signupWithEmail, loginWithGoogle } from "@/lib/auth";
import { app } from "@/lib/firebase";

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
      // User state change handling (if needed)
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
      onClose(); // Close modal on success
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {isLoginMode ? "Login" : "Sign Up"}
                </Dialog.Title>

                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

                <div className="mt-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    className="w-full mb-3 px-3 py-2 border rounded"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    className="w-full mb-3 px-3 py-2 border rounded"
                  />
                  <button
                    onClick={handleAuth}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    {isLoginMode ? "Login" : "Sign Up"}
                  </button>
                  <button
                    onClick={loginWithGoogle}
                    className="w-full mt-3 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                  >
                    Continue with Google
                  </button>
                </div>

                <div className="mt-4 text-sm text-center">
                  {isLoginMode
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                  <button
                    className="text-blue-500 underline"
                    onClick={() => setIsLoginMode(!isLoginMode)}
                  >
                    {isLoginMode ? "Sign Up" : "Login"}
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
