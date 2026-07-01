import { Db } from "mongodb";
import { logger } from "../utils/logger";
import { CollectionName } from "../constants/collection";

async function initializeCollections(db: Db) {
  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map((col) => col.name);

  if (!collectionNames.includes(CollectionName.menu)) {
    await db.createCollection(CollectionName.menu);
    logger.info("Collection MENU created");
  }
  await db.collection(CollectionName.menu).createIndex({ position: 1, parent: 1, order: 1 }, { unique: true });

  if (!collectionNames.includes(CollectionName.page)) {
    await db.createCollection(CollectionName.page);
    logger.info("Collection PAGE created");
  }
  await db.collection(CollectionName.page).createIndex({ url: 1 }, { unique: true });

  if (!collectionNames.includes(CollectionName.template)) {
    await db.createCollection(CollectionName.template);
    logger.info("Collection TEMPLATE created");
  }
  await db.collection(CollectionName.template).createIndex({ pageId: 1 }, { unique: true });

  if (!collectionNames.includes(CollectionName.user)) {
    await db.createCollection(CollectionName.user);
    logger.info("Collection USER created");
  }
  await db.collection(CollectionName.user).createIndex({ username: 1 }, { unique: true });

  if (!collectionNames.includes(CollectionName.slider)) {
    await db.createCollection(CollectionName.slider);
    logger.info("Collection SLIDER created");
  }
  await db.collection(CollectionName.slider).createIndex({ "items.id": 1 }, { unique: true });

  if (!collectionNames.includes(CollectionName.main_location)) {
    await db.createCollection(CollectionName.main_location);
    logger.info("Collection MAIN LOCATION created");
  }

  if (!collectionNames.includes(CollectionName.office)) {
    await db.createCollection(CollectionName.office);
    logger.info("Collection OFFICE created");
  }

  if (!collectionNames.includes(CollectionName.bod)) {
    await db.createCollection(CollectionName.bod);
    logger.info("Collection BOD created");
  }

  if (!collectionNames.includes(CollectionName.caseStudy)) {
    await db.createCollection(CollectionName.caseStudy);
    logger.info("Collection CASE STUDY created");
  }
  await db.collection(CollectionName.caseStudy).createIndex({ categoryId: 1 });

  if (!collectionNames.includes(CollectionName.resourceCategory)) {
    await db.createCollection(CollectionName.resourceCategory);
    logger.info("Collection RESOURCE CATEGORY created");
  }
  await db.collection(CollectionName.resourceCategory).createIndex({ order: 1, title: 1 });

  if (!collectionNames.includes(CollectionName.brochure)) {
    await db.createCollection(CollectionName.brochure);
    logger.info("Collection BROCHURE created");
  }
  await db.collection(CollectionName.brochure).createIndex({ resourceCategoryId: 1 });

  if (!collectionNames.includes(CollectionName.partnerAndAlliance)) {
    await db.createCollection(CollectionName.partnerAndAlliance);
    logger.info("Collection Partner And Alliance created");
  }
  await db.collection(CollectionName.partnerAndAlliance).createIndex({ order: 1 }, { unique: true });

  if (!collectionNames.includes(CollectionName.contact)) {
    await db.createCollection(CollectionName.contact);
    logger.info("Collection CONTACT created");
  }
  const contactCollection = db.collection(CollectionName.contact);
  const contactIndexes = await contactCollection.indexes();
  const contactEmailIndex = contactIndexes.find((index) => index.name === "email_1");
  if (contactEmailIndex?.unique) {
    await contactCollection.dropIndex("email_1");
    logger.info("Dropped unique CONTACT email index (email_1)");
  }
  await contactCollection.createIndex({ email: 1 });

  if (!collectionNames.includes(CollectionName.unsubscribe)) {
    await db.createCollection(CollectionName.unsubscribe);
    logger.info("Collection UNSUBSCRIBE created");
  }
  await db.collection(CollectionName.unsubscribe).createIndex({ email: 1 }, { unique: true });

  if (!collectionNames.includes(CollectionName.pressRelease)) {
    await db.createCollection(CollectionName.pressRelease);
    logger.info("Collection PRESS RELEASE created");
  }

  await db.collection(CollectionName.pressRelease).createIndex({ title: 1 }, { unique: true });

  if (!collectionNames.includes(CollectionName.jobCategory)) {
    await db.createCollection(CollectionName.jobCategory);
    logger.info("Collection JOB CATEGORY created");
  }

  if (!collectionNames.includes(CollectionName.job)) {
    await db.createCollection(CollectionName.job);
    logger.info("Collection JOB created");
  }

  await db.collection(CollectionName.job).createIndex({ jobType: 1 });
  await db.collection(CollectionName.job).createIndex({ experience: 1 });
  await db.collection(CollectionName.job).createIndex({ city: 1 });
  await db.collection(CollectionName.job).createIndex({ country: 1 });
  await db.collection(CollectionName.job).createIndex({ reviewedBy: 1 });
  await db.collection(CollectionName.job).createIndex({ userId: 1 });
  await db.collection(CollectionName.job).createIndex({ status: 1 });
  await db.collection(CollectionName.job).createIndex({ reviewStatus: 1 });
  await db.collection(CollectionName.job).createIndex({ jobCode: 1, unique: 1 });

  if (!collectionNames.includes(CollectionName.application)) {
    await db.createCollection(CollectionName.application);
    logger.info("Collection Application created");
  }
  await db.collection(CollectionName.application).createIndex({ firstName: 1 });
  await db.collection(CollectionName.application).createIndex({ lastName: 1 });
  await db.collection(CollectionName.application).createIndex({ gender: 1 });
  await db.collection(CollectionName.application).createIndex({ email: 1 });
  await db.collection(CollectionName.application).createIndex({ mobileNo: 1 });

  await db.collection(CollectionName.application).createIndex({ skillsSet: 1 });
  await db.collection(CollectionName.application).createIndex({ applicationStatus: 1 });
  await db.collection(CollectionName.application).createIndex({ "employmentDetailsSchema.salary": 1 });
  await db.collection(CollectionName.application).createIndex({ "employmentDetailsSchema.expectedCtc": 1 });
  await db.collection(CollectionName.application).createIndex({ "employmentDetailsSchema.totalExperience": 1 });

  if(!collectionNames.includes(CollectionName.investorPolicies)){
    await db.createCollection(CollectionName.investorPolicies);
    logger.info("Collection investorPolicies created");
  }

  if(!collectionNames.includes(CollectionName.investorFinancialInfo)){
    await db.createCollection(CollectionName.investorFinancialInfo);
    logger.info("Collection investorFinancialInfo created");
  }

  if(!collectionNames.includes(CollectionName.investorAnnualReport)){
    await db.createCollection(CollectionName.investorAnnualReport);
    logger.info("Collection investorAnnualReport created");
  }

  if(!collectionNames.includes(CollectionName.investorCommittee)){
    await db.createCollection(CollectionName.investorCommittee);
    logger.info("Collection investorCommittee created");
  }

  if(!collectionNames.includes(CollectionName.investorNotice)){
    await db.createCollection(CollectionName.investorNotice);
    logger.info("Collection investorNotice created");
  }


  if(!collectionNames.includes(CollectionName.investorStockExchangeFiling)){
    await db.createCollection(CollectionName.investorStockExchangeFiling);
    logger.info("Collection investorStockExchangeFiling created");
  }

  if(!collectionNames.includes(CollectionName.investorPdf)){
    await db.createCollection(CollectionName.investorPdf);
    logger.info("Collection investorPdf created");
  }
  
  if(!collectionNames.includes(CollectionName.investorPdfWithTitle)){
    await db.createCollection(CollectionName.investorPdfWithTitle);
    logger.info("Collection investorPdfWithTitle created");
  }

  if(!collectionNames.includes(CollectionName.investorShareHoldingPattern)){
    await db.createCollection(CollectionName.investorShareHoldingPattern);
    logger.info("Collection investorShareHoldingPattern created");
  }

  if(!collectionNames.includes(CollectionName.investorPostalBallot)){
    await db.createCollection(CollectionName.investorPostalBallot);
    logger.info("Collection investorPostalBallot created");
  }

  if(!collectionNames.includes(CollectionName.investorSubsidiariesFinancial)){
    await db.createCollection(CollectionName.investorSubsidiariesFinancial);
    logger.info("Collection investorSubsidiariesFinancial created");
  }

  if(!collectionNames.includes(CollectionName.investorFeedback)){
    await db.createCollection(CollectionName.investorFeedback);
    logger.info("Collection investor Feedback created");
  }


  if(!collectionNames.includes(CollectionName.investorBuyBack)){
    await db.createCollection(CollectionName.investorBuyBack);
    logger.info("Collection investor BuyBack created");
  }

  if(!collectionNames.includes(CollectionName.investorTradingWindow)){
    await db.createCollection(CollectionName.investorTradingWindow);
    logger.info("Collection investor Trading Window created");
  }
  await db.collection(CollectionName.investorTradingWindow).createIndex({ key: 1 }, { unique: true });

  logger.info("ALL Collection created");
}

export { initializeCollections };
