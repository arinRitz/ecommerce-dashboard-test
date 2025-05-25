// app/page.tsx
'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Forsit Admin Dashboard</h1>
      <button
        className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        onClick={() => router.push('/dashboard')}
      >
        Go to Dashboard
      </button>
    </main>
  )
}
