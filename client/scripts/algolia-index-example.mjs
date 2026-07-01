import algoliasearch from "algoliasearch";

const appId = process.env.ALGOLIA_APP_ID;
const adminApiKey = process.env.ALGOLIA_ADMIN_KEY;
const indexName = process.env.ALGOLIA_INDEX_NAME || "pages";

if (!appId || !adminApiKey) {
  throw new Error("Missing ALGOLIA_APP_ID or ALGOLIA_ADMIN_KEY");
}

const records = [
  {
    objectID: "home",
    title: "Home",
    url: "/",
    description: "Mindteck home page",
  },
  {
    objectID: "resources",
    title: "Resources",
    url: "/resources",
    description: "Case studies, white papers and publications",
  },
];

async function run() {
  const client = algoliasearch(appId, adminApiKey);
  const index = client.initIndex(indexName);
  await index.saveObjects(records);
  console.log(`Indexed ${records.length} records into ${indexName}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
