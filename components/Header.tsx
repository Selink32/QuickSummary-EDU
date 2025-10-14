import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                QuickSummary EDU
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Akademik metin içeriklerinizi saniyeler içinde anlaşılır özetlere dönüştürün.
            </p>
        </header>
    );
};

export default Header;