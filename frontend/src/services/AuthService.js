import { auth, googleProvider } from './FirebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const user = result.user;
        const idToken = await user.getIdToken();
        return { idToken: idToken, user: user };
    } catch (error) {
        return { error: error };
    }
};
export default signInWithGoogle;