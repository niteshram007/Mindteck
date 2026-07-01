import React from "react";
import Image from "next/image";
import * as motion from "motion/react-client";
import { MainNavBar } from "@/app/navbar";
import Breadcrumbs from "../Breadcrumbs";
import { GeometricShapes } from "@/components/motion/geomatric-shapes";
import BannerImage from "../../assets/images/banners-and-bg/privacypolicyBanner.jpg";
import { varFade } from "@/lib/animate";
import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/terms-of-use");

const INTRO_PARAGRAPHS = [
  'The use of any product, service or feature (the "Materials") available through the internet websites accessible at www.mindteck.com (the "Website") by any user of the Website ("User" or "You" or "Your" hereafter) shall be governed by the following terms of use. The following terms and conditions will be deemed to have been accepted by the User on usage of the Website. You are requested to read them carefully before you use the services of this site.',
  "The term User shall refer to the user who is browsing the Website.",
  'This Website is provided by Mindteck (India) Limited (hereinafter referred to as "Mindteck"), a company incorporated under the Companies Act, 1956 of India, having its registered office at A.M.R. Tech Park, Block 1, 3rd Floor, #664, 23/24, Hosur Main Road, Bommanahalli, Bangalore 560068, Karnataka, India and shall be used for informational purposes only. By using the Website or downloading Materials from the Website, You hereby agree to abide by the terms and conditions set forth in this Terms of Use. In the event of You not agreeing to these terms and conditions, You are requested by Mindteck not to use the Website or download Materials from the Website. If there is a conflict between the Terms of Use and terms of use posted for a specific area of the Website, the latter shall have precedence with respect to your use of that area of the Website.',
  "This Website, including all Materials present (excluding any applicable third party materials), is the property of Mindteck and Mindteck retains all rights, title or interest, including all intellectual property laws in such Materials.",
  "Mindteck has business relationships with thousands of customers, suppliers, governments, and others. For convenience and simplicity, words like joint venture, partnership, and partner are used to indicate business relationships involving common activities and interests, and those words may not indicate precise legal relationships.",
];

