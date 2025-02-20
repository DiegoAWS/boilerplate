'use client';

import { RefObject, DragEvent, useState } from "react";

interface FileUploadProps {
    onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    fileInputRef: RefObject<HTMLInputElement>;
}

export default function FileUpload({ onFileSelect, fileInputRef }: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB in bytes

    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];

            // Validate file type
            if (!file.type.includes('pdf')) {
                alert('Please upload a PDF file');
                return;
            }

            // Validate file size
            if (file.size > MAX_FILE_SIZE) {
                alert('File size must be less than 100MB');
                return;
            }

            // Create a new event to simulate file input change
            const event = new Event('change', { bubbles: true });
            Object.defineProperty(event, 'target', {
                writable: false,
                value: { files: files }
            });

            if (fileInputRef.current) {
                fileInputRef.current.files = files;
                onFileSelect(event as unknown as React.ChangeEvent<HTMLInputElement>);
            }
        }
    };

    return (
        <div className="relative">
            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && file.size > MAX_FILE_SIZE) {
                        alert('File size must be less than 100MB');
                        e.target.value = '';
                        return;
                    }
                    onFileSelect(e);
                }}
                className="hidden"
                id="file-upload"
            />
            <label
                htmlFor="file-upload"
                className={`flex items-center justify-center w-full px-4 py-2 
                    border-2 border-dashed rounded-lg transition-colors duration-200 
                    cursor-pointer group ${isDragging
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="flex items-center space-x-2">
                    <svg
                        className={`w-6 h-6 ${isDragging ? 'text-blue-500' : 'text-gray-400 group-hover:text-blue-500'
                            }`}
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                    </svg>
                    <div className="flex flex-col">
                        <span className={`font-medium ${isDragging ? 'text-blue-500' : 'text-gray-600 group-hover:text-blue-500'
                            }`}>
                            Choose a PDF file
                        </span>
                        <span className={`text-xs ${isDragging ? 'text-blue-400' : 'text-gray-400 group-hover:text-blue-400'
                            }`}>
                            or drag and drop here (max 100MB)
                        </span>
                    </div>
                </div>
            </label>
        </div>
    );
} 
