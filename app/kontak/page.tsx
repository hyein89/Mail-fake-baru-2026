import { siteConfig } from '@/site.config';

export const metadata = {
  title: `Hubungi Kami - ${siteConfig.name}`,
  description: `Informasi kontak resmi ${siteConfig.name} untuk laporan penyalahgunaan, kerja sama bisnis, dan pertanyaan privasi.`,
};

export default function KontakPage() {
  return (
    <main className="w-full py-12 md:py-20 px-4">
      <article className="max-w-4xl mx-auto text-gray-700 font-sans space-y-12">
        
        {/* Header Halaman */}
        <div className="text-center mb-16 border-b border-gray-300 pb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Hubungi Kami</h1>
          <p className="text-lg text-gray-500 font-medium">Saluran komunikasi resmi tanpa formulir pelacakan.</p>
        </div>

        {/* Pendahuluan */}
        <section>
          <p className="text-base md:text-lg leading-relaxed text-justify">
            Sebagai platform yang menjunjung tinggi anonimitas, <strong>{siteConfig.name}</strong> sengaja tidak menggunakan formulir kontak (<em>contact form</em>) di situs web ini untuk mencegah pengumpulan jejak digital pengunjung. Jika Anda perlu menghubungi tim kami, kami menyediakan jalur komunikasi langsung via surat elektronik (email) sesuai dengan departemen yang relevan di bawah ini.
          </p>
        </section>

        {/* Departemen Abuse */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">Laporan Penyalahgunaan (Abuse)</h2>
          <p className="text-base md:text-lg leading-relaxed text-justify mb-4">
            Kami memiliki kebijakan toleransi nol (<em>zero-tolerance</em>) terhadap penggunaan layanan kami untuk aktivitas ilegal, <em>phishing</em>, peretasan, atau distribusi perangkat lunak berbahaya. Jika Anda menemukan penyalahgunaan infrastruktur kami, segera laporkan dengan melampirkan bukti log atau <em>header</em> email terkait ke:
          </p>
          <div className="bg-gray-100 p-4 rounded border border-gray-300 inline-block">
            <a href="mailto:abuse@smtp.dev" className="text-lg font-bold text-blue-700 hover:text-blue-900 transition tracking-wide font-mono">
              abuse@smtp.dev
            </a>
          </div>
        </section>

        {/* Departemen Bisnis & Umum */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">Kerja Sama & Pertanyaan Umum</h2>
          <p className="text-base md:text-lg leading-relaxed text-justify mb-4">
            Untuk keperluan media, kemitraan bisnis, pertanyaan terkait kebijakan privasi, atau hal-hal non-teknis lainnya, silakan hubungi tim administrasi kami melalui alamat di bawah ini. Harap dipahami bahwa kami mungkin memerlukan waktu 24 hingga 48 jam kerja untuk merespons pesan Anda.
          </p>
          <div className="bg-gray-100 p-4 rounded border border-gray-300 inline-block">
            <a href={`mailto:contact@${siteConfig.domain}`} className="text-lg font-bold text-blue-700 hover:text-blue-900 transition tracking-wide font-mono">
              contact@{siteConfig.domain}
            </a>
          </div>
        </section>

        {/* FAQ Sebelum Menghubungi */}
        <section className="bg-blue-50 border-l-4 border-blue-600 p-6 md:p-8 mt-12 rounded-r">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 tracking-tight">Penting: Sebelum Mengirim Pesan</h2>
          <p className="text-base leading-relaxed text-gray-800 mb-4 text-justify">
            Karena sifat arsitektur sistem kami yang <strong>sepenuhnya anonim dan sementara</strong>, mohon perhatikan hal-hal berikut sebelum menghubungi layanan dukungan:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-3 text-base text-justify">
            <li><strong>Pemulihan Email:</strong> Kami tidak dapat memulihkan pesan atau alamat email sementara yang sudah dihapus oleh sistem. Setelah hilang, data tersebut musnah selamanya.</li>
            <li><strong>Pengiriman Pesan:</strong> Layanan kami murni hanya untuk <em>menerima</em> pesan. Anda tidak bisa mengirim atau membalas email menggunakan alamat sementara dari situs kami.</li>
            <li><strong>Pemblokiran Layanan Pihak Ketiga:</strong> Jika ada situs web (seperti Facebook, Netflix, dll) yang menolak alamat email kami, hal tersebut berada di luar kendali kami karena kebijakan keamanan masing-masing situs.</li>
          </ul>
        </section>

      </article>
    </main>
  );
}
