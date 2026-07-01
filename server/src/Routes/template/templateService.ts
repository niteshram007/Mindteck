// templateService.ts
import { Collection, ObjectId } from "mongodb";
import { join } from "path";
import { Csr, CsrUpdate, Eds, EdsUpdate, Iot, IotUpdate, ItTalent, ItTalentUpdate, SmartCity, SmartCityUpdate, TemplateCreateType, TemplateUpdateType, WhoWeAre, WhoWeAreUpdate } from "./templateSchemas";
import { deleteFile, moveFile } from "../../utils/fileHandler";
import { UPLOAD_DIR, UPLOAD_TEMP_DIR } from "../../constants";
import CustomError from "../../error";

/* ---------- Shared Helpers ---------- */
const getPaths = (obj: any) =>
  [obj.first?.path, obj.second?.path, obj.third?.path, obj.four?.path, obj.five?.path, obj.six?.path].filter(Boolean);

const getImagePaths = (csrArray: { images: { path: string; title?: string }[] }[]) =>
  csrArray.flatMap((csr) => csr.images.map((im) => im.path)).filter(Boolean);

function addFilesToUpdate(
  reqPaths: string[],
  oldPaths: string[],
  updatedFiles: { updated: string; old: string }[],
) {
  for (let i = 0; i < reqPaths.length; i++) {
    if (reqPaths[i] !== oldPaths[i]) {
      updatedFiles.push({ old: oldPaths[i], updated: reqPaths[i] });
    }
  }
}

/* ---------- SMART CITY ---------- */
async function createSmartCity(templateCollection: Collection<SmartCity>, data: SmartCity) {
  for (const path of getPaths(data)) {
    await moveFile(join(UPLOAD_TEMP_DIR, path), join(UPLOAD_DIR, path));
  }
  const ack = await templateCollection.insertOne({ ...data });
  if (!ack.acknowledged) throw new CustomError("Failed to create Smart City template.");
  return { message: "Created successfully" };
}

async function updateSmartCity(templateCollection: Collection<SmartCityUpdate>, data: SmartCityUpdate, oldData: SmartCityUpdate) {
  const updatedFiles: { updated: string; old: string }[] = [];
  addFilesToUpdate(getPaths(data), getPaths(oldData), updatedFiles);

  for (const file of updatedFiles) {
    if (file.old) await deleteFile(join(UPLOAD_DIR, file.old));
    if (file.updated) await moveFile(join(UPLOAD_TEMP_DIR, file.updated), join(UPLOAD_DIR, file.updated));
  }

  const ack = await templateCollection.updateOne(
    { pageId: new ObjectId(data.pageId) },
    { $set: { ...data,  } },
  );
  if (!ack.acknowledged) throw new CustomError("Failed to update Smart City template.");
  return { message: "Updated successfully" };
}

/* ---------- IT TALENT ---------- */
const getItTalentPaths = (obj: any) =>
  [obj.first?.path, obj.second?.path, obj.third?.path, obj.four?.path, obj.five?.path].filter(Boolean);

async function createItTalent(templateCollection: Collection<ItTalent>, data: ItTalent) {
  for (const path of getItTalentPaths(data)) {
    await moveFile(join(UPLOAD_TEMP_DIR, path), join(UPLOAD_DIR, path));
  }
  const ack = await templateCollection.insertOne({ ...data,   });
  if (!ack.acknowledged) throw new CustomError("Failed to create It Talent template.");
  return { message: "Created successfully" };
}

async function updateItTalent(templateCollection: Collection<ItTalentUpdate>, data: ItTalentUpdate, oldData: ItTalentUpdate) {
  const updatedFiles: { updated: string; old: string }[] = [];
  addFilesToUpdate(getItTalentPaths(data), getItTalentPaths(oldData), updatedFiles);

  for (const file of updatedFiles) {
    if (file.old) await deleteFile(join(UPLOAD_DIR, file.old));
    if (file.updated) await moveFile(join(UPLOAD_TEMP_DIR, file.updated), join(UPLOAD_DIR, file.updated));
  }

  const ack = await templateCollection.updateOne(
    { pageId: new ObjectId(data.pageId) },
    { $set: { ...data,  } },
  );
  if (!ack.acknowledged) throw new CustomError("Failed to update It Talent template.");
  return { message: "Updated successfully" };
}

