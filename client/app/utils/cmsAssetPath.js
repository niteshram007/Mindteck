export const encodeAssetUrl = (value = '') => {
  const trimmedValue = String(value || '').trim();
  if (!trimmedValue || /^data:/i.test(trimmedValue)) {
    return trimmedValue;
  }

  try {
    // Normalize first to avoid double-encoding URLs that already contain %20.
    return encodeURI(decodeURI(trimmedValue));
  } catch (error) {
    try {
      return encodeURI(trimmedValue);
    } catch (innerError) {
      return trimmedValue;
    }
  }
};

const resolvePublicAssetPath = (normalizedFilePath = '') => {
  // Serve directly from backend upload storage so newly uploaded files
  // are immediately available without relying on Next public asset copies.
  return `/images/${normalizedFilePath}`;
};

export const buildUploadedAssetUrl = (filePath = '') => {
  const normalizedFilePath = String(filePath || '').trim().replace(/^\/+/, '');
  if (!normalizedFilePath) {
    return '';
  }

  return encodeAssetUrl(resolvePublicAssetPath(normalizedFilePath));
};
