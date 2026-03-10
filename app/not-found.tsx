export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4 font-sans">
      <h1 className="text-7xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-2">Not Found</h2>
      <p className="text-gray-500">The page or resource you are looking for does not exist on this server.</p>
    </div>
  );
}
