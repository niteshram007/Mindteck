import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import { MainNavBar } from "@/app/navbar";
import BannerImage from "../../assets/images/banners-and-bg/privacypolicyBanner.jpg";
import Link from "next/link";
import Image from "next/image";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/privacypolicy");

export default function page() {
  return (
    <div>
      <div className=" bg-gray-100 font-inter pt-2 ">
        <div className="container relative">
          <hr className=" border-t-[3px] rounded-sm  border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
        </div>
        <GeometricShapes />
        <section className="mt-3 z-10 relative">
          <MainNavBar hiddenSidebar />
          <div className="container">
            <div>
              <Image
                src={BannerImage}
                alt="Privacy Policy"
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="h-full w-full object-cover max-h-[360px]"
              />
            </div>

            <Breadcrumbs paths={["Privacy Policy"]} />
            <h1 className="font-athelas text-secondary text-3xl sm:text-4xl md:text-5xl pb-3">
              Privacy Policy
            </h1>
          </div>
        </section>
      </div>

      <div className="container space-y-3 pt-10 pb-20">
        <div className="pb-2">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm text-white hover:opacity-90 transition-opacity"
          >
            Go back
          </Link>
        </div>

        <h3 className="text-xl font-semibold text-primary">1. Introduction</h3>
        <p className="text-md">
          Mindteck (the "Company", "we", "us", or "our") is committed to
          protecting the privacy and personal data of individuals who visit or
          interact with www.mindteck.com (the "Website").
        </p>
        <p className="text-md">
          This Privacy Policy explains how we collect, use, store, disclose, and
          protect personal data in accordance with applicable data protection and
          privacy laws worldwide, including but not limited to:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-md">
          <li>
            The Digital Personal Data Protection Act, 2023 and the Information
            Technology Act, 2000 (India)
          </li>
          <li>
            The General Data Protection Regulation (EU) 2016/679 ("GDPR")
          </li>
          <li>
            Applicable United States federal and state privacy laws, including
            the CCPA/CPRA
          </li>
          <li>
            UK Data Protection Act 2018 and other national, regional, and local
            data protection laws in jurisdictions where Mindteck operates or
            where personal data is processed
          </li>
        </ul>
        <p className="text-md">
          Under applicable law, personal data belongs to the individual (the
          "Data Principal" or "Data Subject"), and Mindteck acts as a Data
          Fiduciary, Data Controller, or Business, as applicable.
        </p>
        <p className="text-md">
          By using this Website, you acknowledge that your personal data will be
          processed in accordance with this Privacy Policy.
        </p>

        <h3 className="text-xl font-semibold">2. Personal Data We Collect</h3>
        <p className="text-md">
          We may collect the following categories of personal data through the
          Website:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-md">
          <li>
            Identity and contact information: name, email address, phone number,
            company name, designation
          </li>
          <li>
            Professional information: organization details, job role, business
            interests
          </li>
          <li>
            Technical and usage data: IP address, browser type, device
            information, pages visited, access times
          </li>
          <li>
            Communication data: information shared through contact forms, emails,
            or subscription requests
          </li>
        </ul>
        <p className="text-md">
          We do not knowingly collect personal data of children under 16 (or the
          age specified by applicable law, such as 13 under COPPA).
        </p>

        <h3 className="text-xl font-semibold">3. Purpose of Processing</h3>
        <p className="text-md">
          Personal data is collected and processed only for lawful and legitimate
          purposes, including:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-md">
          <li>Responding to enquiries and requests</li>
          <li>Providing information about our services, events, and offerings</li>
          <li>Managing subscriptions to email communications</li>
          <li>Improving Website functionality, performance, and user experience</li>
          <li>Maintaining internal business records</li>
          <li>Meeting legal, regulatory, contractual, and compliance obligations</li>
        </ul>
        <p className="text-md">
          Personal data will not be processed for purposes incompatible with
          those stated above unless permitted by law or with appropriate consent.
        </p>

        <h3 className="text-xl font-semibold">4. Legal Basis for Processing</h3>
        <p className="text-md">
          Depending on the applicable jurisdiction and context, Mindteck
          processes personal data on one or more of the following legal bases:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-md">
          <li>Consent of the individual</li>
          <li>Performance of a contract or pre-contractual steps</li>
          <li>Compliance with legal obligations</li>
          <li>
            Legitimate business interests, where such interests are not
            overridden by individual rights
          </li>
        </ul>

        <h3 className="text-xl font-semibold">5. Consent</h3>
        <p className="text-md">
          Where required by applicable law, personal data is processed only with
          free, specific, informed, and unambiguous consent.
        </p>
        <p className="text-md">
          Consent may be withdrawn at any time. Withdrawal will not affect the
          lawfulness of processing carried out prior to such withdrawal.
        </p>

        <h3 className="text-xl font-semibold">6. Individual Rights</h3>
        <p className="text-md">
          Subject to applicable law and jurisdiction, individuals may have the
          right to:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-md">
          <li>Access personal data processed by us</li>
          <li>Request correction or updating of inaccurate or incomplete data</li>
          <li>Request deletion or erasure of personal data</li>
          <li>Withdraw consent where processing is based on consent</li>
          <li>Object to or restrict certain processing activities</li>
          <li>Request data portability where applicable</li>
          <li>
            Lodge a complaint with a competent supervisory or regulatory
            authority
          </li>
          <li>
            Exercise additional rights granted under local laws, including
            nomination rights where applicable
          </li>
        </ul>
        <p className="text-md">
          Requests may be submitted as described in Section 11 and will be
          responded to within applicable timelines (e.g., 30 days under GDPR,
          45 days under CCPA).
        </p>

        <h3 className="text-xl font-semibold">7. Disclosure to Third Parties</h3>
        <p className="text-md">
          We may disclose personal data to trusted third-party service providers
          (including IT, analytics, hosting, or marketing support providers)
          solely for legitimate business purposes and subject to contractual
          confidentiality and security obligations.
        </p>
        <p className="text-md">
          Mindteck does not sell or "share" (as defined under CCPA/CPRA)
          personal data and does not engage in unlawful or unauthorized data
          sharing practices.
        </p>

        <h3 className="text-xl font-semibold">8. International Data Transfers</h3>
        <p className="text-md">
          As a global organization, Mindteck may transfer personal data across
          borders, including to jurisdictions with different data protection
          standards.
        </p>
        <p className="text-md">
          Where required by law, appropriate safeguards are implemented, such as:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-md">
          <li>Standard contractual clauses</li>
          <li>Intra-group data protection agreements</li>
          <li>
            EU-US Data Privacy Framework (where applicable) and other lawful
            transfer mechanisms recognized under applicable law
          </li>
        </ul>

        <h3 className="text-xl font-semibold">9. Data Security</h3>
        <p className="text-md">
          Mindteck implements reasonable technical and organizational measures to
          protect personal data from unauthorized access, loss, misuse,
          alteration, or disclosure.
        </p>
        <p className="text-md">
          Access to personal data is limited to authorized personnel on a
          need-to-know basis and governed by internal policies and controls.
        </p>

        <h3 className="text-xl font-semibold">10. Data Retention</h3>
        <p className="text-md">
          Personal data is retained only for as long as necessary to fulfill the
          purposes for which it was collected or to meet legal or contractual
          requirements.
        </p>
        <p className="text-md">
          Unless a longer retention period is mandated by law, personal data
          will generally be retained for periods tied to specific purposes (e.g.,
          enquiry responses: 1 year; marketing subscriptions: until withdrawal),
          not exceeding 3 years unless required by law, up to three (3) years,
          after which it will be securely deleted or anonymized.
        </p>

        <h3 className="text-xl font-semibold">
          11. Contact Information and Grievance Redressal
        </h3>
        <p className="text-md">
          For privacy-related enquiries, requests, or grievances, please
          contact:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-md">
          <li>
            Grievance/Privacy Contact Email:{" "}
            <Link href="mailto:info@mindteck.com">info@mindteck.com</Link>
          </li>
          <li>
            India Data Protection Officer and EU Representative: Mr. Ravi
            Ramaiah [<Link href="mailto:dpo@mindteck.com">dpo@mindteck.com</Link>]
          </li>
        </ul>
        <p className="text-md">
          Requests will be addressed within timelines prescribed under
          applicable law (e.g., 72 hours for significant data fiduciary
          verification under DPDP India, 30 days under GDPR, 45 days under
          CCPA).
        </p>

        <h3 className="text-xl font-semibold">
          12. Cookies and Tracking Technologies
        </h3>
        <p className="text-md">
          The Website may use cookies or similar technologies to enhance
          functionality and analyze usage. Where required by law, users will be
          provided with appropriate notice and choice mechanisms.
        </p>

        <h3 className="text-xl font-semibold">13. Do Not Track Signals</h3>
        <p className="text-md">
          The Website does not currently respond to browser "Do Not Track"
          signals. Data collection is limited to what is necessary for
          legitimate business purposes. We monitor evolving standards and may
          update this practice.
        </p>

        <h3 className="text-xl font-semibold">14. Updates to This Policy</h3>
        <p className="text-md">
          Mindteck reserves the right to update this Privacy Policy to reflect
          changes in applicable laws, regulatory requirements, technology, or
          business practices. Updates will be posted on this page, and continued
          use of the Website constitutes acceptance of the revised policy.
        </p>
      </div>
    </div>
  );
}
