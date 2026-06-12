/**
 * AcceptTerms.tsx
 * Arbor — Koredex
 *
 * Shown after OAuth sign-in when the user hasn't accepted the latest
 * Terms & Conditions and Privacy Policy. Styled to match Arbor's dark UI.
 *
 * Usage:
 *   <AcceptTerms user={supabaseUser} onAccepted={() => navigate('/dashboard')} />
 *
 * Bump CURRENT_TERMS_VERSION / CURRENT_PRIVACY_VERSION whenever you
 * publish updated policy documents — every user will be prompted again.
 */

import { useState } from "react";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";

// ── Policy versions ────────────────────────────────────────────────────────
// Bump these strings whenever you publish a new version of either document.
// Users whose stored version doesn't match will be shown this screen again.
export const CURRENT_TERMS_VERSION = "1.0";
export const CURRENT_PRIVACY_VERSION = "1.0";

// ── Policy URLs ────────────────────────────────────────────────────────────
const TERMS_URL = "/terms";
const PRIVACY_URL = "/privacy";

// ── Props ──────────────────────────────────────────────────────────────────
interface AcceptTermsProps {
  user: User;
  onAccepted?: () => void;
  /**
   * When provided, this is a re-acceptance event (version bump).
   * Pass a short description of what changed, e.g.:
   *   reason="AI training policy update"
   *   reason="GDPR data retention clause added"
   * The string is stored in profiles.re_acceptance_reason for audit purposes
   * and shown to the user so their consent is genuinely informed.
   */
  reason?: string;
}

