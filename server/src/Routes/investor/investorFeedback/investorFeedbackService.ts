import { Collection, ObjectId } from "mongodb";
//
import CustomError from "../../../error";
import { InvestorFeedbackType } from "./investorFeedbackSchemas";
import { reCAPTCHA } from "../../../utils/service";
import { sendNotificationEmail } from "../../../utils/mailer";

const INVESTOR_NOTIFICATION_EMAIL = "gnana.murthy@mindteck.com";

export const investorFeedbackService = {
  async createInvestorFeedback(investorFeedbackCollection: Collection<InvestorFeedbackType>, newFeedback: InvestorFeedbackType&{token:string}): Promise<{ message: string }> {
    const {token, ...data} = newFeedback;
    if(!token){
      throw new CustomError("Token is missing");
    }
    
    const tokenData = await reCAPTCHA(token);
    if (!tokenData.success || tokenData.score < 0.8) {
      throw new CustomError("reCAPTCHA verification, failed, please try again.");
    }

    const investorFeedbackData = {
      ...data,
      sourceType: data?.sourceType || "Investors",
      sourcePage: data?.sourcePage || "",
      createdAt: new Date(),
    };

    await investorFeedbackCollection.insertOne(investorFeedbackData);

    try {
      await sendNotificationEmail({
        to: INVESTOR_NOTIFICATION_EMAIL,
        subject: "New Investor Feedback Submission",
        html: `
          <h3>New Investor Feedback</h3>
          <p><b>First Name:</b> ${investorFeedbackData.firstName || "-"}</p>
          <p><b>Last Name:</b> ${investorFeedbackData.lastName || "-"}</p>
          <p><b>Email:</b> ${investorFeedbackData.email || "-"}</p>
          <p><b>Telephone:</b> ${investorFeedbackData.telephone || "-"}</p>
          <p><b>Postal Address:</b> ${investorFeedbackData.postalAddress || "-"}</p>
          <p><b>Disclosure of Information:</b> ${investorFeedbackData.disclosureOfInformation || "-"}</p>
          <p><b>Clarity and Transparency:</b> ${investorFeedbackData.clarityAndTransparency || "-"}</p>
          <p><b>Response Time:</b> ${investorFeedbackData.responseTime || "-"}</p>
          <p><b>Timely Information:</b> ${investorFeedbackData.timelyInformation || "-"}</p>
          <p><b>Satisfaction with Share Transfer Agent:</b> ${investorFeedbackData.satisfactionWithShareTransferAgent || "-"}</p>
          <p><b>Satisfaction with Investor Relations:</b> ${investorFeedbackData.satisfactionWithInvestorRelations || "-"}</p>
          <p><b>Overall Satisfaction as Investor:</b> ${investorFeedbackData.overallSatisfactionAsInvestor || "-"}</p>
          <p><b>Page:</b> ${investorFeedbackData.sourcePage || "-"}</p>
          <p><b>Source Type:</b> ${investorFeedbackData.sourceType || "-"}</p>
          <p><b>Comments:</b> ${investorFeedbackData.comments || "-"}</p>
          <p><b>Submitted At:</b> ${investorFeedbackData.createdAt?.toISOString?.() || "-"}</p>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send investor notification email:", emailError);
    }

    return { message: "Created successfully" };
  },



  async getInvestorFeedBack(investorFeedbackCollection: Collection<InvestorFeedbackType>) {
    return await investorFeedbackCollection.find().toArray();
  },


  async deleteInvestorFeedbackById(investorFeedbackCollection: Collection<InvestorFeedbackType>, id: string) {
    const objectId = new ObjectId(id);
    const result = await investorFeedbackCollection.deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      throw new CustomError("Investor Feedback not found with id " + id + ", please try again");
    }
    return { message: "Deleted successfully" };
  },

  async deleteInvestorBulkFeedback(investorFeedbackCollection: Collection<InvestorFeedbackType>, ids: string[]) {
    const idsToDelete = ids.map(id => new ObjectId(id));
    const result = await investorFeedbackCollection.deleteMany({ _id: { $in: idsToDelete } });

    if(result.deletedCount === 0 ){
      throw new CustomError("failed to delete Investor Feedback, please try again");
    }
    return { message: "Deleted successfully" };
  },
};
