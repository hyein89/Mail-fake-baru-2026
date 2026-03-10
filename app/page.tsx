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

  // Format baru: stringacak.angka@domain (contoh: aj3kx.928@...)
  const generateStringNumberEmail = () => {
    const randomStr = Math.random().toString(36).substring(2, 7); // 5 karakter acak
    const randomNum = Math.floor(Math.random() * 900) + 100; // Angka 100-999
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

  // Polling tiap 5 detik
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
    if (!name) return alert('Nama email tidak boleh kosong!');
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
    <>
      {/* Memanggil Bootstrap 3 Langsung */}
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
      
      {/* CSS Tambahan agar rapi dan tidak terlalu bulat (khas BS3) */}
      <style dangerouslySetInnerHTML={{__html: `
        body { background-color: #f1f3f6; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; }
        .navbar-custom { background-color: #fff; border-bottom: 1px solid #e7e7e7; margin-bottom: 20px; }
        .panel-shadow { box-shadow: 0 1px 3px rgba(0,0,0,.05); border-radius: 4px; }
        .email-address-text { font-family: Consolas, monospace; font-size: 24px; font-weight: bold; color: #333; margin: 0; padding: 10px 0; }
        .list-group-custom { max-height: 500px; overflow-y: auto; margin-bottom: 0; }
        .list-group-item { border-radius: 0 !important; border-left: 3px solid transparent; cursor: pointer; }
        .list-group-item:hover { background-color: #f9f9f9; }
        .list-group-item.active-item { background-color: #f4f8fa; border-left-color: #337ab7; }
        .iframe-container { width: 100%; height: 500px; border: none; }
        .text-truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; }
      `}} />

      {/* NAVBAR */}
      <nav className="navbar navbar-custom">
        <div className="container">
          <div className="navbar-header">
            <span className="navbar-brand" style={{ color: '#337ab7', fontWeight: 'bold' }}>
              <span className="glyphicon glyphicon-envelope" aria-hidden="true" style={{ marginRight: '8px' }}></span>
              TempMail Service
            </span>
          </div>
        </div>
      </nav>

      <div className="container">
        
        {/* PANEL EMAIL AKTIF */}
        <div className="panel panel-default panel-shadow">
          <div className="panel-heading" style={{ backgroundColor: '#fff' }}>
            <h3 className="panel-title text-muted text-uppercase" style={{ fontSize: '12px', fontWeight: 'bold' }}>
              Alamat Email Anda
            </h3>
          </div>
          <div className="panel-body text-center" style={{ padding: '20px 15px' }}>
            
            {mode === 'auto' ? (
              <div>
                <p className="email-address-text">{activeEmail || 'Memuat...'}</p>
                <hr style={{ marginTop: '15px', marginBottom: '15px' }} />
                
                <div className="btn-group" role="group">
                  <button onClick={handleCopy} className={`btn ${copied ? 'btn-success' : 'btn-default'}`}>
                    <span className={`glyphicon ${copied ? 'glyphicon-ok' : 'glyphicon-copy'}`} aria-hidden="true"></span> {copied ? 'Tersalin' : 'Salin'}
                  </button>
                  <button onClick={() => fetchEmails(activeEmail)} className="btn btn-primary" disabled={isSyncing}>
                    <span className={`glyphicon glyphicon-refresh ${isSyncing ? 'text-muted' : ''}`} aria-hidden="true"></span> Refresh
                  </button>
                  <button onClick={changeToNewEmail} className="btn btn-default">
                    <span className="glyphicon glyphicon-random" aria-hidden="true"></span> Acak Baru
                  </button>
                  <button onClick={() => setMode('custom')} className="btn btn-default">
                    <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Custom
                  </button>
                </div>
              </div>
            ) : (
              <div className="row" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="col-sm-5" style={{ paddingRight: '5px' }}>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="nama.bebas" 
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                  />
                </div>
                <div className="col-sm-4" style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                  <select 
                    className="form-control"
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                  >
                    {MAIL_DOMAINS.map((domain) => (
                      <option key={domain} value={domain}>@{domain}</option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-3" style={{ paddingLeft: '5px' }}>
                  <div className="btn-group" style={{ display: 'flex' }}>
                    <button onClick={saveCustomEmail} className="btn btn-success" style={{ flex: 1 }}>Simpan</button>
                    <button onClick={() => setMode('auto')} className="btn btn-danger" title="Batal">
                      <span className="glyphicon glyphicon-remove"></span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* TATA LETAK INBOX (KIRI DAFTAR, KANAN BACA) */}
        <div className="row">
          
          {/* KOLOM KIRI: DAFTAR PESAN */}
          <div className="col-md-4">
            <div className="panel panel-default panel-shadow">
              <div className="panel-heading flex justify-between">
                <h3 className="panel-title" style={{ fontWeight: 'bold' }}>
                  Kotak Masuk <span className="badge pull-right">{emails.length}</span>
                </h3>
              </div>
              
              <div className="list-group list-group-custom">
                {emails.length === 0 ? (
                  <div className="text-center text-muted" style={{ padding: '40px 20px' }}>
                    <span className="glyphicon glyphicon-inbox" style={{ fontSize: '32px', marginBottom: '10px', color: '#ccc' }}></span>
                    <p>Menunggu pesan masuk...</p>
                    <small>Auto-refresh setiap 5 detik</small>
                  </div>
                ) : (
                  emails.map((item) => (
                    <a 
                      key={item.id} 
                      onClick={() => setSelectedEmail(item)}
                      className={`list-group-item ${selectedEmail?.id === item.id ? 'active-item' : ''}`}
                    >
                      <div className="row">
                        <div className="col-xs-8">
                          <strong className="text-truncate" style={{ color: '#333' }}>{item.sender}</strong>
                        </div>
                        <div className="col-xs-4 text-right">
                          <small className="text-muted" style={{ fontSize: '11px' }}>
                            {new Date(item.created_at).toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}
                          </small>
                        </div>
                      </div>
                      <p className="text-truncate text-muted" style={{ margin: '2px 0 0 0', fontSize: '13px' }}>
                        {item.subject || '(Tanpa Subjek)'}
                      </p>
                    </a>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: ISI PESAN */}
          <div className="col-md-8">
            <div className="panel panel-default panel-shadow">
              {!selectedEmail ? (
                <div className="panel-body text-center text-muted" style={{ height: '540px', paddingTop: '200px' }}>
                  <span className="glyphicon glyphicon-envelope" style={{ fontSize: '48px', color: '#eee', marginBottom: '15px' }}></span>
                  <h4>Tidak ada pesan yang dipilih</h4>
                  <p>Pilih pesan dari daftar di sebelah kiri untuk membacanya.</p>
                </div>
              ) : (
                <>
                  <div className="panel-heading" style={{ backgroundColor: '#fff', borderBottom: '1px solid #eee' }}>
                    <h3 className="panel-title" style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                      {selectedEmail.subject}
                    </h3>
                    <div className="text-muted" style={{ fontSize: '13px' }}>
                      <strong>Dari:</strong> {selectedEmail.sender} <br/>
                      <strong>Waktu:</strong> {new Date(selectedEmail.created_at).toLocaleString('id-ID')}
                    </div>
                  </div>
                  <div className="panel-body" style={{ padding: '0' }}>
                    {selectedEmail.body_html ? (
                      <iframe 
                        srcDoc={selectedEmail.body_html} 
                        className="iframe-container"
                        sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                      />
                    ) : (
                      <div style={{ padding: '20px', height: '500px', overflowY: 'auto', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '13px' }}>
                        {selectedEmail.body_text}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
