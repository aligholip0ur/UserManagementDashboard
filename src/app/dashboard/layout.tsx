'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
export default function Layout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
  
    useEffect(() => {
      const fetchUserData = async () => {
        const session = await supabase.auth.getSession();
        if (session.data.session) {
          setUser(session.data.session.user);
        } else {
          router.push('/login');
        }
        setLoading(false);
      };
  
      fetchUserData();
    }, [router]);
  
    const handleLogout = async () => {
      await supabase.auth.signOut();
      router.push('/login');
    };
    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-gray-600 text-lg">در حال بارگذاری...</div>
        </div>
      );
      
    return (
        <div className="min-h-screen bg-gray-50">
  {/* Header Section */}
  <header className="bg-white shadow">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             <h1 className="text-2xl md:text-3xl font-bold text-gray-800">پنل مدیریت</h1>
             {user && (
               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                 <p className="text-gray-600 text-sm md:text-base">
                   خوش آمدید, <span className="font-medium text-gray-800">{user.email}</span>
                 </p>
                 <button
                   onClick={handleLogout}
                   className="px-3 py-1.5 bg-rose-600 cursor-pointer text-white text-sm rounded-md hover:bg-rose-700 transition-colors flex items-center gap-1"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                   </svg>
                   خروج
                 </button>
               </div>
             )}
           </div>
         </div>
       </header>
        <div>{children}</div>
        </div>
    );
}