"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  PlayCircle,
  MessageCircle,
  ShieldCheck,
  Loader2,
  BarChart
} from "lucide-react";

// --- Types & Data ---

type Step =
  | "LANDING"
  | "ASSESSMENT"
  | "LEAD_CAPTURE"
  | "OTP_VERIFICATION"
  | "RESULT";

type Question = {
  id: number;
  text: string;
  options: { text: string; points: number }[];
};

const ARTICLES = [
  {
    id: 1,
    title: "Understanding Critical Illness Coverage in 2026",
    tag: "Insurance Info",
    date: "Feb 20, 2026",
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    title: "How to Build a 6-Month Emergency Fund from Scratch",
    tag: "Financial Planning",
    date: "Feb 15, 2026",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    title: "Term Life vs Whole Life: Which is Right for You?",
    tag: "Protection",
    date: "Feb 10, 2026",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 4,
    title: "5 Common Mistakes When Planning Your Estate",
    tag: "Wealth Management",
    date: "Feb 05, 2026",
    imageUrl: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "How prepared are you for unexpected medical emergencies?",
    options: [
      { text: "I rely entirely on personal savings", points: 5 },
      { text: "I rely on my employer's basic health coverage", points: 10 },
      { text: "I have personal health insurance with moderate limits", points: 15 },
      { text: "I have comprehensive health and critical illness coverage", points: 20 },
    ],
  },
  {
    id: 2,
    text: "If you were unable to work due to illness or injury, how long could you sustain your current lifestyle?",
    options: [
      { text: "Less than 1 month", points: 0 },
      { text: "1 to 3 months", points: 5 },
      { text: "3 to 6 months", points: 10 },
      { text: "More than 6 months (I have income protection)", points: 20 },
    ],
  },
  {
    id: 3,
    text: "Have you planned for your family's financial security in the event of your unexpected passing?",
    options: [
      { text: "I haven't thought about it yet", points: 0 },
      { text: "I have some savings set aside", points: 5 },
      { text: "I have a basic term life insurance policy", points: 15 },
      { text: "I have a structured life insurance plan tied to my family's needs", points: 20 },
    ],
  },
  {
    id: 4,
    text: "How much of your monthly income is currently allocated to insurance and protective assets?",
    options: [
      { text: "0% - None currently", points: 5 },
      { text: "1% - 5%", points: 10 },
      { text: "6% - 10%", points: 15 },
      { text: "More than 10%", points: 20 },
    ],
  },
  {
    id: 5,
    text: "How often do you review and update your financial and insurance portfolio?",
    options: [
      { text: "I've never reviewed it", points: 0 },
      { text: "Only when changing jobs or major life events", points: 5 },
      { text: "Every few years", points: 15 },
      { text: "Annually with a professional advisor", points: 20 },
    ],
  },
];

