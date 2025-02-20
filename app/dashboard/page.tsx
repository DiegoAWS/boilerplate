"use client";
import { PDFDocumentProxy } from "pdfjs-dist";
import { useState, useRef } from "react";
import { AppSidebar } from "./components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import PdfCanvas from "./components/PdfCanvas";
import Toolbar from "./components/Toolbar";
import { loadPdfToCanvas, savePdfWithCanvas } from "./utils/pdfUtils";
import { Canvas } from "fabric";
import { Rect } from "fabric";
import { FabricImage } from "fabric";

export default function Page() {
  const [fabricCanvas, setFabricCanvas] = useState<Canvas | null>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [originalPdfBytes, setOriginalPdfBytes] = useState<ArrayBuffer | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !fabricCanvas) return;

    const arrayBuffer = await file.arrayBuffer();
    setOriginalPdfBytes(arrayBuffer.slice(0));

    try {
      const { tempCanvas, loadedPdf } = await loadPdfToCanvas(
        arrayBuffer,
        fabricCanvas
      );
      setPdfDoc(loadedPdf);

      const fabricImage = new FabricImage(tempCanvas);
      fabricCanvas.backgroundImage = fabricImage;
      fabricCanvas.renderAll();
    } catch (error) {
      console.error("Error loading PDF:", error);
    }
  };

  const addSampleImage = () => {
    if (!fabricCanvas) return;

    const rect = new Rect({
      left: 50,
      top: 50,
      width: 100,
      height: 100,
      fill: "blue",
      opacity: 0.7,
    });

    fabricCanvas.add(rect);
    fabricCanvas.renderAll();
  };

  const savePDF = async () => {
    if (!originalPdfBytes || !fabricCanvas) return;

    try {
      const url = await savePdfWithCanvas(originalPdfBytes, fabricCanvas);
      const link = document.createElement("a");
      link.href = url;
      link.download = "modified.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error saving PDF:", error);
    }
  };

  const clearCanvas = () => {
    if (fabricCanvas) {
      fabricCanvas.clear();
      fabricCanvas.backgroundImage = undefined;
      fabricCanvas.renderAll();

      setPdfDoc(null);
      setOriginalPdfBytes(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="max-w-full">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Toolbar
            pdfDoc={pdfDoc}
            onFileSelect={handleFileSelect}
            onAddSampleImage={addSampleImage}
            onSavePdf={savePDF}
            onClear={clearCanvas}
            fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
          />
          <PdfCanvas pdfDoc={pdfDoc} onCanvasInitialized={setFabricCanvas} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
