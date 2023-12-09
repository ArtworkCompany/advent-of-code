import path from "path";

export const readFile = async (fileName: string): Promise<string[]> => {
  const filePath = path.join(import.meta.dir, fileName);
  const content = (await Bun.file(filePath).text()).split("\n");

  return content;
};
