'use client';

import React from 'react';
import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

export default function GlobalNotFound() {
  return (
    <html>
      <body className="antialiased bg-[#f8fafc] text-slate-900">
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20">
          <div className="w-20 h-20 rounded-2xl bg-slate-200 text-slate-500 flex items-center justify-center mb-6 shadow-sm">
            <FileQuestion className="w-10 h-10" />
          </div>
          <h1 className="text-6xl font-bold mb-4 tracking-tight">404</h1>
          <h2 className="text-2xl font-semibold mb-3">Page Not Found</h2>
          <p className="text-slate-600 max-w-[500px] mb-8 text-lg">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link href="/en" className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-full font-medium transition-colors">
            Return Home
          </Link>
        </div>
      </body>
    </html>
  );
}
