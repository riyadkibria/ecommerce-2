"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import styles from "./LoginModal.module.css";
import {
  loginWithEmail,
  signupWithEmail,
  loginWithGoogle,
} from "@/lib/auth";

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (isSignup) {
        await signupWithEmail(email, password);
        setMessage(
          "Signup successful! A verification email has been sent. Please verify your email before logging in."
        );
        setIsSignup(false);
      } else {
        await loginWithEmail(email, password);
        onLoginSuccess?.();
        onClose();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to authenticate");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      onLoginSuccess?.();
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Google login failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className={styles.dialogWrapper} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter={styles.transitionEnter}
          enterFrom={styles.transitionEnterFrom}
          enterTo={styles.transitionEnterTo}
          leave={styles.transitionLeave}
          leaveFrom={styles.transitionLeaveFrom}
          leaveTo={styles.transitionLeaveTo}
        >
          <div className={styles.backdrop} />
        </Transition.Child>

        <div className={styles.container}>
          <div className={styles.flexCenter}>

            <Transition.Child
              as={Fragment}
              enter={styles.scaleEnter}
              enterFrom={styles.scaleEnterFrom}
              enterTo={styles.scaleEnterTo}
              leave={styles.scaleLeave}
              leaveFrom={styles.scaleLeaveFrom}
              leaveTo={styles.scaleLeaveTo}
            >
              <Dialog.Panel className={styles.dialogPanel}>

                <Dialog.Title className={styles.dialogTitle}>
                  {isSignup ? "Sign Up" : "Log In"}
                </Dialog.Title>

                <form onSubmit={handleSubmit} className={styles.form}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.input}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={styles.input}
                  />
                  {error && <p className={styles.error}>{error}</p>}
                  {message && <p className={styles.message}>{message}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className={styles.submitButton}
                  >
                    {loading ? "Please wait..." : isSignup ? "Sign Up" : "Log In"}
                  </button>
                </form>

                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className={styles.googleButton}
                >
                  <img src="/google-icon.svg" alt="Google" className={styles.googleIcon} />
                  Continue with Google
                </button>

                <p className={styles.switchText}>
                  {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                  <button
                    className={styles.switchButton}
                    onClick={() => {
                      setError(null);
                      setMessage(null);
                      setIsSignup(!isSignup);
                    }}
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
