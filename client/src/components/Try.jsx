import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const starterPrompts = [
  'Summarize the uploaded documents in 5 bullet points',
  'What are the key risks mentioned in the report?',
  'Compare the main findings across all documents',
];

const initialMessages = [
  {
    id: 1,
    role: 'assistant',
    text: 'Welcome back. Ask anything about your knowledge base and I will answer using the uploaded documents.',
    time: '09:41',
  },
  {
    id: 2,
    role: 'user',
    text: 'Give me the main takeaways from the latest strategy document.',
    time: '09:42',
  },
  {
    id: 3,
    role: 'assistant',
    text: 'The strategy document focuses on three priorities: faster document ingestion, stronger retrieval accuracy, and clearer source-grounded responses. It also recommends expanding enterprise support and improving user onboarding.',
    time: '09:42',
  },
];

const assistantReply =
  'Based on the indexed files, the strongest pattern is a push toward faster onboarding, better answer accuracy, and clearer source visibility. If you want, I can break that down by document or turn it into an action list.';

function maskApiKey(value) {
  if (!value) return 'Not connected';
  if (value.length <= 8) return value;
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

function Try() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiModal, setShowApiModal] = useState(true);

  const addUserMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed || isThinking || showApiModal) return;

    const nextId = Date.now();
    setMessages((current) => [
      ...current,
      {
        id: nextId,
        role: 'user',
        text: trimmed,
        time: 'Now',
      },
    ]);
    setInput('');
    setIsThinking(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: nextId + 1,
          role: 'assistant',
          text: assistantReply,
          time: 'Now',
        },
      ]);
      setIsThinking(false);
    }, 700);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addUserMessage(input);
  };

  const submitApiKey = () => {
    const trimmed = apiKeyInput.trim();
    if (!trimmed) return;

    setApiKey(trimmed);
    setShowApiModal(false);
  };

  const handleApiKeySubmit = (event) => {
    event.preventDefault();
    submitApiKey();
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-slate-900">
      <div className={showApiModal ? 'pointer-events-none select-none blur-[2px]' : ''}>
        <nav className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-[#8FA6F8]/30 bg-white shadow-sm">
                <img
                  src="https://www.logodesign.net/logo-new/arrows-inside-globe-with-airplane-507ld.png?nwm=1&nws=1&industry=All&txt_keyword="
                  alt="Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="bg-gradient-to-r from-[#8FA6F8] to-[#D16BA5] bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                Rag Flow
              </span>
            </Link>

            <div className="hidden items-center gap-3 sm:flex">
              <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600">
                {maskApiKey(apiKey)}
              </div>
              <div className="rounded-full border border-[#22C55E]/20 bg-[#22C55E]/10 px-3 py-1.5 text-sm font-medium text-slate-700">
                3 documents loaded
              </div>
            </div>
          </div>
        </nav>

        <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-4xl flex-col px-4 pb-8 pt-8 sm:px-6 lg:px-8">
          <section className="mb-8">
            <p className="text-sm font-medium text-slate-500">Document assistant</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Ask anything about your documents
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              A clean workspace for retrieval-based answers, summaries, and follow-up questions.
            </p>
          </section>

          <section className="flex-1">
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`w-full max-w-3xl rounded-3xl px-5 py-4 ${
                      message.role === 'user'
                        ? 'bg-white border border-slate-200 text-slate-900 shadow-sm'
                        : 'bg-[#8FA6F8]/10 border border-[#8FA6F8]/15 text-slate-900'
                    }`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                      <span>{message.role === 'user' ? 'You' : 'Assistant'}</span>
                      <span className="text-slate-300">|</span>
                      <span>{message.time}</span>
                    </div>
                    <p className="text-[15px] leading-7 text-slate-700">{message.text}</p>
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex justify-start">
                  <div className="w-full max-w-3xl rounded-3xl border border-[#8FA6F8]/15 bg-[#8FA6F8]/10 px-5 py-4">
                    <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                      <span>Assistant</span>
                      <span className="text-slate-300">|</span>
                      <span>Thinking</span>
                    </div>
                    <p className="text-[15px] text-slate-500">Thinking...</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="mt-8">
            <div className="mb-4 flex flex-wrap gap-3">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => addUserMessage(prompt)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition-colors hover:border-[#8FA6F8]/30 hover:bg-[#8FA6F8]/5"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[28px] border border-slate-200 bg-white p-3 shadow-sm"
            >
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Message Rag Flow"
                  className="h-12 w-full resize-none bg-transparent px-2 py-3 pr-28 text-[15px] leading-6 text-slate-700 placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isThinking || showApiModal}
                  className="absolute bottom-1.5 right-1.5 inline-flex items-center gap-2 rounded-xl bg-[#F97316] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#ea670f] disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M12 5l7 7-7 7"
                    />
                  </svg>
                  Send
                </button>
              </div>

              <p className="px-2 pt-2 text-sm text-slate-500">
                Answers stay grounded in uploaded files.
              </p>
            </form>
          </section>
        </main>
      </div>

      {showApiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>

          <div className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_80px_-28px_rgba(15,23,42,0.32)]">
            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                Enter API key
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Paste your API key to unlock the conversation workspace.
              </p>
            </div>

            <form onSubmit={handleApiKeySubmit}>
              <div className="px-6 py-6">
                <div className="flex flex-col gap-3">
                  <input
                    type="password"
                    value={apiKeyInput}
                    onChange={(event) => setApiKeyInput(event.target.value)}
                    placeholder="sk-rag-..."
                    autoFocus
                    className="w-full rounded-2xl border border-slate-200 bg-[#F3F4F6] px-4 py-3.5 font-mono text-slate-800 outline-none transition focus:border-[#8FA6F8] focus:ring-4 focus:ring-[#8FA6F8]/15"
                  />
                  <button
                    type="submit"
                    disabled={!apiKeyInput.trim()}
                    className="rounded-2xl bg-[#F97316] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#ea670f] disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    Continue
                  </button>
                </div>
              </div>

              <div className="flex justify-end border-t border-slate-100 bg-slate-50 px-6 py-4">
                <button
                  type="submit"
                  disabled={!apiKeyInput.trim()}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Try;
