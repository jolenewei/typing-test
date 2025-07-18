import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import '../styles/ProfileMenu.scss';
import userIcon from '../assets/user-icon.jpg';

function ProfileMenu() {
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
                    <button onClick={() => navigate('/stats')}>Stats</button>
                    <button onClick={handleLogout}>Log out</button>
                </div>
            )}
        </div>
    );
}

export default ProfileMenu;
