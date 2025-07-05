import { FiPower } from 'react-icons/fi';
import logoImage from '../assets/logo-omdb.png'; // Adjust the path as needed
import SearchBar from './SearchBar'; // Adjust the path as needed
import { useNavigate} from 'react-router-dom';

import './header.css'; // Import your styles for the header

function Header({ user_name = '', logout: logoutProp = () => {} }) {
    
    /**
     * Header component for the application.
     * Displays a logo, welcome message, search bar, and logout button.
     *
     * @param {Object} props - The properties passed to the component.
     * @param {string} props.user_name - The name of the user, defaults to an empty string.
     * @param {function} props.logout - Function to call when the user logs out, defaults to a no-op function.
     */
    // Ensure the user_name is in uppercase for display
    user_name = localStorage.getItem('user_name') || user_name;
    user_name = user_name.toLowerCase();
    if (!user_name) {
        user_name = 'Guest';
    }
    const navigate =  useNavigate();
    async function handleLogout() {
        try {
                localStorage.clear();
                navigate('/');
            } catch (err) {
                alert('Falha no Logout! Tente novamente!');
            }
    }

    return (
        <header className="h-flex-items-center"> 
            <div className="flex-items-center">
                {/* Logo */}
                <img src={logoImage} alt="App Logo" className="h-10 mr-4"/>
                {/* Welcome */}
                <span className="text-lg mr-4 whitespace-nowrap" style={{ color: 'white' }}>
                    Welcome, <strong style={{ color: 'white' }}>{user_name ? user_name : 'Guest'}</strong>!
                </span>
                <div className="relative w-full max-w-md">
                    <SearchBar />
                </div>
                {/* Add New Movie Button */}}
                
                {/* Logout Button */}
                <button 
                    onClick={handleLogout} 
                    type="button" 
                    className="relative-button-movies" 
                >
                    <FiPower size={24} color="#E0E0E0" />
                </button>
            </div>
        </header>
    );
}

export default Header;