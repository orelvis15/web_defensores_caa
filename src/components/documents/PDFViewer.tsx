import { useState, useEffect, useRef } from "react";
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
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure container width for responsive PDF
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth - 32); // minus padding
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

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
    <section className="py-8 md:py-16 bg-section-light">
      <div className="container-wide px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
          <div className="flex justify-center mb-3 md:mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 text-primary text-xs md:text-sm font-semibold rounded-full">
              <FileText className="w-3 h-3 md:w-4 md:h-4" />
              DOCUMENTO OFICIAL
            </span>
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2 md:mb-3">{title}</h2>
          {description && (
            <p className="text-sm md:text-base text-muted-foreground">{description}</p>
          )}
        </div>

        {/* PDF Viewer Container */}
        <div 
          ref={containerRef}
          className="bg-card border rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto"
          onContextMenu={(e) => e.preventDefault()}
          style={{ userSelect: "none" }}
        >
          {/* Controls - Stacked on mobile */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 md:p-4 border-b bg-muted/30">
            {/* Page navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-xs md:text-sm text-muted-foreground px-2 min-w-[80px] text-center">
                {pageNumber} / {numPages || "..."}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Zoom controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={zoomOut}
                disabled={scale <= 0.6}
                className="h-8 w-8 p-0"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-xs md:text-sm text-muted-foreground px-1 min-w-[45px] text-center">
                {Math.round(scale * 100)}%
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={zoomIn}
                disabled={scale >= 2}
                className="h-8 w-8 p-0"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* PDF Content */}
          <div 
            className="flex justify-center overflow-auto bg-gray-100 dark:bg-gray-900 p-2 md:p-4"
            style={{ minHeight: "400px", maxHeight: "70vh" }}
          >
            {isLoading && (
              <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground text-sm">Cargando documento...</div>
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
                width={containerWidth > 0 ? Math.min(containerWidth * scale, 800) : undefined}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="bg-white"
              />
            </Document>
          </div>

          {/* Footer notice */}
          <div className="p-2 md:p-3 bg-muted/30 border-t text-center">
            <p className="text-[10px] md:text-xs text-muted-foreground">
              Documento oficial de la Fundación Defensores del CAA - Solo visualización
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
