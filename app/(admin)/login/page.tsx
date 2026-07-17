// 'use client';

// import { useState, useTransition } from 'react'; 
// import { login, type ActionResponse } from "@/app/(admin)/actions/auth/actions";

// export default function LoginPage() {
//   const [isPending, startTransition] = useTransition();
//   const [state, setState] = useState<ActionResponse>({ success: false, error: null });

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
    
//     setState({ success: false, error: null });
    
//     startTransition(async () => {
//       const result = await login(formData);
      
//       if (result && !result.success) {
//         setState(result);
//       }
//     });
//   };

//   return (
//     <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
//       <div className="w-full max-w-md space-y-8 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
//         <div className="text-center">
//           <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-white font-serif text-xl font-bold mb-4">
//             L
//           </div>
//           <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Bistro Portal</h1>
//           <p className="mt-2 text-sm text-neutral-500 font-light">Authorized administration check access protocol.</p>
//         </div>

//         {state.error && (
//           <div 
//             role="alert" 
//             aria-live="polite"
//             className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700 animate-in fade-in zoom-in-95 duration-150"
//           >
//             <div className="flex items-center gap-2.5">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 text-red-500 flex-shrink-0">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
//               </svg>
//               <span className="font-medium">{state.error}</span>
//             </div>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
          
//           {/* 🍯 HONEYPOT FIELD: Hidden from humans, tempting for bots */}
//           <div className="sr-only" aria-hidden="true">
//             <label htmlFor="company">Leave this field blank</label>
//             <input 
//               id="company" 
//               name="company" 
//               type="text" 
//               tabIndex={-1} 
//               autoComplete="off" 
//             />
//           </div>

//           <div className="space-y-1">
//             <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
//               Owner Email
//             </label>
//             <input 
//               id="email" 
//               name="email" 
//               type="email" 
//               autoComplete="username"
//               required 
//               disabled={isPending}
//               placeholder="chef@labellacucina.com" 
//               className="block w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 sm:text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
//             />
//           </div>

//           <div className="space-y-1">
//             <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
//               Password
//             </label>
//             <input 
//               id="password" 
//               name="password" 
//               type="password"
//               autoComplete="current-password"
//               required 
//               disabled={isPending}
//               placeholder="••••••••••••" 
//               className="block w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-neutral-900 placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 sm:text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
//             />
//           </div>

//           <button 
//             type="submit" 
//             disabled={isPending}
//             aria-disabled={isPending}
//             className="flex w-full justify-center rounded-lg bg-neutral-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
//           >
//             {isPending ? 'Authenticating...' : 'Verify Operational Workspace'}
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
    <main className="relative flex min-h-screen items-center justify-center bg-[#f9f8f6] px-6 py-24">
      <div className="w-full max-w-md">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400 mb-6">
            Secure Access
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-extralight tracking-tight text-stone-900 mb-4">
            Administration Portal
          </h1>
          <p className="text-sm text-stone-500 font-light max-w-xs mx-auto leading-relaxed">
            Authorized personnel only. Please verify your credentials to proceed.
          </p>
        </div>

        {/* ERROR STATE */}
        {state.error && (
          <div 
            role="alert" 
            aria-live="polite"
            className="mb-8 border-l-2 border-red-500 bg-red-50/50 px-5 py-4 text-sm text-red-900 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 text-red-500 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <span className="font-light">{state.error}</span>
            </div>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* HONEYPOT FIELD */}
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

          <div className="space-y-3">
            <label htmlFor="email" className="block text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
              Owner Email
            </label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              autoComplete="username"
              required 
              disabled={isPending}
              placeholder="chef@kingsnoodles.com" 
              className="block w-full bg-transparent border-b border-stone-300 py-3 text-base text-stone-900 placeholder-stone-300 focus:border-stone-900 focus:outline-none transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="password" className="block text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
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
              className="block w-full bg-transparent border-b border-stone-300 py-3 text-base text-stone-900 placeholder-stone-300 focus:border-stone-900 focus:outline-none transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
            />
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            aria-disabled={isPending}
            className="flex w-full justify-center items-center gap-3 bg-stone-900 px-8 py-5 text-[11px] font-medium uppercase tracking-[0.25em] text-white hover:bg-stone-800 active:scale-[0.98] transition-all duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authenticating...
              </>
            ) : (
              'Enter Workspace'
            )}
          </button>
        </form>
      </div>
    </main>
  );
}