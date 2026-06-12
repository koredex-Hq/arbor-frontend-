import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function TermsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Terms and Conditions · Arbor";
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Sticky nav */}
      <nav className="border-b border-[#1f1f1f]/50 bg-[#0a0a0a]/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 group"
          >
            <div className="w-7 h-7 flex items-center justify-center">
              <img src="/arbor.svg" alt="Arbor Logo" className="h-full w-full object-contain" />
            </div>
            <span className="text-sm font-semibold text-[#888888] group-hover:text-white transition-colors">
              Arbor
            </span>
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12 text-[#c0c0c0]">
        <h1 className="text-3xl font-bold text-white mb-2">Terms and Conditions</h1>
        <p className="text-[#555555] text-sm mb-2">
          Product: Arbor &nbsp;·&nbsp; Company: Koredex &nbsp;·&nbsp; Last Updated: June 8, 2025
        </p>
        <p className="text-[#555555] text-sm mb-10">
          Website:{" "}
          <a href="https://arbor.koredex.com" className="text-[#888888] hover:text-white transition-colors">
            arbor.koredex.com
          </a>
        </p>

        {/* 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
          <p className="text-[#888888] leading-relaxed">
            By accessing or using Arbor ("the Service"), operated by Koredex ("we," "us," or "our"), you agree to be
            bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, you must not use the
            Service.
          </p>
          <p className="text-[#888888] leading-relaxed mt-3">
            We reserve the right to update these Terms at any time. Continued use of the Service after changes are
            posted constitutes your acceptance of the revised Terms. We will notify you of material changes via email
            or an in-app notice.
          </p>
        </section>

        {/* 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-3">2. Eligibility</h2>
          <p className="text-[#888888] leading-relaxed">
            You must be at least 16 years of age to use Arbor. By using the Service, you represent and warrant that
            you meet this requirement and that all information you provide is accurate and complete.
          </p>
        </section>

        {/* 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-3">3. Account Registration &amp; Security</h2>
          <ul className="list-disc pl-6 space-y-2 text-[#888888]">
            <li>You may register using OAuth providers (such as Google or GitHub), which will share your name, email address, and profile picture with us.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You must notify us immediately at <a href="mailto:support@koredex.com" className="text-white underline hover:text-[#a0a0a0] transition-colors">support@koredex.com</a> if you suspect unauthorized access to your account.</li>
            <li>We reserve the right to suspend or terminate accounts that violate these Terms.</li>
          </ul>
        </section>

        {/* 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-3">4. Description of the Service</h2>
          <p className="text-[#888888] leading-relaxed mb-3">Arbor is an AI-powered platform that provides:</p>
          <ul className="list-disc pl-6 space-y-2 text-[#888888]">
            <li>Conversational AI assistants with persistent memory and summarization</li>
            <li>Workspace and project management tools</li>
            <li>Semantic search over your conversation history using vector embeddings</li>
            <li>Media generation (image and video) via text prompts</li>
            <li>Collaboration features including team workspaces, roles, and permissions</li>
            <li>A "Bring Your Own Key" (BYOK) option for users who wish to supply their own third-party API credentials</li>
          </ul>
        </section>

        {/* 5 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-3">5. User Content</h2>

          <h3 className="text-base font-semibold text-[#cccccc] mb-2">5.1 Ownership</h3>
          <p className="text-[#888888] leading-relaxed mb-4">
            You retain full ownership of all content you create, upload, or submit through Arbor, including messages,
            prompts, workspace data, and media generation requests ("User Content").
          </p>

          <h3 className="text-base font-semibold text-[#cccccc] mb-2">5.2 License to Koredex</h3>
          <p className="text-[#888888] leading-relaxed mb-4">
            By using the Service, you grant Koredex a limited, non-exclusive, worldwide, royalty-free license to store,
            process, and transmit your User Content solely for the purpose of providing and improving the Service to
            you. We do not claim ownership of your content.
          </p>

          <h3 className="text-base font-semibold text-[#cccccc] mb-2">5.3 AI Training</h3>
          <div className="border border-[#2a2a2a] bg-[#111111] rounded-xl p-4 mb-4">
            <p className="text-[#888888] leading-relaxed">
              <span className="text-white font-medium">We have not yet finalized our policy</span> on whether User
              Content may be used to train or fine-tune AI models. Until a clear policy is published:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#888888] mt-3">
              <li>Your User Content will not knowingly be used for AI model training without explicit notice.</li>
              <li>When our policy is finalized, we will notify you and update both these Terms and our Privacy Policy accordingly.</li>
              <li>We will provide a meaningful opt-in or opt-out mechanism before any such use takes effect.</li>
            </ul>
          </div>

          <h3 className="text-base font-semibold text-[#cccccc] mb-2">5.4 Prohibited Content</h3>
          <p className="text-[#888888] leading-relaxed mb-2">You agree not to submit content that:</p>
          <ul className="list-disc pl-6 space-y-2 text-[#888888]">
            <li>Is unlawful, harmful, threatening, abusive, defamatory, or obscene</li>
            <li>Infringes the intellectual property rights of any third party</li>
            <li>Contains malware, viruses, or malicious code</li>
            <li>Attempts to circumvent security or access controls of the Service</li>
          </ul>
        </section>

        {/* 6 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-3">6. Third-Party AI Providers &amp; Subprocessors</h2>
          <p className="text-[#888888] leading-relaxed">
            To deliver AI-generated responses, Arbor transmits your prompts and conversation data to third-party large
            language model (LLM) providers (such as Anthropic, OpenAI, and others). By using the Service, you
            acknowledge and consent to this processing.
          </p>
          <p className="text-[#888888] leading-relaxed mt-3">
            These providers operate under their own terms of service and privacy policies. Koredex is not responsible
            for the data practices of third-party providers, but we take reasonable steps to engage only subprocessors
            with appropriate data protection standards. A current list is available upon request at{" "}
            <a href="mailto:support@koredex.com" className="text-white underline hover:text-[#a0a0a0] transition-colors">
              support@koredex.com
            </a>.
          </p>
        </section>

        {/* 7 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-3">7. Bring Your Own Key (BYOK)</h2>
          <ul className="list-disc pl-6 space-y-2 text-[#888888]">
            <li>Your keys are encrypted at rest and in transit.</li>
            <li>They are used solely to make API calls on your behalf.</li>
            <li>Koredex staff do not access your keys except where technically required for debugging, with your explicit consent.</li>
            <li>You are solely responsible for ensuring your use of those API credentials complies with the respective provider's terms.</li>
          </ul>
        </section>

        {/* 8 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-3">8. Referral Program</h2>
          <ul className="list-disc pl-6 space-y-2 text-[#888888]">
            <li>You agree to the specific referral program terms presented at enrollment.</li>
            <li>Referral commissions are tracked based on signups linked to your referral code.</li>
            <li>We reserve the right to modify or terminate the referral program at any time with reasonable notice.</li>
            <li>Fraudulent referrals (e.g., self-referrals, fake accounts) will result in forfeiture of commissions and may result in account termination.</li>
          </ul>
        </section>

        {/* 9 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-3">9. Intellectual Property</h2>
          <p className="text-[#888888] leading-relaxed">
            All rights, title, and interest in and to the Arbor platform — including its software, design, logos, and
            documentation — are and remain the exclusive property of Koredex. Nothing in these Terms grants you any
            right to use our trademarks, trade names, or branding without prior written consent.
          </p>
        </section>

        {/* 10 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-3">10. Acceptable Use</h2>
          <p className="text-[#888888] leading-relaxed mb-2">You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2 text-[#888888]">
            <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
            <li>Use the Service to scrape, harvest, or collect data about other users</li>
            <li>Resell or sublicense access to the Service without authorization</li>
            <li>Use the Service in any way that violates applicable laws or regulations</li>
            <li>Attempt to gain unauthorized access to our systems or another user's account</li>
          </ul>
        </section>

        {/* 11 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-3">11. Service Availability &amp; Modifications</h2>
          <p className="text-[#888888] leading-relaxed">
            We strive to maintain high availability but do not guarantee uninterrupted access. We may modify, suspend,
            or discontinue any feature of the Service at any time. We will provide reasonable advance notice for
            significant changes where possible.
          </p>
        </section>

        {/* 12 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-3">12. Disclaimer of Warranties</h2>
          <p className="text-[#888888] leading-relaxed uppercase text-sm tracking-wide">
            The Service is provided "as is" and "as available" without warranties of any kind, either express or
            implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or
            non-infringement. AI-generated content may be inaccurate — you should independently verify critical
            information before relying on it.
          </p>
        </section>

        {/* 13 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-3">13. Limitation of Liability</h2>
          <p className="text-[#888888] leading-relaxed uppercase text-sm tracking-wide">
            To the maximum extent permitted by applicable law, Koredex shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, including loss of data, profits, or goodwill,
            arising from your use of or inability to use the Service, even if we have been advised of the possibility
            of such damages.
          </p>
        </section>

        {/* 14 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-3">14. Indemnification</h2>
          <p className="text-[#888888] leading-relaxed">
            You agree to indemnify and hold harmless Koredex, its affiliates, officers, employees, and agents from
            any claims, damages, or expenses (including reasonable legal fees) arising from your use of the Service,
            your User Content, or your violation of these Terms.
          </p>
        </section>

        {/* 15 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-3">15. Termination</h2>
          <p className="text-[#888888] leading-relaxed mb-2">Either party may terminate the relationship at any time. Upon termination:</p>
          <ul className="list-disc pl-6 space-y-2 text-[#888888]">
            <li>Your access to the Service will cease.</li>
            <li>We will handle your data in accordance with our Privacy Policy and applicable law.</li>
            <li>Sections 5 (User Content ownership), 9 (IP), 12–14, and 16 survive termination.</li>
          </ul>
        </section>

        {/* 16 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-3">16. Governing Law</h2>
          <p className="text-[#888888] leading-relaxed">
            These Terms are governed by the laws of the jurisdiction in which Koredex is registered, without regard
            to conflict of law principles. Any disputes shall be resolved in the competent courts of that
            jurisdiction.
          </p>
        </section>

        {/* 17 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-3">17. Contact</h2>
          <p className="text-[#888888] leading-relaxed">
            For questions about these Terms, contact us at:
          </p>
          <div className="mt-3 text-[#888888]">
            <p className="font-medium text-white">Koredex — Arbor Support</p>
            <p>
              Email:{" "}
              <a href="mailto:support@koredex.com" className="text-white underline hover:text-[#a0a0a0] transition-colors">
                support@koredex.com
              </a>
            </p>
            <p>
              Website:{" "}
              <a href="https://arbor.koredex.com" className="text-white underline hover:text-[#a0a0a0] transition-colors">
                arbor.koredex.com
              </a>
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-[#444444] text-sm border-t border-[#1f1f1f]/50">
        <span>Arbor by Koredex</span>
        {" · "}
        <a href="/privacy" className="hover:text-[#888888] transition-colors">Privacy</a>
        {" · "}
        <a href="/terms" className="hover:text-[#888888] transition-colors">Terms</a>
        {" · "}
        <a href="mailto:support@koredex.com" className="hover:text-[#888888] transition-colors">Contact</a>
      </footer>
    </div>
  );
}
