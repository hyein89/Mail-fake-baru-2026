'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface EmailData {
  id: string;
  sender: string;
  subject: string;
  body_text: string;
  created_at: string;
}

export default function EmailViewer({ email }: { email: string }) {
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState<EmailData | null>(null);

  const fetchEmails = async () => {
    try {
      const { data, error } = await supabase
        .from('emails')
        .select('*')
        .eq('recipient', email)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEmails(data || []);
    } catch (error) {
      console.error('Gagal mengambil email:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();

    // Polling setiap 5 detik untuk mengecek email baru (sangat efektif untuk OTP)
    const interval = setInterval(() => {
      fetchEmails();
    }, 5000);

    return () => clearInterval(interval);
  }, [email]);

  if (loading) return <div className="text-center py-10 text-gray-500">Memuat kotak masuk...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Daftar Email */}
      <div className="md:col-span-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm h-[600px] overflow-y-auto">
        <h3 className="bg-gray-100 px-4 py-3 font-semibold text-gray-700 border-b">Kotak Masuk ({emails.length})</h3>
        {emails.length === 0 ? (
          <p className="p-4 text-center text-gray-500 text-sm mt-10">Belum ada email masuk.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {emails.map((item) => (
              <li 
                key={item.id} 
                onClick={() => setSelectedEmail(item)}
                className={`p-4 cursor-pointer hover:bg-blue-50 transition ${selectedEmail?.id === item.id ? 'bg-blue-50 border-l-4 border-blue-500' : 'border-l-4 border-transparent'}`}
              >
                <p className="font-semibold text-sm text-gray-800 truncate">{item.sender}</p>
                <p className="text-sm text-gray-600 truncate mt-1">{item.subject}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(item.created_at).toLocaleTimeString('id-ID')}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Isi Email */}
      <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm h-[600px] flex flex-col">
        {selectedEmail ? (
          <>
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedEmail.subject}</h2>
              <p className="text-sm text-gray-600">Dari: <span className="font-semibold">{selectedEmail.sender}</span></p>
            </div>
            <div className="p-6 overflow-y-auto whitespace-pre-wrap font-mono text-sm text-gray-700 bg-gray-50 flex-grow">
              {/* Ini akan menampilkan kode OTP atau link verifikasi dengan jelas */}
              {selectedEmail.body_text}
            </div>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center text-gray-400">
            Pilih email di sebelah kiri untuk membaca isinya.
          </div>
        )}
      </div>
    </div>
  );
}
