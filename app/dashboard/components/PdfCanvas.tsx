'use client';

import { useRef, useEffect } from 'react';
import { Canvas } from 'fabric';
import { PDFDocumentProxy } from 'pdfjs-dist';
interface PdfCanvasProps {
    onCanvasInitialized: (canvas: Canvas) => void;
    pdfDoc: PDFDocumentProxy | null;
}

export default function PdfCanvas({ onCanvasInitialized, pdfDoc }: PdfCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = new Canvas(canvasRef.current);
            onCanvasInitialized(canvas);
            return () => {
                canvas.dispose();
            };
        }
    }, [onCanvasInitialized]);

    return (
        <div className={`bg-white rounded-lg shadow-lg p-4 ${pdfDoc ? '' : 'hidden'}`}>
            <canvas ref={canvasRef} />
        </div>
    );
} 