"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef, useEffect } from "react";
import { authService, ValidationErrors, LoginCredentials } from "@/lib/auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup?: () => void;
  onLoginSuccess?: () => void;
}

export default function LoginModal({ 
  isOpen, 
  onClose, 
  onSwitchToSignup,
  onLoginSuccess
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

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");

    try {
      await authService.signInWithGoogle();
      onLoginSuccess?.();
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setGoogleLoading(false);
    }
  };

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
    if (e.key === 'Enter' && !showForgotPassword) {
      handleLogin(e as React.FormEvent);
    }
  };

  const clearFieldError = (field: keyof ValidationErrors) => {
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

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
              <div className="px-8 pt-8 pb-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-2xl font-bold text-gray-900">
                    {showForgotPassword ? "Reset Password" : "Welcome Back"}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                    disabled={loading || googleLoading}
                    aria-label="Close modal"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {!showForgotPassword && !resetEmailSent && (
                  <p className="text-gray-600 mt-2">
                    Sign in to your account to continue
                  </p>
                )}
              </div>

              {/* Body */}
              <div className="px-8 py-6">
                {resetEmailSent ? (
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Check Your Email</h3>
                    <p className="text-gray-600 mb-6">
                      We&apos;ve sent a password reset link to <strong>{email}</strong>
                    </p>
                    <button
                      onClick={() => {
                        setResetEmailSent(false);
                        setShowForgotPassword(false);
                      }}
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Back to Login
                    </button>
                  </div>
                ) : (
                  <form onSubmit={showForgotPassword ? handleForgotPassword : handleLogin}>
                    {/* Error Message */}
                    {error && (
                      <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
                        <p className="text-sm text-red-700 flex items-center">
                          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {error}
                        </p>
                      </div>
                    )}

                    {/* Email Input */}
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          ref={emailRef}
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            clearFieldError('email');
                          }}
                          onKeyDown={handleKeyDown}
                          className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            validationErrors.email 
                              ? 'border-red-300 bg-red-50' 
                              : 'border-gray-300 hover:border-gray-400'
                          } ${(loading || googleLoading) ? 'opacity-50' : ''}`}
                          disabled={loading || googleLoading}
                          autoComplete="email"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                        </div>
                      </div>
                      {validationErrors.email && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                      )}
                    </div>

                    {/* Password Input */}
                    {!showForgotPassword && (
                      <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              clearFieldError('password');
                            }}
                            onKeyDown={handleKeyDown}
                            className={`w-full px-4 py-3 pr-12 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              validationErrors.password 
                                ? 'border-red-300 bg-red-50' 
                                : 'border-gray-300 hover:border-gray-400'
                            } ${(loading || googleLoading) ? 'opacity-50' : ''}`}
                            disabled={loading || googleLoading}
                            autoComplete="current-password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                            disabled={loading || googleLoading}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            )}
                          </button>
                        </div>
                        {validationErrors.password && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
                        )}
                      </div>
                    )}

                    {/* Remember Me & Forgot Password */}
                    {!showForgotPassword && (
                      <div className="flex items-center justify-between mb-6">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            disabled={loading || googleLoading}
                          />
                          <span className="ml-2 text-sm text-gray-700">Remember me</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowForgotPassword(true)}
                          className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                          disabled={loading || googleLoading}
                        >
                          Forgot password?
                        </button>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading || googleLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {showForgotPassword ? "Sending..." : "Signing in..."}
                        </>
                      ) : (
                        showForgotPassword ? "Send Reset Link" : "Sign In"
                      )}
                    </button>

                    {/* Back to Login */}
                    {showForgotPassword && (
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(false)}
                        className="w-full mt-3 text-gray-600 hover:text-gray-800 font-medium py-2 transition-colors"
                        disabled={loading}
                      >
                        Back to Login
                      </button>
                    )}

                    {/* Divider & Google Login */}
                    {!showForgotPassword && (
                      <>
                        <div className="relative my-6">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleGoogleLogin}
                          disabled={loading || googleLoading}
                          className="w-full border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center"
                        >
                          {googleLoading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Connecting...
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56
