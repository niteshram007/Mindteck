import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('./PdfViewer'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-50 flex items-center justify-center text-blue-600 font-medium">Loading secure document...</div>
});

export default function Page() {
  return <PdfViewer />;
}
