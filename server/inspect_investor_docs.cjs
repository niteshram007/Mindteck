const fs = require("fs");
const { MongoClient } = require("mongodb");

function loadEnv(file) {
  const out = {};
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#")) continue;
    const i = line.indexOf("=");
    if (i === -1) continue;
    out[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return out;
}

(async () => {
  const env = loadEnv(".env");
  const client = new MongoClient(env.MONGO_URI);
  await client.connect();
  const db = client.db();

  const pdf = await db.collection("investor_pdf").find({}, { projection: { _id: 0, type: 1, file: 1, isActive: 1 } }).toArray();
  const policies = await db.collection("investor_policies").find({}, { projection: { _id: 0, title: 1, file: 1, image: 1, isActive: 1 } }).toArray();

  console.log("investor_pdf count:", pdf.length);
  console.log(JSON.stringify(pdf, null, 2));
  console.log("investor_policies count:", policies.length);
  console.log(JSON.stringify(policies, null, 2));

  await client.close();
})();
