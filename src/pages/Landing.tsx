import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  GitBranch, MessageSquare, Brain, Zap,
  ArrowRight, Check, Star, ChevronRight, Sparkles
} from "lucide-react";

export function Landing() {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (error) throw error;
        setError("Check your email to confirm your account!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/dashboard");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };



  const features = [
    {
      icon: GitBranch,
      title: "Branch Any Message",
      description: "Fork conversations at any point to explore alternative directions without losing context.",
      color: "emerald",
    },
    {
      icon: Brain,
      title: "Full Context Memory",
      description: "Vector-powered memory ensures the AI always remembers what matters across all branches.",
      color: "purple",
    },
    {
      icon: MessageSquare,
      title: "Seamless Switching",
      description: "Jump between branches instantly. Each branch maintains its own conversation thread.",
      color: "blue",
    },
    {
      icon: Zap,
      title: "Smart Context Building",
      description: "Pinned messages, vector search, and branch hierarchy create perfect context windows.",
      color: "amber",
    },
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "3 conversations",
        "10 branches total",
        "Basic memory",
        "Community support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$12",
      period: "/month",
      features: [
        "Unlimited conversations",
        "Unlimited branches",
        "Full vector memory",
        "Priority LLM",
        "Export conversations",
        "Priority support",
      ],
      cta: "Upgrade to Pro",
      popular: true,
    },
    {
      name: "Team",
      price: "$39",
      period: "/month",
      features: [
        "Everything in Pro",
        "5 team members",
        "Shared workspace",
        "Admin controls",
        "API access",
        "Dedicated support",
      ],
      cta: "Start Team Trial",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* ============================================================
          NAVBAR
          ============================================================ */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#1f1f1f]/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center">
              <img src="/arbor.svg" alt="Arbor Logo" className="h-full w-full object-contain" />
            </div>
            <span className="text-lg font-bold text-white">
              Arbor
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-[#888888] hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-[#888888] hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={() => { setShowAuth(true); setIsSignUp(false); }}
              className="btn-ghost text-sm"
            >
              Sign In
            </button>
            <button
              onClick={() => { setShowAuth(true); setIsSignUp(true); }}
              className="btn-primary text-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Background effects */}
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#1a1a1a] rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-[#1a1a1a]/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
                          bg-[#1a1a1a] border border-[#2a2a2a] mb-8 animate-fade-in">
            <Sparkles size={14} className="text-[#a0a0a0]" />
            <span className="text-sm text-[#a0a0a0] font-medium">Git for AI Conversations</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
            Branch your ChatGPT conversations
            <br />
            <span className="gradient-text">like Git</span>
          </h1>

          <p className="text-lg md:text-xl text-[#888888] max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up"
             style={{ animationDelay: "0.1s" }}>
            Fork any conversation at any point. Explore different directions.
            Switch between branches. All with full context preserved.
          </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
                style={{ animationDelay: "0.2s" }}>
              <a href="https://chrome.google.com/webstore" target="_blank" rel="noreferrer"
                className="btn-primary text-base !px-8 !py-3 flex items-center gap-2 group bg-white text-black hover:bg-surface-200"
              >
                Add to Chrome — It's Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>

            </div>

          {/* Visual preview / Demo GIF Placeholder */}
          <div className="mt-16 relative animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="glass-card p-2 max-w-4xl mx-auto border-[#1e1e1e] flex items-center justify-center min-h-[400px] bg-[#111111]/50">
              <div className="text-[#555555] flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#1f1f1f] flex items-center justify-center animate-pulse">
                  <Sparkles size={24} className="text-[#a0a0a0]" />
                </div>
                <p className="font-medium">Demo GIF Placeholder</p>
                <p className="text-sm">Shows hovering over a message and clicking "⎇ Branch"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          HOW IT WORKS (3-STEP EXPLANATION)
          ============================================================ */}
      <section id="how-it-works" className="py-24 px-6 bg-[#111111]/30 border-y border-[#1f1f1f]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How it works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#1a1a1a] text-[#a0a0a0] flex items-center justify-center font-bold text-xl mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold text-white mb-3">Install the Extension</h3>
              <p className="text-[#888888] text-sm leading-relaxed">Add Arbor to Chrome. It silently integrates directly into your native ChatGPT interface.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#1a1a1a] text-[#a0a0a0] flex items-center justify-center font-bold text-xl mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold text-white mb-3">Branch Any Message</h3>
              <p className="text-[#888888] text-sm leading-relaxed">Hover over any past message and click "⎇ Branch". A new isolated timeline is instantly created.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#1a1a1a] text-[#a0a0a0] flex items-center justify-center font-bold text-xl mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold text-white mb-3">Explore Freely</h3>
              <p className="text-[#888888] text-sm leading-relaxed">Chat normally. Our local vector engine manages your context, ensuring ChatGPT only remembers your current branch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURES
          ============================================================ */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything you need to <span className="gradient-text">think better</span>
            </h2>
            <p className="text-[#888888] max-w-xl mx-auto">
              Powerful tools designed to help you explore ideas without losing track of where you've been.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="glass-card-hover p-6 group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4
                  ${feature.color === "emerald" ? "bg-white/15 text-white" :
                    feature.color === "purple" ? "bg-[#1a1a1a] text-[#a0a0a0]" :
                    feature.color === "blue" ? "bg-[#1a1a1a] text-[#a0a0a0]" :
                    "bg-amber-500/15 text-amber-400"
                  }
                  group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#888888] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          PRICING
          ============================================================ */}
      <section id="pricing" className="py-24 px-6 relative">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-[#888888]">Start free. Upgrade when you need more.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 relative
                  ${plan.popular
                    ? "bg-[#111111]/80 border-2 border-[#2a2a2a] shadow-xl shadow-none"
                    : "glass-card"
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="badge-brand flex items-center gap-1">
                      <Star size={10} />
                      Most Popular
                    </div>
                  </div>
                )}

                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-[#555555] text-sm">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-[#c0c0c0]">
                      <Check size={14} className="text-white flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => { setShowAuth(true); setIsSignUp(true); }}
                  className={`w-full py-2.5 rounded-xl font-medium text-sm transition-all
                    ${plan.popular
                      ? "btn-primary"
                      : "btn-secondary"
                    }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer className="border-t border-[#1f1f1f]/50 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 flex items-center justify-center">
              <img src="/arbor.svg" alt="Arbor Logo" className="h-full w-full object-contain" />
            </div>
            <span className="text-sm font-semibold text-[#888888]">
              Arbor
            </span>
          </div>
          <div className="flex items-center gap-5 text-xs text-[#444444]">
            <a href="/privacy" className="hover:text-[#888888] transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-[#888888] transition-colors">Terms</a>
            <a href="mailto:hello@koredex.com" className="hover:text-[#888888] transition-colors">Contact</a>
          </div>
          <p className="text-xs text-[#444444]">
            Arbor by Koredex
          </p>
        </div>
      </footer>

      {/* ============================================================
          AUTH MODAL
          ============================================================ */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-[#111111] rounded-2xl p-8 w-[420px] max-w-[90vw] border border-[#1e1e1e] 
                          shadow-2xl animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#666666] to-white 
                              flex items-center justify-center mx-auto mb-4 shadow-lg shadow-none">
                <GitBranch size={22} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h3>
              <p className="text-sm text-[#555555] mt-1">
                {isSignUp ? "Start branching your conversations" : "Sign in to continue"}
              </p>
            </div>

            {/* OAuth buttons */}
            <div className="space-y-2 mb-6">
              <button
                onClick={async () => {
                  const { error } = await supabase.auth.signInWithOAuth({
                    provider: 'google',
                    options: { redirectTo: `${window.location.origin}/dashboard` },
                  });
                  if (error) setError(error.message);
                }}
                className="btn-secondary w-full flex items-center justify-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continue with Google
              </button>
              <button
                onClick={async () => {
                  const { error } = await supabase.auth.signInWithOAuth({
                    provider: 'github',
                    options: { redirectTo: `${window.location.origin}/dashboard` },
                  });
                  if (error) setError(error.message);
                }}
                className="btn-secondary w-full flex items-center justify-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                Continue with GitHub
              </button>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-[#222222]/50" />
              <span className="text-xs text-[#444444]">or</span>
              <div className="flex-1 h-px bg-[#222222]/50" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full name"
                  className="input-field"
                />
              )}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="input-field"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="input-field"
                required
                minLength={6}
              />

              {error && (
                <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {isSignUp ? "Create Account" : "Sign In"}
                    <ChevronRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Sign-up consent */}
            {isSignUp && (
              <p className="text-xs text-[#555555] text-center mt-3">
                By signing up you agree to our{' '}
                <a href="/terms" className="underline hover:text-[#a0a0a0] transition-colors">Terms</a>
                {' '}and{' '}
                <a href="/privacy" className="underline hover:text-[#a0a0a0] transition-colors">Privacy Policy</a>
              </p>
            )}

            <p className="text-center text-xs text-[#555555] mt-4">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
                className="text-[#a0a0a0] hover:text-[#a0a0a0] font-medium"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>

            <button
              onClick={() => setShowAuth(false)}
              className="absolute top-4 right-4 text-[#444444] hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TreeIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 10V4h-4M7 10V4h4M12 4v16M7 20h10" />
    </svg>
  );
}
