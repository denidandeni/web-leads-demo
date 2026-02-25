"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, FileText, LogOut, Menu, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/content", label: "Content", icon: FileText },
    { href: "/admin/contacts", label: "Contacts", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isChecking, setIsChecking] = useState(true);

    const isLoginPage = pathname === "/admin/login";

    useEffect(() => {
        const auth = localStorage.getItem("admin_auth");
        if (auth === "true") {
            setIsAuthenticated(true);
            if (isLoginPage) {
                router.push("/admin");
            }
        } else {
            setIsAuthenticated(false);
            if (!isLoginPage) {
                router.push("/admin/login");
            }
        }
        setIsChecking(false);
    }, [pathname, isLoginPage, router]);

    const handleLogout = () => {
        localStorage.removeItem("admin_auth");
        setIsAuthenticated(false);
        router.push("/admin/login");
    };

    const isActive = (href: string) => {
        if (href === "/admin") return pathname === "/admin";
        return pathname.startsWith(href);
    };

    // Loading State
    if (isChecking || isAuthenticated === null) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <Loader2 className="animate-spin text-amber-700" size={32} />
            </div>
        );
    }

    // Login Page Layout (No Sidebar/Nav)
    if (isLoginPage) {
        return <>{children}</>;
    }

    // Dashboard Layout (Authenticated)
    return (
        <div className="min-h-screen bg-stone-50 flex font-sans text-stone-900">
            {/* Desktop Sidebar */}
            <aside className="w-64 bg-white border-r border-stone-200 flex-col shadow-sm hidden md:flex animate-in slide-in-from-left duration-500">
                <div className="p-6 border-b border-stone-100">
                    <Link href="/admin" className="text-xl font-extrabold text-stone-800 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-white">
                            A
                        </div>
                        <span>Admin<span className="text-amber-700">Panel</span></span>
                    </Link>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-1.5 flex flex-col">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${active
                                    ? 'bg-amber-50 text-amber-800 font-bold'
                                    : 'text-stone-600 hover:bg-amber-50 hover:text-amber-800'
                                    }`}
                            >
                                <Icon size={20} />
                                {item.label}
                            </Link>
                        );
                    })}
                    <div className="flex-1 mt-auto flex flex-col justify-end pt-10">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 w-full transition-all font-medium group"
                        >
                            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                            Logout
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Mobile Top Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-lg border-b border-stone-200 shadow-sm animate-in slide-in-from-top duration-500">
                <div className="flex items-center justify-between px-4 py-3">
                    <Link href="/admin" className="text-lg font-extrabold text-stone-800 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-stone-800 flex items-center justify-center text-white text-sm">
                            A
                        </div>
                        <span>Admin<span className="text-amber-700">Panel</span></span>
                    </Link>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors"
                    >
                        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                {mobileMenuOpen && (
                    <div className="px-4 pb-4 border-t border-stone-100 bg-white animate-in slide-in-from-top-2 duration-200">
                        <nav className="space-y-1 pt-3">
                            {NAV_ITEMS.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${active
                                            ? 'bg-amber-50 text-amber-800 font-bold'
                                            : 'text-stone-600 hover:bg-amber-50 hover:text-amber-800'
                                            }`}
                                    >
                                        <Icon size={20} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 w-full transition-all font-medium"
                            >
                                <LogOut size={20} />
                                Logout
                            </button>
                        </nav>
                    </div>
                )}
            </div>

            {/* Mobile Bottom Nav */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-lg border-t border-stone-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] animate-in slide-in-from-bottom duration-500">
                <nav className="flex items-center justify-around px-2 py-2">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all min-w-[72px] ${active
                                    ? 'text-amber-800 bg-amber-50'
                                    : 'text-stone-400 hover:text-stone-600'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className={`text-[10px] font-bold ${active ? 'text-amber-800' : 'text-stone-400'}`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-[#FBF8F4]">
                <div className="p-4 pt-20 pb-24 md:p-6 md:pt-6 md:pb-10 lg:p-10 max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
