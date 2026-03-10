'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { MAIL_DOMAINS, DEFAULT_DOMAIN } from '@/lib/mail.config';

interface EmailData {
  id: string;
  sender: string;
  subject: string;
  body_text: string;
  body_html: string;
  created_at: string;
}

export default function Home() {
  const [activeEmail, setActiveEmail] = useState('');
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailData | null>(null);
  const [customName, setCustomName] = useState('');
  const [selectedDomain, setSelectedDomain] = useState(DEFAULT_DOMAIN);
  const [copied, setCopied] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [mode, setMode] = useState<'auto' | 'custom'>('auto');

  // Database Nama-nama orang untuk generator acak
  const firstNames = ['agus', 'budi', 'siti', 'ayu', 'dimas', 'putri', 'kevin', 'sarah', 'alex', 'dina', 'rio', 'maya'];
  const lastNames = ['pratama', 'wijaya', 'saputra', 'kusuma', 'lestari', 'hidayat', 'setiawan', 'nugroho'];

  // Fungsi membuat email acak (Nama Manusia + Angka)
  const generateHumanEmail = () => {
    const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
    const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
    const num = Math.floor(Math.random() * 900) + 100; // Angka 100-999
    return `${fn}.${ln}${num}@${selectedDomain}`;
  };

  // Setup awal
  useEffect(() => {
    const savedEmail = localStorage.getItem('temp_email');
    if (savedEmail) {
      setActiveEmail(savedEmail);
      // Sinkronkan domain dropdown dengan email yang tersimpan
      const domainPart = savedEmail.split('@')[1];
      if (MAIL_DOMAINS.includes(domainPart)) setSelectedDomain(domainPart);
    } else {
      const newEmail = generateHumanEmail();
      setActiveEmail(newEmail);
      localStorage.setItem('temp_email', newEmail);
    }
  }, []);

  // Tarik pesan dari Supabase
  const fetchEmails = async (emailToFetch: string) => {
    if (!emailToFetch) return;
    setIsSyncing(true);
    try {
      const { data, error } = await supabase
        .from('emails')
        .select('*')
        .eq('recipient', emailToFetch)
        .order('created_at', { ascending: false });

      if (!error && data) setEmails(data);
    } catch (error) {
      console.error('Gagal menarik email:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  // Auto-refresh 5 detik
  useEffect(() => {
    if (activeEmail) {
      fetchEmails(activeEmail);
      const interval = setInterval(() => fetchEmails(activeEmail), 5000);
      return () => clearInterval(interval);
    }
  }, [activeEmail]);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const changeToNewHumanEmail = () => {
    const newEmail = generateHumanEmail();
    applyNewEmail(newEmail);
  };

  const saveCustomEmail = () => {
    const name = customName.trim().toLowerCase().replace(/[^a-z0-9.]/g, '');
    if (!name) return alert('Nama tidak boleh kosong');
    applyNewEmail(`${name}@${selectedDomain}`);
  };

  const applyNewEmail = (newEmail: string) => {
    setActiveEmail(newEmail);
    localStorage.setItem('temp_email', newEmail);
    setEmails([]);
    setSelectedEmail(null);
    setCustomName('');
    setMode('auto');
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Navbar Simple */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">@</div>
            <h1 className="text-xl font-bold text-gray-800">TempMail</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* KOTAK EMAIL UTAMA */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
          <p className="text-center text-xs font-semibold text-gray-400 tracking-widest uppercase mb-4">Alamat Email Anda</p>
          
          {mode === 'auto' ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border border-gray-200 bg-gray-50 rounded-lg p-4">
                <span className="text-lg md:text-2xl font-mono text-gray-900 truncate">{activeEmail || 'Memuat...'}</span>
                <button onClick={handleCopy} className="ml-4 flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-md font-medium transition">
                  {copied ? <span className="text-green-600">Tersalin!</span> : <span>Salin</span>}
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                <button onClick={() => fetchEmails(activeEmail)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md text-sm font-medium transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isSyncing ? "animate-spin" : ""}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                  Refresh
                </button>
                <button onClick={changeToNewHumanEmail} className="flex-1 md:flex-none bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-md text-sm font-medium transition">
                  Acak (Manusia)
                </button>
                <button onClick={() => setMode('custom')} className="flex-1 md:flex-none bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-md text-sm font-medium transition">
                  Buat Custom
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-3">
              <input 
                type="text" 
                placeholder="contoh: budi.123" 
                className="flex-grow px-4 py-3 border border-gray-200 rounded-md outline-none focus:border-blue-500 font-mono"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
              />
              <select 
                className="px-4 py-3 border border-gray-200 rounded-md outline-none bg-white cursor-pointer"
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
              >
                {MAIL_DOMAINS.map((domain) => (
                  <option key={domain} value={domain}>@{domain}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <button onClick={saveCustomEmail} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition flex-grow">
                  Gunakan
                </button>
                <button onClick={() => setMode('auto')} className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-md font-medium transition">
                  Batal
                </button>
              </div>
            </div>
          )}
        </div>

        {/* KOTAK PESAN MASUK */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden min-h-[500px] flex flex-col">
          
          {!selectedEmail ? (
            /* TAMPILAN DAFTAR INBOX */
            <>
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  Kotak Masuk
                  <span className="bg-gray-200 text-gray-700 py-0.5 px-2.5 rounded-full text-xs font-bold">{emails.length}</span>
                </h3>
              </div>
              
              <div className="flex-grow flex flex-col">
                {emails.length === 0 ? (
                  <div className="m-auto text-center p-8 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 opacity-50"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    <p>Menunggu pesan masuk...</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {emails.map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => setSelectedEmail(item)}
                        className="p-4 md:p-6 cursor-pointer hover:bg-gray-50 transition flex flex-col md:flex-row md:items-center justify-between gap-2"
                      >
                        <div className="flex-grow overflow-hidden">
                          <p className="font-semibold text-gray-900 truncate text-sm md:text-base">{item.sender}</p>
                          <p className="text-gray-500 truncate text-sm mt-0.5">{item.subject || '(Tanpa Subjek)'}</p>
                        </div>
                        <span className="text-xs text-gray-400 font-mono shrink-0">
                          {new Date(item.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            /* TAMPILAN BACA PESAN (FULL WIDTH) */
            <div className="flex flex-col h-full">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center">
                <button 
                  onClick={() => setSelectedEmail(null)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 font-medium transition bg-white border border-gray-200 px-3 py-1.5 rounded"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  Kembali
                </button>
              </div>
              
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-snug">{selectedEmail.subject}</h2>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-800">Dari: {selectedEmail.sender}</span>
                  <span className="text-xs text-gray-500 mt-1">Dikirim: {new Date(selectedEmail.created_at).toLocaleString('id-ID')}</span>
                </div>
              </div>
              
              <div className="flex-grow relative bg-white min-h-[500px]">
                {selectedEmail.body_html ? (
                  // Iframe tanpa replace quotes agar HTML Facebook tampil sempurna
                  <iframe 
                    srcDoc={selectedEmail.body_html} 
                    className="absolute inset-0 w-full h-full border-0"
                    sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                  />
                ) : (
                  <div className="absolute inset-0 overflow-y-auto p-6 text-gray-800 font-sans text-sm whitespace-pre-wrap leading-relaxed">
                    {selectedEmail.body_text}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
