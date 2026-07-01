import { FastifyInstance } from "fastify";
import { z } from "zod";
//
import { validate } from "../../Middleware/validation.middleware";
import { uploadSchema } from "../../utils/schema";
import { authHandlers } from "../auth/authHandlers";
import { bodHandlers } from "../boardOfDirectors/bodHandlers";
import { applicationHandlers } from "../career/application/applicationHandlers";
import {
  applicationCreateSchema,
  applicationSchema,
  JsonApplicationCreateSchema,
  JsonApplicationSchema,
} from "../career/application/applicationSchemas";
import { jobHandlers } from "../career/job/jobHandlers";
import { jobQuerystring } from "../career/job/jobSchemas";
import { caseStudyHandlers } from "../caseStudy/caseStudyHandle";
import { brochureHandlers } from "../brochure/brochureHandlers";
import { resourceCategoryHandlers } from "../resourceCategory/resourceCategoryHandlers";
import { contactHandlers } from "../contact/contactHandlers";
import { contactSchema, jsonContactSchema } from "../contact/contactSchemas";
import { annualReportHandlers } from "../investor/annualReport/annualReportHandlers";
import { financialInfoHandlers } from "../investor/financialInfo/financialInfoHandlers";
import { noticeHandlers } from "../investor/notice/noticeHandlers";
import { policyHandlers } from "../investor/policy/policyHandlers";
import { menuHandlers } from "../menu/menuHandlers";
import { officeHandlers } from "../office/officeHandlers";
import { pageHandlers } from "../page/pageHandlers";
import { partnerAndAllianceHandlers } from "../partnerAndAlliance/partnerAndAllianceHandlers";
import { pressReleaseHandlers } from "../pressRelease/pressReleaseHandlers";
import { sliderHandlers } from "../slider/sliderHandlers";
import { jsonLoginSchema, jsonVerifySchema, loginSchema, verifySchema } from "../user/userSchemas";
import { stockExchangeFilingHandlers } from "../investor/stockExchangeFilling/stockExchangeFillingHandlers";
import { PdfHandlers } from "../investor/pdf/pdfHandlers";
import { PdfWithTitleHandlers } from "../investor/pdfWithTitle/pdfWithTitleHandlers";
import { ShareHoldingPatternHandlers } from "../investor/shareholdingPattern/shareHoldingPatternHandlers";
import { CommitteeHandlers } from "../investor/committee/committeeHandlers";
import { SubsidiariesFinancialHandlers } from "../investor/subsidiariesFinancial/subsidiariesFinancialHandlers";
import { PostalBallotHandlers } from "../investor/postalBallot/postalBallotHandlers";
import { InvestorFeedbackSchema } from "../investor/investorFeedback/investorFeedbackSchemas";
import { investorFeedbackHandlers } from "../investor/investorFeedback/investorFeedbackHandlers";
import zodToJsonSchema from "zod-to-json-schema";
import { stockHandlers } from "../stock-price/stockPriceHandlers";
import { buyBackHandlers } from "../investor/buyBack/buyBackHandlers";
import { bodArray } from "../boardOfDirectors/bodSchemas";
import { tradingWindowHandlers } from "../investor/tradingWindow/tradingWindowHandlers";
import { unsubscribeHandlers } from "../unsubscribe/unsubscribeHandlers";
import { jsonUnsubscribeSchema, unsubscribeSchema } from "../unsubscribe/unsubscribeSchemas";

