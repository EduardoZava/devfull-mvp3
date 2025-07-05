import { MdArrowBack, MdArrowForward } from 'react-icons/md';

import './footer.css'; // Import your styles for the footer

/**
 * Footer component for pagination and reload controls.
 * Props:
 * - totalPages: number
 * - currentPage: number
 * - loading: boolean
 * - handlePreviousPage: function
 * - handleNextPage: function
 * - loadMultipleMovies: function
 */
function Footer({
    loading = false,
    loadMultipleMovies = () => {},
    totalPages,
    currentPage,
    handlePreviousPage,
    handleNextPage,
}) {
    return (
        <footer style={{ background: '#000' }}>
            {/* Reload All Movies Button */}
            <div className="reload-movies text-center">
                <button
                    className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={loadMultipleMovies}
                    type="button"
                    disabled={loading}
                >
                    {loading ? 'Loading All...' : 'Reload All Movies'}
                </button>
            </div>
        </footer>
    );
}

export default Footer;