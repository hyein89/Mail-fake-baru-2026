import './globals.css';

export const metadata = {
  title: 'Layanan Temp Mail',
  description: 'Terima email dan OTP dengan cepat',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
