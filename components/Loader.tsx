
import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
            <h2 className="text-2xl font-semibold mt-6 text-slate-700 dark:text-slate-300">Özet Oluşturuluyor</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Lütfen bekleyin, içeriğiniz analiz ediliyor...</p>
        </div>
    );
};

export default Loader;
