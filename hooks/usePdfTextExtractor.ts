
import { useState, useEffect } from 'react';

// pdfjs-dist is loaded from a CDN, so we declare it as a global
declare const pdfjsLib: any;

export const usePdfTextExtractor = (file: File | null) => {
    const [extractedText, setExtractedText] = useState<string>('');
    const [isExtracting, setIsExtracting] = useState<boolean>(false);
    const [extractionError, setExtractionError] = useState<string | null>(null);

    useEffect(() => {
        if (!file) {
            setExtractedText('');
            return;
        }

        const extract = async () => {
            setIsExtracting(true);
            setExtractedText('');
            setExtractionError(null);
            
            if (typeof pdfjsLib === 'undefined') {
                setExtractionError('PDF processing library not loaded. Please refresh the page.');
                setIsExtracting(false);
                return;
            }

            // Configure the worker source for pdf.js
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = async (e) => {
                if (!e.target?.result) {
                    setExtractionError('Failed to read the file.');
                    setIsExtracting(false);
                    return;
                }
                
                try {
                    const pdf = await pdfjsLib.getDocument({ data: e.target.result }).promise;
                    let fullText = '';
                    const maxPages = pdf.numPages > 50 ? 50 : pdf.numPages; // Limit to 50 pages for performance

                    for (let i = 1; i <= maxPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        const pageText = textContent.items.map((item: any) => item.str).join(' ');
                        fullText += pageText + '\n\n';
                    }
                    setExtractedText(fullText);
                } catch (error) {
                    console.error('Error extracting text from PDF:', error);
                    setExtractionError('Could not extract text from the PDF. The file might be corrupted or image-based.');
                } finally {
                    setIsExtracting(false);
                }
            };
            reader.onerror = () => {
                setExtractionError('Error reading the file.');
                setIsExtracting(false);
            };
        };

        extract();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);

    return { extractedText, isExtracting, extractionError };
};
