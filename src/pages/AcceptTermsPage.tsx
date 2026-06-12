/**
 * AcceptTermsPage.tsx
 * Arbor — Koredex
 *
 * The /accept-terms route. Renders the <AcceptTerms> gate and handles
 * the post-acceptance redirect back to /dashboard.
 *
 * Mounted in App.tsx as a protected-ish route:
 * - If the user is not logged in, redirect to /.
 * - If logged in and gets here, show the acceptance form.
 * - On acceptance, navigate to /dashboard.
 *
 * Navigation state (set by useTermsGuard on version-bump re-acceptance):
 *   { reason: string }  — short description of what changed, shown in the UI
 */

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AcceptTerms } from "../components/AcceptTerms";

export function AcceptTermsPage() {
  const { session, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Reason is set in navigation state by useTermsGuard on version-bump re-acceptance.
  // It's undefined (not present) on first-time signups.
  const reason = (location.state as { reason?: string } | null)?.reason;

  useEffect(() => {
    document.title = "Accept Terms · Arbor";
  }, []);

  // Not authenticated — send to landing
  if (!loading && !session?.access_token) {
    navigate("/", { replace: true });
    return null;
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-10 h-10 flex items-center justify-center">
            <img src="/arbor.svg" alt="Arbor" className="w-full h-full object-contain opacity-40" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <AcceptTerms
        user={user}
        reason={reason}
        onAccepted={() => navigate("/dashboard", { replace: true })}
      />
    </div>
  );
}
