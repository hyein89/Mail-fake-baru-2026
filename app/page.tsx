'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [customName, setCustomName] = useState('');
  
  // GANTI INI DENGAN DOMAIN CLOUDFLARE ANDA
  const DOMAIN = 'domainanda.com'; 

  const generateRandomEmail = () => {
    const randomString = Math.random().toString(36).substring(2, 10);
    const email = `${randomString}@${DOMAIN}`;
    router.push(`/inbox/${email}`);
  };

  const handleCustomEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (customName) {
      const email = `${customName.toLowerCase().replace(/[^a-z0-9]/g, '')}@${DOMAIN}`;
      router.push(`/inbox/${email}`);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Layanan Temp Mail</h1>
        
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
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <input 
              type="text" 
              placeholder="nama.custom" 
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full px-4 py-2 outline-none text-gray-700"
              required
            />
            <span className="bg-gray-100 px-4 py-2 text-gray-600 border-l border-gray-300">
              @{DOMAIN}
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
