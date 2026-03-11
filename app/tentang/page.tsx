import { siteConfig } from '@/site.config';

// Mengatur Title & Deskripsi khusus untuk halaman ini agar SEO-nya makin bagus
export const metadata = {
  title: `Tentang Kami - ${siteConfig.name}`,
  description: `Pelajari lebih lanjut tentang misi dan visi ${siteConfig.name} dalam melindungi privasi digital Anda.`,
};

export default function TentangPage() {
  return (
    <main className="w-full py-12 md:py-20 px-4">
      <article className="max-w-4xl mx-auto text-gray-700 font-sans space-y-12">
        
        {/* Header Halaman */}
        <div className="text-center mb-16 border-b border-gray-300 pb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Tentang Kami</h1>
          <p className="text-lg text-gray-500 font-medium">Mendedikasikan diri untuk privasi digital tanpa kompromi.</p>
        </div>

        {/* Konten Artikel */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">Visi & Misi</h2>
          <p className="text-base md:text-lg leading-relaxed text-justify">
            Di <strong>{siteConfig.name}</strong>, kami percaya bahwa privasi adalah hak asasi setiap individu di era digital. Visi utama kami adalah menciptakan ekosistem internet yang lebih aman, bersih, dan bebas dari eksploitasi data pribadi. Misi kami sangat sederhana: menyediakan alat bantu komunikasi sementara yang andal, sangat cepat, dan sepenuhnya anonim untuk melindungi pengguna dari ancaman pesan spam, pelacakan iklan agresif, hingga pencurian identitas.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">Awal Mula Berdiri</h2>
          <p className="text-base md:text-lg leading-relaxed text-justify">
            Gagasan untuk membangun {siteConfig.name} lahir dari rasa frustrasi yang mendalam terhadap praktik pengumpulan data di internet dewasa ini. Hampir setiap layanan memaksa pengguna untuk menyerahkan alamat email utama mereka hanya untuk sekadar membaca sebuah artikel, mengunduh berkas, atau menguji coba aplikasi baru. Hal ini mengakibatkan kotak masuk pribadi dipenuhi oleh tumpukan pesan promosi yang tak berujung dan, dalam skenario terburuk, menjadi target kebocoran basis data yang dijual di pasar gelap. Kami menyadari adanya kebutuhan mendesak akan sebuah "perisai" digital instan, dan dari situlah layanan ini dirancang.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">Komitmen Terhadap Keamanan</h2>
          <p className="text-base md:text-lg leading-relaxed text-justify">
            Sebagai platform yang sangat mengedepankan anonimitas, infrastruktur server kami dibangun di atas prinsip <em>privacy-by-design</em>. Kami sama sekali tidak melacak alamat IP asli Anda, tidak meminta informasi registrasi apa pun, dan tidak mencatat log aktivitas penerimaan email Anda secara permanen. Semua pesan email yang masuk ke server kami dikelola secara <em>volatile</em> (sementara) dan akan dimusnahkan secara otomatis oleh sistem kami tanpa meninggalkan sisa jejak digital di pusat data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">Siapa di Balik {siteConfig.name}?</h2>
          <p className="text-base md:text-lg leading-relaxed text-justify">
            Kami adalah kelompok independen yang terdiri dari para pengembang perangkat lunak, pendukung gerakan <em>open-source</em>, dan aktivis privasi digital. Kami mendedikasikan waktu, tenaga, dan sumber daya kami untuk memastikan {siteConfig.name} selalu beroperasi, tetap gratis, stabil, dan dapat diakses dengan mudah oleh siapa saja di seluruh penjuru dunia yang membutuhkan perlindungan privasi seketika.
          </p>
        </section>

      </article>
    </main>
  );
}
