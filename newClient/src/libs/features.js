const fileFormat = (url) => {
  let fileExtension = url.split(".").pop();

  if (
    fileExtension === "jpg" ||
    fileExtension === "jpeg" ||
    fileExtension === "png" ||
    fileExtension === "gif"
  ) {
    return "image";
  }

  if (
    fileExtension === "mp4" ||
    fileExtension === "avi" ||
    fileExtension === "mov" ||
    fileExtension === "mkv"
  ) {
    return "video";
  }

  if (
    fileExtension === "mp3" ||
    fileExtension === "wav" ||
    fileExtension === "flac"
  ) {
    return "audio";
  }
  if (
    fileExtension === "pdf" ||
    fileExtension === "doc" ||
    fileExtension === "docx" ||
    fileExtension === "xls" ||
    fileExtension === "xlsx"
  ) {
    return "document";
  }

  return "file";
};

const transformImage = (url = "") => url;

export { fileFormat , transformImage };
