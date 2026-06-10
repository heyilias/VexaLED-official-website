/**
 * Legal page content (Privacy, Terms, Cookies, Impressum).
 *
 * NOTE — this is a SOLID PRACTICAL DRAFT, not lawyer-reviewed. Before any
 * major B2B contract or formal EU sales activity, have it reviewed by counsel.
 *
 * TODO markers are intentional — they flag facts only VEXALED can supply:
 * full registered name, exact address, trade-registry number, legal
 * representative, etc. They render visibly in the UI so they aren't forgotten.
 */

export interface LegalSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LegalDoc {
  title: string;
  description: string;
  lastUpdated: string; // ISO date
  sections: LegalSection[];
  /** Footer note shown at the bottom of every legal page. */
  footnote?: string;
}

// Reusable contact card content
const CONTACT = {
  entity: "VEXALED Co., Ltd.",
  entityTODO: "[TODO: confirm legally registered name]",
  address: "Foshan, Guangdong, China",
  addressTODO: "[TODO: full registered street address]",
  registrationTODO: "[TODO: Unified Social Credit Code / trade-registry number]",
  representativeTODO: "[TODO: name of legal representative]",
  email: "sales@vexaled.com",
  generalEmail: "info@vexaled.com",
};

export const legalContent: Record<string, LegalDoc> = {
  // ────────────────────────────────────────────────────────────────────
  // PRIVACY POLICY
  // ────────────────────────────────────────────────────────────────────
  privacy: {
    title: "Privacy Policy",
    description:
      "How VEXALED collects, uses, and protects personal data — written to align with the EU General Data Protection Regulation (GDPR) and applicable Chinese personal-information protection law.",
    lastUpdated: "2026-06-10",
    sections: [
      {
        title: "1. Who we are",
        paragraphs: [
          `${CONTACT.entity} ${CONTACT.entityTODO} ("VEXALED", "we", "us") operates the website vexaled.com and provides professional LED display systems and related services.`,
          `Registered address: ${CONTACT.address} ${CONTACT.addressTODO}. Registration number: ${CONTACT.registrationTODO}.`,
          `For any privacy-related inquiry, email ${CONTACT.email}. We aim to respond within 30 calendar days.`,
        ],
      },
      {
        title: "2. What personal data we collect",
        paragraphs: [
          "We collect only the data you actively provide and a minimal amount of technical data needed to operate the site.",
        ],
        bullets: [
          "Inquiry form submissions: first and last name, work email, country, job title, product or solution of interest, the free-text message you enter, and the page or source the inquiry came from.",
          "Newsletter sign-ups (when offered): work email address only.",
          "Technical data automatically collected by your browser: IP address, user agent, referrer, timestamps. We use this for security, abuse prevention, and aggregated usage statistics.",
          "Cookies and similar storage as described in our Cookie Policy.",
        ],
      },
      {
        title: "3. Why we process this data (purpose & legal basis)",
        bullets: [
          "To respond to your inquiry and provide quotes — legal basis: pre-contractual / contractual measures (GDPR Art. 6(1)(b)).",
          "To send you product updates, only after you opt in — legal basis: consent (GDPR Art. 6(1)(a)). You can withdraw at any time.",
          "To operate, secure, and improve the website — legal basis: our legitimate interest in running and protecting our services (GDPR Art. 6(1)(f)).",
          "To comply with legal obligations (tax, accounting, regulatory) — legal basis: legal obligation (GDPR Art. 6(1)(c)).",
        ],
      },
      {
        title: "4. Who we share data with",
        paragraphs: [
          "We do not sell personal data. We share it only with the processors listed below, who are bound by data-processing agreements:",
        ],
        bullets: [
          "Supabase, Inc. — hosted database and authentication for inquiry storage. Our project is provisioned in the European Union; data is processed under Standard Contractual Clauses where applicable.",
          "Email delivery providers (e.g. Resend) — for transactional notifications and autoresponders. Processing may occur in the United States under Standard Contractual Clauses.",
          "Web hosting / CDN providers — to serve the website. May process IP addresses for delivery and security.",
          "Analytics provider — only if you consent via the cookie banner; processing is anonymized where possible.",
          "Law enforcement or regulators when legally required, and our auditors / professional advisors under confidentiality.",
        ],
      },
      {
        title: "5. International data transfers",
        paragraphs: [
          "Because VEXALED is based in China and some processors are based outside the European Economic Area, your personal data may be transferred internationally. We rely on Standard Contractual Clauses approved by the European Commission and apply supplementary safeguards where required.",
        ],
      },
      {
        title: "6. How long we keep data",
        bullets: [
          "Inquiry data: kept for up to 24 months after the last interaction, after which it is deleted or anonymized.",
          "Newsletter subscribers: kept until you unsubscribe; we keep an unsubscribe record indefinitely to honour your opt-out.",
          "Server logs: kept for a maximum of 12 months for security and audit purposes.",
          "Accounting records: retained for the period required by applicable tax and corporate law.",
        ],
      },
      {
        title: "7. Your rights",
        paragraphs: [
          "If you are located in the European Economic Area or the United Kingdom, you have the following rights regarding your personal data:",
        ],
        bullets: [
          "Access — request a copy of the data we hold about you.",
          "Rectification — ask us to correct inaccurate data.",
          "Erasure — ask us to delete your data where there is no legal reason to keep it.",
          "Restriction — ask us to restrict processing while a dispute is resolved.",
          "Portability — receive your data in a machine-readable format.",
          "Objection — object to processing based on legitimate interest.",
          "Withdraw consent — at any time, with no effect on processing already carried out.",
          "Lodge a complaint with your national data-protection supervisory authority.",
        ],
        // appended after bullets
      },
      {
        title: "8. Security",
        paragraphs: [
          "We protect data through encryption in transit (TLS), encryption at rest (database provider), strict access controls, and regular review of our processors. No system is perfectly secure — please use strong, unique passwords on any account you create and notify us immediately if you suspect a compromise.",
        ],
      },
      {
        title: "9. Children",
        paragraphs: [
          "The website is intended for business buyers and is not directed at children. We do not knowingly collect personal data from anyone under 16.",
        ],
      },
      {
        title: "10. Updates to this policy",
        paragraphs: [
          "We may update this Privacy Policy from time to time. The current version's effective date is shown above. Material changes will be highlighted on this page; we encourage you to review it periodically.",
        ],
      },
      {
        title: "11. How to contact us",
        paragraphs: [
          `For any privacy question, complaint, or rights request, write to ${CONTACT.email}. ${CONTACT.representativeTODO} is responsible for VEXALED's data-protection compliance.`,
        ],
      },
    ],
    footnote:
      "Draft prepared in plain language for clarity. This document will be reviewed by counsel before VEXALED's full public launch. Items marked [TODO: …] are placeholders for legally-required facts that will be confirmed before publication.",
  },

  // ────────────────────────────────────────────────────────────────────
  // TERMS OF SERVICE
  // ────────────────────────────────────────────────────────────────────
  terms: {
    title: "Terms of Service",
    description:
      "The terms that govern the use of vexaled.com and the basis on which VEXALED responds to inquiries and quote requests.",
    lastUpdated: "2026-06-10",
    sections: [
      {
        title: "1. Acceptance",
        paragraphs: [
          "By using vexaled.com or submitting an inquiry through this website, you agree to be bound by these Terms of Service. If you do not agree, please do not use the site.",
        ],
      },
      {
        title: "2. Who may use this website",
        paragraphs: [
          "The website is intended for business users aged 18 or older who are authorized to act on behalf of a company evaluating VEXALED products and services.",
        ],
      },
      {
        title: "3. Use of website content",
        paragraphs: [
          "All text, images, designs, logos, product renderings, source code, and other materials on this website are owned by VEXALED or its licensors and protected by copyright, trademark, and other intellectual-property laws.",
          "You may view and download materials for the sole purpose of evaluating VEXALED products and services. Any other use — including reproduction, redistribution, modification, framing, or commercial exploitation — requires prior written permission.",
        ],
      },
      {
        title: "4. Inquiries, quotes, and orders",
        bullets: [
          "Inquiries submitted via this website do not create a contract. They are a request for information.",
          "Any quote VEXALED provides is an invitation to treat, not a binding offer, and remains subject to confirmation in a separate written sales agreement.",
          "Orders are accepted, priced, and delivered under the terms of that separate written agreement and applicable VEXALED commercial terms.",
        ],
      },
      {
        title: "5. Product information & specifications",
        paragraphs: [
          "Product specifications, performance figures, and images on this website are provided in good faith and represent typical values. Actual figures may vary depending on product configuration, installation conditions, and usage. Always refer to the final product datasheet and sales agreement for binding specifications.",
        ],
      },
      {
        title: "6. Disclaimers",
        paragraphs: [
          "To the maximum extent permitted by law, the website is provided \"as is\" and \"as available\", without warranties of any kind, either express or implied. VEXALED does not warrant that the website will be uninterrupted, error-free, or free from viruses or other harmful components.",
        ],
      },
      {
        title: "7. Limitation of liability",
        paragraphs: [
          "To the extent permitted by law, VEXALED will not be liable for any indirect, incidental, consequential, special, punitive, or exemplary damages arising out of or in connection with your use of the website.",
          "Nothing in these Terms limits liability that cannot be excluded under applicable mandatory law (for example, death or personal injury caused by negligence, or fraudulent misrepresentation).",
        ],
      },
      {
        title: "8. Third-party links",
        paragraphs: [
          "The website may contain links to third-party sites for convenience. VEXALED does not endorse and is not responsible for the content, accuracy, or practices of those sites.",
        ],
      },
      {
        title: "9. Changes to the website and these terms",
        paragraphs: [
          "We may modify, suspend, or discontinue any part of the website at any time. We may update these Terms; the current effective date is shown above. Continued use after a change constitutes acceptance.",
        ],
      },
      {
        title: "10. Governing law",
        paragraphs: [
          "These Terms are governed by the laws applicable to VEXALED's place of registration, without prejudice to any mandatory consumer-protection or data-protection rights you may have under your local law. [TODO: confirm with counsel the specific jurisdiction and dispute-resolution forum.]",
        ],
      },
      {
        title: "11. Contact",
        paragraphs: [
          `Questions about these Terms: ${CONTACT.email}.`,
        ],
      },
    ],
    footnote:
      "Draft prepared in plain language for clarity. Items marked [TODO: …] will be confirmed before full public launch.",
  },

  // ────────────────────────────────────────────────────────────────────
  // COOKIE POLICY
  // ────────────────────────────────────────────────────────────────────
  cookies: {
    title: "Cookie Policy",
    description:
      "Information about cookies and similar technologies used on vexaled.com, and how you can control them.",
    lastUpdated: "2026-06-10",
    sections: [
      {
        title: "1. What are cookies?",
        paragraphs: [
          "Cookies are small text files placed on your device when you visit a website. They allow the site to remember your actions or preferences, measure how visitors use the site, or — when consented to — support marketing and personalisation.",
          "We also use similar technologies (local storage, session storage). For simplicity, we refer to all of these collectively as \"cookies\".",
        ],
      },
      {
        title: "2. Categories we use",
        bullets: [
          "Strictly necessary — required for the website to function: session state, security tokens, your cookie-consent choice itself. These cannot be switched off in our systems.",
          "Functional — remember preferences such as language. Used only if you accept this category.",
          "Analytics — anonymous aggregated usage statistics (which pages are visited, time on page, source of traffic). Used only if you accept this category.",
          "Marketing — third-party advertising or retargeting cookies. We do not currently use any cookie in this category, and we will update this policy before doing so.",
        ],
      },
      {
        title: "3. Your choices",
        paragraphs: [
          "You can accept or reject non-essential cookies at any time using the cookie banner that appears on your first visit. You can also revisit your choices via the \"Cookie preferences\" link in the footer.",
          "Most browsers let you control or delete cookies through their settings. Disabling strictly-necessary cookies may break essential parts of the website.",
        ],
      },
      {
        title: "4. Specific cookies in use",
        paragraphs: [
          "A precise list of cookies (name, provider, purpose, duration) will be published here once the consent banner is deployed. [TODO: populate after Phase B2 — GDPR cookie banner — ships.]",
        ],
      },
      {
        title: "5. Updates",
        paragraphs: [
          "We may update this Cookie Policy as our technology stack evolves. The current effective date is shown above.",
        ],
      },
      {
        title: "6. Contact",
        paragraphs: [
          `Questions about cookies: ${CONTACT.email}.`,
        ],
      },
    ],
    footnote:
      "Draft prepared in plain language for clarity. The detailed cookie inventory will populate automatically once the consent banner is integrated.",
  },

  // ────────────────────────────────────────────────────────────────────
  // IMPRESSUM (German Telemedia Act § 5)
  // ────────────────────────────────────────────────────────────────────
  impressum: {
    title: "Impressum / Legal Notice",
    description:
      "Legal disclosure required for online services accessible from Germany, Austria, and Switzerland under § 5 TMG and DDG.",
    lastUpdated: "2026-06-10",
    sections: [
      {
        title: "Operator / Diensteanbieter",
        bullets: [
          `Company: ${CONTACT.entity} ${CONTACT.entityTODO}`,
          `Registered office: ${CONTACT.address} ${CONTACT.addressTODO}`,
          `Legal representative: ${CONTACT.representativeTODO}`,
          `Registration: ${CONTACT.registrationTODO}`,
          "VAT identification number (if applicable): [TODO]",
        ],
      },
      {
        title: "Contact",
        bullets: [
          `Email: ${CONTACT.email}`,
          `General inquiries: ${CONTACT.generalEmail}`,
          "Phone: [TODO: international business phone]",
        ],
      },
      {
        title: "Responsible for content (V.i.S.d.P.)",
        paragraphs: [
          `${CONTACT.representativeTODO} — at the registered office above.`,
        ],
      },
      {
        title: "Liability for content (Haftung für Inhalte)",
        paragraphs: [
          "We carefully prepare the content of this website. As a service provider we are responsible under § 7 (1) TMG / § 7 (1) DDG for our own content on these pages according to general law. However, under §§ 8 to 10 TMG / §§ 8 to 10 DDG, we are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under general law remain unaffected. Liability in this respect is only possible from the time at which a concrete infringement of the law becomes known. Upon notification of such infringements, we will remove the content immediately.",
        ],
      },
      {
        title: "Liability for links (Haftung für Links)",
        paragraphs: [
          "Our offer contains links to external websites of third parties whose content we cannot influence. Therefore we cannot assume any liability for this external content. The respective provider or operator of the linked pages is always responsible for the content. The linked pages were checked for possible legal violations at the time of linking; no illegal content was discernible at that time. A permanent check of the content of the linked pages is not reasonable without concrete evidence of an infringement of the law. If we become aware of legal violations, we will remove such links immediately.",
        ],
      },
      {
        title: "Copyright (Urheberrecht)",
        paragraphs: [
          "The content and works on these pages created by the site operator are subject to copyright law. Duplication, processing, distribution, or any form of commercialisation of such material beyond the scope of copyright law requires the prior written consent of the respective author or creator.",
        ],
      },
      {
        title: "Online dispute resolution",
        paragraphs: [
          "The European Commission provides a platform for online dispute resolution (ODR), available at https://ec.europa.eu/consumers/odr/. We are not obliged and not willing to participate in dispute settlement proceedings before a consumer arbitration board.",
        ],
      },
    ],
    footnote:
      "Draft prepared for early publication. All [TODO: …] items must be replaced with verified registered facts before the website is offered to German, Austrian, or Swiss buyers in production.",
  },
};

// Slug aliases (e.g. /legal/privacy-policy → privacy)
export const LEGAL_SLUG_ALIASES: Record<string, string> = {
  "privacy-policy": "privacy",
  "terms-of-service": "terms",
  "cookie-policy": "cookies",
  legal: "privacy",
};
