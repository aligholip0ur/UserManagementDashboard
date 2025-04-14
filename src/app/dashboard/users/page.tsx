'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type UserData = {
  id: string
  user_id: string 
  name: string
  age: number
}

const UsersPage = () => {
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('user_data')
        .select('*')

      if (error) {
        console.error('خطا در گرفتن لیست کاربران:', error)
      } else {
        setUsers(data || [])
      }

      setLoading(false)
    }

    fetchUsers()
  }, [])

  if (loading) return <p>در حال بارگذاری...</p>

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">لیست کاربران</h1>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">نام</th>
            <th className="border px-4 py-2">سن</th>
            <th className="border px-4 py-2">شناسه کاربر</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.age}</td>
              <td className="border px-4 py-2">{user.user_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage
