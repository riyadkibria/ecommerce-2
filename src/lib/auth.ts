// lib/auth.ts
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  sendPasswordResetEmail,
  UserCredential,
  User
} from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export async function loginWithEmail(email: string, password: string): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Signup but immediately sign out so user won't be logged in automatically.
 */
export async function signupWithEmail(email: string, password: string): Promise<void> {
  await createUserWithEmailAndPassword(auth, email, password);
  // Immediately sign out after signup
  await signOut(auth);
}

export async function loginWithGoogle(): Promise<UserCredential> {
  return signInWithPopup(auth, googleProvider);
}

export async function logout(): Promise<void> {
  return signOut(auth);
}

export async function sendResetEmail(email: string): Promise<void> {
  return sendPasswordResetEmail(auth, email);
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}
