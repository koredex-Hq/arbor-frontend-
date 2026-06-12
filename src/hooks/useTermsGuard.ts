/**
 * useTermsGuard.ts
 * Arbor — Koredex
 *
 * React hook that checks if the current user has accepted the latest
 * Terms & Conditions and Privacy Policy. Use inside any protected
 * page or layout to gate access.
 *
 * Usage (React Router — wrap a protected page):
 *
 *   import { useTermsGuard } from '@/hooks/useTermsGuard'
 *
 *   export function DashboardPage() {
 *     const { checked, needsAcceptance } = useTermsGuard()
 *     if (!checked) return <LoadingSpinner />
 *     if (needsAcceptance) return null  // redirect already fired
 *     return <ActualDashboard />
 *   }
 *
 * Or wrap at the App.tsx routing level — see App.tsx for the
 * <AcceptTermsGuard> pattern that is used in this project.
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  CURRENT_TERMS_VERSION,
  CURRENT_PRIVACY_VERSION,
} from "../components/AcceptTerms";

export interface TermsGuardState {
  /** True once the check has completed (either direction). */
  checked: boolean;
  /** True if the user has been redirected to /accept-terms. */
  needsAcceptance: boolean;
}

export function useTermsGuard(): TermsGuardState {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [needsAcceptance, setNeedsAcceptance] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Not logged in — let auth routing handle it
      if (!user) {
        if (!cancelled) setChecked(true);
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("terms_accepted_at, terms_accepted, terms_version, privacy_version")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("useTermsGuard: failed to fetch profile", error);
        if (!cancelled) setChecked(true);
        return;
      }

      const mustAccept =
        // No acceptance timestamp recorded at all
        !profile?.terms_accepted_at ||
        // Or they accepted, but an older version
        (profile?.terms_version !== CURRENT_TERMS_VERSION) ||
        (profile?.privacy_version !== CURRENT_PRIVACY_VERSION);

      if (!cancelled) {
        if (mustAccept) {
          setNeedsAcceptance(true);

          // Only supply a reason when this is a version-bump re-acceptance,
          // not when terms_accepted_at is simply missing (first-time signup).
          const isVersionBump =
            profile?.terms_accepted_at &&
            (profile?.terms_version !== CURRENT_TERMS_VERSION ||
             profile?.privacy_version !== CURRENT_PRIVACY_VERSION);

          navigate("/accept-terms", {
            replace: true,
            state: isVersionBump
              ? { reason: "Our policies have been updated — please review and re-confirm your agreement." }
              : undefined,
          });
        }
        setChecked(true);
      }
    };

    check();

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { checked, needsAcceptance };
}