const SECTIONS = [
  {
    title: "Website Similarity Disclaimer",
    paragraphs: [
      "Mindteck respects the intellectual property rights of others and is committed to maintaining originality in the design, structure, layout, and content of its websites. If any aspect of the Mindteck websites, including without limitation the design, layout, structure, features, functionality, or content, appears similar to any other website, such similarity is purely unintentional and coincidental in nature. Mindteck does not knowingly replicate, imitate, or infringe upon the intellectual property rights of any third party. Any resemblance, if identified, shall be deemed accidental and unintended.",
    ],
  },
  {
    title: "1. Limited License",
    paragraphs: [
      "This Website contains proprietary notices and copyright information, the terms of which must be observed and followed. Subject to the terms and conditions set forth in these Terms of Use, Mindteck grants You a non-exclusive, non-transferable, limited copyright license to access, and display this Website and the Materials thereon provided you comply with these Terms of Use, and all copyright, trademark, and other proprietary notices remain intact. You agree not to interrupt or attempt to interrupt the operation of the Website in any manner.",
      "You shall not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, products or services obtained from this Website. Except for the limited permission in the preceding paragraph, Mindteck does not grant you any express or implied rights or licenses under any patents, trademarks, copyrights, or other proprietary or intellectual property rights. You may not mirror any of the content from this site on another web site or in any other media.",
      "Any software and other materials that are made available for downloading, access, or other use from this site with their own license terms will be governed by such terms, conditions, and notices. Your failure to comply with such terms or any of the terms on this site will result in automatic termination of any rights granted to you, without prior notice, and you must immediately destroy all copies of downloaded materials in your possession, custody or control.",
    ],
  },
  {
    title: "2. Third Party Content",
    paragraphs: [
      'The Website makes information of third parties available, including articles, analyst reports, news reports, tools to facilitate calculation, company information and data about financial markets, including any regulatory authority and other financial markets and other data from external sources (the "Third Party Content"). You acknowledge and agree that the Third Party Content is not created or endorsed by Mindteck.',
      "The Website may provide links to web sites and access to content, products and services from third parties, including users, advertisers, affiliates and sponsors of the Website. You agree that Mindteck is not responsible for the availability of, and content provided on, third party web sites. The User is requested to peruse the policies posted by other web sites regarding privacy and other topics before use. Any personal data processing by such third parties shall be governed by their respective privacy policies.",
      "Mindteck is not responsible for Third Party Content accessible through the Website, including opinions, advice, statements and advertisements, and User shall bear all risks associated with the use of such content including any intellectual property infringement claim by third parties. Mindteck is not responsible for any loss or damage of any sort User may incur from dealing with any third party or Third Party Content.",
    ],
  },
  {
    title: "3. Confidential Information",
    paragraphs: [
      "Mindteck does not want to receive confidential or proprietary information from you through our Website. Please note that any information or material sent to Mindteck will be deemed not to be confidential. By sending Mindteck any information or material, you grant Mindteck an unrestricted, irrevocable license to copy, reproduce, publish, upload, post, transmit, distribute, publicly display, perform, modify, create derivative works from, and otherwise freely use, those materials or information. You also agree that Mindteck is free to use any ideas, concepts, know-how, or techniques that you send us for any purpose.",
      "However, we will not release your name or otherwise publicise the fact that you submitted materials or other information to us unless:",
    ],
    bullets: [
      "(a) we obtain your permission to use your name;",
      "(b) we first notify you that the materials or other information you submit to a particular part of this site will be published or otherwise used with your name on it; or",
      "(c) we are required to do so by law.",
    ],
    tailParagraphs: [
      "Personally-identifiable information that you submit to Mindteck for the purpose of receiving products or services will be handled in accordance with our privacy policies. Please refer to the Mindteck Privacy Policy for more information regarding our privacy practices.",
    ],
  },
  {
    title: "4. No Warranties",
    paragraphs: [
      'This website, the information and materials on the site, and any software made available on the Website, are provided "as is" without any representation or warranty, express or implied, of any kind, including, but not limited to, warranties of merchantability, non-infringement, or fitness for any particular purpose. There is no warranty of any kind, express or implied, regarding third party content. In spite of Mindteck\'s best endeavors, there is no warranty on behalf of Mindteck that this Website will be free of any computer viruses. Mindteck shall have no responsibility for any damage to User\'s computer system or loss of data that results from the download of any content, materials, information from Website. Some jurisdictions do not allow for the exclusion of implied warranties, so the above exclusions may not apply to you.',
      "Mindteck makes no warranty that:",
    ],
    bullets: [
      "(a) the Website will meet your requirements;",
      "(b) Website will be available on an uninterrupted, timely, secure, or error-free basis;",
      "(c) the results that may be obtained from the use of the website or any services offered through the Website will be accurate or reliable.",
    ],
  },
  {
    title: "5. Limitation of Damages",
    paragraphs: [
      "TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL MINDTECK BE LIABLE TO ANY PARTY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES OF ANY TYPE WHATSOEVER RELATED TO OR ARISING FROM THIS WEB SITE OR ANY USE OF THIS WEB SITE, OR OF ANY SITE OR RESOURCE LINKED TO, REFERENCED, OR ACCESSED THROUGH THIS WEB SITE, OR IN THE PRODUCTS, ANY CLAIM ATTRIBUTABLE TO ERRORS, OMISSIONS, OR OTHER INACCURACIES IN THE PRODUCT OR INTERPRETATIONS THEREOF OR FOR THE USE OR DOWNLOADING OF, OR ACCESS TO, ANY MATERIALS, INFORMATION, PRODUCTS, OR SERVICES, INCLUDING, WITHOUT LIMITATION, ANY LOST PROFITS, BUSINESS INTERRUPTION, LOST SAVINGS OR LOSS OF PROGRAMS OR OTHER DATA, EVEN IF MINDTECK IS EXPRESSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. THIS EXCLUSION AND WAIVER OF LIABILITY APPLIES TO ALL CAUSES OF ACTION, WHETHER BASED ON CONTRACT, WARRANTY, TORT, OR ANY OTHER LEGAL THEORIES.",
    ],
  },
  {
    title: "6. Disclaimer",
    paragraphs: [
      "The website may contain inaccuracies and typographical and clerical errors. Mindteck expressly disclaims any obligation(s) to update this website or any of the materials on this website. Mindteck does not warrant the accuracy, adequacy or completeness of the materials or the reliability of any advice, opinion, statement or other information displayed or distributed through the Website. You acknowledge that any reliance on any such opinion, advice, statement, memorandum, or information shall be at your sole risk.",
      "Mindteck reserves the right, in its sole discretion, to correct any errors or omissions in any portion of the Website. Mindteck may make any other changes to the Website, the materials and the products, programs, services or prices (if any) described in the Website at any time without notice. This Website is for informational purposes only and should not be construed as technical advice of any kind.",
      "If any term in this Terms of Use is found by competent judicial authority to be unenforceable in any respect, the validity of the remainder of this Terms of Use will be unaffected, provided that such unenforceability does not materially affect the parties' rights under this Terms of Use.",
    ],
  },
  {
    title: "7. Lawful and/or Prohibited Use of the Website",
    paragraphs: [
      "As a condition of Your use of the Website, You shall not use the Website for any purpose(s) that is unlawful or prohibited by the Terms of Use. You shall not use the Website in any manner that could damage, disable, overburden, or impair any Mindteck server, or the network(s) connected to any Mindteck server, or interfere with any other party's use and enjoyment of any services associated with the Website.",
      "You shall not attempt to gain unauthorized access to any section of the Website, other accounts, computer systems or networks connected to any Mindteck server or to any of the services associated with the Website, through hacking, password mining or any other means. You shall not obtain or attempt to obtain any Materials or information through any means not intentionally made available through the Website.",
    ],
  },
  {
    title: "8. Indemnity",
    paragraphs: [
      "You agree to indemnify and hold harmless Mindteck, its subsidiaries and affiliates from any claim, cost, expense, judgment or other loss relating to Your use, or misuse of the content and services provided through this Website in any manner, including without limitation of the foregoing, any action You take which is in violation of the terms and conditions of these Terms of Use and against any applicable law. This provision shall survive any termination of User access by Mindteck at any point in time.",
    ],
  },
  {
    title: "9. Changes",
    paragraphs: [
      "Mindteck reserves the rights, at its sole discretion, to change, modify, add or remove any portion of these Terms of Use in whole or in part, at any time. Changes in these Terms of Use will be effective immediately when notice of such change is posted. Your continued use of the Website after any changes to these Terms of Use are posted will be considered acceptance of those changes.",
      "Mindteck may terminate, change, suspend or discontinue any aspect of the Website, including the availability of any feature(s) of the Website, at any time. Mindteck may also impose limits on certain features and services or restrict Your access to certain sections or all of the Website without notice or liability. You hereby acknowledge and agree that Mindteck may terminate the authorization, rights and license given above at any point of time at its own sole discretion and upon such termination, You shall immediately destroy all Materials.",
    ],
  },
  {
    title: "10. International Users and Choice of Law",
    paragraphs: [
      "This Site is controlled, operated and administered by Mindteck from its offices within India. Mindteck makes no representation that Materials on this Website are appropriate or available for use at any other location(s) outside India. Any access to this Website from territories where their contents are illegal is prohibited. You may not use the Website or export the Materials in violation of any applicable export laws and regulations. If You access this Website from a location outside India, You are responsible for compliance with all local laws.",
      "These Terms of Use shall be governed by the laws of India, without giving effect to its conflict of laws provisions. You agree that the appropriate court(s) in Bangalore, India, will have the exclusive jurisdiction to resolve all disputes arising under these Terms of Use and You hereby consent to personal jurisdiction in such forum.",
      "These Terms of Use constitutes the entire agreement between Mindteck and You with respect to Your use of the Website. Any claim You may have with respect to Your use of the Website must be commenced within one (1) year of the cause of action. If any provision(s) of this Terms of Use is held by a court of competent jurisdiction to be contrary to law then such provision(s) shall be severed from this Terms of Use and the other remaining provisions of this Terms of Use shall remain in full force and effect.",
    ],
  },
];

