const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const path = require("path");
const { authenticator } = require("otplib");

dotenv.config({ path: path.join(__dirname, ".env") });

const username = process.env.ADMIN_USERNAME || process.argv[2] || "admin";
const password = process.env.ADMIN_PASSWORD || process.argv[3];
const role = process.env.ADMIN_ROLE || "SuperAdmin";
const fullName = process.env.ADMIN_FULLNAME || "Admin";
const email = process.env.ADMIN_EMAIL || "";
const totpSecretInput = process.env.ADMIN_TOTP_SECRET || process.argv[4] || "";
const totpGenerate = String(process.env.ADMIN_TOTP_GENERATE || "").toLowerCase() === "true";
const totpIssuer = process.env.ADMIN_TOTP_ISSUER || "Mindteck";
const totpLabel = process.env.ADMIN_TOTP_LABEL || username;

if (!password) {
  console.error(
    "Missing password. Set ADMIN_PASSWORD or pass as the 2nd argument."
  );
  process.exit(1);
}

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("Missing MONGO_URI in env (.env).");
  process.exit(1);
}

async function main() {
  const client = new MongoClient(uri);
  await client.connect();

  try {
    const db = client.db();
    const hashedPassword = await bcrypt.hash(password, 10);
    let totpSecret = totpSecretInput;
    let otpauthUrl = "";

    if (!totpSecret && totpGenerate) {
      totpSecret = authenticator.generateSecret();
      otpauthUrl = authenticator.keyuri(totpLabel, totpIssuer, totpSecret);
    }

    const setPayload = {
      password: hashedPassword,
      role,
      isActive: true,
    };

    if (totpSecret) {
      setPayload.totpSecret = totpSecret;
    }

    const result = await db.collection("user").updateOne(
      { username },
      {
        $set: setPayload,
        $setOnInsert: {
          username,
          fullName,
          email,
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    const action =
      result.upsertedCount > 0
        ? "created"
        : result.modifiedCount > 0
        ? "updated"
        : "unchanged";

    console.log(
      JSON.stringify(
        {
          username,
          action,
          matched: result.matchedCount,
          modified: result.modifiedCount,
          upserted: result.upsertedCount,
          totpConfigured: Boolean(totpSecret),
          otpauthUrl: otpauthUrl || undefined,
        },
        null,
        2
      )
    );
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
