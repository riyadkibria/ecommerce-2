// lib/auth.ts
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  sendPasswordResetEmail,
  sendEmailVerification,
  UserCredential,
  User
} from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

/**
 * Login user with email & password.
 * Throws error if email is not verified.
 */
export async function loginWithEmail(email: string, password: string): Promise<UserCredential> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  if (!userCredential.user.emailVerified) {
    await signOut(auth);
    throw new Error("Please verify your email address before logging in.");
  }

  return userCredential;
}

/**
 * Signup user with email & password.
 * Sends verification email.
 * Signs user out immediately to prevent auto-login.
 */
export async function signupWithEmail(email: string, password: string): Promise<void> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  if (userCredential.user) {
    // Send verification email
    await sendEmailVerification(userCredential.user);

    // Sign out immediately so user is not logged in before verifying email
    await signOut(auth);
  }
}

/**
 * Login with Google popup.
 * Throws error if email not verified.
 */
export async function loginWithGoogle(): Promise<UserCredential> {
  const userCredential = await signInWithPopup(auth, googleProvider);

  if (!userCredential.user.emailVerified) {
    await signOut(auth);
    throw new Error("Please verify your email address before logging in.");
  }

  return userCredential;
}

/**
 * Logout current user.
 */
export async function logout(): Promise<void> {
  await signOut(auth);
}

/**
 * Send password reset email.
 */
export async function sendResetEmail(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

/**
 * Get current logged-in user or null.
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

/**
 * Resend email verification to current user.
 * Throws error if no user logged in.
 */
export async function resendVerificationEmail(): Promise<void> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user is currently logged in.");
  }
  await sendEmailVerification(user);
}
