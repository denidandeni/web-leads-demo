export default function AdminDashboardPage() {
    return (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold text-stone-800">Overview</h1>
                <p className="text-stone-500">Welcome back to your dashboard.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white border-2 border-stone-100 rounded-3xl shadow-lg shadow-stone-200/40 relative overflow-hidden group hover:border-amber-300 transition-colors">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-50 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out z-0" />
                    <div className="relative z-10">
                        <p className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-2">Total Contacts</p>
                        <p className="text-4xl font-extrabold text-stone-800 tracking-tight">1,248</p>
                        <div className="mt-4 flex items-center text-sm font-bold text-emerald-600 bg-emerald-50 w-fit px-2.5 py-1 rounded-md">
                            +12% this week
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white border-2 border-stone-100 rounded-3xl shadow-lg shadow-stone-200/40 relative overflow-hidden group hover:border-amber-300 transition-colors">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out z-0" />
                    <div className="relative z-10">
                        <p className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-2">Active Articles</p>
                        <p className="text-4xl font-extrabold text-stone-800 tracking-tight">24</p>
                        <div className="mt-4 flex items-center text-sm font-bold text-emerald-600 bg-emerald-50 w-fit px-2.5 py-1 rounded-md">
                            +3 new published
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white border-2 border-stone-100 rounded-3xl shadow-lg shadow-stone-200/40 relative overflow-hidden group hover:border-amber-300 transition-colors">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-50 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out z-0" />
                    <div className="relative z-10">
                        <p className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-2">Avg. Conversion Rate</p>
                        <p className="text-4xl font-extrabold text-stone-800 tracking-tight">12.5%</p>
                        <div className="mt-4 flex items-center text-sm font-bold text-rose-600 bg-rose-50 w-fit px-2.5 py-1 rounded-md">
                            -1.2% this week
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