/* ---------- CSR ---------- */
async function createCsr(templateCollection: Collection<Csr>, data: Csr) {
  for (const path of getImagePaths(data.csr)) {
    await moveFile(join(UPLOAD_TEMP_DIR, path), join(UPLOAD_DIR, path));
  }
  const ack = await templateCollection.insertOne({ ...data,   });
  if (!ack.acknowledged) throw new CustomError("Failed to create CSR template.");
  return { message: "Created successfully" };
}

async function updateCsr(templateCollection: Collection<CsrUpdate>, data: CsrUpdate, oldData: CsrUpdate) {
  const updatedFiles: { updated: string; old: string }[] = [];
  addFilesToUpdate(getImagePaths(data.csr), getImagePaths(oldData.csr), updatedFiles);

  for (const file of updatedFiles) {
    if (file.old) await deleteFile(join(UPLOAD_DIR, file.old));
    if (file.updated) await moveFile(join(UPLOAD_TEMP_DIR, file.updated), join(UPLOAD_DIR, file.updated));
  }

  const ack = await templateCollection.updateOne(
    { pageId: new ObjectId(oldData.pageId) },
    { $set: { ...data,  } },
  );
  if (!ack.acknowledged) throw new CustomError("Failed to update CSR template.");
  return { message: "Updated successfully" };
}

/* ---------- WHO WE ARE ---------- */
const getWhoWeArePaths = (obj: any) => {
  const paths = [obj.first?.path, obj.second?.path];
  if (obj.historyPath) paths.push(obj.historyPath);
  return paths.filter(Boolean);
};

async function createWhoWeAre(templateCollection: Collection<WhoWeAre>, data: WhoWeAre) {
  for (const path of getWhoWeArePaths(data)) {
    await moveFile(join(UPLOAD_TEMP_DIR, path), join(UPLOAD_DIR, path));
  }
  const ack = await templateCollection.insertOne({ ...data,   });
  if (!ack.acknowledged) throw new CustomError("Failed to create WHO_WE_ARE template.");
  return { message: "Created successfully" };
}

async function updateWhoWeAre(templateCollection: Collection<WhoWeAreUpdate>, data: WhoWeAreUpdate, oldData: WhoWeAreUpdate) {
  const updatedFiles: { updated: string; old: string }[] = [];
  addFilesToUpdate(getWhoWeArePaths(data), getWhoWeArePaths(oldData), updatedFiles);

  for (const file of updatedFiles) {
    if (file.old) await deleteFile(join(UPLOAD_DIR, file.old));
    if (file.updated) await moveFile(join(UPLOAD_TEMP_DIR, file.updated), join(UPLOAD_DIR, file.updated));
  }

  const ack = await templateCollection.updateOne(
    { pageId: new ObjectId(data.pageId) },
    { $set: { ...data,  } },
  );
  if (!ack.acknowledged) throw new CustomError("Failed to update WHO_WE_ARE template.");
  return { message: "Updated successfully" };
}
const getEdsPaths = (obj: any) => [obj.one?.path,  obj.three?.path, obj.four?.path, obj.five?.path, obj.six?.path,  obj.six?.seven].filter(Boolean);
/* ---------- EDS ---------- */
async function createEds(templateCollection: Collection<Eds>, data: Eds) {
  for (const path of getEdsPaths(data)) {
    await moveFile(join(UPLOAD_TEMP_DIR, path), join(UPLOAD_DIR, path));
  }
  const ack = await templateCollection.insertOne({ ...data });
  if (!ack.acknowledged) throw new CustomError("Failed to create Eds template.");
  return { message: "Created successfully" };
}

