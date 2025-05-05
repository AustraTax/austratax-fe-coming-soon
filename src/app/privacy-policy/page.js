"use client";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="bg-white py-10 px-6 md:px-10 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-[#ed8936]">Privacy Policy</h1>

      <p className="text-sm text-gray-500 mb-2">Effective Date: 05-05-2025</p>
      {/* <p className="text-sm text-gray-500 mb-6">
        AustraTax Pty Ltd (ABN: [Insert ABN])
      </p> */}

      <PolicySection number="1" title="Introduction">
        <p>
          AustraTax Pty Ltd ("we", "us", or "our") is committed to protecting
          your privacy and handling your personal information in accordance with
          the Privacy Act 1988 and the Australian Privacy Principles (APPs).
          This Privacy Policy outlines how we collect, use, and protect your
          information when you use our website to estimate your Australian tax
          obligations.
        </p>
        <p className="mt-2">
          By accessing or using our services, you agree to the terms of this
          Privacy Policy.
        </p>
      </PolicySection>

      <PolicySection number="2" title="What Personal Information We Collect">
        <SubSection title="a. Personal Identifiers">
          <ul className="list-disc list-inside space-y-1">
            <li>Zip Code</li>
            <li>
              Tax File Number (TFN) – note: we do not collect or store the TFN
              itself
            </li>
            <li>Visa Status</li>
          </ul>
        </SubSection>
        <SubSection title="b. Financial and Tax-Related Information">
          <ul className="list-disc list-inside space-y-1">
            <li>Income details (Gross Income)</li>
            <li>Expense claims</li>
            <li>Deductions</li>
            <li>PAYG summaries</li>
          </ul>
        </SubSection>
        <SubSection title="c. Technical Information (automatically collected)">
          <ul className="list-disc list-inside space-y-1">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Pages visited and interactions</li>
          </ul>
        </SubSection>
      </PolicySection>

      <PolicySection number="3" title="How We Collect Personal Information">
        <p>
          We collect information through forms completed on our website. We use
          the personal information you provide solely for the purpose of
          performing real-time tax obligation assessments. Specifically, the
          data helps us determine:
        </p>
        <ul className="list-disc list-inside my-2 space-y-1">
          <li>
            Your eligibility as a resident for tax purposes under Australian tax
            law
          </li>
          <li>
            Whether you are likely to meet the identification requirements for
            lodging tax returns
          </li>
        </ul>
        <p>
          Your data is only processed in memory and used to deliver immediate
          results during your session. Once the session ends, the data is not
          retained or stored on our servers or databases.
        </p>
      </PolicySection>

      <PolicySection number="4" title="No Storage, No Disclosure">
        <p>
          We do not store, log, or retain any personal data you enter on our
          site. We do not sell, share, or disclose your information to third
          parties under any circumstances. Since no data is saved, there is
          nothing to disclose or distribute beyond your current session.
        </p>
      </PolicySection>

      <PolicySection number="5" title="Disclosure of Personal Information">
        <p>We do not sell or rent your personal data.</p>
        <p className="mt-2">We may disclose personal information:</p>
        <ul className="list-disc list-inside my-2 space-y-1">
          <li>To the ATO with your authorisation</li>
          <li>
            To secure third-party service providers (e.g., cloud hosting,
            analytics)
          </li>
          <li>If required by law or legal process (e.g., court orders)</li>
        </ul>
        <p>
          All third-party processors are bound by Australian privacy laws or
          equivalent safeguards.
        </p>
      </PolicySection>

      <PolicySection number="6" title="Data Security and Storage">
        <ul className="list-disc list-inside space-y-1">
          <li>SSL encryption to protect data in transit</li>
          <li>Secure coding practices to prevent vulnerabilities</li>
          <li>
            Session-based memory processing — data discarded after session
          </li>
        </ul>
      </PolicySection>

      <PolicySection number="7" title="Use of Cookies and Analytics">
        <p>
          We may use cookies and analytics tools (like Google Analytics) to
          improve your experience. These do not track or store personally
          identifiable data from forms.
        </p>
        <p className="mt-2">
          You can manage cookies in your browser. Disabling them may affect site
          functionality.
        </p>
      </PolicySection>

      <PolicySection number="8" title="Your Rights">
        <p>
          Since we do not store your data, you do not need to request access,
          correction, or deletion. If you have privacy concerns, feel free to
          contact us.
        </p>
      </PolicySection>

      <PolicySection number="9" title="Children's Privacy">
        <p>
          Our website is not intended for children under 18. We do not knowingly
          collect data from minors. If you're a parent or guardian and aware
          your child has shared information, please contact us.
        </p>
      </PolicySection>

      <PolicySection number="10" title="Changes to This Privacy Policy">
        <p>
          We may update this policy occasionally. Changes will be posted here
          with a new effective date.
        </p>
      </PolicySection>

      <PolicySection number="11" title="Contact Us">
        <p>If you have any questions or concerns, contact:</p>
        <div className="mt-2 text-sm space-y-1">
          <p>
            <strong>Privacy Officer</strong>
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:privacy@austratax.com.au"
              className="text-[#ed8936] underline"
            >
              privacy@austratax.com.au
            </a>
          </p>
          <p>Mail: AustraTax Pty Ltd, [Insert Postal Address]</p>
          <p>
            Office of the Australian Information Commissioner (OAIC):{" "}
            <a
              href="https://www.oaic.gov.au"
              className="text-[#ed8936] underline"
              target="_blank"
            >
              oaic.gov.au
            </a>
          </p>
        </div>
      </PolicySection>
    </main>
  );
}

function PolicySection({ number, title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-2">
        {number}. {title}
      </h2>
      <div className="text-sm leading-6 space-y-2">{children}</div>
    </section>
  );
}

function SubSection({ title, children }) {
  return (
    <div className="mb-4">
      <h3 className="font-medium mb-1">{title}</h3>
      {children}
    </div>
  );
}
