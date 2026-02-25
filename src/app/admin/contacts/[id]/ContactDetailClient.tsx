"use client"
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, MessageCircle, Phone, Calendar, ShieldCheck, Activity, Copy, CheckCircle2, Navigation, Flame, CheckCircle, Clock, Save, Loader2 } from "lucide-react";
import { useState } from "react";

const LEAD_STAGES = [
    { id: 'new', label: 'New Lead', icon: User },
    { id: 'contacted', label: 'Contacted', icon: MessageCircle },
    { id: 'call_scheduled', label: 'Call Scheduled', icon: Phone },
    { id: 'proposal_sent', label: 'Proposal Sent', icon: Navigation },
    { id: 'converted', label: 'Converted', icon: CheckCircle },
];

const LEAD_TAGS = [
    { id: 'hot', label: 'Hot Lead', color: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100', icon: Flame },
    { id: 'warm', label: 'Warm Lead', color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100', icon: Activity },
    { id: 'cold', label: 'Cold Lead', color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100', icon: Clock },
];

export default function ContactDetailClient() {
    const params = useParams();
    const { id } = params;
    const [copied, setCopied] = useState(false);

    // Interactive State
    const [savedStage, setSavedStage] = useState('contacted');
    const [savedTag, setSavedTag] = useState('hot');
    const [currentStage, setCurrentStage] = useState('contacted');
    const [currentTag, setCurrentTag] = useState('hot');
    const [isSaving, setIsSaving] = useState(false);
    const [justSaved, setJustSaved] = useState(false);

    const hasUnsavedChanges = currentStage !== savedStage || currentTag !== savedTag;

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call to save status updates
        setTimeout(() => {
            setSavedStage(currentStage);
            setSavedTag(currentTag);
            setIsSaving(false);
            setJustSaved(true);
            setTimeout(() => setJustSaved(false), 2000);
        }, 600);
    };

    // Placeholder data
    const contact = {
        id: id,
        name: "Budi Santoso",
        phone: "6281234567890",
        email: "budi.santoso@example.com",
        tag: "High Priority",
        score: 85,
        status: "Fully Protected",
        dateJoined: "Feb 20, 2026 - 14:30 WIB",
        lastActive: "2 Hours ago",
        answers: [
            { q: "How prepared are you for unexpected medical emergencies?", a: "I have comprehensive health and critical illness coverage", p: 20 },
            { q: "If you were unable to work due to illness or injury, how long could you sustain your current lifestyle?", a: "More than 6 months (I have income protection)", p: 20 },
            { q: "Have you planned for your family's financial security in the event of your unexpected passing?", a: "I have a structured life insurance plan tied to my family's needs", p: 20 },
            { q: "How much of your monthly income is currently allocated to insurance and protective assets?", a: "More than 10%", p: 20 },
            { q: "How often do you review and update your financial and insurance portfolio?", a: "Only when changing jobs or major life events", p: 5 },
        ]
    };

    const getMessageUrl = (phone: string, name: string) => {
        const text = encodeURIComponent(`Halo ${name}, saya melihat Anda baru saja menyelesaikan Assessment Kesiapan Finansial dengan skor ${contact.score}. Ada waktu sebentar untuk saya jelaskan detail dari laporan Anda?`);
        return `https://wa.me/${phone}?text=${text}`;
    };

    const copyPhone = () => {
        navigator.clipboard.writeText("+" + contact.phone);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 sm:space-y-8 animate-in slide-in-from-bottom-8 duration-500 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/contacts" className="p-2.5 bg-white border-2 border-stone-200 rounded-xl text-stone-500 hover:border-amber-700 hover:text-amber-800 hover:bg-amber-50 transition-all shadow-sm active:scale-95 group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-stone-800">Lead Details: {id}</h1>
                        <p className="text-sm font-medium text-stone-500">Full analysis report and contact information.</p>
                    </div>
                </div>

                {/* Save Button */}
                <div className="h-11"> {/* Fixed height to prevent layout shift when button appears/disappears */}
                    {(hasUnsavedChanges || justSaved) && (
                        <button
                            onClick={handleSave}
                            disabled={isSaving || justSaved}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm min-w-[150px] justify-center ${justSaved ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-200' :
                                'bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white active:scale-95 shadow-amber-900/20 shadow-lg border-2 border-transparent'
                                }`}
                        >
                            {isSaving ? <Loader2 size={18} className="animate-spin" /> :
                                justSaved ? <CheckCircle2 size={18} /> :
                                    <Save size={18} />}
                            {isSaving ? 'Saving...' : justSaved ? 'Saved!' : 'Save Changes'}
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="border border-stone-200 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl shadow-stone-200/40 space-y-6 sm:space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-600 to-amber-800 z-10" />

                        <div className="flex flex-col items-center text-center space-y-4 pt-2">
                            <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800 rounded-full flex items-center justify-center text-4xl font-extrabold shadow-inner border-[6px] border-white ring-1 ring-stone-100">
                                {contact.name.charAt(0)}
                            </div>
                            <div className="space-y-3 w-full">
                                <h2 className="text-2xl font-extrabold text-stone-800">{contact.name}</h2>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {LEAD_TAGS.map((tag) => {
                                        const isSelected = currentTag === tag.id;
                                        const Icon = tag.icon;
                                        return (
                                            <button
                                                key={tag.id}
                                                onClick={() => setCurrentTag(tag.id)}
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold border transition-all ${isSelected ? tag.color + ' ring-2 ring-offset-1 ring-' + tag.color.split('-')[1] + '-500' : 'bg-stone-50 text-stone-500 border-stone-200 hover:bg-stone-100'} shadow-sm`}
                                            >
                                                <Icon size={14} />
                                                {tag.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-stone-100 space-y-5">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 shrink-0 mt-0.5">
                                    <Phone size={16} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-0.5">WhatsApp</p>
                                    <div className="flex items-center gap-2 group">
                                        <p className="font-bold text-stone-800 group-hover:text-amber-700 transition-colors">+{contact.phone}</p>
                                        <button onClick={copyPhone} className="text-stone-400 hover:text-amber-700 transition-colors bg-white hover:bg-amber-50 p-1 rounded">
                                            {copied ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 shrink-0 mt-0.5">
                                    <User size={16} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-0.5">Email</p>
                                    <p className="font-semibold text-stone-700 text-sm break-all">{contact.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 shrink-0 mt-0.5">
                                    <Calendar size={16} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-0.5">Date Joined</p>
                                    <p className="font-semibold text-stone-700 text-sm">{contact.dateJoined}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 shrink-0 mt-0.5">
                                    <Activity size={16} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-0.5">Last Active</p>
                                    <p className="font-semibold text-stone-700 text-sm">{contact.lastActive}</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <a href={getMessageUrl(contact.phone, contact.name)} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center py-3.5 font-bold text-white bg-[#25D366] rounded-xl transition-all hover:bg-[#128C7E] shadow-lg shadow-emerald-900/10 gap-2 hover:scale-105 active:scale-95">
                                <MessageCircle size={20} />
                                Message via WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    {/* Pipeline / Milestone Progress */}
                    <div className="border border-stone-200 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl shadow-stone-200/40 relative">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-stone-800">Sales Pipeline Stage</h3>
                            <span className="text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-full">{LEAD_STAGES.find(s => s.id === currentStage)?.label}</span>
                        </div>

                        <div className="relative overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            <div className="relative min-w-[420px] sm:min-w-0">
                                {/* Connecting Line */}
                                <div className="absolute top-5 left-0 right-0 h-1 bg-stone-100 -translate-y-1/2 rounded-full z-0" />
                                <div
                                    className="absolute top-5 left-0 h-1 bg-gradient-to-r from-amber-500 to-amber-700 -translate-y-1/2 rounded-full z-0 transition-all duration-500"
                                    style={{ width: `${(LEAD_STAGES.findIndex(s => s.id === currentStage) / (LEAD_STAGES.length - 1)) * 100}%` }}
                                />

                                <div className="relative z-10 flex justify-between">
                                    {LEAD_STAGES.map((stage, idx) => {
                                        const stageIndex = LEAD_STAGES.findIndex(s => s.id === currentStage);
                                        const isCompleted = idx <= stageIndex;
                                        const isCurrent = idx === stageIndex;
                                        const Icon = stage.icon;

                                        return (
                                            <button
                                                key={stage.id}
                                                onClick={() => setCurrentStage(stage.id)}
                                                className="flex flex-col items-center gap-3 group focus:outline-none w-20"
                                            >
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 shadow-sm ${isCurrent ? 'bg-amber-700 border-amber-700 text-white ring-4 ring-amber-100' :
                                                    isCompleted ? 'bg-amber-100 border-amber-500 text-amber-700' :
                                                        'bg-white border-stone-200 text-stone-400 group-hover:border-stone-300'
                                                    }`}>
                                                    <Icon size={18} className={isCompleted && !isCurrent ? 'opacity-80' : ''} />
                                                </div>
                                                <span className={`text-xs font-bold text-center transition-colors ${isCurrent ? 'text-amber-800' :
                                                    isCompleted ? 'text-stone-700' :
                                                        'text-stone-400'
                                                    }`}>
                                                    {stage.label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Score Hero Card */}
                    <div className="border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-lg shadow-emerald-100/50 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 z-0 pointer-events-none" />
                        <div className="relative z-10 space-y-2 text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-800 font-extrabold uppercase tracking-wide text-sm mb-4">
                                <ShieldCheck className="w-5 h-5" />
                                <span>Assessment Result</span>
                            </div>
                            <p className="text-sm font-bold text-emerald-700 bg-emerald-100 w-fit mx-auto sm:mx-0 px-3 py-1 rounded-full mb-2">
                                Level: {contact.status}
                            </p>
                            <h3 className="text-4xl sm:text-5xl font-extrabold text-emerald-900 tracking-tight">{contact.score}<span className="text-xl sm:text-2xl opacity-50 font-medium"> / 100</span></h3>
                            <p className="text-emerald-700/80 font-medium text-sm pt-2 max-w-xs">
                                This user is highly protected but still has room for improvement in overall financial management.
                            </p>
                        </div>

                        <div className="relative z-10 hidden sm:flex items-center justify-center shrink-0">
                            <svg className="w-40 h-40 transform -rotate-90">
                                <circle
                                    cx="80" cy="80" r="70"
                                    fill="transparent" stroke="currentColor" strokeWidth="16" className="text-emerald-100"
                                />
                                <circle
                                    cx="80" cy="80" r="70"
                                    fill="transparent" stroke="currentColor" strokeWidth="16" className="text-emerald-500"
                                    strokeDasharray="439.8" strokeDashoffset={`${439.8 - (439.8 * contact.score) / 100}`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center font-extrabold text-3xl text-emerald-700">
                                {contact.score}%
                            </div>
                        </div>
                    </div>

                    {/* Q&A List */}
                    <div className="border border-stone-200 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl shadow-stone-200/40 space-y-4 sm:space-y-6">
                        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                            <h3 className="text-xl font-bold text-stone-800">Detailed Responses</h3>
                            <span className="text-sm font-bold text-stone-400 bg-stone-100 px-3 py-1 rounded-md">{contact.answers.length} Questions</span>
                        </div>

                        <div className="space-y-4">
                            {contact.answers.map((item, idx) => (
                                <div key={idx} className="bg-stone-50/80 border border-stone-100 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl flex flex-col gap-3 hover:border-amber-200 hover:bg-amber-50/30 transition-colors group">
                                    <div className="flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 group-hover:bg-amber-100 group-hover:text-amber-800 transition-colors">
                                            {idx + 1}
                                        </div>
                                        <p className="text-sm font-bold text-stone-700 leading-relaxed">{item.q}</p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4 pl-0 sm:pl-10 border-t border-stone-200/60 pt-3">
                                        <p className="text-sm font-medium text-stone-600 bg-white px-3 sm:px-4 py-2 rounded-xl shadow-sm border border-stone-100 flex-1 w-full">{item.a}</p>
                                        <span className={`text-xs font-extrabold px-3 py-2 rounded-xl shrink-0 border shadow-sm ${item.p >= 15 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                            item.p >= 10 ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                'bg-red-50 text-red-700 border-red-100'
                                            }`}>
                                            +{item.p} pts
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
