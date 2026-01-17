import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, FileText, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
  description?: string;
}

export function PDFViewer({ pdfUrl, title, description }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.6));
  };

  return (
    <section className="section-padding bg-section-light">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full">
              <FileText className="w-4 h-4" />
              DOCUMENTO OFICIAL
            </span>
          </div>
          <h2 className="heading-2 text-foreground mb-3">{title}</h2>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>

        {/* PDF Viewer Container */}
        <div 
          className="bg-card border rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto"
          onContextMenu={(e) => e.preventDefault()}
          style={{ userSelect: "none" }}
        >
          {/* Controls */}
          <div className="flex items-center justify-between p-4 border-b bg-muted/30">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground px-3">
                Página {pageNumber} de {numPages || "..."}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={zoomOut}
                disabled={scale <= 0.6}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground px-2">
                {Math.round(scale * 100)}%
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={zoomIn}
                disabled={scale >= 2}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* PDF Content */}
          <div 
            className="flex justify-center overflow-auto bg-gray-100 dark:bg-gray-900 p-4"
            style={{ minHeight: "600px", maxHeight: "80vh" }}
          >
            {isLoading && (
              <div className="flex items-center justify-center h-96">
                <div className="text-muted-foreground">Cargando documento...</div>
              </div>
            )}
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading=""
              className="shadow-xl"
            >
              <Page 
                pageNumber={pageNumber} 
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="bg-white"
              />
            </Document>
          </div>

          {/* Footer notice */}
          <div className="p-3 bg-muted/30 border-t text-center">
            <p className="text-xs text-muted-foreground">
              Este documento es solo para visualización. Documento oficial de la Fundación Defensores del CAA.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
