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
 * Login with email & password.
 * Reject if email is not verified.
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
 * Send verification email.
 * Do NOT log user in automatically.
 */
export async function signupWithEmail(email: string, password: string): Promise<void> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  if (userCredential.user) {
    // Send email verification
    await sendEmailVerification(userCredential.user);

    // Sign out immediately to prevent auto-login
    await signOut(auth);
  }
}

export async function loginWithGoogle(): Promise<UserCredential> {
  const userCredential = await signInWithPopup(auth, googleProvider);

  if (!userCredential.user.emailVerified) {
    await signOut(auth);
    throw new Error("Please verify your email address before logging in.");
  }

  return userCredential;
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
