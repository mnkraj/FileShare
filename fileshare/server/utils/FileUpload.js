require("dotenv").config();
const cloudinary = require("../config/Cloudinary");
const path = require("path");

const UploadFile = async (file) => {
  try {
    const originalName = file.originalFilename;
    // Validate that the file has a filepath property
    if (!file || !file.filepath || !file.originalFilename) {
      throw new Error(
        "Invalid file object. Missing filepath or originalFilename."
      );
    }

    // Upload the file to Cloudinary using the filepath
    const result = await cloudinary.uploader.upload(file.filepath, {
      public_id: originalName.replace(/\.[^/.]+$/, ""), // remove extension
      format: originalName.split('.').pop(),  
      resource_type: "raw", // Automatically detect file type (image, video, etc.)
      folder: "Fileshare", // Cloudinary folder to store files
    });
    // console.log(result.secure_url);
    return result.secure_url; // Return the secure URL of the uploaded file
  } catch (error) {
    console.error("Error during file upload:", error);
    throw new Error("File upload failed");
  }
};

module.exports = { UploadFile };
