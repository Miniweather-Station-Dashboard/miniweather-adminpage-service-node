import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>MiniWeather Admin</title>
        <meta name="description" content="Admin dashboard for MiniWeather monitoring station" />
      </Head>

      <main className="min-h-screen flex items-center justify-center">
        <div className="max-w-2xl p-8 bg-white rounded-2xl shadow-xl text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🌦️ MiniWeather Admin</h1>
          <p className="text-lg text-gray-600 mb-6">
            Monitor, manage, and gain insights from your coastal weather station data.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <div className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">Go to Dashboard</div>
            </Link>
            <Link href="/login">
              <div className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition">Admin Login</div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
