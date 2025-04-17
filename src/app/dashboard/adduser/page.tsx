'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { supabase } from '@/lib/supabase';
import SuccessModal from '@/components/ui/Successmodal';

export default function AddUserPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    
    const { error } = await supabase.from('users').insert([
      {
        name,
        email,
        age,
        location,
      },
    ])

    setLoading(false)

    if (error) {
      setMessage("خطا در ذخیره کاربر 😢")
      console.error(error)
    } else {
      setMessage("کاربر با موفقیت اضافه شد 🎉")
      setIsModalOpen(true)
    }
    setName('');
    setAge('')
    setEmail('')
    setLocation('');

  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">افزودن کاربر جدید</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          placeholder="نام" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <Input 
          placeholder="ایمیل" 
          type="email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <Input 
          placeholder="سن" 
          type="number"
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
        />
        <Input 
          placeholder="موقعیت مکانی (اختیاری)" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
        />
        
        <Button type="submit" disabled={loading} className='cursor-pointer'>
          {loading ? 'در حال ذخیره...' : 'ذخیره کاربر'}
        </Button>
        
        {message && !isModalOpen && (
          <p className={`text-center mt-2 ${
            message.includes('خطا') ? 'text-red-500' : 'text-green-500'
          }`}>
            {message}
          </p>
        )}
      </form>

      <SuccessModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose}
      />
    </div>
  )
}