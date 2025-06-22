import multer from "multer";

const multerUpload = multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const attachmentsMulter = multerUpload.array("files", 5);
const singleFileUpload = multerUpload.single("file");

export { multerUpload, attachmentsMulter, singleFileUpload };
