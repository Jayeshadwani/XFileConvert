import fs from 'fs';

export const ensureDirectoriesExist = (uploadsDir, convertedDir) => {
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
  if (!fs.existsSync(convertedDir)) fs.mkdirSync(convertedDir);
};
