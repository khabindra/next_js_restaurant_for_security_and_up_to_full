// // app/(admin)/login/page.tsx
// import { login } from "@/app/(admin)/actions/auth/actions"
// interface PageProps {
//   searchParams: Promise<{ error?: string }>;
// }

// export default async function LoginPage({ searchParams }: PageProps) {
//   const params = await searchParams;
//   const errorMessage = params.error;

//   return (
//     <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
//       <div className="w-full max-w-md space-y-8 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
//         <div className="text-center">
//           <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-white font-serif text-xl font-bold mb-4">
//             L
//           </div>
//           <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Bistro Portal Portal</h1>
//           <p className="mt-2 text-sm text-neutral-400 font-light">Authorized administration check access protocol.</p>
//         </div>

//         {errorMessage && (
//           <div className="rounded-xl border border-red-100 bg-red-50/60 p-4 text-sm text-red-700 animate-in fade-in zoom-in-95 duration-150">
//             <div className="flex items-center gap-2.5">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 text-red-500 flex-shrink-0">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
//               </svg>
//               <span className="font-medium">{errorMessage}</span>
//             </div>
//           </div>
//         )}

//         <form action={login} className="space-y-5">
//           <div className="space-y-1">
//             <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Owner Email</label>
//             <input id="email" name="email" type="email" required placeholder="chef@labellacucina.com" className="block w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 sm:text-sm transition-colors" />
//           </div>

//           <div className="space-y-1">
//             <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Password</label>
//             <input id="password" name="password" type="password" required placeholder="••••••••••••" className="block w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 sm:text-sm transition-colors" />
//           </div>

//           <button type="submit" className="flex w-full justify-center rounded-lg bg-neutral-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-900">
//             Verify Operational Workspace
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }


'use client';

import { useState, useTransition } from 'react'; 
import { login, type ActionResponse } from "@/app/(admin)/actions/auth/actions";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<ActionResponse>({ success: false, error: null });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    setState({ success: false, error: null });
    
    startTransition(async () => {
      const result = await login(formData);
      
      if (result && !result.success) {
        setState(result);
      }
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-white font-serif text-xl font-bold mb-4">
            L
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Bistro Portal</h1>
          <p className="mt-2 text-sm text-neutral-500 font-light">Authorized administration check access protocol.</p>
        </div>

        {state.error && (
          <div 
            role="alert" 
            aria-live="polite"
            className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center gap-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 text-red-500 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <span className="font-medium">{state.error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* 🍯 HONEYPOT FIELD: Hidden from humans, tempting for bots */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="company">Leave this field blank</label>
            <input 
              id="company" 
              name="company" 
              type="text" 
              tabIndex={-1} 
              autoComplete="off" 
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
              Owner Email
            </label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              autoComplete="username"
              required 
              disabled={isPending}
              placeholder="chef@labellacucina.com" 
              className="block w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 sm:text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
              Password
            </label>
            <input 
              id="password" 
              name="password" 
              type="password"
              autoComplete="current-password"
              required 
              disabled={isPending}
              placeholder="••••••••••••" 
              className="block w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 sm:text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
            />
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            aria-disabled={isPending}
            className="flex w-full justify-center rounded-lg bg-neutral-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? 'Authenticating...' : 'Verify Operational Workspace'}
          </button>
        </form>
      </div>
    </main>
  );
}