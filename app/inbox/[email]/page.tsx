import EmailViewer from '@/components/EmailViewer';

// Menerima parameter email dari URL
export default function InboxPage({ params }: { params: { email: string } }) {
  // Decode email karena format URL (contoh: %40 menjadi @)
  const emailAddress = decodeURIComponent(params.email);

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Alamat Email Anda:</p>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">{emailAddress}</h2>
          </div>
          <div className="text-sm text-gray-500 bg-blue-50 px-4 py-2 rounded-lg">
            Menunggu email masuk... (Otomatis refresh)
          </div>
        </div>

        {/* Memanggil komponen Client untuk mengambil data real-time */}
        <EmailViewer email={emailAddress} />
      </div>
    </main>
  );
}
