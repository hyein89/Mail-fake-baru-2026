import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { siteConfig } from '@/site.config';

// ==========================================
// PENGATURAN META TAG SEO & SOSIAL MEDIA
// ==========================================
export const metadata = {
  title: `${siteConfig.name} - Layanan Email Sementara`,
  description: 'Terima email verifikasi dan OTP instan tanpa spam dengan layanan email sementara anonim kami.',
  metadataBase: new URL(`https://${siteConfig.domain}`),
  
  // Ikon Web (Favicon) yang muncul di tab browser
  icons: {
    icon: '/apple-touch-icon.png',
    shortcut: '/apple-touch-icon.png',
    apple: '/apple-touch-icon.png',
  },

  // Open Graph (SEO untuk preview di WhatsApp, Facebook, Telegram, dll)
  openGraph: {
    title: `${siteConfig.name} - Layanan Email Sementara & Anti-Spam`,
    description: 'Lindungi privasi asli Anda. Gunakan email 10 menit gratis kami untuk mendaftar akun tanpa khawatir spam.',
    url: `https://${siteConfig.domain}`,
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-image.jpg', // Nama file gambar thumbnail Anda
        width: 1200,
        height: 630,
        alt: `Banner Resmi ${siteConfig.name}`,
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },

  // SEO khusus untuk Twitter / X
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - Email Sementara Gratis`,
    description: 'Lindungi privasi asli Anda dari spam dan pelacakan data.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        {/* Google Font: Jost */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      
      {/* Mengunci font Jost ke seluruh halaman (body) */}
      <body className="flex flex-col min-h-screen bg-[#f4f6f8] text-gray-800" style={{ fontFamily: "'Jost', sans-serif" }}>
        <Navbar />
        
        <div className="flex-grow">
          {children}
        </div>
        
        <Footer />
      </body>
    </html>
  );
}
