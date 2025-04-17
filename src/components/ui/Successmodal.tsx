'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type SuccessModalProps = {
  isOpen: boolean;
  onClose?: () => void;
};

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.push('/dashboard');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md animate-fade-in-up">
        <div className="p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg 
              className="h-10 w-10 text-green-600 animate-checkmark"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            ثبت نام موفقیت‌آمیز بود!
          </h3>
          <p className="text-gray-600 mb-6">
            کاربر گرامی، اطلاعات شما با موفقیت ثبت شد.
          </p>

          <button
            onClick={handleClose}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            ادامه
          </button>
        </div>

        <div className="h-1 bg-green-200">
          <div className="h-full bg-green-500 animate-progress-bar"></div>
        </div>
      </div>
    </div>
  );
}