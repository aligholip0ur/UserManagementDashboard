// app/admin/users/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type User = {
  id: string
  name: string
  email: string
  location: string
}

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState('')

  const fetchUsers = async () => {
    const { data, error } = await supabase.from('users').select('*')
    if (error) {
      console.error('Error fetching users:', error)
    } else {
      setUsers(data)
    }
  }

  const deleteUser = async (id: string) => {
    const { error } = await supabase.from('users').delete().eq('id', id)
    if (error) {
      console.error('Error deleting user:', error)
    } else {
      fetchUsers() 
    }
  }

  const normalizedSearch = search.toLowerCase()

  const filteredUsers: User[] = users.filter((user) => {
    return (
      user.name?.toLowerCase().includes(normalizedSearch) ||
      user.email?.toLowerCase().includes(normalizedSearch) ||
      user.location?.toLowerCase().includes(normalizedSearch)
    )
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="p-3 md:p-8 bg-white rounded-xl shadow-sm border border-gray-100">
  <div className="flex flex-col md:flex-row md:justify-between  md:items-center mb-8">
    <div className='flex flex-col md:flex-row  md:gap-3'>
      <div className=''>
      <h1 className="text-xl text-center md:text-3xl font-bold text-gray-800">مدیریت کاربران سیستم</h1>
      <p className="text-gray-500  my-2">تعداد کاربران: {users.length} نفر</p>
      </div>
      <div className='flex justify-center my-2 md:block'>
        <input type="text" placeholder="جستجوی کاربر" onChange={(e) => setSearch(e.target.value)} className=" bg-gray-100 border border-gray-200 rounded-md p-2" />
      </div>
    </div>
    <div className='flex flex-row gap-3'>
    <Link href="/dashboard/adduser" className="w-full sm:w-auto">
      <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white h-11 px-6 flex items-center cursor-pointer gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        ایجاد کاربر جدید
      </Button>
    </Link>
    <Link href="/dashboard" className="w-full sm:w-auto">
      <Button className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white h-11 px-5 flex items-center cursor-pointer gap-3">
          بازگشت
      </Button>
    </Link>
   
    </div>
  
  </div>

  {users.length === 0 ? (
    <div className="text-center py-16 rounded-lg bg-gray-50 border border-gray-200">
      <div className="mx-auto w-20 h-20 text-gray-400 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-700">کاربری ثبت نشده است</h3>
      <p className="mt-2 text-gray-500 max-w-md mx-auto">در حال حاضر هیچ کاربری در سیستم وجود ندارد. می‌توانید اولین کاربر را ایجاد کنید.</p>
      <Link href="/dashboard/adduser" className="mt-6 inline-block">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white h-11 px-6 cursor-pointer">
          افزودن کاربر جدید
        </Button>
      </Link>
    </div>
  ) : (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 text-right text-sm font-medium text-gray-700 ">اطلاعات کاربر</th>
            <th scope="col" className="px-6 py-4 text-right text-sm font-medium text-gray-700 ">اطلاعات تماس</th>
            <th scope="col" className="px-6 py-4 text-right text-sm font-medium text-gray-700 ">موقعیت جغرافیایی</th>
            <th scope="col" className="px-6 py-4 text-right text-sm font-medium text-gray-700 ">عملیات</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-5 whitespace-nowrap">
                <div className="flex items-center">
                  <div className=" md:h-12 md:w-12 h-8 w-8 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-md md:text-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div className="mr-4">
                    <div className="text-base font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs md:text-lg text-gray-500 mt-1">شناسه: {user.id}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5 ">
                <div className="text-base text-gray-900">{user.email}</div>
              </td>
              <td className="px-6 py-5">
                <div className="text-base font-medium text-gray-800">{user.location}</div>
                <div className="text-sm text-gray-500 mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {user.location || 'نامشخص'}
                </div>
              </td>
              <td className="px-6 py-5 ">
                <div className="flex gap-3">
                  <Link href={`/dashboard/users/edit/${user.id}`}>
                    <Button variant="outline" className="border-blue-500 cursor-pointer text-blue-600 hover:bg-blue-50 h-10 px-4 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      ویرایش
                    </Button>
                  </Link>
                  <Button 
                    variant="destructive" 
                    onClick={() => deleteUser(user.id)}
                    className="h-10 px-4 flex items-center gap-1 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    حذف
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
  )
}
