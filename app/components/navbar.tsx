import React from 'react';

const Navbar: React.FC = () => {
    return (
    <nav className="bg-gray-900 text-white p-4 h-12 w-screen flex justify-between items-center">
        <div className="w-10 h-10 rounded-full"></div> {/* Empty div to align h1 in the center */}
        <h1 className="text-2xl font-bold">Shopper</h1>
        <div className="w-10 h-10 rounded-full bg-gray-700"></div>
    </nav>
    );
};

export default Navbar;