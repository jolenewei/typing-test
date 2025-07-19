import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import '../styles/ProfileMenu.scss';
import userIcon from '../assets/user-icon.jpg';

function ProfileMenu({ user }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await auth.signOut();
        window.location.reload();
    };

    return (
        <div className="profile-menu">
            <div className="profile-icon" onClick={() => setOpen(!open)}>
                <img src={userIcon} alt="profile" />
            </div>
            {open && (
                <div className="modal">
                    <div className="greeting">hi, {user?.displayName || 'guest'}</div>
                    <button onClick={() => navigate('/stats')}>stats</button>
                    <button onClick={handleLogout}>log out</button>
                </div>
            )}
        </div>
    );
}

export default ProfileMenu;
