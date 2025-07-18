import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/LoginPage.scss';
import KeyboardIcon from '../assets/logo.png';

function LoginPage({ setUser }) {
    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    const handleGuest = () => {
        setUser({ uid: 'guest', isGuest: true });
    };

    return (
        <div className="login-container">
            <img src={KeyboardIcon} alt="keyboard" className="login-icon" />
            <h1>typing test</h1>
            <button className="google-btn" onClick={handleLogin}>login with google</button>
            <button className="guest-btn" onClick={handleGuest}>continue as guest</button>
            <h2>sign in with google to save progress :)</h2>
        </div>
    );
}

export default LoginPage;
