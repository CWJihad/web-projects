export const sanitizeFileName = (name: string) =>
  name
    .trim()
    .replace(/[^\w\- ]+/g, "")
    .replace(/\s+/g, "-") || "image";

export const downloadFile = (url: string, fileName: string) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  link.remove();
};