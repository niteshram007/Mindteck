const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const path = require("path");
const { authenticator } = require("otplib");

dotenv.config({ path: path.join(__dirname, ".env") });

const username = process.argv[2] || "admin";
const code = process.argv[3];

if (!code) {
  console.error("Usage: node check-totp.js <username> <6-digit-code>");
  process.exit(1);
}

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("Missing MONGO_URI in env (.env).");
  process.exit(1);
}

(async () => {
  const client = new MongoClient(uri);
  await client.connect();
  try {
    const db = client.db();
    const user = await db.collection("user").findOne({ username });
    const secret = user && user.totpSecret ? user.totpSecret : null;
    const ok = secret ? authenticator.check(code, secret) : false;
    const delta = secret ? authenticator.checkDelta(code, secret) : null;

    console.log(
      JSON.stringify(
        {
          username,
          serverTime: new Date().toISOString(),
          secretPresent: Boolean(secret),
          code,
          ok,
          delta,
        },
        null,
        2
      )
    );
  } finally {
    await client.close();
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
