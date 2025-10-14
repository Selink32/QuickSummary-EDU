import React, { useState, useCallback } from 'react';
import { generateSummary } from './services/geminiService';
import Header from './components/Header';
import TextInput from './components/TextInput';
import SummaryDisplay from './components/SummaryDisplay';
import Loader from './components/Loader';

const App: React.FC = () => {
    const [inputText, setInputText] = useState<string>('');
    const [summary, setSummary] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSummarize = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setSummary('');

        if (!inputText || inputText.trim().length === 0) {
            setError('Özetlenecek içerik yok. Lütfen bir metin girin.');
            setIsLoading(false);
            return;
        }

        try {
            const result = await generateSummary(inputText);
            setSummary(result);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Bilinmeyen bir hata oluştu.');
        } finally {
            setIsLoading(false);
        }
    }, [inputText]);

    const resetState = () => {
        setInputText('');
        setSummary('');
        setError(null);
        setIsLoading(false);
    };
    
    const isButtonDisabled = isLoading || !inputText.trim();

    return (
        <div className="min-h-screen container mx-auto p-4 md:p-8 flex flex-col items-center">
            <Header />

            <main className="w-full max-w-4xl mt-8">
                {!summary && !isLoading && (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-all">
                        <TextInput inputText={inputText} setInputText={setInputText} />

                        <div className="mt-6 text-center">
                            <button
                                onClick={handleSummarize}
                                disabled={isButtonDisabled}
                                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-gray-600 text-white font-bold py-3 px-12 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed shadow-md disabled:shadow-none"
                            >
                                {isLoading ? 'Özetleniyor...' : 'Özetle'}
                            </button>
                        </div>
                    </div>
                )}

                {isLoading && <Loader />}
                
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-6 rounded-md shadow-md" role="alert">
                        <p className="font-bold">Bir Hata Oluştu</p>
                        <p>{error}</p>
                    </div>
                )}
                
                {summary && (
                    <div className="w-full">
                        <SummaryDisplay summary={summary} />
                         <div className="mt-8 text-center">
                            <button
                                onClick={resetState}
                                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-12 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
                            >
                                Yeni Özet Oluştur
                            </button>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default App;