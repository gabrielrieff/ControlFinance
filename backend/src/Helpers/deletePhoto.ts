import fs from "fs";

export const deletePhoto = async (filePath: fs.PathLike) => {
  await fs.statSync(filePath);
  await fs.unlinkSync(filePath);
};
