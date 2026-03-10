import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET request untuk mengambil daftar email berdasarkan alamat (address)
export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  try {
    const emailAddress = params.address.toLowerCase();

    // Mengambil data dari database (Vercel yang memegang Anon Key dengan aman)
    const { data, error } = await supabase
      .from('emails')
      .select('id, sender, subject, body_text, body_html, created_at')
      .eq('recipient', emailAddress)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // WAJIB: Menambahkan CORS Headers agar Blogspot/KSWEB tidak diblokir saat meminta data
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Mengizinkan semua domain (Blogspot/Localhost) untuk akses
        'Access-Control-Allow-Methods': 'GET',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
