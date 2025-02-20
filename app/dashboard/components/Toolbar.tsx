'use client';

import { PDFDocumentProxy } from "pdfjs-dist";
import { RefObject } from "react";
import FileUpload from './FileUpload';

interface ToolbarProps {
    pdfDoc: PDFDocumentProxy | null;
    onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onAddSampleImage: () => void;
    onSavePdf: () => void;
    onClear: () => void;
    fileInputRef: RefObject<HTMLInputElement>;
}

export default function Toolbar({
    pdfDoc,
    onFileSelect,
    onAddSampleImage,
    onSavePdf,
    onClear,
    fileInputRef
}: ToolbarProps) {
    return (
        <div className="mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
            {!pdfDoc && <FileUpload onFileSelect={onFileSelect} fileInputRef={fileInputRef} />}

            {pdfDoc && (
                <div className="flex space-x-4">
                    <button
                        onClick={onAddSampleImage}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md
                            hover:bg-blue-700 focus:outline-none focus:ring-2
                            focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Add Sample Image
                    </button>
                    <button
                        onClick={onSavePdf}
                        className="px-4 py-2 bg-green-600 text-white rounded-md
                            hover:bg-green-700 focus:outline-none focus:ring-2
                            focus:ring-green-500 focus:ring-offset-2"
                    >
                        Save PDF
                    </button>
                    <button
                        onClick={onClear}
                        className="px-4 py-2 bg-red-600 text-white rounded-md
                            hover:bg-red-700 focus:outline-none focus:ring-2
                            focus:ring-red-500 focus:ring-offset-2"
                    >
                        Clear
                    </button>
                </div>
            )}
        </div>
    );
} 