export default function TermsOfUsePage() {
  return (
    <div>
      <div className="bg-gray-100 font-inter pt-2">
        <div className="container relative">
          <hr className="border-t-[3px] rounded-sm border-secondary w-full absolute top-[-8px] left-0 right-0 m-auto" />
        </div>
        <GeometricShapes />
        <section className="mt-3 z-10 relative">
          <MainNavBar hiddenSidebar />
          <div className="container">
            <Image
              src={BannerImage}
              alt="Terms of Use"
              priority
              className="h-full w-full object-cover max-h-[360px]"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <Breadcrumbs paths={["Terms of Use"]} />
            <motion.h1
              viewport={{ once: true }}
              initial="hidden"
              whileInView="visible"
              variants={varFade().inLeft}
              className="font-athelas text-secondary text-3xl sm:text-4xl md:text-5xl pb-3"
            >
              Terms of Use
            </motion.h1>
          </div>
        </section>
      </div>

      <section className="container pt-10 pb-20 space-y-6 text-[15px] leading-7">
        {INTRO_PARAGRAPHS.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        {SECTIONS.map((section) => (
          <div key={section.title} className="space-y-3">
            <h2 className="text-xl font-semibold text-primary">{section.title}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={`${section.title}-${paragraph}`}>{paragraph}</p>
            ))}
            {Array.isArray(section.bullets) && section.bullets.length > 0 ? (
              <ul className="list-disc pl-6 space-y-1">
                {section.bullets.map((bullet) => (
                  <li key={`${section.title}-${bullet}`}>{bullet}</li>
                ))}
              </ul>
            ) : null}
            {section.tailParagraphs?.map((paragraph) => (
              <p key={`${section.title}-tail-${paragraph}`}>{paragraph}</p>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}
