const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const username = process.env.CHECK_USERNAME || process.argv[2] || "admin";
const password = process.env.CHECK_PASSWORD || process.argv[3];

if (!password) {
  console.error(
    "Missing password. Set CHECK_PASSWORD or pass as the 2nd argument."
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
    const user = await db.collection("user").findOne({ username });

    console.log(
      JSON.stringify(
        {
          found: Boolean(user),
          username,
          role: user?.role || null,
          isActive: user?.isActive ?? null,
          hashPrefix: user?.password?.slice(0, 4) || null,
          hashLength: user?.password?.length || null,
        },
        null,
        2
      )
    );

    if (!user?.password) {
      process.exit(2);
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    console.log(JSON.stringify({ passwordMatches }, null, 2));
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

