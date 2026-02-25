"use client"
import Link from "next/link";
import { Search, Filter, MessageCircle, Eye, Download } from "lucide-react";
import { useState } from "react";

const DEMO_CONTACTS = [
    { id: "C001", name: "Budi Santoso", phone: "6281234567890", tag: "High Priority", score: 85, date: "2 Hours ago" },
    { id: "C002", name: "Siti Aminah", phone: "6289876543210", tag: "Moderate", score: 55, date: "5 Hours ago" },
    { id: "C003", name: "Andi Wijaya", phone: "6285678901234", tag: "Low Priority", score: 30, date: "1 Day ago" },
    { id: "C004", name: "Rina Marlina", phone: "6281122334455", tag: "High Priority", score: 92, date: "2 Days ago" },
];

export default function ContactsPage() {
    const [search, setSearch] = useState("");

    const getMessageUrl = (phone: string, name: string) => {
        const text = encodeURIComponent(`Halo ${name}, saya melihat Anda baru saja menyelesaikan Assessment Kesiapan Finansial. Ada yang bisa saya bantu diskusikan mengenai hasilnya?`);
        return `https://wa.me/${phone}?text=${text}`;
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-stone-800">Lead Contacts</h1>
                    <p className="text-stone-500 mt-1">Manage and follow up with your leads.</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-stone-200 text-stone-700 font-bold rounded-xl hover:bg-stone-50 hover:border-stone-300 transition-all shadow-sm active:scale-95">
                    <Download size={18} />
                    Export CSV
                </button>
            </div>

            <div className="bg-white border-2 border-stone-100 rounded-3xl shadow-lg shadow-stone-200/40 overflow-hidden flex flex-col">
                <div className="p-4 border-b border-stone-100 flex items-center justify-between gap-4 bg-stone-50/50">
                    <div className="relative flex-1 max-w-md bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden focus-within:border-amber-700 focus-within:ring-1 focus-within:ring-amber-700 transition-all">
                        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                            type="text"
                            placeholder="Search leads by name or phone..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 focus:outline-none text-sm font-medium text-stone-800 placeholder:text-stone-400"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-200 text-stone-700 font-bold rounded-xl hover:bg-stone-50 transition-colors shadow-sm">
                        <Filter size={18} />
                        <span className="hidden sm:inline">Filter</span>
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="bg-stone-50/80 border-b border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-500">
                            <tr>
                                <th className="px-6 py-4">Lead Name</th>
                                <th className="px-6 py-4">WhatsApp</th>
                                <th className="px-6 py-4">Status / Label</th>
                                <th className="px-6 py-4">Score</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-stone-700">
                            {DEMO_CONTACTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)).map(contact => (
                                <tr key={contact.id} className="hover:bg-amber-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-stone-100 to-stone-200 border border-stone-300 flex items-center justify-center text-stone-600 font-bold text-sm">
                                                {contact.name.charAt(0)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-stone-800">{contact.name}</span>
                                                <span className="text-xs font-medium text-stone-400">Added {contact.date}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-stone-600 font-semibold tracking-wide">+{contact.phone}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-md text-xs font-extrabold border ${contact.tag === 'High Priority' ? 'bg-red-50 text-red-700 border-red-200/50' :
                                                contact.tag === 'Moderate' ? 'bg-amber-50 text-amber-700 border-amber-200/50' :
                                                    'bg-emerald-50 text-emerald-700 border-emerald-200/50'
                                            }`}>
                                            {contact.tag}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2 bg-stone-100 rounded-full w-16 overflow-hidden hidden sm:block">
                                                <div className={`h-full rounded-full ${contact.score >= 70 ? 'bg-emerald-500' : contact.score >= 40 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${contact.score}%` }} />
                                            </div>
                                            <span className="font-extrabold text-stone-800">{contact.score}</span>
                                            <span className="text-xs text-stone-400 font-bold">/100</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 flex justify-end gap-2 text-stone-400">
                                        <a
                                            href={getMessageUrl(contact.phone, contact.name)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="Message on WhatsApp"
                                            className="text-stone-500 hover:text-emerald-700 transition-all flex items-center justify-center bg-white border border-stone-200 hover:border-emerald-300 hover:bg-emerald-50 w-9 h-9 rounded-lg shadow-sm active:scale-95"
                                        >
                                            <MessageCircle size={18} />
                                        </a>
                                        <Link
                                            href={`/admin/contacts/${contact.id}`}
                                            title="View Details"
                                            className="text-stone-500 hover:text-amber-800 transition-all flex items-center justify-center bg-white border border-stone-200 hover:border-amber-300 hover:bg-amber-50 w-9 h-9 rounded-lg shadow-sm active:scale-95"
                                        >
                                            <Eye size={18} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
