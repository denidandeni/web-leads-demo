import Link from "next/link";
import { LayoutDashboard, Users, FileText, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-stone-50 flex font-sans text-stone-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-stone-200 flex flex-col shadow-sm hidden md:flex">
                <div className="p-6 border-b border-stone-100">
                    <Link href="/admin" className="text-xl font-extrabold text-stone-800 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-white">
                            A
                        </div>
                        <span>Admin<span className="text-amber-700">Panel</span></span>
                    </Link>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-1.5 flex flex-col">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-600 hover:bg-amber-50 hover:text-amber-800 transition-all font-medium">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link href="/admin/content" className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-600 hover:bg-amber-50 hover:text-amber-800 transition-all font-medium">
                        <FileText size={20} />
                        Content
                    </Link>
                    <Link href="/admin/contacts" className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-600 hover:bg-amber-50 hover:text-amber-800 transition-all font-medium">
                        <Users size={20} />
                        Contacts
                    </Link>
                    <div className="flex-1 mt-auto flex flex-col justify-end pt-10">
                        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 w-full transition-all font-medium group">
                            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                            Logout
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-[#FBF8F4]">
                <div className="p-6 md:p-10 max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
