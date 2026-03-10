'use client'; 

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4 font-sans">
      <h1 className="text-7xl font-bold text-red-600 mb-4">500</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Internal Server Error</h2>
      <p className="text-gray-500">The server encountered an unexpected condition that prevented it from fulfilling the request.</p>
    </div>
  );
}
