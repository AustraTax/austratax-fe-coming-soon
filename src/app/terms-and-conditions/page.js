"use client";
import React from "react";

export default function Terms() {
  return (
    <main className="bg-white py-10 px-6 md:px-10 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-[#ed8936] text-center">
        Terms and Conditions of Use
      </h1>

      <p className="text-sm text-gray-500 mb-2">Effective Date: 05-05-2025</p>

      <p className="text-sm text-gray-500 mb-10">
        Website:{" "}
        <a href="https://austratax.com.au" className="text-[#ed8936] underline">
          https://austratax.com.au
        </a>
      </p>

      <Section number="1" title="Acceptance of Terms">
        <p>
          By accessing and using the AustraTax website ("the Site"), you agree
          to be bound by these Terms and Conditions of Use ("Terms"). If you do
          not agree with any part of these Terms, you must not use the Site.
        </p>
      </Section>

      <Section number="2" title="Purpose of the Website">
        <p>
          The Site provides online tools designed to assist Australian residents
          in estimating their tax obligations. These tools are intended for
          general informational purposes only and do not constitute professional
          financial or taxation advice.
        </p>
      </Section>

      <Section number="3" title="Eligibility">
        <p>
          You must be at least 18 years old or have the permission of a legal
          guardian to use this website. By using the Site, you confirm that you
          are using it for lawful purposes in accordance with Australian laws.
        </p>
      </Section>

      <Section number="4" title="Use of Information">
        <ul className="list-disc list-inside space-y-1">
          <li>
            You agree to provide accurate and complete information to the best
            of your knowledge.
          </li>
          <li>
            You understand that all results are based solely on the information
            you provide.
          </li>
          <li>
            You acknowledge that the estimates provided do not guarantee exact
            tax outcomes or entitlements.
          </li>
        </ul>
        <p className="mt-2">
          You are encouraged to consult a registered tax agent or the Australian
          Taxation Office (ATO) for formal advice or lodgement.
        </p>
      </Section>

      <Section number="5" title="Data Handling and Privacy">
        <p>
          AustraTax does not store or retain any personal information submitted
          on the Site. All information is processed temporarily in session
          memory for the sole purpose of generating your tax estimate.
        </p>
        <p className="mt-2">
          Please review our{" "}
          <a href="/privacy-policy" className="text-[#ed8936] underline">
            Privacy Policy
          </a>{" "}
          for full details on how we handle your data.
        </p>
      </Section>

      <Section number="6" title="Intellectual Property">
        <p>
          All content on the Site, including text, graphics, logos, tools, and
          software, is the intellectual property of AustraTax Pty Ltd unless
          otherwise stated. You may not reproduce, distribute, modify, or use
          any part of the Site without our prior written consent.
        </p>
      </Section>

      <Section number="7" title="Prohibited Uses">
        <p>You agree not to use the Site:</p>
        <ul className="list-disc list-inside my-2 space-y-1">
          <li>For any unlawful or fraudulent purpose</li>
          <li>To transmit viruses, malware, or malicious code</li>
          <li>
            To engage in scraping, data mining, or unauthorized data extraction
          </li>
          <li>
            To interfere with or disrupt the Site or its associated networks
          </li>
        </ul>
        <p>
          We reserve the right to restrict or terminate your access if you
          violate these Terms.
        </p>
      </Section>

      <Section number="8" title="Disclaimer of Liability">
        <p>
          While we aim to provide accurate and up-to-date information, AustraTax
          makes no warranties or guarantees as to the accuracy, completeness, or
          reliability of any information or calculation provided on the Site.
        </p>
        <p className="mt-2">
          To the maximum extent permitted by law, AustraTax shall not be liable
          for any direct, indirect, incidental, special, consequential, or
          punitive damages, or any loss of profits or revenues, whether incurred
          directly or indirectly, or any loss of data, use, goodwill, or other
          intangible losses, resulting from:
        </p>
        <ul className="list-disc list-inside my-2 space-y-1">
          <li>
            Losses, damages, or costs arising from the use of the Site or its
            tools
          </li>
          <li>
            Errors or omissions in calculations from the use of our tax
            calculator
          </li>
          <li>Decisions made based on our tax estimates</li>
        </ul>
        <p>Use of the Site is at your own risk.</p>
      </Section>

      <Section number="9" title="Third-Party Links">
        <p>
          Our Site may contain links to external websites. AustraTax is not
          responsible for the content, accuracy, or practices of those sites.
          Access them at your own discretion.
        </p>
      </Section>

      <Section number="10" title="Modifications">
        <p>
          We may revise these Terms at any time without notice. Your continued
          use of the Site after changes are made constitutes your acceptance of
          the revised Terms.
        </p>
        <p className="mt-2">We recommend checking this page periodically.</p>
      </Section>

      <Section number="11" title="Governing Law">
        <p>
          These Terms are governed by and construed in accordance with the laws
          of the Northern Territory of Australia. Any disputes arising in
          connection with the Site or these Terms shall be subject to the
          exclusive jurisdiction of the courts of the Northern Territory.
        </p>
      </Section>

      <Section number="12" title="Contact Us">
        <p>
          For any questions regarding these Terms or your use of the Site,
          please contact:
        </p>
        <div className="mt-2 text-sm space-y-1">
          <p>
            <strong>AustraTax Pty Ltd</strong>
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:contact@austratax.com.au"
              className="text-[#ed8936] underline"
            >
              contact@austratax.com.au
            </a>
          </p>
        </div>
      </Section>
    </main>
  );
}

function Section({ number, title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-2">
        {number}. {title}
      </h2>
      <div className="text-sm leading-6 space-y-2">{children}</div>
    </section>
  );
}
