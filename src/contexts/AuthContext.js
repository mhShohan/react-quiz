import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';
import React from 'react';
import '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return React.useContext(AuthContext);
}

export function AuthProvide({ children }) {
    const [loding, setLoading] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState();

    React.useEffect(() => {
        const auth = getAuth();
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unSubscribe;
    }, []);

    //signup function
    async function signUp(email, password, username) {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);

        //update profile
        await updateProfile(auth.currentUser, { displayName: username });

        const user = auth.currentUser;
        setCurrentUser({ ...user });
    }

    //login function
    function login(email, password) {
        const auth = getAuth();

        return signInWithEmailAndPassword(auth, email, password);
    }

    // logout function
    function logout() {
        const auth = getAuth();

        return signOut(auth);
    }

    const value = { currentUser, signOut, signUp, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {!loding && children}
        </AuthContext.Provider>
    );
}
