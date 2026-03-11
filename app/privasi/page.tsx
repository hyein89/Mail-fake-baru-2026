import { siteConfig } from '@/site.config';

export const metadata = {
  title: `Kebijakan Privasi - ${siteConfig.name}`,
  description: `Dokumen kebijakan privasi resmi yang mengatur perlindungan data dan anonimitas pengguna di ${siteConfig.name}.`,
};

export default function PrivasiPage() {
  return (
    <main className="w-full py-12 md:py-20 px-4">
      <article className="max-w-4xl mx-auto text-gray-700 font-sans space-y-12">
        
        {/* Header Halaman */}
        <div className="text-center mb-16 border-b border-gray-300 pb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Kebijakan Privasi</h1>
          <p className="text-lg text-gray-500 font-medium">Terakhir Diperbarui: 11 Maret 2026</p>
        </div>

        {/* Pendahuluan */}
        <section>
          <p className="text-base md:text-lg leading-relaxed text-justify">
            Selamat datang di <strong>{siteConfig.name}</strong>. Melindungi privasi Anda adalah landasan utama dari layanan kami. Kami memahami bahwa Anda menggunakan layanan email sementara kami secara spesifik untuk menghindari pelacakan dan melindungi data pribadi Anda. Kebijakan Privasi ini menjelaskan secara transparan bagaimana infrastruktur kami beroperasi terkait penanganan data di platform kami.
          </p>
        </section>

        {/* Pasal 1 */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">1. Pengumpulan Data Pribadi</h2>
          <p className="text-base md:text-lg leading-relaxed text-justify mb-4">
            Sebagai layanan anonim, <strong>kami sama sekali tidak mengumpulkan, meminta, atau menyimpan data identitas pribadi Anda</strong>. Layanan kami beroperasi tanpa memerlukan:
          </p>
          <ul className="list-disc pl-6 md:pl-8 text-gray-700 space-y-2 text-base md:text-lg">
            <li>Nama lengkap atau identitas dunia nyata.</li>
            <li>Alamat email utama atau nomor telepon.</li>
            <li>Pembuatan akun, kata sandi, atau proses registrasi.</li>
            <li>Informasi penagihan atau kartu kredit.</li>
          </ul>
        </section>

        {/* Pasal 2 */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">2. Penanganan Pesan Email</h2>
          <p className="text-base md:text-lg leading-relaxed text-justify">
            Infrastruktur {siteConfig.name} didesain untuk menjadi tempat persinggahan sementara, bukan penyimpanan permanen. Setiap email masuk yang diterima oleh alamat sementara Anda akan diproses di dalam memori server (RAM) dan pangkalan data sementara kami. <strong>Semua pesan dan lampiran akan dihapus secara otomatis dan permanen</strong> dari sistem kami setelah periode waktu tertentu berakhir. Kami tidak menyimpan cadangan (<em>backup</em>) dari pesan yang telah dihapus, dan pesan tersebut tidak dapat dipulihkan oleh siapa pun, termasuk oleh tim administrator kami.
          </p>
        </section>

        {/* Pasal 3 */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">3. Penggunaan Cookies & Penyimpanan Lokal</h2>
          <p className="text-base md:text-lg leading-relaxed text-justify">
            Kami meminimalkan pelacakan browser secara ketat. Kami hanya menggunakan Penyimpanan Lokal (<em>Local Storage</em>) bawaan peramban (<em>browser</em>) Anda secara teknis untuk mengingat alamat email sementara yang sedang Anda gunakan saat ini. Hal ini bertujuan agar Anda tidak kehilangan akses ke kotak masuk Anda apabila Anda tidak sengaja memuat ulang (<em>refresh</em>) halaman atau menutup tab peramban. Kami tidak menggunakan <em>cookies</em> pelacakan agresif untuk menargetkan iklan profil pengguna.
          </p>
        </section>

        {/* Pasal 4 */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">4. Berbagi Data dengan Pihak Ketiga</h2>
          <p className="text-base md:text-lg leading-relaxed text-justify">
            Karena kami tidak memiliki data pribadi pengguna, kami tidak memiliki apa pun untuk dijual atau dibagikan. Kami secara tegas menyatakan bahwa <strong>kami tidak pernah menjual, menyewakan, atau menukar data aktivitas masuk Anda</strong> kepada agensi pemasaran, pengiklan, pencari data, atau pihak ketiga mana pun.
          </p>
        </section>

        {/* Pasal 5 */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">5. Batasan Tanggung Jawab & Peringatan Keamanan</h2>
          <p className="text-base md:text-lg leading-relaxed text-justify">
            Meskipun kami menggunakan enkripsi transport (TLS) untuk mengamankan jalur masuk email ke server kami, layanan email sementara pada dasarnya bersifat publik. Siapa pun yang mengetahui alamat email spesifik Anda dapat berpotensi melihat pesan masuk Anda sebelum email tersebut dihapus. Oleh karena itu, <strong>kami sangat melarang penggunaan {siteConfig.name} untuk mendaftar akun sensitif</strong>, seperti layanan perbankan daring, dompet mata uang kripto, data medis, atau akun utama media sosial Anda. Tanggung jawab atas risiko penggunaan layanan ini berada sepenuhnya di tangan pengguna.
          </p>
        </section>

        {/* Pasal 6 */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">6. Perubahan Kebijakan</h2>
          <p className="text-base md:text-lg leading-relaxed text-justify">
            Kami berhak untuk memperbarui, mengubah, atau memodifikasi Kebijakan Privasi ini kapan saja demi menyesuaikan dengan perubahan operasional atau regulasi hukum internasional. Setiap perubahan material akan langsung ditayangkan di halaman ini, dan tanggal "Terakhir Diperbarui" di bagian atas dokumen ini akan direvisi secara otomatis. Kami menyarankan Anda untuk meninjau halaman ini secara berkala.
          </p>
        </section>

      </article>
    </main>
  );
}
