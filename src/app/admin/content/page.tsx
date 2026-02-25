"use client"
import Link from "next/link";
import { Plus, Edit2, Trash2, Search, Filter } from "lucide-react";
import { useState } from "react";

const DEMO_ARTICLES = [
    { id: 1, title: "Understanding Critical Illness Coverage in 2026", tag: "Insurance Info", date: "Feb 20, 2026", status: "Published" },
    { id: 2, title: "How to Build a 6-Month Emergency Fund from Scratch", tag: "Financial Planning", date: "Feb 15, 2026", status: "Published" },
    { id: 3, title: "Term Life vs Whole Life: Which is Right for You?", tag: "Protection", date: "Feb 10, 2026", status: "Draft" },
];

export default function ContentPage() {
    const [search, setSearch] = useState("");

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-stone-800">Content Management</h1>
                    <p className="text-stone-500 mt-1">Manage your articles and resources.</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-700 to-amber-900 text-white font-bold rounded-xl hover:from-amber-800 hover:to-amber-950 transition-all shadow-lg shadow-amber-900/20 active:scale-95">
                    <Plus size={18} />
                    New Article
                </button>
            </div>

            <div className="bg-white border-2 border-stone-100 rounded-3xl shadow-lg shadow-stone-200/40 overflow-hidden flex flex-col">
                <div className="p-4 border-b border-stone-100 flex items-center justify-between gap-4 bg-stone-50/50">
                    <div className="relative flex-1 max-w-md bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden focus-within:border-amber-700 focus-within:ring-1 focus-within:ring-amber-700 transition-all">
                        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                            type="text"
                            placeholder="Search articles..."
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
                                <th className="px-6 py-4">Article Details</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-stone-700">
                            {DEMO_ARTICLES.filter(a => a.title.toLowerCase().includes(search.toLowerCase())).map(article => (
                                <tr key={article.id} className="hover:bg-amber-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-stone-800 truncate max-w-xs">{article.title}</p>
                                        <p className="text-xs text-stone-400 font-medium">ID: #{article.id.toString().padStart(4, '0')}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-stone-100/80 text-stone-600 rounded-md text-xs font-bold border border-stone-200/50">
                                            {article.tag}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-stone-600">{article.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-md text-xs font-bold border ${article.status === 'Published'
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200/50'
                                                : 'bg-amber-50 text-amber-700 border-amber-200/50'
                                            }`}>
                                            {article.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex justify-end gap-2 text-stone-400 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 bg-white border border-stone-200 rounded-lg hover:text-amber-700 hover:border-amber-300 hover:bg-amber-50 transition-all shadow-sm"><Edit2 size={16} /></button>
                                        <button className="p-2 bg-white border border-stone-200 rounded-lg hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all shadow-sm"><Trash2 size={16} /></button>
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
