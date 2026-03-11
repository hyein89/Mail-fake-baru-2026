'use client';
import { siteConfig } from '@/site.config';
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
  const [errorMsg, setErrorMsg] = useState('');

  const generateStringNumberEmail = () => {
    const randomStr = Math.random().toString(36).substring(2, 7);
    const randomNum = Math.floor(Math.random() * 900) + 100;
    return `${randomStr}.${randomNum}@${selectedDomain}`;
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('temp_email');
    if (savedEmail) {
      setActiveEmail(savedEmail);
      const domainPart = savedEmail.split('@')[1];
      if (MAIL_DOMAINS.includes(domainPart)) setSelectedDomain(domainPart);
    } else {
      const newEmail = generateStringNumberEmail();
      setActiveEmail(newEmail);
      localStorage.setItem('temp_email', newEmail);
    }
  }, []);

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
      console.error('API Error:', error);
    } finally {
      setIsSyncing(false);
    }
  };

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

  const changeToNewEmail = () => {
    const newEmail = generateStringNumberEmail();
    applyNewEmail(newEmail);
  };

  const saveCustomEmail = () => {
    const name = customName.trim().toLowerCase().replace(/[^a-z0-9.]/g, '');
    if (!name) {
      setErrorMsg('Nama email tidak boleh kosong');
      return;
    }
    applyNewEmail(`${name}@${selectedDomain}`);
  };

  const applyNewEmail = (newEmail: string) => {
    setActiveEmail(newEmail);
    localStorage.setItem('temp_email', newEmail);
    setEmails([]);
    setSelectedEmail(null);
    setCustomName('');
    setErrorMsg('');
    setMode('auto');
  };

  return (
    <main className="w-full">
      <div className="max-w-5xl mx-auto px-4 py-6">
        
        {/* PANEL EMAIL AKTIF */}
        <div className="bg-white border border-gray-300 rounded shadow-sm mb-6">
          <div className="bg-gray-50 border-b border-gray-300 px-4 py-3">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Alamat Email Anda</h2>
          </div>
          
          <div className="p-5 md:p-8 text-center">
            {mode === 'auto' ? (
              <div className="max-w-2xl mx-auto">
                <div className="bg-[#f8f9fa] border border-gray-200 p-4 mb-5 rounded min-w-0 overflow-hidden">
                  <p 
                    className="text-xl md:text-3xl font-mono font-bold text-gray-800 truncate leading-tight" 
                    title={activeEmail}
                  >
                    {activeEmail || 'Memuat...'}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:flex md:justify-center gap-2 md:gap-3">
                  <button onClick={handleCopy} className={`flex items-center justify-center gap-2 px-4 py-2.5 border rounded font-medium transition ${copied ? 'bg-green-50 border-green-500 text-green-700' : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    {copied ? 'Tersalin' : 'Salin'}
                  </button>
                  <button onClick={() => fetchEmails(activeEmail)} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 rounded font-medium transition" disabled={isSyncing}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isSyncing ? "animate-spin" : ""}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                    Refresh
                  </button>
                  <button onClick={changeToNewEmail} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded font-medium transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                    Acak Baru
                  </button>
                  <button onClick={() => { setMode('custom'); setErrorMsg(''); }} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded font-medium transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                    Custom
                  </button>
                </div>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-2 items-start">
                <div className="flex flex-col w-full min-w-0">
                  <input 
                    type="text" 
                    className={`w-full px-4 py-2.5 border ${errorMsg ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded outline-none focus:border-blue-500 font-mono text-center md:text-left transition-colors truncate`} 
                    placeholder="nama.bebas" 
                    value={customName}
                    onChange={(e) => {
                      setCustomName(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                  />
                  {errorMsg && (
                    <span className="text-red-500 text-xs text-left mt-1 font-medium pl-1">{errorMsg}</span>
                  )}
                </div>
                <select 
                  className="w-full md:w-auto px-4 py-2.5 border border-gray-300 rounded outline-none bg-white cursor-pointer"
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                >
                  {MAIL_DOMAINS.map((domain) => (
                    <option key={domain} value={domain}>@{domain}</option>
                  ))}
                </select>
                <div className="flex gap-2 justify-center w-full md:w-auto shrink-0">
                  <button onClick={saveCustomEmail} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition flex-grow md:flex-grow-0">Gunakan</button>
                  <button onClick={() => { setMode('auto'); setErrorMsg(''); }} className="px-4 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded font-medium transition">Batal</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[600px]">
          
          <div className="w-full md:w-1/3 bg-white border border-gray-300 rounded shadow-sm flex flex-col h-[400px] md:h-full">
            <div className="bg-gray-50 border-b border-gray-300 px-4 py-3 flex justify-between items-center shrink-0">
              <h3 className="font-bold text-gray-700 text-sm">Kotak Masuk</h3>
              <span className="bg-gray-200 text-gray-700 py-0.5 px-2 rounded font-bold text-xs">{emails.length}</span>
            </div>
            
            <div className="flex-grow overflow-y-auto min-w-0">
              {emails.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-2 opacity-50"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="M19 16v6"/><path d="M16 19h6"/></svg>
                  <p className="text-sm">Menunggu pesan...</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {emails.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => setSelectedEmail(item)}
                      className={`p-4 cursor-pointer transition border-l-4 overflow-hidden ${selectedEmail?.id === item.id ? 'bg-[#f4f8fa] border-blue-500' : 'border-transparent hover:bg-gray-50'}`}
                    >
                      <div className="flex justify-between items-start mb-1 min-w-0 gap-2">
                        <strong className="text-gray-900 text-sm truncate flex-1" title={item.sender}>{item.sender}</strong>
                        <span className="text-xs text-gray-500 shrink-0 mt-0.5">{new Date(item.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate" title={item.subject || '(Tanpa Subjek)'}>{item.subject || '(Tanpa Subjek)'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-2/3 bg-white border border-gray-300 rounded shadow-sm flex flex-col h-[500px] md:h-full overflow-hidden">
            {!selectedEmail ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6 text-center bg-gray-50/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-3 opacity-30"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <h4 className="text-lg font-medium text-gray-600 mb-1">Pesan Kosong</h4>
                <p className="text-sm">Pilih pesan di kolom kiri untuk membacanya.</p>
              </div>
            ) : (
              <>
                <div className="bg-white border-b border-gray-300 p-4 md:p-5 shrink-0 flex items-start gap-3 w-full min-w-0">
                  <button onClick={() => setSelectedEmail(null)} className="md:hidden mt-0.5 text-gray-500 hover:text-blue-600 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  </button>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 leading-tight truncate" title={selectedEmail.subject}>{selectedEmail.subject}</h3>
                    <div className="text-sm text-gray-600 min-w-0">
                      <p className="truncate" title={selectedEmail.sender}><strong className="text-gray-800">Dari:</strong> {selectedEmail.sender}</p>
                      <p className="mt-0.5 truncate"><strong className="text-gray-800">Waktu:</strong> {new Date(selectedEmail.created_at).toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex-grow relative bg-white">
                  {selectedEmail.body_html ? (
                    <iframe 
                      srcDoc={selectedEmail.body_html} 
                      className="absolute inset-0 w-full h-full border-0"
                      sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                    />
                  ) : (
                    <div className="absolute inset-0 overflow-y-auto p-5 text-gray-800 font-mono text-sm whitespace-pre-wrap">
                      {selectedEmail.body_text}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

       </div>
          
        {/* ================= MULAI AREA ARTIKEL SEO (VERSI MURNI TEKS) ================= */}
        <article className="mt-24 mb-16 max-w-4xl mx-auto px-2 md:px-0">
          
          {/* Garis pemisah halus dari area aplikasi ke area bacaan */}
          <div className="w-full h-px bg-gray-300 mb-16"></div>

          <div className="space-y-12 text-gray-700 font-sans">
            
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                Apa itu {siteConfig.name}?
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-justify">
                <strong>{siteConfig.name}</strong> adalah layanan email sementara terkemuka yang dirancang untuk melindungi privasi Anda secara online. Layanan ini, yang sering dikenal dengan istilah <em>10 minute mail</em>, <em>temp mail</em>, atau email sekali pakai, memberikan Anda alamat email anonim yang dapat digunakan untuk menerima pesan seketika. Berbeda dengan penyedia layanan email tradisional, sistem kami tidak meminta informasi data diri, kata sandi, maupun registrasi apa pun untuk mulai menggunakan layanan ini.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                Mengapa Anda Membutuhkan Email 10 Menit Anonim?
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-justify">
                Di era digital saat ini, hampir setiap situs web, aplikasi belanja, forum diskusi, hingga layanan Wi-Fi publik mengharuskan Anda untuk mendaftar menggunakan alamat email. Sayangnya, menyerahkan email utama Anda secara sembarangan sering kali berujung pada kotak masuk yang dibanjiri oleh buletin yang tidak diinginkan, pesan spam promosi, hingga potensi penjualan data kepada pihak ketiga. Dengan menggunakan email anonim dari {siteConfig.name}, Anda menciptakan perisai pelindung yang memisahkan identitas asli Anda dari ancaman privasi di internet.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                Bagaimana Cara Kerjanya?
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-justify">
                Sistem kami beroperasi menggunakan infrastruktur perutean server awan yang aman dan serba otomatis. Ketika Anda mengunjungi situs kami, sebuah alamat email unik akan langsung dibuat khusus untuk Anda pada saat itu juga. Setiap kali ada pesan verifikasi yang dikirim ke alamat tersebut, server kami akan mencegatnya dan meneruskannya langsung ke layar Anda tanpa penundaan. Demi menjaga standar keamanan dan anonimitas tingkat tinggi, kami berpegang pada prinsip tanpa jejak. Semua pesan yang masuk beserta alamat email tersebut tidak akan disimpan selamanya di pusat data kami dan akan dihapus secara permanen dalam periode waktu tertentu.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                Cara Menggunakan Layanan Ini
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-justify">
                Menggunakan {siteConfig.name} dirancang agar sangat intuitif tanpa memerlukan keahlian teknis sama sekali. Saat Anda membuka halaman web ini, sistem akan langsung menampilkan satu alamat email acak yang siap pakai di bagian atas layar Anda. Anda cukup menyalin alamat email tersebut dan menempelkannya pada kolom pendaftaran situs atau aplikasi yang sedang Anda tuju. Setelah situs tersebut mengirimkan pesan atau kode OTP verifikasi, Anda hanya perlu kembali ke halaman ini. Pesan tersebut akan otomatis muncul secara ajaib di kotak masuk Anda tanpa perlu memuat ulang halaman web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                Kesimpulan
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-justify">
                Memiliki akses ke alamat email sekali pakai kini bukan lagi sekadar pilihan alternatif, melainkan sebuah kebutuhan dasar untuk berselancar dengan aman di dunia maya. {siteConfig.name} hadir sebagai solusi instan untuk memastikan kotak masuk pribadi Anda tetap bersih dari tumpukan pesan sampah dan privasi Anda tidak pernah dikompromikan. Gunakan layanan ini setiap kali Anda meragukan keamanan sebuah situs web, dan nikmatilah kebebasan berinternet tanpa harus meninggalkan jejak digital yang merugikan.
              </p>
            </section>

          </div>
        </article>
        {/* ================= AKHIR AREA ARTIKEL SEO ================= */}
      </div>
    </main>
  );
}
