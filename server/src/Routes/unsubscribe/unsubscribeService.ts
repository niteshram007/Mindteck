import { Collection } from "mongodb";
import CustomError from "../../error";
import { reCAPTCHA } from "../../utils/service";
import { UnsubscribeType } from "./unsubscribeSchemas";

export type UnsubscribeDbType = Omit<UnsubscribeType, "token"> & {
  createdAt?: Date;
  updatedAt?: Date;
  unsubscribedAt: Date;
};

type ContactSubscriptionRecord = {
  email?: string;
  emailOptIn?: boolean;
  marketingUpdates?: boolean;
  updatedAt?: Date;
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const unsubscribeService = {
  async createOrUpdateUnsubscribe(
    unsubscribeCollection: Collection<UnsubscribeDbType>,
    contactCollection: Collection<ContactSubscriptionRecord>,
    data: UnsubscribeType,
  ): Promise<{ message: string }> {
    try {
      const { token } = data;
      const captchaResult = await reCAPTCHA(token);
      const minScore = 0.3;
      const score = typeof captchaResult?.score === "number" ? captchaResult.score : 1;

      if (!captchaResult?.success || score < minScore) {
        throw new CustomError("reCAPTCHA verification failed, please try again.");
      }

      const email = String(data.email || "").trim().toLowerCase();
      const exactEmailMatch = new RegExp(`^${escapeRegExp(email)}$`, "i");
      const updatedAt = new Date();

      await Promise.all([
        unsubscribeCollection.updateOne(
          { email },
          {
            $set: {
              email,
              sourcePage: data?.sourcePage || "",
              unsubscribedAt: updatedAt,
              updatedAt,
            },
            $setOnInsert: {
              createdAt: updatedAt,
            },
          },
          { upsert: true },
        ),
        contactCollection.updateMany(
          { email: exactEmailMatch },
          {
            $set: {
              emailOptIn: false,
              marketingUpdates: false,
              updatedAt,
            },
          },
        ),
      ]);

      return {
        message:
          "You have successfully unsubscribed from further marketing emails from Mindteck.",
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new CustomError(error.message);
      }
      throw new CustomError("Failed to process unsubscribe request.");
    }
  },
};
