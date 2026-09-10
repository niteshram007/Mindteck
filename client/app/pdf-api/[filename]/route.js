import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const filename = params.filename;
  
  // Basic security to prevent directory traversal
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return new NextResponse('Invalid filename', { status: 400 });
  }

  // Path to secure PDFs - we'll put it in client/private_pdfs
  const filePath = path.join(process.cwd(), 'private_pdfs', filename);

  if (!fs.existsSync(filePath)) {
    return new NextResponse('File not found', { status: 404 });
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = request.headers.get('range');
  const fileBuffer = fs.readFileSync(filePath);

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    
    if (start >= fileSize) {
      return new NextResponse('Requested range not satisfiable', {
        status: 416,
        headers: {
          'Content-Range': `bytes */${fileSize}`
        }
      });
    }

    const chunksize = (end - start) + 1;
    const chunk = fileBuffer.slice(start, end + 1);
    
    return new NextResponse(chunk, {
      status: 206,
      headers: {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'application/pdf',
        'Cache-Control': 'no-store, max-age=0'
      },
    });
  } else {
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Length': fileSize,
        'Content-Type': 'application/pdf',
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-store, max-age=0'
      },
    });
  }
}
