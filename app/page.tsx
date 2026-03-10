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
  const [isEditing, setIsEditing] = useState(false);
  const [customName, setCustomName] = useState('');
  const [selectedDomain, setSelectedDomain] = useState(DEFAULT_DOMAIN);
  const [copied, setCopied] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Fungsi membuat email acak
  const generateRandomEmail = () => {
    const randomStr = Math.random().toString(36).substring(2, 10);
    return `${randomStr}@${selectedDomain}`;
  };

  // Saat web pertama kali dibuka, langsung buatkan email!
  useEffect(() => {
    const savedEmail = localStorage.getItem('temp_email');
    if (savedEmail) {
      setActiveEmail(savedEmail);
    } else {
      const newEmail = generateRandomEmail();
      setActiveEmail(newEmail);
      localStorage.setItem('temp_email', newEmail);
    }
  }, []);

  // Tarik pesan dari database
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

  // Auto-refresh setiap 5 detik
  useEffect(() => {
    if (activeEmail) {
      fetchEmails(activeEmail);
      const interval = setInterval(() => fetchEmails(activeEmail), 5000);
      return () => clearInterval(interval);
    }
  }, [activeEmail]);

  // Fungsi copy ke clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(activeEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Fungsi ganti email custom
  const saveCustomEmail = () => {
    const name = customName.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const newEmail = name ? `${name}@${selectedDomain}` : generateRandomEmail();
    setActiveEmail(newEmail);
    localStorage.setItem('temp_email', newEmail);
    setEmails([]);
    setSelectedEmail(null);
    setIsEditing(false);
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] text-gray-800 font-sans selection:bg-blue-100">
      
      {/* HEADER NAVBAR */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">@</div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">TempMail.</h1>
          </div>
          <div className="text-sm font-medium text-gray-500 hidden md:block">
            Layanan Email Sementara & Anti-Spam
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        
        {/* HERO SECTION: TEMPAT EMAIL AKTIF */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 mb-8">
          <p className="text-center text-gray-500 text-sm font-medium mb-4 uppercase tracking-wider">Alamat Email Anda</p>
          
          {!isEditing ? (
            <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-3">
              <div className="flex-grow w-full bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 flex items-center justify-between group">
                <span className="text-xl md:text-2xl font-mono text-gray-900 truncate pr-4">{activeEmail || 'Memuat...'}</span>
                <button onClick={handleCopy} className="text-gray-400 hover:text-blue-600 transition-colors shrink-0">
                  {copied ? (
                    <span className="text-green-500 font-medium text-sm">Tersalin!</span>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                  )}
                </button>
              </div>
              <div className="flex gap-2 w-full md:w-auto shrink-0">
                <button onClick={() => setIsEditing(true)} className="flex-1 md:flex-none bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-5 py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                  <span className="md:hidden">Ubah</span>
                </button>
                <button onClick={() => fetchEmails(activeEmail)} className="flex-1 md:flex-none bg-blue-600 text-white hover:bg-blue-700 px-6 py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isSyncing ? "animate-spin" : ""}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                  Refresh
                </button>
              </div>
            </div>
          ) : (
            /* MODE EDIT CUSTOM EMAIL */
            <div className="max-w-3xl mx-auto bg-gray-50 border border-gray-200 rounded-xl p-2 flex flex-col md:flex-row gap-2">
              <input 
                type="text" 
                placeholder="nama.bebas" 
                className="flex-grow px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-800"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
              />
              <select 
                className="px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none cursor-pointer text-gray-800"
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
              >
                {MAIL_DOMAINS.map((domain) => (
                  <option key={domain} value={domain}>@{domain}</option>
                ))}
              </select>
              <button onClick={saveCustomEmail} className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Simpan
              </button>
            </div>
          )}
        </div>

        {/* INBOX SECTION: SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[700px]">
          
          {/* KIRI: DAFTAR PESAN */}
          <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
            <div className="bg-gray-50/80 px-5 py-4 border-b border-gray-200 flex justify-between items-center shrink-0">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                Kotak Masuk
                <span className="bg-blue-100 text-blue-700 py-0.5 px-2.5 rounded-full text-xs font-bold">{emails.length}</span>
              </h3>
              {isSyncing && <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span></span>}
            </div>
            
            <div className="flex-grow overflow-y-auto divide-y divide-gray-100">
              {emails.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <p className="text-sm">Menunggu pesan masuk...</p>
                  <p className="text-xs mt-1 opacity-70">Otomatis diperbarui setiap 5 detik</p>
                </div>
              ) : (
                emails.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => setSelectedEmail(item)}
                    className={`p-5 cursor-pointer transition-all border-l-4 ${selectedEmail?.id === item.id ? 'bg-blue-50/50 border-blue-500' : 'border-transparent hover:bg-gray-50'}`}
                  >
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <p className="font-semibold text-sm text-gray-900 truncate">{item.sender}</p>
                      <span className="text-[11px] text-gray-400 whitespace-nowrap pt-0.5 font-mono">{new Date(item.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{item.subject}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* KANAN: BACA PESAN */}
          <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
            {selectedEmail ? (
              <>
                {/* Header Pesan Terpilih */}
                <div className="p-6 md:p-8 border-b border-gray-200 bg-white shrink-0">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">{selectedEmail.subject}</h2>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold uppercase">
                      {selectedEmail.sender.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{selectedEmail.sender}</p>
                      <p className="text-xs text-gray-500">ke <span className="font-mono">{activeEmail}</span></p>
                    </div>
                  </div>
                </div>
                
                {/* Area Konten Iframe / Teks */}
                <div className="flex-grow relative bg-white">
                  {selectedEmail.body_html ? (
                    <iframe 
                      srcDoc={selectedEmail.body_html.replace(/"/g, '&quot;')} 
                      className="absolute inset-0 w-full h-full border-0"
                      sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                    />
                  ) : (
                    <div className="absolute inset-0 overflow-y-auto p-6 md:p-8 text-gray-800 font-sans text-sm whitespace-pre-wrap leading-relaxed">
                      {selectedEmail.body_text}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-20"><path d="M21.2 8.4c.5.3.8.8.8 1.4v10.2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.8c0-.6.3-1.1.8-1.4l8-4.8c.4-.2.8-.2 1.2 0l8 4.8Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/></svg>
                <p className="font-medium text-gray-500">Tidak ada pesan yang dipilih</p>
                <p className="text-sm mt-1">Pilih email dari daftar di sebelah kiri untuk membaca isinya.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
