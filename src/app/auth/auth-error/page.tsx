'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFormStatus } from 'react-dom'
import { clearStuckAuthSession } from './actions'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { AlertCircle, RotateCw } from 'lucide-react'

function ClearSessionButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      className="w-full px-6 py-3"
    >
      {pending ? (
        <>
          <Spinner />
          جارٍ مسح الجلسة...
        </>
      ) : (
        <>
          <RotateCw />
          العودة لتسجيل الدخول
        </>
      )}
    </Button>
  )
}

function ErrorContent() {
  const params = useSearchParams()
  const error = params.get('error')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="size-8 text-red-500" />
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-2">فشل التحقق</h1>
        <p className="text-gray-500 mb-4">
          حدث خطأ أثناء محاولة التحقق من حسابك. اضغط الزر أدناه لمسح بيانات الجلسة
          العالقة والعودة إلى تسجيل الدخول.
        </p>
        {error && (
          <p className="text-xs text-red-400 bg-red-50 p-3 rounded-xl mb-4 font-mono" dir="ltr">
            {error}
          </p>
        )}
        <form action={clearStuckAuthSession}>
          <ClearSessionButton />
        </form>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><p className="text-gray-500">جاري التحميل...</p></div>}>
      <ErrorContent />
    </Suspense>
  )
}
