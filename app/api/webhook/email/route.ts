import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import PostalMime from 'postal-mime'; // Kita panggil library-nya di sini

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { recipient, sender, rawText } = body;

    if (!recipient || !sender || !rawText) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    // Vercel membedah email mentah dari Cloudflare
    const parser = new PostalMime();
    const parsedEmail = await parser.parse(rawText);

    // Simpan hasil bedahan ke Supabase
    const { error } = await supabase
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

    if (error) throw error;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
