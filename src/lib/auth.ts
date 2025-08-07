// lib/auth.ts

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";

import { app } from "./firebase";

// Firebase Auth instance
const auth = getAuth(app);

// Email/Password Login
export async function loginWithEmail(email: string, password: string): Promise<UserCredential> {
  return await signInWithEmailAndPassword(auth, email, password);
}

// Email/Password Signup
export async function signupWithEmail(email: string, password: string): Promise<UserCredential> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(userCredential.user); // Optional: verify user
  return userCredential;
}

// Sign in with Google
export async function loginWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
}

// Logout
export async function logout(): Promise<void> {
  return await signOut(auth);
}

// Send Password Reset Email
export async function sendResetEmail(email: string): Promise<void> {
  return await sendPasswordResetEmail(auth, email);
}

// Observe user state changes
export function observeUser(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// Get current authenticated user
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

// Optional: Update user profile
export async function updateUserProfile(data: { displayName?: string; photoURL?: string }): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user.");
  return await updateProfile(user, data);
}

// Optional: Send email verification manually
export async function verifyEmail(): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user.");
  return await sendEmailVerification(user);
}
