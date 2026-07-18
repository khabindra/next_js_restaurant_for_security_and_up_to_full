// // app/(admin)/admin/page.tsx
// export default async function AdminDashboard() {
//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-3xl font-serif font-light text-neutral-900">Welcome Back, Chef</h1>
//         <p className="text-sm text-neutral-500 mt-1">Here is the current operational status of your dining room room and systems.</p>
//       </div>

//       <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="p-6 border border-neutral-200/60 rounded-xl bg-white shadow-sm transition-all hover:shadow-md">
//           <h3 className="font-medium text-neutral-900">Reservations</h3>
//           <p className="text-sm text-neutral-500 mt-2">View active floor seating charts and guest arrangements.</p>
//         </div>
//         <div className="p-6 border border-neutral-200/60 rounded-xl bg-white shadow-sm transition-all hover:shadow-md">
//           <h3 className="font-medium text-neutral-900">Menu Administration</h3>
//           <p className="text-sm text-neutral-500 mt-2">Adjust active daily seasonal dishes and pricing tables instantly.</p>
//         </div>
//         <div className="p-6 border border-neutral-200/60 rounded-xl bg-white shadow-sm transition-all hover:shadow-md">
//           <h3 className="font-medium text-neutral-900">System Parameters</h3>
//           <p className="text-sm text-neutral-500 mt-2">Modify hours of operation or staff shift management properties.</p>
//         </div>
//       </section>
//     </div>
//   );
// }




// app/(admin)/admin/page.tsx
import Link from 'next/link';

export default async function AdminDashboard() {

  const modules = [
    {
      title: "Reservations",
      desc: "View active floor seating charts, manage guest arrangements, and approve incoming booking requests.",
      href: "/admin/reservation"
    },
    {
      title: "Menu Administration",
      desc: "Adjust active daily seasonal dishes, update pricing tables, and manage category structures instantly.",
      href: "/admin/menu"
    },
    {
      title: "Gallery Management",
      desc: "Curate the visual portfolio. Upload new ambiance shots, organize dish photography, and archive old assets.",
      href: "/admin/gallery"
    },
    {
      title: "Contact Inquiries",
      desc: "Review and respond to guest messages, private event requests, and general feedback submissions.",
      href: "/admin/contacts"
    },
    {
      title: "Change Password",
      desc: "Update the current password",
      href: "/admin/settings"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 md:py-16">
      
      {/* HEADER */}
      <div className="mb-16">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400 mb-4">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <h1 className="text-3xl md:text-4xl font-serif font-extralight tracking-tight text-stone-900 mb-3">
          Welcome back, Admin
        </h1>
        <p className="text-sm text-stone-500 font-light max-w-xl">
          Here is the current operational status of your dining room and digital systems. Everything is calm and orderly.
        </p>
      </div>

      {/* OPERATIONAL MODULES */}
      <section>
        <div className="flex items-center justify-between mb-8 border-b border-black/10 pb-4">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-500">
            Operational Modules
          </h2>
          <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400">
            System Status: <span className="text-green-700">Online</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/5 border border-black/5">
          {modules.map((module) => (
            <Link 
              key={module.title} 
              href={module.href}
              className="group relative bg-[#f9f8f6] hover:bg-white transition-colors duration-300 p-8 md:p-10 flex flex-col justify-between min-h-[220px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-inset"
            >
              <div>
                <h3 className="text-xl font-serif font-normal text-stone-900 tracking-tight mb-4">
                  {module.title}
                </h3>
                <p className="text-sm text-stone-500 font-light leading-[1.8] max-w-sm">
                  {module.desc}
                </p>
              </div>
              
              <div className="mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-stone-900 self-start">
                <span className="border-b border-stone-300 group-hover:border-stone-900 pb-1 transition-colors duration-300">
                  Manage
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}