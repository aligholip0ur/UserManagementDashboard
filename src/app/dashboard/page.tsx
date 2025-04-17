'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

const Dashboard = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };
  return (
    <>
      <div className="">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-100 hover:shadow-md transition-all">
              <div className="p-5 sm:p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <div className="mr-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-800">افزودن کاربر جدید</h3>
                    <p className="mt-1 text-sm text-gray-500">ایجاد حساب کاربری جدید در سیستم</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link href="/dashboard/adduser">
                    <button
                      className="w-full flex cursor-pointer justify-center items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      رفتن به صفحه افزودن کاربر
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-100 hover:shadow-md transition-all">
              <div className="p-5 sm:p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-lg">
                    <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="mr-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-800">مدیریت کاربران</h3>
                    <p className="mt-1 text-sm text-gray-500">مشاهده و ویرایش کاربران موجود</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link href="/dashboard/users">
                    <button
                      className="w-full flex cursor-pointer justify-center items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                      </svg>
                      رفتن به صفحه مدیریت
                    </button>

                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-100 hover:shadow-md transition-all">
              <div className="p-5 sm:p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-rose-100 p-3 rounded-lg">
                    <svg className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <div className="mr-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-800">خروج از سیستم</h3>
                    <p className="mt-1 text-sm text-gray-500">خروج از حساب کاربری فعلی</p>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleLogout}
                    className="w-full flex justify-center cursor-pointer items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    خروج از حساب
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
