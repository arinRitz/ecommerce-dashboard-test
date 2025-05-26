// app/page.tsx
'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <main className="h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Forsit Admin Dashboard</h1>
      <Button onClick={() => router.push('/dashboard')}>
        Enter Dashboard
      </Button>
    </main>
  )
}
