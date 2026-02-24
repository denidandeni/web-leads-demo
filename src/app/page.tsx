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
      setTimeout(() => setCurrentQuestionIndex((prev) => prev + 1), 300); // 300ms smooth transition
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

    // Simulate Cloudflare Worker calling a 3rd party SMS/WhatsApp API
    // D1 would store the OTP hash and timestamp here.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setOtpLoading(false);
    setOtpSent(true);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");

    if (otpInput === "123456") {
      // Simulate Final Cloudflare Worker processing:
      // 1. Validate OTP against D1 DB
      // 2. Compute final score
      // 3. Send Webhook (e.g., to Google Sheets)

      const totalScore = answers.reduce((acc, curr) => acc + curr.points, 0);
      const payload = {
        lead: { name: leadName, phone: leadPhone },
        score: totalScore,
        answers: answers
      };

      console.log("=== WEBHOOK PAYLOAD (Cloudflare Worker -> Google Sheets) ===");
      console.log(JSON.stringify(payload, null, 2));

      setCurrentStep("RESULT");
    } else {
      setOtpError("Invalid OTP. For demo, use 123456.");
    }
  };

  // --- Helpers ---
  const calculateScore = () => answers.reduce((acc, curr) => acc + curr.points, 0);

  const getCategory = (score: number) => {
    if (score <= 40) return { title: "High Risk", color: "text-slate-500", bg: "bg-slate-100" };
    if (score <= 70) return { title: "Moderate Coverage", color: "text-indigo-500", bg: "bg-indigo-50" };
    return { title: "Fully Protected", color: "text-emerald-500", bg: "bg-emerald-50" };
  };

  // --- Render Functions ---
  const renderLanding = () => (
    <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in duration-700 zoom-in-95">
      <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
        <BarChart size={36} />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-tight">
        Discover Your <br /><span className="text-indigo-600">Financial Security Score</span>
      </h1>
      <p className="text-lg text-slate-500 max-w-md mx-auto">
        Take our 2-minute assessment to identify gaps in your coverage and protect your family's future.
      </p>
      <button
        onClick={handleStart}
        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-indigo-600 rounded-2xl overflow-hidden transition-all hover:bg-indigo-700 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-300"
      >
        <span className="mr-2 text-lg">Start Assessment</span>
        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="pt-8 text-sm text-slate-400 font-medium">
        Powered by the modern Cloudflare Stack
      </div>
    </div>
  );

  const renderAssessment = () => {
    const question = QUESTIONS[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / QUESTIONS.length) * 100;

    return (
      <div className="w-full max-w-xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500">
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-semibold text-slate-500">
            <span>Question {currentQuestionIndex + 1} of {QUESTIONS.length}</span>
            <span className="text-indigo-600">{Math.round(progress)}% Completed</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 leading-relaxed">
            {question.text}
          </h2>
          <div className="space-y-3">
            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-slate-100 text-left text-slate-700 font-medium transition-all hover:border-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 active:scale-[0.98]"
              >
                <span>{opt.text}</span>
                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderLeadCapture = () => (
    <div className="w-full max-w-md mx-auto animate-in slide-in-from-bottom-8 duration-500">
      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-6 text-center">
        <div className="w-16 h-16 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center mx-auto mb-2">
          <ShieldCheck size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Almost there!</h2>
        <p className="text-slate-500">Enter your details to receive your personalized protection report and score.</p>

        <form onSubmit={handleLeadSubmit} className="space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
            <input
              type="text"
              required
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors text-slate-800 font-medium"
              placeholder="e.g. Jane Doe"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 ml-1">WhatsApp Number</label>
            <input
              type="tel"
              required
              value={leadPhone}
              onChange={(e) => setLeadPhone(e.target.value)}
              className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors text-slate-800 font-medium"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center py-4 font-bold text-white bg-indigo-600 rounded-xl transition-all hover:bg-indigo-700 active:scale-[0.98] mt-2"
          >
            Continue to Verification
          </button>
        </form>
      </div>
    </div>
  );

  const renderOtpVerification = () => (
    <div className="w-full max-w-md mx-auto animate-in zoom-in-95 duration-500">
      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">Verify Your Number</h2>
        <p className="text-slate-500 text-sm">
          We need to verify <strong>{leadPhone}</strong> to ensure secure delivery of your results.
        </p>

        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            disabled={otpLoading}
            className="w-full flex items-center justify-center py-4 font-bold text-indigo-600 bg-indigo-50 border-2 border-indigo-100 rounded-xl transition-all hover:bg-indigo-100 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
          >
            {otpLoading ? (
              <><Loader2 className="animate-spin mr-2 w-5 h-5" /> Sending OTP via Cloudflare Worker...</>
            ) : (
              "Send OTP via WhatsApp"
            )}
          </button>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in duration-300">
            <div className="space-y-1.5 text-left">
              <label className="text-sm font-bold text-slate-700 ml-1">6-Digit Code</label>
              <input
                type="text"
                maxLength={6}
                required
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))} // only numbers
                className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-indigo-600 focus:bg-white transition-colors text-slate-800 font-bold tracking-widest text-center text-xl"
                placeholder="123456"
              />
              {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}
              <p className="text-xs text-slate-400 text-center mt-2">Demo usage: enter 123456.</p>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center py-4 font-bold text-white bg-indigo-600 rounded-xl transition-all hover:bg-indigo-700 active:scale-[0.98]"
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
          <div className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/40 border-2 border-slate-100 flex flex-col justify-between group transition-all hover:border-indigo-300 hover:shadow-indigo-100">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                  <BarChart className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Article</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2 leading-snug">The Ultimate Guide to {category.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-2">Learn the exact strategies needed to optimize your insurance portfolio based on your current setup.</p>
            </div>
            <button className="mt-6 flex items-center text-sm font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors">
              Read Article <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Video Placeholder */}
          <div className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/40 border-2 border-slate-100 flex flex-col justify-between group transition-all hover:border-red-300 hover:shadow-red-100">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-50 rounded-xl text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                  <PlayCircle className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">YouTube Video</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2 leading-snug">Case Study: Reaching {category.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-2">Watch how top financial planners structure protective assets for clients just like you.</p>
            </div>
            <button className="mt-6 flex items-center text-sm font-bold text-red-600 group-hover:text-red-700 transition-colors">
              Watch Now <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Audio Placeholder */}
          <div className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/40 border-2 border-slate-100 flex flex-col justify-between group transition-all hover:border-emerald-300 hover:shadow-emerald-100">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Audio / Podcast</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2 leading-snug">Expert Insights on {category.title}</h3>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">Listen to our exclusive podcast episode breaking down insurance policies for your specific tier.</p>
            </div>

            <audio controls className="w-full h-10 custom-audio-player opacity-80 group-hover:opacity-100 transition-opacity">
              <source src="/demo-audio.mp3" type="audio/mpeg" />
              Unsupported
            </audio>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-indigo-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-800 to-slate-900 z-0 opacity-50" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20 z-0" />

          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-bold">Ready to secure your future?</h2>
            <p className="text-indigo-200 max-w-md mx-auto">
              Our experts can help you upgrade from {category.title} to a fully protected financial ecosystem.
            </p>
            <a
              href={`https://wa.me/15550000000?text=Hi, I scored ${score} (${category.title}) on the assessment. I'd like to consult.`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 font-bold text-indigo-900 bg-emerald-400 rounded-xl transition-all hover:bg-emerald-300 hover:scale-105 shadow-xl shadow-emerald-500/20"
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
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-indigo-200 selection:text-indigo-900 flex flex-col">
      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto">
        <div className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <BarChart size={18} />
          </div>
          Growth<span className="text-indigo-600">Stack</span>
        </div>
        <div className="text-xs font-semibold text-slate-400 border border-slate-200 px-3 py-1 rounded-full">
          Cloudflare Stack Demo
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