export function publicRoutes(app: FastifyInstance) {
  //AUTH
  app.post(
    "/auth/login",
    {
      schema: jsonLoginSchema,
      preHandler: [validate(loginSchema)],
      config:
        process.env.NODE_ENV === "production"
          ? {
              rateLimit: {
                max: 5,
                timeWindow: "1 minute",
              },
            }
          : undefined,
    },
    authHandlers.login,
  );

  app.post(
    "/auth/verify",
    {
      schema: jsonVerifySchema,
      preHandler: [validate(verifySchema)],
    },
    authHandlers.verify,
  );

  // CONTACT
  app.post(
    "/contact/create",
    {
      schema: jsonContactSchema(["Public"]),
      preHandler: [validate(contactSchema)],
    },

    contactHandlers.createContact,
  );

  app.post(
    "/unsubscribe/create",
    {
      schema: jsonUnsubscribeSchema,
      preHandler: [validate(unsubscribeSchema)],
    },
    unsubscribeHandlers.createUnsubscribe,
  );

  // PRESS RELEASE
  app.get(
    "/press-release/getAll",
    {
      schema: {
        tags: ["Public"],
      },
    },

    pressReleaseHandlers.getPressReleases,
  );

  // PAGE
  app.post(
    "/page/getTemplateByUrl",
    {
      schema: {
        tags: ["Public"],
        body: {
          type: "object",
          properties: {
            url: { type: "string", minLength: 1, maxLength: 100 },
          },
          required: ["url"],
        },
      },
      preHandler: [validate(z.object({ url: z.string().min(1).max(100) }))],
    },

    pageHandlers.getTemplateByUrl,
  );

  app.get(
    "/page/search",
    {
      schema: {
        tags: ["Public"],
        querystring: {
          type: "object",
          properties: {
            q: { type: "string", minLength: 2, maxLength: 100 },
            limit: { type: "integer", minimum: 1, maximum: 20 },
          },
          required: ["q"],
        },
      },
    },
    pageHandlers.searchPages,
  );

  // OFFICE
  app.get(
    "/office/getall",
    {
      schema: {
        tags: ["Public"],
      },
    },
    officeHandlers.getOffices,
  );

  // MAIN LOCATION
  app.get(
    "/main-location/getall/:locationId",
    {
      schema: {
        tags: ["Public"],
      },
    },

    officeHandlers.getOfficesByMainLocation,
  );

  // MENU
  app.get(
    "/menu/getallHierarchically/:position",
    {
      schema: {
        tags: ["Public"],
      },
    },

    menuHandlers.getMenusHierarchicallyByPosition,
  );

  //JOB
  app.get(
    "/job/getall-active",
    {
      schema: jobQuerystring(["Public"]),
    },
    jobHandlers.getJobActiveJobs,
  );

  app.get(
    "/job/get-unique-cities",
    {
      schema: {
        tags: ["Public"],
      },
    },

    jobHandlers.getUniqueCities,
  );

  app.get(
    "/job/:id",
    {
      schema: {
        tags: ["Public"],
      },
    },

    jobHandlers.getJobById,
  );

  //APPLICATION
  app.post(
    "/application/upload",
    {
      schema: uploadSchema(["Public"]),

      config:
        process.env.NODE_ENV === "production"
          ? {
              rateLimit: {
                max: 1,
                timeWindow: "1 day",
              },
            }
          : undefined,
    },
    applicationHandlers.uploadApplicationFile,
  );

  app.post(
    "/application/create",
    {
      schema: JsonApplicationCreateSchema(["Public"]),
      preHandler: [validate(applicationCreateSchema)],
    },

    applicationHandlers.createApplication,
  );

  app.get(
    "/bod/getall",
    {
      schema: {
        tags: ["Public"],
        querystring: {
          type: "object",
          properties: {
            category: {
              type: "string",
              enum: bodArray,
            },
          },
          required: [],
        },
      },
    },
    bodHandlers.getBodsByCategory,
  );

  app.get(
    "/bod/getById/:id",
    {
      schema: {
        tags: ["Public"],
      },
    },
    bodHandlers.getBodById,
  );

  app.get(
    "/partners-and-alliances/getall",
    {
      schema: {
        tags: ["Public"],
      },
    },
    partnerAndAllianceHandlers.getPartnerAndAlliances,
  );

  app.get(
    "/slider/getall",
    {
      schema: {
        tags: ["Public"],
      },
    },
    sliderHandlers.getSliders,
  );

  app.get(
    "/press-release/getallPublished",
    {
      schema: {
        tags: ["Public"],
      },
    },
    pressReleaseHandlers.getPublishedPressRelease,
  );

  app.get(
    "/press-release/:id",
    {
      schema: {
        tags: ["Public"],
      },
    },

    pressReleaseHandlers.getPressReleaseById,
  );

  app.get(
    "/press-release/getByTitle/:title",
    {
      schema: {
        tags: ["Public"],
      },
    },

    pressReleaseHandlers.getPressReleaseByTitle,
  );

  app.get(
    "/resource-category/getallActive",
    {
      schema: {
        tags: ["Public"],
      },
    },
    resourceCategoryHandlers.getActiveResourceCategories,
  );

  app.post(
    "/brochure/getByResourceCategory",
    {
      schema: {
        tags: ["Public"],
        body: {
          type: "object",
          properties: {
            categoryId: { type: "string" },
          },
          required: ["categoryId"],
        },
      },
      preHandler: [validate(z.object({ categoryId: z.string() }))],
    },
    brochureHandlers.getActiveBrochuresByResourceCategory,
  );

  app.get(
    "/brochure/getByTitle/:title",
    {
      schema: {
        tags: ["Public"],
      },
    },
    brochureHandlers.getActiveBrochureByTitle,
  );

  app.post(
    "/case-study/getallByCategories",
    {
      schema: {
        tags: ["Public"],
        body: {
          type: "object",
          properties: {
            categories: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: ["categories"],
        },
      },
      preHandler: [validate(z.object({ categories: z.array(z.string()) }))],
    },
    caseStudyHandlers.getActiveCaseStudiesByCategories,
  );
  app.get(
    "/case-study/getByTitle/:title",
    {
      schema: {
        tags: ["Public"],
      },
    },
    caseStudyHandlers.getActiveCaseStudyByTitle,
  );

  // Investor
  app.get(
    "/annual-report/getBySession",
    {
      schema: {
        tags: ["Public"],
        querystring: {
          type: "object",
          properties: {
            session: { type: "string" },
          },
        },
      },
    },
    annualReportHandlers.getBySession,
  );

  app.get(
    "/financial-info/getBySession",
    {
      schema: {
        tags: ["Public"],
        querystring: {
          type: "object",
          properties: {
            session: { type: "string" },
          },
        },
      },
    },
    financialInfoHandlers.getBySession,
  );

  app.get(
    "/policy/getall",
    {
      schema: {
        tags: ["Public"],
      },
    },
    policyHandlers.getPolicies,
  );

  app.get(
    "/notice/getBySession",
    {
      schema: {
        tags: ["Public"],
        querystring: {
          type: "object",
          properties: {
            session: { type: "string" },
          },
        },
      },
    },
    noticeHandlers.getBySession,
  );

  app.get(
    "/stock-exchange-filing/getBySession",
    {
      schema: {
        tags: ["Public"],
        querystring: {
          type: "object",
          properties: {
            session: { type: "string" },
          },
        },
      },
    },
    stockExchangeFilingHandlers.getBySession,
  );

  app.get(
    "/pdf/getall",
    {
      schema: {
        tags: ["Public"],
      },
    },
    PdfHandlers.getPdf,
  );

  app.get(
    "/pdf-with-title/getall",
    {
      schema: {
        tags: ["Public"],
      },
    },
    PdfWithTitleHandlers.getPdfWithTitle,
  );

  app.get(
    "/pdf-with-title/getall/:type",
    {
      schema: {
        tags: ["Public"],
      },
    },
    PdfWithTitleHandlers.getPdfWithTitleByType,
  );

  app.get(
    "/share-holding-pattern/getallBySession",
    {
      schema: {
        tags: ["Public"],
        querystring: {
          type: "object",
          properties: {
            session: { type: "string" },
          },
        },
      },
    },
    ShareHoldingPatternHandlers.getBySessionShareHoldingPattern,
  );

  app.get(
    "/committee/getallGrouped",
    {
      schema: {
        tags: ["Public"],
      },
    },
    CommitteeHandlers.getCommitteeGrouped,
  );

  app.get(
    "/subsidiaries-financial/getallBySession",
    {
      schema: {
        tags: ["Public"],
        querystring: {
          type: "object",
          properties: {
            session: { type: "string" },
          },
        },
      },
    },
    SubsidiariesFinancialHandlers.getBySessionSubsidiariesFinancial,
  );

  app.get(
    "/postal-ballot/getall",
    {
      schema: {
        tags: ["Public"],
      },
    },
    PostalBallotHandlers.getPostalBallot,
  );

  app.get(
    "/stock/getPrice",
    {
      schema: {
        tags: ["Public"],
      },
    },
    stockHandlers.getPrice,
  );

  app.post(
    "/investor-feedback/create",
    {
      schema: {
        tags: ["Public"],
        body: zodToJsonSchema(InvestorFeedbackSchema.extend({ token: z.string() }), { $refStrategy: "none" }),
        response: {
          200: zodToJsonSchema(z.object({ message: z.string() })),
        },
      },
      preHandler: [validate(InvestorFeedbackSchema.extend({ token: z.string() }))],
    },
    investorFeedbackHandlers.createInvestorFeedback,
  );

  app.get(
    "/buyback/getall",
    {
      schema: {
        tags: ["Public"],
      },
    },
    buyBackHandlers.getBuyBacks,
  );

  app.get(
    "/buyback/getByYear",
    {
      schema: {
        tags: ["Public"],
        querystring: {
          type: "object",
          properties: {
            year: { type: "string" },
          },
        },
      },
    },
    buyBackHandlers.getBuyBacksByYear,
  );

  app.get(
    "/trading-window/get",
    {
      schema: {
        tags: ["Public"],
      },
    },
    tradingWindowHandlers.getTradingWindow,
  );
}
