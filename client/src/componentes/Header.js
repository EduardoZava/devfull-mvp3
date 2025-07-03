import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Make sure you have react-router-dom installed
import logoImage from '../assets/logo-omdb.png'; // Adjust the path as needed
import SearchBar from './SearchBar'; // Adjust the path as needed

import './header.css'; // Import your styles for the header

function Header({ user_name = '', logout = () => {} }) {
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

    return (
        <header className="h-flex-items-center"> 
            <div className="flex-items-center">
                {/* Logo */}
                <img src={logoImage} alt="App Logo" className="h-10 mr-4"/>
                {/* Welcome */}
                <span className="text-lg text-gray-700 mr-4 whitespace-nowrap">
                    Welcome, <strong>{user_name ? user_name : 'Guest'}</strong>!
                </span>
                <div className="relative w-full max-w-md">
                    <SearchBar />
                </div>
                {/* Add New Movie Button */}
                
                {/* Logout Button */}
                <button 
                    onClick={logout} 
                    type="button" 
                    className="relative-button-filmes" 
                >
                    <FiPower size={24} color="#251FC5" />
                </button>
            </div>
        </header>
    );
}

export default Header;