import { getStaticPageMetadata } from "@/app/utils/staticPageMetadata";

export const metadata = getStaticPageMetadata("/investors");

export default function page() {
  return (
    <div className="font-inter">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
        <div>
          <h2 className="text-xl font-semibold">Nodal Officer</h2>
          <p className="text-[18px] font-[500]">
            For any shareholder and investor related query, grievance or
            assistance, please contact Nodal Officer:
          </p>
          <div className="mt-5">
            <p className="text-[18px]">
              <span className="font-semibold">Mr. Sathya Raja G.</span>
              <br />
              Associate Vice President, Legal and Company Secretary
              <br />
              <span className="font-semibold">Mindteck (India) Limited</span>
              <br />
              (CIN:L30007KA1991PLC039702)
              <br />
              AMR Tech Park, Block-1, 3rd Floor
              <br />
              #664, 23/24, Hosur Main Road,
              <br />
              Bommanahalli Bengaluru - 560068
              <br />
              Tel: +91 80 4154 8013
              <br />
              Email: sathya.raja@mindteck.com
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">
            Registrar and Share Transfer Agents
          </h2>

          <div>
            <p>
              <span className="font-[600] ">
                MUFG Intime India Private Limited
                <br />
                (Formerly Link Intime India Private Limited)
              </span>
              <br />
              C 101, 247 Park, LBS Road,
              <br />
              Vikhroli West, Mumbai - 400083
              <br />
              Tel: +91 22 49186000 - 79
              <br />
              Fax: +91 022 - 4918 6060
              <br />
              Email:{" "}
              <a
                href="mailto:investor.helpdesk@in.mpms.mufg.com"
                className="hover:text-primary hover:underline"
              >
                investor.helpdesk@in.mpms.mufg.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <p className="text-xl font-[300] mt-10 leading-8">
        The contact details of Authorised Key Managerial Personnel (KMPs) for
        the purpose of determining Materiality of an Event or Information and
        for the purpose of making disclosures to the Stock Exchange under
        Sub-Regulation 5 of Regulation 30 of SEBI (Listing Obligations and
        Disclosure Requirements) Regulations, 2015.
      </p>
      <div className="mt-5">
        <div>
          <p className="text-[18px]">
            <span className="font-semibold">Mr. Sathya Raja G.</span>
            <br />
            AVP-Legal & Company Secretary and Compliance Officer
            <br />
            Phone: 080-4154 8000
            <br />
            Email: sathya.raja@mindteck.com
          </p>
        </div>
      </div>
    </div>
  );
}
