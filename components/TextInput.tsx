import React from 'react';

interface TextInputProps {
    inputText: string;
    setInputText: (text: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ inputText, setInputText }) => {
    return (
        <div>
            <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Özetlemek istediğiniz metni buraya yapıştırın..."
                className="w-full h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-md resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow bg-slate-50 dark:bg-gray-700"
            />
        </div>
    );
};

export default TextInput;