export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-300 shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Bagian Logo */}
        <div className="flex items-center gap-2 text-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          <a href="/" className="text-lg font-bold tracking-tight hover:text-blue-800 transition">TempMail</a>
        </div>
        
        {/* Bagian Menu - Kode 'hidden md:flex' sudah dihapus, diganti 'flex' saja */}
        <div className="flex gap-4 text-sm font-medium text-gray-500">
          <a href="/" className="hover:text-blue-600 transition">Beranda</a>
          <a href="/tentang" className="hover:text-blue-600 transition">Tentang</a>
        </div>
      </div>
    </nav>
  );
}
