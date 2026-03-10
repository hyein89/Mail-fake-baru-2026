'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MAIL_DOMAINS, DEFAULT_DOMAIN } from '@/lib/mail.config';

export default function Home() {
  const router = useRouter();
  const [customName, setCustomName] = useState('');
  
  // State untuk menyimpan domain yang dipilih pengguna
  const [selectedDomain, setSelectedDomain] = useState(DEFAULT_DOMAIN);

  const generateRandomEmail = () => {
    const randomString = Math.random().toString(36).substring(2, 10);
    const email = `${randomString}@${selectedDomain}`;
    router.push(`/inbox/${email}`);
  };

  const handleCustomEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (customName) {
      const email = `${customName.toLowerCase().replace(/[^a-z0-9]/g, '')}@${selectedDomain}`;
      router.push(`/inbox/${email}`);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Layanan Temp Mail</h1>
        
        {/* Dropdown Pemilihan Domain */}
        <div className="mb-6 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Domain:</label>
          <select 
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none"
          >
            {MAIL_DOMAINS.map((domain) => (
              <option key={domain} value={domain}>@{domain}</option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={generateRandomEmail}
          className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition mb-6"
        >
          Buat Email Acak
        </button>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">ATAU</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleCustomEmail} className="mt-6 flex flex-col gap-3">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
            <input 
              type="text" 
              placeholder="nama.custom" 
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full px-4 py-2 outline-none text-gray-700"
              required
            />
            <span className="bg-gray-100 px-4 py-2 text-gray-600 border-l border-gray-300 text-sm whitespace-nowrap">
              @{selectedDomain}
            </span>
          </div>
          <button 
            type="submit"
            className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-900 transition"
          >
            Gunakan Email Custom
          </button>
        </form>
      </div>
    </main>
  );
}
