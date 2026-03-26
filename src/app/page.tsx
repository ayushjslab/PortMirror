import AuthButton from '@/components/auth/AuthButton';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome to Your App
          </h1>
          <p className="text-gray-500">
            Experience modern authentication with Auth.js
          </p>
        </div>

        <div className="flex justify-center py-4">
          <AuthButton />
        </div>

        {session ? (
          <div className="mt-8 p-4 rounded-xl border border-green-100">
            <h2 className="text-sm font-semibold text-green-800 uppercase tracking-wider mb-2">
              Session Data
            </h2>
            <pre className="text-xs text-green-700 overflow-auto max-h-48 whitespace-pre-wrap">
              {JSON.stringify(session.user, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="mt-8 p-4 rounded-xl border border-blue-100 text-center">
            <p className="text-sm text-blue-700 italic">
              Please sign in to see your profile details.
            </p>
          </div>
        )}

        <div className="pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            Built with Next.js 15+, Tailwind CSS, and Auth.js v5
          </p>
        </div>
      </div>
    </main>
  );
}