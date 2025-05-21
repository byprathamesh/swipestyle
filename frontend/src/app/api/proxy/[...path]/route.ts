import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001'; // Your actual backend URL

async function handler(req: NextRequest) {
  const path = req.nextUrl.pathname.replace('/api/proxy', '');
  const url = `${BACKEND_URL}${path}${req.nextUrl.search}`;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        // Forward necessary headers from the client request
        'Content-Type': req.headers.get('Content-Type') || 'application/json',
        // Add any other headers you need to forward, e.g., Authorization
        // 'Authorization': req.headers.get('Authorization') || '',
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
      // duplex: 'half' // Required for streaming request bodies in some environments/versions
    });

    // If the backend response is JSON, parse it and return as Next.js response
    // Otherwise, stream the response (e.g., for file downloads, SSE)
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } else {
      // For non-JSON responses, stream them back
      // Note: Streaming responses in Next.js API routes can be complex.
      // This is a simplified version.
      const blob = await response.blob();
      return new NextResponse(blob, { status: response.status, headers: { 'Content-Type': contentType || 'application/octet-stream' } });
    }

  } catch (error: any) {
    console.error(`API Proxy Error fetching ${url}:`, error);
    return NextResponse.json(
      { message: 'Error proxying to backend', error: error.message },
      { status: 500 }
    );
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH }; 