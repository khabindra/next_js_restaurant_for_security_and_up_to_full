'use client';

import { useState, useTransition } from 'react';
import { updatePasswordAction } from '@/app/(admin)/actions/auth/actions';

export default function SettingsPage() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<{ success: boolean; error: string | null }>({ success: false, error: null });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Save form reference immediately
    const form = e.currentTarget; 
    const formData = new FormData(form);
    
    const newPassword = formData.get('newPassword')?.toString() || "";
    const confirmPassword = formData.get('confirmPassword')?.toString() || "";

    // Production Pre-flight check: Instantly validate matching passwords 
    // before wasting a network request to the server.
    if (newPassword !== confirmPassword) {
      setState({ success: false, error: "new and confirm password is not matched" });
      return;
    }

    // Clear previous states
    setState({ success: false, error: null });

    // Execute Server Action securely inside a try/catch to prevent Next.js browser crashes
    startTransition(async () => {
      try {
        const result = await updatePasswordAction(formData);
        
        if (!result || !result.success) {
          setState({ success: false, error: result?.error || "An unknown error occurred." });
        } else {
          setState({ success: true, error: null });
          form.reset(); // Clear form fields
        }
      } catch (err) {
        // This catches network drops or Next.js serialization crashes
        setState({ success: false, error: "Failed to communicate with the server." });
      }
    });
  };

  return (
    <main className="min-h-screen bg-[#f9f8f6] px-6 py-24 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-serif text-stone-900 mb-8">Account Security</h1>
        
        {/* SUCCESS MESSAGE (Green) */}
        {state.success && (
          <div className="mb-6 p-4 bg-green-50 text-green-800 text-sm border-l-2 border-green-500 font-medium">
            New password updated
          </div>
        )}
        
        {/* ERROR MESSAGE (Red) */}
        {state.error && (
          <div className="mb-6 p-4 bg-red-50 text-red-800 text-sm border-l-2 border-red-500 font-medium">
            {state.error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Current Password */}
          <div className="space-y-3">
            <label className="block text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
              Current Password
            </label>
            <input 
              name="currentPassword" 
              type="password" 
              required 
              disabled={isPending}
              className="block w-full bg-transparent border-b border-stone-300 py-3 text-base text-stone-900 focus:border-stone-900 focus:outline-none disabled:opacity-50"
            />
          </div>

          {/* New Password */}
          <div className="space-y-3">
            <label className="block text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
              New Password
            </label>
            <input 
              name="newPassword" 
              type="password" 
              required 
              minLength={6}
              disabled={isPending}
              className="block w-full bg-transparent border-b border-stone-300 py-3 text-base text-stone-900 focus:border-stone-900 focus:outline-none disabled:opacity-50"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-3">
            <label className="block text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
              Confirm New Password
            </label>
            <input 
              name="confirmPassword" 
              type="password" 
              required 
              minLength={6}
              disabled={isPending}
              className="block w-full bg-transparent border-b border-stone-300 py-3 text-base text-stone-900 focus:border-stone-900 focus:outline-none disabled:opacity-50"
            />
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-stone-900 py-5 text-[11px] font-medium uppercase tracking-[0.25em] text-white hover:bg-stone-800 disabled:opacity-50 transition-colors"
          >
            {isPending ? 'Authenticating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </main>
  );
}