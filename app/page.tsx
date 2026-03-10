export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-8 mt-10 font-sans text-gray-800 leading-relaxed bg-white rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-3xl font-bold mb-6 border-b pb-4 text-gray-900">Public Email Service</h1>
      
      <p className="mb-4 text-justify">
        Welcome to our public email service! Our primary goal is to <strong>prevent spam</strong> and maintain a <strong>safe</strong> and <strong>secure</strong> environment for all users. As such, <strong>we strictly prohibit any illegal activities on our platform.</strong>
      </p>
      
      <p className="mb-4 text-justify">
        Please note that <strong>we do not allow sending messages to the internet</strong>, and we will not support or engage in any illegal activities. Our service is intended for legitimate use only.
      </p>
      
      <p className="mb-6 text-justify">
        We kindly request that our domain names not be blocked, as we are not a throwaway email service and our emails will not bounce. In the event that you encounter difficulties with user registrations, please consider banning them by IP address instead.
      </p>
      
      <p className="mb-8 text-justify">
        Thank you for using our service, and we look forward to providing you with a safe and reliable email experience.
      </p>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 inline-block">
        <span className="font-semibold">All abuse reporting can be done via </span>
        <a href="mailto:abuse@smtp.dev" className="text-blue-600 hover:text-blue-800 font-bold ml-1 transition-colors">
          abuse@smtp.dev
        </a>
      </div>
    </main>
  );
}
