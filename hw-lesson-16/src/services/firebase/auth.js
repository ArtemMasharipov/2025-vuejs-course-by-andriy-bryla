import { auth } from '@/config/firebase';
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut
} from 'firebase/auth';

class AuthService {
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      return await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  getCurrentUser() {
    return auth.currentUser;
  }

  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, callback);
  }

  isAuthenticated() {
    return !!auth.currentUser;
  }
}

const authService = new AuthService();
export default authService;