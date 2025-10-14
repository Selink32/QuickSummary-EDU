
import React, { useCallback } from 'react';
import { Icon } from './Icon';

interface PdfUploaderProps {
    file: File | null;
    setFile: (file: File | null) => void;
    isExtracting: boolean;
}

const PdfUploader: React.FC<PdfUploaderProps> = ({ file, setFile, isExtracting }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
        }
    }, [setFile]);

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div>
            <label
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="flex justify-center w-full h-48 px-4 transition bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md appearance-none cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 focus:outline-none"
            >
                <span className="flex items-center space-x-2">
                    <Icon type="upload" className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                        PDF dosyanızı buraya sürükleyin veya <span className="text-blue-600 dark:text-blue-400 underline">seçmek için tıklayın</span>
                    </span>
                </span>
                <input type="file" name="file_upload" className="hidden" accept="application/pdf" onChange={handleFileChange} />
            </label>
            {file && (
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-center">
                    <p className="font-medium flex items-center justify-center">
                        <Icon type="file" className="w-5 h-5 mr-2 text-green-500" />
                        Seçilen Dosya: {file.name}
                        {isExtracting && <span className="ml-2 animate-pulse"> (İşleniyor...)</span>}
                    </p>
                </div>
            )}
        </div>
    );
};

export default PdfUploader;