async function updateEds(templateCollection: Collection<EdsUpdate>, data: EdsUpdate, oldData: EdsUpdate) {
  const updatedFiles: { updated: string; old: string }[] = [];
  addFilesToUpdate(getEdsPaths(data), getEdsPaths(oldData), updatedFiles);

  for (const file of updatedFiles) {
    if (file.old) await deleteFile(join(UPLOAD_DIR, file.old));
    if (file.updated) await moveFile(join(UPLOAD_TEMP_DIR, file.updated), join(UPLOAD_DIR, file.updated));
  }

  const ack = await templateCollection.updateOne(
    { pageId: new ObjectId(data.pageId) },
    { $set: { ...data,  } },
  );
  if (!ack.acknowledged) throw new CustomError("Failed to update Eds template.");
  return { message: "Updated successfully" };
}

/* ---------- IOT ---------- */
async function createIot(templateCollection: Collection<Iot>, data: Iot) {
  for (const path of getEdsPaths(data)) {
    await moveFile(join(UPLOAD_TEMP_DIR, path), join(UPLOAD_DIR, path));
  }
  const ack = await templateCollection.insertOne({ ...data });
  if (!ack.acknowledged) throw new CustomError("Failed to create Iot template.");
  return { message: "Created successfully" };
}

async function updateIot(templateCollection: Collection<IotUpdate>, data: IotUpdate, oldData: IotUpdate) {
  const updatedFiles: { updated: string; old: string }[] = [];
  addFilesToUpdate(getEdsPaths(data), getEdsPaths(oldData), updatedFiles);

  for (const file of updatedFiles) {
    if (file.old) await deleteFile(join(UPLOAD_DIR, file.old));
    if (file.updated) await moveFile(join(UPLOAD_TEMP_DIR, file.updated), join(UPLOAD_DIR, file.updated));
  }

  const ack = await templateCollection.updateOne(
    { pageId: new ObjectId(data.pageId) },
    { $set: { ...data,  } },
  );
  if (!ack.acknowledged) throw new CustomError("Failed to update Iot template.");
  return { message: "Updated successfully" };
}

/* ---------- MAIN DISPATCHER ---------- */
export const templateService = {
  async create(templateCollection, data: TemplateCreateType) {
   

    if(data.templateName === 'Smart City'){
      return createSmartCity(templateCollection, data)
    }else if(data.templateName === 'It Talent'){
      return createItTalent(templateCollection, data)
    }else if(data.templateName === 'CSR'){
      return createCsr(templateCollection, data)
    }else if(data.templateName === 'WHO_WE_ARE'){
      return createWhoWeAre(templateCollection, data)
    }else if(data.templateName === 'EDS'){
      return createEds(templateCollection, data)
    }else if(data.templateName === 'IOT'){
      return createIot(templateCollection, data)
    }

    throw new CustomError("Invalid template type to create")

    
  },

  async update(templateCollection, data: TemplateUpdateType) {
    const oldData = await templateCollection.findOne({ pageId: new ObjectId(data.pageId)});
    if (!oldData) throw new CustomError("Template not found for update.");

     if(data.templateName === 'Smart City' && oldData.templateName === 'Smart City'){
      return updateSmartCity(templateCollection, data, oldData)
    }else if(data.templateName === 'It Talent' && oldData.templateName === 'It Talent'){
      return updateItTalent(templateCollection, data, oldData)
    }else if(data.templateName === 'CSR' && oldData.templateName === 'CSR'){
      return updateCsr(templateCollection, data, oldData)
    }else if(data.templateName === 'WHO_WE_ARE' && oldData.templateName === 'WHO_WE_ARE'){
      return updateWhoWeAre(templateCollection, data, oldData)
    }else if(data.templateName === 'EDS' && oldData.templateName === 'EDS'){
      return updateEds(templateCollection, data, oldData)
    }else if(data.templateName === 'IOT' && oldData.templateName === 'IOT'){
      return updateIot(templateCollection, data, oldData)
    }
    

    throw new CustomError("Invalid template type for update.")
  },
};

