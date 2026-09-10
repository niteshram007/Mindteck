'use client';
import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer() {
  const params = useParams();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [width, setWidth] = useState(900);
  
  const filename = params?.filename || '';

  const pdfUrl = `/pdf-api/${filename}`;

  useEffect(() => {
    const handleResize = () => setWidth(Math.min(window.innerWidth - 60, 900));
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const displayName = filename.replace('.pdf', '').replace(/-/g, ' ');

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-12 font-sans" onContextMenu={handleContextMenu}>
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-6 md:p-10 border border-gray-100 select-none relative">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-100 pb-6 gap-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{displayName}</h1>
            <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest font-semibold">Secure Document Viewer</p>
          </div>
          <div className="flex gap-4 items-center bg-gray-50 p-2 rounded-xl border border-gray-200 shadow-sm">
            <button 
              disabled={pageNumber <= 1} 
              onClick={() => setPageNumber(p => p - 1)}
              className="px-5 py-2 text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors rounded-lg shadow-sm disabled:opacity-40 disabled:cursor-not-allowed pointer-events-auto"
            >
              Previous
            </button>
            <span className="font-semibold text-gray-700 px-3 min-w-[5rem] text-center">
              {pageNumber} / {numPages || '--'}
            </span>
            <button 
              disabled={pageNumber >= numPages} 
              onClick={() => setPageNumber(p => p + 1)}
              className="px-5 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-lg shadow-sm disabled:opacity-40 disabled:cursor-not-allowed pointer-events-auto"
            >
              Next
            </button>
          </div>
        </div>

        <div className="flex justify-center relative bg-gray-100 min-h-[700px] pointer-events-none select-none overflow-hidden rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] border border-gray-200 p-4 md:p-8">
          <Document 
            file={pdfUrl} 
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="flex h-[600px] items-center justify-center text-blue-600"><Loader2 className="animate-spin w-12 h-12" /></div>}
            error={<div className="flex h-[600px] items-center justify-center text-red-500 font-medium p-10 bg-red-50 rounded-lg shadow-inner">Failed to load secure document. Please try again later.</div>}
            renderMode="canvas"
            className="shadow-md rounded bg-white overflow-hidden"
          >
            <Page 
              pageNumber={pageNumber} 
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={width}
              className="mx-auto"
            />
          </Document>
        </div>
        
        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-xs text-gray-400 font-medium">This document is protected and cannot be downloaded, printed, or copied.</p>
        </div>
      </div>
    </div>
  );
}
