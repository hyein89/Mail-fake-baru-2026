import { MetadataRoute } from 'next';
import { siteConfig } from '@/site.config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      // Mengizinkan SEMUA mesin pencari (Googlebot, Bingbot, dll)
      userAgent: '*',
      
      // Mengizinkan mereka merayapi seluruh isi website kita
      allow: '/',
      
      // Jika nanti Anda punya halaman admin rahasia, Anda bisa menambahkan:
      // disallow: '/admin/',
    },
    
    // Memberi tahu bot di mana letak peta lengkap website Anda
    sitemap: `https://${siteConfig.domain}/sitemap.xml`,
  };
}
