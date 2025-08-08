"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef, useEffect, useCallback } from "react";
import { authService, ValidationErrors, LoginCredentials } from "@/lib/auth";
import { GoogleAuthProvider } from "firebase/auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup?: () => void;
  onLoginSuccess?: () => void;
}

const googleProvider = new GoogleAuthProvider();

export default function LoginModal({
  isOpen,
  onClose,
  onSwitchToSignup,
  onLoginSuccess,
}: LoginModalProps) {
  const emailRef = useRef<HTMLInputElement>(null);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // UI state
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  // Error handling
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Focus email input when modal opens
  useEffect(() => {
    if (isOpen && emailRef.current) {
      setTimeout(() => emailRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Clear form when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = authService.getRememberedEmail();
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
    setValidationErrors({});
    setShowForgotPassword(false);
    setResetEmailSent(false);
    setLoading(false);
    setGoogleLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials: LoginCredentials = { email, password, rememberMe };
    const validationResult = authService.validateLoginForm(credentials);

    if (Object.keys(validationResult).length > 0) {
      setValidationErrors(validationResult);
      return;
    }

    setLoading(true);
    setError("");
    setValidationErrors({});

    try {
      await authService.signInWithEmail(credentials);
      onLoginSuccess?.();
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Use useCallback to stabilize function reference
  const handleGoogleLogin = useCallback(async () => {
    if (googleLoading) return; // prevent multiple clicks
    setGoogleLoading(true);
    setError("");

    try {
      // Use authService's signInWithGoogle, but pass the stable provider
      // Update your authService.signInWithGoogle to accept a provider parameter if needed,
      // or create signInWithGoogle inside this component with stable provider:
      
      // Directly using Firebase auth here to control provider instance:
      const user = await authService.signInWithGoogleProvider(googleProvider);
      onLoginSuccess?.();
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setGoogleLoading(false);
    }
  }, [googleLoading, onClose, onLoginSuccess]);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = authService.validateResetEmail(email);

    if (Object.keys(validationResult).length > 0) {
      setValidationErrors(validationResult);
      return;
    }

    setLoading(true);
    setError("");
    setValidationErrors({});

    try {
      await authService.sendPasswordReset(email);
      setResetEmailSent(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !showForgotPassword) {
      handleLogin(e as React.FormEvent);
    }
  };

  const clearFieldError = (field: keyof ValidationErrors) => {
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* ... your existing transition and UI code ... */}

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all border border-gray-100">
              {/* Header */}
              {/* ... your header code here ... */}

              {/* Body */}
              <div className="px-8 py-6">
                {/* ... your existing form or reset password UI ... */}

                {!showForgotPassword && !resetEmailSent && (
                  <>
                    {/* Your email/password form inputs here */}

                    {/* Google Login Button */}
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      disabled={loading || googleLoading}
                      className="w-full border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center mt-6"
                    >
                      {googleLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Connecting...
                        </>
                      ) : (
                        <>
                          {/* Google Logo SVG */}
                          <svg
                            className="w-5 h-5 mr-3"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                          Continue with Google
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>

              {/* Footer */}
              {/* ... your footer code here ... */}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
