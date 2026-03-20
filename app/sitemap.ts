import { MetadataRoute } from 'next';
import { siteConfig } from '@/site.config';

export default function sitemap(): MetadataRoute.Sitemap {
  // Mengambil domain utama dari file konfigurasi Anda
  const baseUrl = `https://${siteConfig.domain}`;

  return [
    {
      url: baseUrl, // Halaman Utama (Beranda)
      lastModified: new Date(),
      changeFrequency: 'always', // Beri tahu Google bahwa halaman ini (inbox) terus berubah
      priority: 1.0, // Prioritas tertinggi (paling penting untuk diindeks)
    },
    {
      url: `${baseUrl}/tentang`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privasi`,
      lastModified: new Date(),
      changeFrequency: 'yearly', // Halaman hukum jarang berubah
      priority: 0.5,
    },
    {
      url: `${baseUrl}/ketentuan`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