// ── Component ──────────────────────────────────────────────────────────────
export function AcceptTerms({ user, onAccepted, reason }: AcceptTermsProps) {
  const isReAcceptance = Boolean(reason);
  const [tos, setTos] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [tosError, setTosError] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [acceptedAt, setAcceptedAt] = useState<string | null>(null);

  const bothChecked = tos && privacy;

  const handleTosChange = (val: boolean) => {
    setTos(val);
    if (val) setTosError(false);
  };

  const handlePrivacyChange = (val: boolean) => {
    setPrivacy(val);
    if (val) setPrivacyError(false);
  };

  const handleSubmit = async () => {
    // Validate — both required
    let valid = true;
    if (!tos) { setTosError(true); valid = false; }
    if (!privacy) { setPrivacyError(true); valid = false; }
    if (!valid) return;

    setLoading(true);

    try {
      // Prefer the edge function (captures real IP server-side).
      // Falls back to a direct DB update if the function isn't deployed yet.
      const { error: fnError } = await supabase.functions.invoke("accept-terms", {
        body: {
          marketing_opted_in: marketing,
          terms_version: CURRENT_TERMS_VERSION,
          privacy_version: CURRENT_PRIVACY_VERSION,
          // null on first-time signup; a short description on re-acceptance
          re_acceptance_reason: reason ?? null,
        },
      });

      if (fnError) {
        // Edge function not available — fall back to direct update
        const now = new Date().toISOString();
        const { error: dbError } = await supabase
          .from("profiles")
          .update({
            terms_accepted: true,
            privacy_accepted: true,
            terms_accepted_at: now,
            privacy_accepted_at: now,
            marketing_opted_in: marketing,
            terms_version: CURRENT_TERMS_VERSION,
            privacy_version: CURRENT_PRIVACY_VERSION,
            // Still store the reason even via fallback path
            ...(reason ? { re_acceptance_reason: reason } : {}),
          })
          .eq("id", user.id);

        if (dbError) throw dbError;
      }

      const now = new Date().toISOString();
      setAcceptedAt(now);
      setDone(true);

      // Give the user a moment to see the confirmation before redirecting
      setTimeout(() => onAccepted?.(), 1600);
    } catch (err) {
      console.error("AcceptTerms: failed to save acceptance:", err);
      alert("Something went wrong saving your acceptance. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Full-screen overlay */
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
         style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}>

      {/* Card */}
      <div className="relative w-full max-w-md bg-[#111111] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden
                      animate-fade-in">

        {/* Subtle top gradient accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="p-7">
          {done ? (
            /* ── Success state ─────────────────────────────────────── */
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                     stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="text-[17px] font-semibold text-white mb-2">You&apos;re all set</h2>
              <p className="text-sm text-[#666666] leading-relaxed">
                Your agreement has been recorded.<br />Taking you to Arbor…
              </p>
              {acceptedAt && (
                <p className="mt-4 text-[11px] text-[#444444] font-mono">
                  Accepted at {new Date(acceptedAt).toLocaleString()}
                </p>
              )}
            </div>

          ) : (
            /* ── Acceptance form ───────────────────────────────────── */
            <>
              {/* Logo row */}
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img src="/arbor.svg" alt="Arbor" className="w-full h-full object-contain" />
                </div>
                <span className="text-[15px] font-semibold text-white tracking-tight">Arbor</span>
              </div>

              <h2 className="text-[18px] font-semibold text-white mb-1.5">
                {isReAcceptance ? "Our policies have been updated" : "Before you continue"}
              </h2>

              {isReAcceptance ? (
                /* Re-acceptance: show a clear notice of what changed */
                <div className="mb-6">
                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-3.5 mb-3">
                    <p className="text-[12px] text-[#555555] uppercase tracking-wider font-medium mb-1">What changed</p>
                    <p className="text-sm text-[#aaaaaa] leading-relaxed">{reason}</p>
                  </div>
                  <p className="text-sm text-[#555555] leading-relaxed">
                    Please re-confirm you agree to the updated policies below.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-[#666666] leading-relaxed mb-6">
                  Please review and accept our policies to create your account.
                </p>
              )}

              {/* Terms & Conditions */}
              <label
                id="tos-label"
                className="flex items-start gap-3 mb-1 cursor-pointer select-none group"
              >
                <input
                  id="tos-checkbox"
                  type="checkbox"
                  checked={tos}
                  onChange={(e) => handleTosChange(e.target.checked)}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 accent-white cursor-pointer"
                />
                <span className={`text-sm leading-relaxed transition-colors ${
                  tosError ? "text-red-400" : "text-[#aaaaaa] group-hover:text-white"
                }`}>
                  I have read and agree to the{" "}
                  <a
                    href={TERMS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline underline-offset-2 hover:text-[#aaaaaa] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Terms and Conditions
                  </a>
                </span>
              </label>
              {tosError && (
                <p className="text-[12px] text-red-400 mb-2 ml-7">
                  You must accept the Terms and Conditions to continue.
                </p>
              )}

              {/* Privacy Policy */}
              <label
                id="privacy-label"
                className="flex items-start gap-3 mb-1 mt-3 cursor-pointer select-none group"
              >
                <input
                  id="privacy-checkbox"
                  type="checkbox"
                  checked={privacy}
                  onChange={(e) => handlePrivacyChange(e.target.checked)}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 accent-white cursor-pointer"
                />
                <span className={`text-sm leading-relaxed transition-colors ${
                  privacyError ? "text-red-400" : "text-[#aaaaaa] group-hover:text-white"
                }`}>
                  I have read and agree to the{" "}
                  <a
                    href={PRIVACY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline underline-offset-2 hover:text-[#aaaaaa] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
              {privacyError && (
                <p className="text-[12px] text-red-400 mb-2 ml-7">
                  You must accept the Privacy Policy to continue.
                </p>
              )}

              {/* Divider */}
              <div className="h-px bg-[#1f1f1f] my-5" />

              {/* Marketing opt-in — unchecked by default (GDPR-safe) */}
              <label
                id="marketing-label"
                className="flex items-start gap-3 mb-5 cursor-pointer select-none group"
              >
                <input
                  id="marketing-checkbox"
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 accent-white cursor-pointer"
                />
                <span className="text-sm text-[#555555] leading-relaxed group-hover:text-[#777777] transition-colors">
                  Send me product updates and tips by email{" "}
                  <span className="text-[#3a3a3a]">(optional)</span>
                </span>
              </label>

              {/* Age confirmation note */}
              <p className="text-[12px] text-[#444444] mb-5">
                By continuing, you confirm you are at least 16 years old.
              </p>

              {/* Submit */}
              <button
                id="accept-terms-submit"
                onClick={handleSubmit}
                disabled={!bothChecked || loading}
                className="w-full py-3 rounded-xl text-[14px] font-semibold transition-all duration-200
                           bg-white text-black
                           hover:bg-[#e8e8e8] active:bg-[#d0d0d0]
                           disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10"
                              stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                    </svg>
                    Saving…
                  </span>
                ) : (
                  "Create account →"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
