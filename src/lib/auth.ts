import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { app } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  displayName?: string;
}

export interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  displayName?: string;
}

// 1️⃣ Grouped error codes for clarity
const commonErrors = {
  "auth/network-request-failed": "Network error. Please check your connection",
  "auth/internal-error": "Something went wrong. Please try again",
};

const loginErrors = {
  "auth/user-not-found": "No account found with this email address",
  "auth/wrong-password": "Incorrect password. Please try again",
  "auth/invalid-email": "Please enter a valid email address",
  "auth/user-disabled": "This account has been disabled",
  "auth/invalid-credential": "Invalid credentials. Please check your email and password",
  "auth/too-many-requests": "Too many failed attempts. Please try again later",
};

const signupErrors = {
  "auth/email-already-in-use": "An account with this email already exists",
  "auth/weak-password": "Password is too weak. Please choose a stronger password",
  "auth/invalid-email": "Please enter a valid email address",
};

const resetErrors = {
  "auth/user-not-found": "No account found with this email address",
  "auth/invalid-email": "Please enter a valid email address",
  "auth/invalid-action-code": "The reset link is invalid or has expired",
  "auth/expired-action-code": "The reset link has expired. Please request a new one",
};

const googleErrors = {
  "auth/popup-closed-by-user": "Sign-in was cancelled",
  "auth/popup-blocked": "Pop-up was blocked. Please allow pop-ups and try again",
  "auth/cancelled-popup-request": "Only one pop-up request is allowed at a time",
  "auth/operation-not-allowed": "Google sign-in is not enabled",
};

// 2️⃣ Merge all without duplicates
const errorMessages: Record<string, string> = {
  ...commonErrors,
  ...loginErrors,
  ...signupErrors,
  ...resetErrors,
  ...googleErrors,
};

export class AuthService {
  private auth = getAuth(app);
  private googleProvider: GoogleAuthProvider;

  constructor() {
    this.googleProvider = new GoogleAuthProvider();
    this.googleProvider.addScope("email");
    this.googleProvider.addScope("profile");
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  private toAuthUser(user: User): AuthUser {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  validateLoginForm(credentials: LoginCredentials): ValidationErrors {
    const errors: ValidationErrors = {};

    if (!credentials.email) {
      errors.email = "Email is required";
    } else if (!this.isValidEmail(credentials.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!credentials.password) {
      errors.password = "Password is required";
    } else if (credentials.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  }

  validateSignupForm(credentials: SignupCredentials): ValidationErrors {
    const errors: ValidationErrors = {};

    if (!credentials.email) {
      errors.email = "Email is required";
    } else if (!this.isValidEmail(credentials.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!credentials.password) {
      errors.password = "Password is required";
    } else if (credentials.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else if (credentials.password.length > 128) {
      errors.password = "Password must be less than 128 characters";
    }

    if (!credentials.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (credentials.password !== credentials.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (credentials.displayName && credentials.displayName.length > 50) {
      errors.displayName = "Display name must be less than 50 characters";
    }

    return errors;
  }

  validateResetEmail(email: string): ValidationErrors {
    const errors: ValidationErrors = {};

    if (!email) {
      errors.email = "Please enter your email address";
    } else if (!this.isValidEmail(email)) {
      errors.email = "Please enter a valid email address";
    }

    return errors;
  }

  getErrorMessage(errorCode: string): string {
    return errorMessages[errorCode] || "An unexpected error occurred. Please try again";
  }

  async signInWithEmail(credentials: LoginCredentials): Promise<AuthUser> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      );

      if (credentials.rememberMe) {
        localStorage.setItem("rememberedEmail", credentials.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      return this.toAuthUser(userCredential.user);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      throw new Error(this.getErrorMessage(firebaseError.code));
    }
  }

  async signInWithGoogle(): Promise<AuthUser> {
    try {
      const result = await signInWithPopup(this.auth, this.googleProvider);
      return this.toAuthUser(result.user);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      throw new Error(this.getErrorMessage(firebaseError.code));
    }
  }

  async signUpWithEmail(credentials: SignupCredentials): Promise<AuthUser> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      );

      if (credentials.displayName && userCredential.user) {
        await userCredential.user.updateProfile({
          displayName: credentials.displayName,
        });
      }

      return this.toAuthUser(userCredential.user);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      throw new Error(this.getErrorMessage(firebaseError.code));
    }
  }

  async sendPasswordReset(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      throw new Error(this.getErrorMessage(firebaseError.code));
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      throw new Error(this.getErrorMessage(firebaseError.code));
    }
  }

  getRememberedEmail(): string | null {
    try {
      return localStorage.getItem("rememberedEmail");
    } catch {
      return null;
    }
  }

  clearRememberedEmail(): void {
    try {
      localStorage.removeItem("rememberedEmail");
    } catch {
      // Ignore errors
    }
  }

  async checkEmailExists(email: string): Promise<boolean> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return true;
    } catch (error) {
      const firebaseError = error as FirebaseError;
      return firebaseError.code !== "auth/user-not-found";
    }
  }
}

export const authService = new AuthService();
export type { User } from "firebase/auth";
