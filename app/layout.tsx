import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'TempMail Service',
  description: 'Layanan Email Sementara & Anti-Spam super cepat.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      {/* flex-col dan min-h-screen memastikan Footer selalu didorong ke paling bawah layar */}
      <body className="flex flex-col min-h-screen bg-[#f4f6f8] text-gray-800 font-sans">
        <Navbar />
        
        {/* Konten halaman (seperti kotak email) akan masuk ke sini */}
        <div className="flex-grow">
          {children}
        </div>
        
        <Footer />
      </body>
    </html>
  );
}