export default function AssessmentApp() {
  // --- State ---
  const [currentStep, setCurrentStep] = useState<Step>("LANDING");

  // Assessment State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; points: number; text: string }[]>([]);

  // Lead State
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");

  // OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");

  // --- Handlers ---
  const handleStart = () => {
    setCurrentStep("ASSESSMENT");
  };

  const handleAnswer = (option: { text: string; points: number }) => {
    const newAnswers = [
      ...answers,
      {
        questionId: QUESTIONS[currentQuestionIndex].id,
        points: option.points,
        text: option.text
      }
    ];
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQuestionIndex((prev) => prev + 1), 300);
    } else {
      setTimeout(() => setCurrentStep("LEAD_CAPTURE"), 300);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;
    setCurrentStep("OTP_VERIFICATION");
  };

  const handleSendOtp = async () => {
    setOtpLoading(true);
    setOtpError("");

    // Simulate backend processing calling a 3rd party SMS/WhatsApp API
    // Leads database would store the OTP hash and timestamp here.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setOtpLoading(false);
    setOtpSent(true);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");

    if (otpInput === "123456") {
      // Simulate Final backend processing:
      // 1. Validate OTP against Database
      // 2. Compute final score
      // 3. Send Webhook (e.g., to CRM or Spreadsheet)

      const totalScore = answers.reduce((acc, curr) => acc + curr.points, 0);
      const payload = {
        lead: { name: leadName, phone: leadPhone },
        score: totalScore,
        answers: answers
      };

      console.log("=== WEBHOOK PAYLOAD (Backend -> CRM/Sheets) ===");
      console.log(JSON.stringify(payload, null, 2));

      setCurrentStep("RESULT");
    } else {
      setOtpError("Invalid OTP. For demo, use 123456.");
    }
  };

  // --- Helpers ---
  const calculateScore = () => answers.reduce((acc, curr) => acc + curr.points, 0);

  const getCategory = (score: number) => {
    if (score <= 40) return { title: "High Risk", color: "text-red-700", bg: "bg-red-50" };
    if (score <= 70) return { title: "Moderate Coverage", color: "text-amber-700", bg: "bg-amber-50" };
    return { title: "Fully Protected", color: "text-emerald-700", bg: "bg-emerald-50" };
  };

  // --- Render Functions ---
  const renderLanding = () => (
    <div className="flex flex-col items-center animate-in fade-in duration-700 zoom-in-95 w-full space-y-20">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto px-6 pt-4">
        {/* Decorative Islamic Pattern */}
        <div className="w-24 h-24 relative flex items-center justify-center mb-2">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full opacity-10 animate-pulse" />
          <div className="absolute inset-2 border-2 border-amber-600/30 rounded-full" />
          <div className="relative w-14 h-14 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full flex items-center justify-center text-white shadow-lg shadow-amber-900/20">
            <ShieldCheck size={28} />
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-bold uppercase tracking-[0.25em] text-amber-700/70">Assessment Kesiapan Finansial</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-800 tracking-tight leading-tight">
            Discover Your <br /><span className="text-amber-800">Financial Security Score</span>
          </h1>
        </div>
        <p className="text-lg text-stone-500 max-w-md mx-auto leading-relaxed">
          Take our 2-minute assessment to identify gaps in your coverage and protect your family&apos;s future.
        </p>
        <button
          onClick={handleStart}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-gradient-to-r from-amber-700 to-amber-900 rounded-2xl overflow-hidden transition-all hover:from-amber-800 hover:to-amber-950 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-lg shadow-amber-900/20 w-fit mx-auto"
        >
          <span className="mr-2 text-lg">Start Assessment</span>
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="pt-8 text-sm text-stone-400 font-medium italic">
          For Demo Purposes Only
        </div>
      </div>

      {/* Articles Carousel Section */}
      <div className="w-full max-w-5xl mx-auto px-6 pb-12 flex flex-col space-y-6 text-left">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-stone-800">Latest Insights</h2>
          <button className="text-sm font-bold text-amber-700 hover:text-amber-800 flex items-center group">
            View All <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Carousel Container */}
        <div className="flex overflow-x-auto pb-6 -mx-6 px-6 sm:mx-0 sm:px-0 gap-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {ARTICLES.map((article) => (
            <div key={article.id} className="min-w-[280px] w-[280px] sm:min-w-[320px] sm:w-[320px] bg-white rounded-2xl shadow-lg shadow-stone-200/40 border border-stone-100 flex flex-col overflow-hidden snap-start group cursor-pointer hover:border-amber-300 hover:shadow-amber-100 transition-all flex-shrink-0">
              <div className="h-44 w-full overflow-hidden bg-stone-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">{article.tag}</span>
                  <span className="text-xs text-stone-400 font-medium">{article.date}</span>
                </div>
                <h3 className="font-bold text-stone-800 text-lg leading-snug group-hover:text-amber-800 transition-colors line-clamp-2">{article.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAssessment = () => {
    const question = QUESTIONS[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / QUESTIONS.length) * 100;

    return (
      <div className="w-full max-w-xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500">
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-semibold text-stone-500">
            <span>Question {currentQuestionIndex + 1} of {QUESTIONS.length}</span>
            <span className="text-amber-700">{Math.round(progress)}% Completed</span>
          </div>
          <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-600 to-amber-800 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-stone-200/50 border border-stone-100">
          <h2 className="text-2xl font-bold text-stone-800 mb-8 leading-relaxed">
            {question.text}
          </h2>
          <div className="space-y-3">
            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-stone-100 text-left text-stone-700 font-medium transition-all hover:border-amber-700 hover:bg-amber-50 hover:text-amber-800 active:scale-[0.98]"
              >
                <span>{opt.text}</span>
                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-700" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderLeadCapture = () => (
    <div className="w-full max-w-md mx-auto animate-in slide-in-from-bottom-8 duration-500">
      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-stone-200/50 border border-stone-100 space-y-6 text-center">
        <div className="w-16 h-16 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-2">
          <ShieldCheck size={32} />
        </div>
        <h2 className="text-2xl font-bold text-stone-800">Almost there!</h2>
        <p className="text-stone-500">Enter your details to receive your personalized protection report and score.</p>

        <form onSubmit={handleLeadSubmit} className="space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-stone-700 ml-1">Full Name</label>
            <input
              type="text"
              required
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              className="w-full px-5 py-3.5 bg-stone-50 border-2 border-stone-100 rounded-xl focus:outline-none focus:border-amber-700 focus:bg-white transition-colors text-stone-800 font-medium"
              placeholder="e.g. Jane Doe"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-stone-700 ml-1">WhatsApp Number</label>
            <input
              type="tel"
              required
              value={leadPhone}
              onChange={(e) => setLeadPhone(e.target.value)}
              className="w-full px-5 py-3.5 bg-stone-50 border-2 border-stone-100 rounded-xl focus:outline-none focus:border-amber-700 focus:bg-white transition-colors text-stone-800 font-medium"
              placeholder="+62 812 3456 7890"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center py-4 font-bold text-white bg-gradient-to-r from-amber-700 to-amber-900 rounded-xl transition-all hover:from-amber-800 hover:to-amber-950 active:scale-[0.98] mt-2 shadow-lg shadow-amber-900/20"
          >
            Continue to Verification
          </button>
        </form>
      </div>
    </div>
  );

  const renderOtpVerification = () => (
    <div className="w-full max-w-md mx-auto animate-in zoom-in-95 duration-500">
      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-stone-200/50 border border-stone-100 text-center space-y-6">
        <h2 className="text-2xl font-bold text-stone-800">Verify Your Number</h2>
        <p className="text-stone-500 text-sm">
          We need to verify <strong>{leadPhone}</strong> to ensure secure delivery of your results.
        </p>

        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            disabled={otpLoading}
            className="w-full flex items-center justify-center py-4 font-bold text-amber-800 bg-amber-50 border-2 border-amber-100 rounded-xl transition-all hover:bg-amber-100 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
          >
            {otpLoading ? (
              <><Loader2 className="animate-spin mr-2 w-5 h-5" /> Sending OTP...</>
            ) : (
              "Send OTP via WhatsApp"
            )}
          </button>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in duration-300">
            <div className="space-y-1.5 text-left">
              <label className="text-sm font-bold text-stone-700 ml-1">6-Digit Code</label>
              <input
                type="text"
                maxLength={6}
                required
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                className="w-full px-5 py-4 bg-stone-50 border-2 border-stone-100 rounded-xl focus:outline-none focus:border-amber-700 focus:bg-white transition-colors text-stone-800 font-bold tracking-widest text-center text-xl"
                placeholder="123456"
              />
              {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}
              <p className="text-xs text-stone-400 text-center mt-2">Demo usage: enter 123456.</p>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center py-4 font-bold text-white bg-gradient-to-r from-amber-700 to-amber-900 rounded-xl transition-all hover:from-amber-800 hover:to-amber-950 active:scale-[0.98] shadow-lg shadow-amber-900/20"
            >
              Verify & See Results
            </button>
          </form>
        )}
      </div>
    </div>
  );

  const renderResult = () => {
    const score = calculateScore();
    const category = getCategory(score);

    return (
      <div className="w-full max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom-12 duration-700">

        {/* Score Card */}
        <div className={`rounded-3xl p-8 text-center shadow-xl border border-white/20 relative overflow-hidden ${category.bg} ${category.color}`}>
          <div className="relative z-10 flex flex-col items-center">
            <CheckCircle2 className="w-16 h-16 mb-4 opacity-90" />
            <div className="text-sm font-bold uppercase tracking-wider mb-2 opacity-80">Final Assessment Score</div>
            <div className="text-6xl font-extrabold mb-2">{score}<span className="text-2xl opacity-70"> / 100</span></div>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 font-bold text-sm">
              Level: {category.title}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Article Placeholder */}
          <div className="bg-white p-6 rounded-2xl shadow-lg shadow-stone-200/40 border-2 border-stone-100 flex flex-col justify-between group transition-all hover:border-amber-400 hover:shadow-amber-100">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-amber-50 rounded-xl text-amber-700 transition-colors group-hover:bg-amber-700 group-hover:text-white">
                  <BarChart className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Article</span>
              </div>
              <h3 className="font-bold text-stone-800 mb-2 leading-snug">The Ultimate Guide to {category.title}</h3>
              <p className="text-sm text-stone-500 line-clamp-2">Learn the exact strategies needed to optimize your insurance portfolio based on your current setup.</p>
            </div>
            <button className="mt-6 flex items-center text-sm font-bold text-amber-700 group-hover:text-amber-800 transition-colors">
              Read Article <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Video Placeholder */}
          <div className="bg-white p-6 rounded-2xl shadow-lg shadow-stone-200/40 border-2 border-stone-100 flex flex-col justify-between group transition-all hover:border-red-300 hover:shadow-red-100">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-50 rounded-xl text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                  <PlayCircle className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">YouTube Video</span>
              </div>
              <h3 className="font-bold text-stone-800 mb-2 leading-snug">Case Study: Reaching {category.title}</h3>
              <p className="text-sm text-stone-500 line-clamp-2">Watch how top financial planners structure protective assets for clients just like you.</p>
            </div>
            <button className="mt-6 flex items-center text-sm font-bold text-red-600 group-hover:text-red-700 transition-colors">
              Watch Now <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Audio Placeholder */}
          <div className="bg-white p-6 rounded-2xl shadow-lg shadow-stone-200/40 border-2 border-stone-100 flex flex-col justify-between group transition-all hover:border-emerald-300 hover:shadow-emerald-100">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Audio / Podcast</span>
              </div>
              <h3 className="font-bold text-stone-800 mb-2 leading-snug">Expert Insights on {category.title}</h3>
              <p className="text-sm text-stone-500 mb-4 line-clamp-2">Listen to our exclusive podcast episode breaking down insurance policies for your specific tier.</p>
            </div>

            <audio controls className="w-full h-10 custom-audio-player opacity-80 group-hover:opacity-100 transition-opacity">
              <source src="/demo-audio.mp3" type="audio/mpeg" />
              Unsupported
            </audio>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-amber-800 to-stone-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-800/50 to-stone-900/80 z-0" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-600 rounded-full blur-3xl opacity-15 z-0" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-amber-500 rounded-full blur-3xl opacity-10 z-0" />

          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-bold">Ready to secure your future?</h2>
            <p className="text-amber-200 max-w-md mx-auto">
              Our experts can help you upgrade from {category.title} to a fully protected financial ecosystem.
            </p>
            <a
              href={`https://wa.me/15550000000?text=Hi, I scored ${score} (${category.title}) on the assessment. I'd like to consult.`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 font-bold text-amber-900 bg-amber-300 rounded-xl transition-all hover:bg-amber-200 hover:scale-105 shadow-xl shadow-amber-900/30"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Discuss via WhatsApp
            </a>
          </div>
        </div>

      </div>
    );
  };

  // --- Main Layout ---
  return (
    <div className="min-h-screen bg-[#FBF8F4] font-sans selection:bg-amber-200 selection:text-amber-900 flex flex-col">
      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
        <div className="text-xl font-extrabold text-stone-800 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-white shadow-md shadow-amber-900/20">
            <ShieldCheck size={18} />
          </div>
          <span>SIAP<span className="text-amber-700">&</span>TENANG</span>
        </div>
        <div className="text-xs font-semibold text-stone-400 border border-stone-200 px-3 py-1 rounded-full">
          For Demo Purposes Only
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-6 pb-20">
        {currentStep === "LANDING" && renderLanding()}
        {currentStep === "ASSESSMENT" && renderAssessment()}
        {currentStep === "LEAD_CAPTURE" && renderLeadCapture()}
        {currentStep === "OTP_VERIFICATION" && renderOtpVerification()}
        {currentStep === "RESULT" && renderResult()}
      </main>
    </div>
  );
}
