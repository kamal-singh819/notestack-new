import { auth, googleProvider } from './firebaseConnection.js';

const signInWithGoogle = async () => {
    try {
        const result = await auth.signInWithPopup(googleProvider);
        return result.user;
    } catch (error) {
        console.log('Error signing with google ', error);
        next(error);
    }
}

const signOut = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.log('Error signing out', error);
        next(error);
    }
}

export { signInWithGoogle, signOut };