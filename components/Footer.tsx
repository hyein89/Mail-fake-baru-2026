import { siteConfig } from '@/site.config';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500 font-medium">
          {/* Menyedot nama dari site.config.ts */}
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm font-medium text-gray-400">
          <a href="/privasi" className="hover:text-gray-700 transition">Privasi</a>
          <a href="/ketentuan" className="hover:text-gray-700 transition">Ketentuan</a>
          <a href="/kontak" className="hover:text-gray-700 transition">Kontak</a>
        </div>
      </div>
    </footer>
  );
}
