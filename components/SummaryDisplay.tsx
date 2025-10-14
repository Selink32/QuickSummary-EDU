import React from 'react';
import { Icon } from './Icon';

interface SummaryDisplayProps {
    summary: string;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary }) => {
    const renderLine = (line: string, index: number) => {
        line = line.trim();
        if (!line) return null;

        const createMarkup = (htmlContent: string) => {
            return { __html: htmlContent };
        };

        const renderHeading = (iconType: 'book' | 'pin' | 'puzzle' | 'test-tube' | 'lightbulb', text: string, color: string) => (
            <h2 key={index} className={`flex items-center text-xl font-bold ${color} mt-6 mb-3`}>
                <Icon type={iconType} /> {text}
            </h2>
        );

        if (line.startsWith('📘')) return renderHeading('book', line.replace(/📘\s*\*\*/g, '').replace(/\*\*/g, '').trim(), 'text-blue-600 dark:text-blue-400');
        if (line.startsWith('📍')) return renderHeading('pin', line.replace(/📍\s*\*\*/g, '').replace(/\*\*/g, '').trim(), 'text-green-600 dark:text-green-400');
        if (line.startsWith('🧩')) return renderHeading('puzzle', line.replace(/🧩\s*\*\*/g, '').replace(/\*\*/g, '').trim(), 'text-purple-600 dark:text-purple-400');
        if (line.startsWith('🧪')) return renderHeading('test-tube', line.replace(/🧪\s*\*\*/g, '').replace(/\*\*/g, '').trim(), 'text-orange-600 dark:text-orange-400');
        if (line.startsWith('💡')) return renderHeading('lightbulb', line.replace(/💡\s*\*\*/g, '').replace(/\*\*/g, '').trim(), 'text-yellow-500 dark:text-yellow-400');

        const boldedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-slate-100">$1</strong>');
        
        if (line.match(/^\d+\.\s/)) {
            return <li key={index} className="ml-6 leading-relaxed" dangerouslySetInnerHTML={createMarkup(boldedLine.replace(/^\d+\.\s*/, ''))}></li>;
        }
        if (line.startsWith('-')) {
            return <li key={index} className="ml-6 leading-relaxed" dangerouslySetInnerHTML={createMarkup(boldedLine.replace(/^-\s*/, ''))}></li>;
        }

        return <p key={index} className="my-2 leading-relaxed" dangerouslySetInnerHTML={createMarkup(boldedLine)}></p>;
    };

    // Group list items
    const renderContent = () => {
        const lines = summary.split('\n');
        // FIX: Replaced JSX.Element with React.ReactElement to resolve issue with JSX namespace not being found.
        const elements: React.ReactElement[] = [];
        let listItems: string[] = [];
        let listType: 'ol' | 'ul' | null = null;

        const flushList = () => {
            if (listItems.length > 0) {
                const listKey = `list-${elements.length}`;
                if (listType === 'ol') {
                    elements.push(<ol key={listKey} className="list-decimal space-y-2 pl-5 my-3">{listItems.map((item, i) => renderLine(item, i))}</ol>);
                } else if (listType === 'ul') {
                    elements.push(<ul key={listKey} className="list-disc space-y-2 pl-5 my-3">{listItems.map((item, i) => renderLine(item, i))}</ul >);
                }
                listItems = [];
                listType = null;
            }
        };

        lines.forEach((line, index) => {
            const isOlItem = line.match(/^\d+\.\s/);
            const isUlItem = line.startsWith('-');
            if (isOlItem) {
                if (listType !== 'ol') flushList();
                listType = 'ol';
                listItems.push(line);
            } else if (isUlItem) {
                if (listType !== 'ul') flushList();
                listType = 'ul';
                listItems.push(line);
            } else {
                flushList();
                const renderedLine = renderLine(line, index);
                if (renderedLine) elements.push(renderedLine);
            }
        });
        flushList();
        return elements;
    };


    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mt-6 animate-fade-in">
            {renderContent()}
        </div>
    );
};

export default SummaryDisplay;