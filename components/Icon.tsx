import React from 'react';

// FIX: Add 'upload' and 'file' to IconType to support icons used in PdfUploader.
type IconType = 'book' | 'pin' | 'puzzle' | 'test-tube' | 'lightbulb' | 'upload' | 'file';

interface IconProps {
    type: IconType;
    className?: string;
}

export const Icon: React.FC<IconProps> = ({ type, className = 'w-6 h-6 mr-2' }) => {
    // FIX: Replaced JSX.Element with React.ReactElement to resolve issue with JSX namespace not being found.
    const icons: Record<IconType, React.ReactElement> = {
        book: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>,
        pin: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25c-1.542.92-3.32.92-4.862 0l-3.375-2.025a1.125 1.125 0 0 1-.562-1.004v-3.45c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v3.45c0 .41-.223.79-.562 1.004l-3.375 2.025Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75V15" /></svg>,
        puzzle: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.597.484-1.08.108-1.08.597 0 1.08-.484 1.08-1.08h.008v.008h-.008c0 .597-.484 1.08-1.08 1.08-.597 0-1.08.484-1.08 1.08v.008h.008v-.008Zm-4.5 0c0-.597.484-1.08.108-1.08.597 0 1.08-.484 1.08-1.08h.008v.008h-.008c0 .597-.484 1.08-1.08 1.08-.597 0-1.08.484-1.08 1.08v.008h.008v-.008ZM12 20.25c.597 0 1.08.484 1.08 1.08v.008h-.008c-.597 0-1.08-.484-1.08-1.08v-.008h.008Zm0 0c-.597 0-1.08.484-1.08 1.08v.008h.008c.597 0 1.08-.484 1.08-1.08v-.008h-.008ZM9.75 6.087v11.141a2.093 2.093 0 0 0 2.093 2.093h.314a2.093 2.093 0 0 0 2.093-2.093V6.087" /><path strokeLinecap="round" strokeLinejoin="round" d="M11.964 3.036a.25.25 0 0 1 0 .428m0 0a.25.25 0 0 0 0 .428m0-1.284a.25.25 0 0 1 0 .428M11.964 3.036a.25.25 0 0 0 0 .428m0 0a.25.25 0 0 1 0 .428" /></svg>,
        'test-tube': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9M10.5 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 0v1.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5v-1.5m-9 3.75a3 3 0 0 1 6 0v1.5a3 3 0 0 1-6 0v-1.5Zm0 0a3 3 0 0 0-3 3v4.5a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3m-9 0v9" /></svg>,
        lightbulb: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a12.06 12.06 0 0 0-4.5 0m4.5 2.311a12.06 12.06 0 0 1-4.5 0M9.75 2.25A.75.75 0 0 1 10.5 3v1.5a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75Zm4.5 0a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM9 10.5a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5H9Z" /></svg>,
        // FIX: Add 'upload' icon SVG.
        upload: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>,
        // FIX: Add 'file' icon SVG.
        file: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
    };
    return icons[type] || null;
};
