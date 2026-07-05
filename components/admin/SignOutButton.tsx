// components/SignOutButton.tsx
'use client'

import {signOut} from '@/app/(admin)/actions/auth/actions'

export default function SignOutButton() {
  return (
    <button 
      onClick={() => signOut()}
      className="
        w-full text-left px-4 py-2 text-sm font-medium 
        text-red-600 
        bg-transparent 
        rounded-lg 
        transition-all duration-200 ease-in-out
        hover:bg-red-50 hover:text-red-700
        active:scale-95 active:bg-red-100
      "
    >
      Sign Out
    </button>
  )
}