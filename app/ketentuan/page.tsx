import { siteConfig } from '@/site.config';

export const metadata = {
  title: `Syarat dan Ketentuan - ${siteConfig.name}`,
  description: `Aturan, panduan penggunaan, dan penafian tanggung jawab hukum untuk pengguna layanan ${siteConfig.name}.`,
};

export default function KetentuanPage() {
  return (
    <main className="w-full py-12 md:py-20 px-4">
      <article className="max-w-4xl mx-auto text-gray-700 font-sans space-y-12">
        
        {/* Header Halaman */}
        <div className="text-center mb-16 border-b border-gray-300 pb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Syarat dan Ketentuan Layanan</h1>
          <p className="text-lg text-gray-500 font-medium">Terakhir Diperbarui: 11 Maret 2026</p>
        </div>

        {/* Pendahuluan */}
        <section>
          <p className="text-base md:text-lg leading-relaxed text-justify">
            Dokumen Syarat dan Ketentuan (<em>Terms of Service</em>) ini adalah perjanjian hukum yang mengikat antara Anda (pengguna) dan <strong>{siteConfig.name}</strong>. Dengan mengakses, menavigasi, atau menggunakan infrastruktur pembuatan email anonim di situs web ini, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui untuk terikat secara hukum oleh seluruh ketentuan yang tercantum di bawah ini. Jika Anda tidak menyetujui sebagian atau seluruh ketentuan ini, Anda dilarang keras menggunakan layanan kami.
          </p>
        </section>

        {/* Pasal 1 */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">Deskripsi dan Sifat Layanan</h2>
          <p className="text-base md:text-lg leading-relaxed text-justify">
            {siteConfig.name} menyediakan layanan alamat email sementara dan sekali pakai (<em>disposable email</em>) secara gratis yang ditujukan secara eksklusif untuk melindungi privasi Anda dari pesan <em>spam</em>. Sistem kami dirancang murni sebagai wadah penerima pesan (<em>inbound only</em>). Kami <strong>tidak menyediakan fasilitas untuk mengirim pesan keluar</strong>, membalas email, atau meneruskan pesan ke alamat lain. Layanan ini bersifat sementara (<em>volatile</em>), yang berarti semua pesan masuk akan dihapus secara otomatis dan permanen oleh sistem dari waktu ke waktu.
          </p>
        </section>

        {/* Pasal 2 */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">Kebijakan Penggunaan yang Dapat Diterima (AUP)</h2>
          <p className="text-base md:text-lg leading-relaxed text-justify mb-4">
            Anda setuju untuk menggunakan layanan ini hanya untuk tujuan yang sah, etis, dan sesuai dengan hukum yang berlaku secara internasional maupun di yurisdiksi Anda. Anda secara tegas <strong>dilarang</strong> menggunakan infrastruktur {siteConfig.name} untuk:
          </p>
          <ul className="list-disc pl-6 md:pl-8 text-gray-700 space-y-2 text-base md:text-lg text-justify">
            <li>Aktivitas penipuan, <em>phishing</em>, pencurian identitas, atau rekayasa sosial (<em>social engineering</em>).</li>
            <li>Menerima, mendistribusikan, atau memfasilitasi materi ilegal, pornografi anak, ujaran kebencian, atau perangkat lunak berbahaya (<em>malware/ransomware</em>).</li>
            <li>Melakukan pendaftaran akun secara massal (<em>botting/automation</em>) yang bertujuan untuk menyerang, melakukan spam, atau merusak sistem pihak ketiga.</li>
            <li>Melanggar hak kekayaan intelektual, paten, merek dagang, atau rahasia dagang pihak lain.</li>
          </ul>
        </section>

        {/* Pasal 3 */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">Penafian Tanggung Jawab (Disclaimer of Warranties)</h2>
          <p className="text-base md:text-lg leading-relaxed text-justify mb-4">
            Layanan kami disediakan secara "Sebagaimana Adanya" (<em>As-Is</em>) dan "Sebagaimana Tersedia" (<em>As-Available</em>). Kami <strong>menolak segala bentuk jaminan</strong>, baik tersurat maupun tersirat, termasuk namun tidak terbatas pada jaminan kelayakan untuk diperdagangkan atau kesesuaian untuk tujuan tertentu. Kami tidak menjamin bahwa:
          </p>
          <ul className="list-disc pl-6 md:pl-8 text-gray-700 space-y-2 text-base md:text-lg text-justify">
            <li>Layanan tidak akan pernah mengalami gangguan, penundaan (<em>delay</em>), atau bebas dari kesalahan teknis (<em>bug-free</em>).</li>
            <li>Setiap email yang dikirim oleh pihak ketiga pasti akan berhasil masuk dan ditampilkan di kotak masuk sementara Anda.</li>
            <li>Domain email yang kami sediakan tidak akan masuk dalam daftar hitam (<em>blacklist</em>) oleh platform atau situs web tertentu.</li>
          </ul>
        </section>

        {/* Pasal 4 */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">Batasan Kewajiban (Limitation of Liability)</h2>
          <p className="text-base md:text-lg leading-relaxed text-justify">
            Dalam keadaan atau teori hukum apa pun, tim pengembang, pemilik domain, afiliasi, atau pemasok {siteConfig.name} tidak akan bertanggung jawab atas kerusakan langsung, tidak langsung, insidental, atau kerugian konsekuensial (termasuk hilangnya data, akun pihak ketiga yang ditangguhkan, kehilangan keuntungan finansial, atau kegagalan transaksi) yang timbul akibat penggunaan atau ketidakmampuan Anda dalam menggunakan layanan ini. Penggunaan alamat email dari situs kami untuk mendaftar akun penting adalah risiko yang Anda tanggung sendiri sepenuhnya.
          </p>
        </section>

        {/* Pasal 5 */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">Penghentian dan Pemblokiran Akses</h2>
          <p className="text-base md:text-lg leading-relaxed text-justify">
            Kami berhak, atas kebijakan kami sendiri secara sepihak dan tanpa pemberitahuan sebelumnya, untuk menghentikan, membatasi, atau memblokir akses alamat IP Anda ke layanan kami apabila kami mendeteksi adanya aktivitas yang mencurigakan, pelanggaran terhadap ketentuan ini, atau tindakan penyalahgunaan (<em>abuse</em>) yang membebani infrastruktur jaringan kami secara tidak wajar. Kami juga berhak untuk menghapus, menambah, atau mengganti domain email sementara yang tersedia kapan saja tanpa pemberitahuan.
          </p>
        </section>

      </article>
    </main>
  );
}
