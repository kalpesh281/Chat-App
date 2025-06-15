import moment from "moment";

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

const getLast7Days = () => {
  const currentDate = moment();
  const last7Days = [];
  for (let i = 0; i < 7; i++) {
    const dayDate = currentDate.clone().subtract(i, "days");
    const dayName = dayDate.format("dddd");

    last7Days.unshift(dayName);
  }
  return last7Days;
};

export { fileFormat, transformImage, getLast7Days };
