'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (session?.user) {
        router.push('/dashboard')
      } else {
        router.push('/login')
      }
    }

    checkUser()
  }, [router])

  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        
        {/* Text */}
        <p className="text-gray-600">در حال بررسی وضعیت ورود...</p>
      </div>
    </div>
  );
}
