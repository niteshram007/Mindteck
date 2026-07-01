import { Collection, MongoError, ObjectId } from "mongodb";
import { ContactType } from "./contactSchemas";
import CustomError from "../../error";
import { reCAPTCHA } from "../../utils/service";
import { sendNotificationEmail } from "../../utils/mailer";

const FORM_NOTIFICATION_EMAIL = "gnana.murthy@mindteck.com";

export type ContactDbType = Omit<ContactType, "token"> & {
  createdAt?: Date;
  updatedAt?: Date;
};

type UnsubscribeEmailRecord = {
  email: string;
};

const normalizeStoredEmail = (value: string | undefined) =>
  String(value || "").trim().toLowerCase();

const getEmailOptInValue = (entry: Partial<Pick<ContactDbType, "emailOptIn" | "marketingUpdates">>) =>
  typeof entry.emailOptIn === "boolean" ? entry.emailOptIn : Boolean(entry.marketingUpdates);

export const contactService = {
  async createContact(
    contactCollection: Collection<ContactDbType>,
    reqData: ContactType,
  ): Promise<{ message: string }> {
    try {
      const { token, ...formData } = reqData;

      const data = await reCAPTCHA(token);
      const minScore = 0.3;
      const score = typeof data?.score === "number" ? data.score : 1;

      if (!data?.success || score < minScore) {
        throw new CustomError("reCAPTCHA verification failed, please try again.");
      }

      const normalizedEmailOptIn = getEmailOptInValue(reqData);
      const contactData: ContactDbType = {
        ...formData,
        email: normalizeStoredEmail(formData.email),
        telephone: String(formData.telephone || "").trim(),
        smsOptIn: formData.smsOptIn === true,
        emailOptIn: normalizedEmailOptIn,
        marketingUpdates: normalizedEmailOptIn,
        termsCondition: formData.termsCondition === true,
        sourceType: formData?.sourceType || "Industries",
        sourcePage: formData?.sourcePage || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await contactCollection.insertOne(contactData);

      void sendNotificationEmail({
        to: FORM_NOTIFICATION_EMAIL,
        subject: "New Industries Form Submission",
        html: `
          <h3>New Industries Inquiry</h3>
          <p><b>Name:</b> ${contactData.fullname || "-"}</p>
          <p><b>Email:</b> ${contactData.email || "-"}</p>
          <p><b>Phone:</b> ${contactData.telephone || "-"}</p>
          <p><b>Job:</b> ${contactData.job || "-"}</p>
          <p><b>Company:</b> ${contactData.company || "-"}</p>
          <p><b>Country:</b> ${contactData.country || "-"}</p>
          <p><b>Page:</b> ${contactData.sourcePage || "-"}</p>
          <p><b>Policy Consent:</b> ${contactData.termsCondition ? "Yes" : "No"}</p>
          <p><b>SMS Opt-In:</b> ${contactData.smsOptIn ? "Yes" : "No"}</p>
          <p><b>Email Opt-In:</b> ${contactData.emailOptIn ? "Yes" : "No"}</p>
          <p><b>Message:</b> ${contactData.message || "-"}</p>
        `,
      }).catch((emailError) => {
        console.error("Failed to send industries notification email:", emailError);
      });

      return { message: "Form submitted successfully" };
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomError(error.message);
      } else if (error instanceof MongoError) {
        throw error;
      } else {
        throw new CustomError("Failed!, please try again.");
      }
    }
  },

  async getContacts(
    contactCollection: Collection<ContactDbType>,
    unsubscribeCollection: Collection<UnsubscribeEmailRecord>,
  ) {
    const [contacts, unsubscribedRows] = await Promise.all([
      contactCollection.find().toArray(),
      unsubscribeCollection.find({}, { projection: { _id: 0, email: 1 } }).toArray(),
    ]);

    const unsubscribedEmails = new Set(
      unsubscribedRows
        .map((entry) => String(entry?.email || "").trim().toLowerCase())
        .filter(Boolean),
    );

    return contacts.map((entry) => {
      const normalizedEmail = normalizeStoredEmail(entry?.email);
      const unsubscribed = unsubscribedEmails.has(normalizedEmail);
      const emailOptIn = getEmailOptInValue(entry);

      return {
        ...entry,
        smsOptIn: entry?.smsOptIn === true,
        emailOptIn: unsubscribed ? false : emailOptIn,
        marketingUpdates: emailOptIn,
        unsubscribed,
      };
    });
  },

  async getContactById(contactCollection: Collection<ContactDbType>, id: string) {
    const objectId = new ObjectId(id);
    return await contactCollection.findOne({ _id: objectId });
  },

  async deleteContact(
    contactCollection: Collection<ContactDbType>,
    contactId: string,
  ): Promise<{ message: string }> {
    const objectId = new ObjectId(contactId);
    const result = await contactCollection.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      throw new CustomError("Contact not found with ID " + objectId + ", please try again.");
    }

    return { message: "Deleted successfully" };
  },

  async deleteBulkContact(contactCollection: Collection<ContactDbType>, ids: string[]) {
    const idsToDelete = ids.map((id) => new ObjectId(id));
    const result = await contactCollection.deleteMany({ _id: { $in: idsToDelete } });

    if (result.deletedCount === 0) {
      throw new CustomError("failed to delete, please try again");
    }
    return { message: "Deleted successfully" };
  },
};
