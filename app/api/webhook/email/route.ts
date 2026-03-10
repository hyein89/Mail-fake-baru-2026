import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    // Verifikasi keamanan menggunakan secret dari Vercel
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { recipient, sender, subject, text, html } = body;

    // Pastikan data penting ada
    if (!recipient || !sender) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    // Simpan ke database Supabase
    const { error } = await supabase
      .from('emails')
      .insert([
        {
          recipient: recipient.toLowerCase(),
          sender: sender,
          subject: subject || '(Tanpa Subjek)',
          body_text: text || '',
          body_html: html || '', // Simpan HTML jika layanan mengirim email format HTML
        }
      ]);

    if (error) throw error;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
