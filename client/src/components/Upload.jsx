import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Upload = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiKey] = useState('sk-rag-f9a8d7e6c5b4a3c2d1e0f9a8d7e6c5b4');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-slate-800 font-sans">
      <nav className="sticky top-0 z-50 w-full border-b border-[#8FA6F8]/20 bg-white/85 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              to="/"
              className="flex flex-shrink-0 items-center gap-3 transition-opacity hover:opacity-80"
            >
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-[#8FA6F8]/40 bg-white text-xl font-bold text-white shadow-md">
                <img
                  src="https://www.logodesign.net/logo-new/arrows-inside-globe-with-airplane-507ld.png?nwm=1&nws=1&industry=All&txt_keyword="
                  alt="Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="bg-gradient-to-r from-[#8FA6F8] to-[#D16BA5] bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
                Rag Flow
              </span>
            </Link>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8FA6F8] to-[#D16BA5] px-5 py-2 font-medium text-white shadow-md transition-all duration-200 ease-in-out hover:from-[#7d96f3] hover:to-[#c45a98] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#8FA6F8] focus:ring-offset-2"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
              Create API
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-[#8FA6F8]/15 bg-white shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)]">
          <div className="bg-gradient-to-r from-[#8FA6F8]/12 via-[#D16BA5]/10 to-[#F97316]/12 px-8 py-6 md:px-12">
            <div className="mx-auto max-w-2xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#22C55E]/15 bg-white/80 px-4 py-1.5 text-sm font-medium text-slate-600">
                <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]"></span>
                Upload workspace ready
              </p>
            </div>
          </div>

          <div className="p-8 text-center md:p-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#8FA6F8]/20 via-[#D16BA5]/15 to-[#F97316]/20 shadow-inner">
              <svg className="h-10 w-10 text-[#8FA6F8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-slate-900">Upload your documents</h2>
            <p className="mx-auto mb-8 max-w-lg text-slate-600">
              Drag and drop your PDF, TXT, or DOCX files here to start extracting insights and
              chatting with your documents.
            </p>


            <button className="cursor-pointer rounded-xl border border-[#F97316]/20 bg-[#F97316] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#ea670f] focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2">
              Select Files
            </button>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-[#8FA6F8]/10 transition-all">
            <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-[#8FA6F8]/10 via-white to-[#D16BA5]/10 px-6 py-5">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <svg className="h-5 w-5 text-[#8FA6F8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
                Your API Key
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="relative bg-white p-6">
              <p className="mb-4 text-sm text-slate-600">
                Please copy this API key and keep it safe. For security reasons, you will not be
                able to see it again after closing this window.
              </p>

              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    readOnly
                    value={apiKey}
                    className="block w-full rounded-lg border border-[#8FA6F8]/15 bg-[#F3F4F6] p-2.5 font-mono text-sm text-slate-800 focus:border-[#8FA6F8] focus:ring-[#8FA6F8]"
                  />
                </div>
                <button
                  onClick={handleCopy}
                  className="flex min-w-[90px] cursor-pointer items-center justify-center rounded-lg bg-[#F97316] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#ea670f] focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2"
                >
                  {copied ? (
                    <span className="flex items-center gap-1.5">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Copied!
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                      Copy
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-100 bg-[#F3F4F6] px-6 py-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer rounded-lg border border-[#D16BA5]/20 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-[#D16BA5]/5 focus:ring-2 focus:ring-[#D16BA5]/20 focus:ring-offset-2"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
