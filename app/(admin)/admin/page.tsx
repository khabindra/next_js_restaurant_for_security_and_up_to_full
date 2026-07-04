// app/(admin)/admin/page.tsx
export default async function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-light text-neutral-900">Welcome Back, Chef</h1>
        <p className="text-sm text-neutral-500 mt-1">Here is the current operational status of your dining room room and systems.</p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border border-neutral-200/60 rounded-xl bg-white shadow-sm transition-all hover:shadow-md">
          <h3 className="font-medium text-neutral-900">Reservations</h3>
          <p className="text-sm text-neutral-500 mt-2">View active floor seating charts and guest arrangements.</p>
        </div>
        <div className="p-6 border border-neutral-200/60 rounded-xl bg-white shadow-sm transition-all hover:shadow-md">
          <h3 className="font-medium text-neutral-900">Menu Administration</h3>
          <p className="text-sm text-neutral-500 mt-2">Adjust active daily seasonal dishes and pricing tables instantly.</p>
        </div>
        <div className="p-6 border border-neutral-200/60 rounded-xl bg-white shadow-sm transition-all hover:shadow-md">
          <h3 className="font-medium text-neutral-900">System Parameters</h3>
          <p className="text-sm text-neutral-500 mt-2">Modify hours of operation or staff shift management properties.</p>
        </div>
      </section>
    </div>
  );
}