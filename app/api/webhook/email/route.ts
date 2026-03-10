import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import PostalMime from 'postal-mime'; 

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
      return NextResponse.json({ error: 'Sandi Salah' }, { status: 401 });
    }

    const body = await request.json();
    const { recipient, sender, rawText } = body;

    const parser = new PostalMime();
    const parsedEmail = await parser.parse(rawText);

    // Mencoba menyimpan ke Supabase
    const { data, error } = await supabase
      .from('emails')
      .insert([
        {
          recipient: recipient.toLowerCase(),
          sender: sender,
          subject: parsedEmail.subject || '(Tanpa Subjek)',
          body_text: parsedEmail.text || '',
          body_html: parsedEmail.html || '',
        }
      ]);

    // Jika Supabase menolak, cetak alasan penolakannya!
    if (error) {
      console.error("ERROR DARI SUPABASE:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    // Jika Vercel yang gagal memproses, cetak alasannya!
    console.error('ERROR DARI VERCEL:', error.message || error);
    return NextResponse.json({ error: error.message || 'Server Error' }, { status: 500 });
  }
}
