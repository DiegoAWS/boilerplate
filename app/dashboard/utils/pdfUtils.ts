import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';
import { Canvas } from 'fabric';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export async function loadPdfToCanvas(arrayBuffer: ArrayBuffer, fabricCanvas: Canvas) {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) throw new Error('Failed to create canvas context');

    const loadedPdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
    const page = await loadedPdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.0 });

    tempCanvas.width = viewport.width;
    tempCanvas.height = viewport.height;
    fabricCanvas.setDimensions({
        width: viewport.width,
        height: viewport.height
    });

    await page.render({
        canvasContext: tempCtx,
        viewport: viewport,
    }).promise;

    return { tempCanvas, loadedPdf };
}

export async function savePdfWithCanvas(originalPdfBytes: ArrayBuffer, fabricCanvas: Canvas) {
    const pdfDoc = await PDFDocument.load(originalPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const canvasDataUrl = fabricCanvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 1
    });

    const base64Data = canvasDataUrl.replace(/^data:image\/(png|jpg);base64,/, '');
    const image = await pdfDoc.embedPng(base64Data);

    const { width, height } = firstPage.getSize();
    firstPage.drawImage(image, {
        x: 0,
        y: 0,
        width: width,
        height: height,
    });

    const modifiedPdfBytes = await pdfDoc.save();
    const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    return url;
} 