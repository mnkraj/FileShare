const express = require("express");
const router = express.Router();
const dataModel = require("../models/Data");
const { UploadFile } = require("../utils/FileUpload");
const { generateToken } = require("../utils/GenerateToken");
const formidable = require("formidable");

router.post("/upload", async (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parsing error:", err);
      return res.json({ success: false, message: "Error parsing form data" });
    }

    const text = Array.isArray(fields.text) ? fields.text[0] : fields.text;
    const id = Array.isArray(fields.id) ? fields.id[0] : fields.id;
    const fileArray = files?.files
      ? Array.isArray(files.files)
        ? files.files
        : [files.files]
      : [];

    // console.log("Parsed Fields:", fields);
    // console.log("Parsed Files:", fileArray);

    let token, FetchedData;

    // If id is not provided, generate a new token and create a new data entry
    if (!id) {
      token = await generateToken();
      FetchedData = new dataModel({
        uniqueId: token,
        text: text || null,
      });
    } else {
      // If an ID is provided, find the corresponding data entry
      FetchedData = await dataModel.findById(id);

      if (!FetchedData)
        return res.json({ success: false, message: "Record not found" });

      if (!fileArray.length && !text)
        return res.json({ success: true, uniqueId: FetchedData.uniqueId });
    }
    if (fileArray.length > 0) {
      try {
        const uploadPromises = fileArray.map(file => UploadFile(file)); 
        const fileUrls = await Promise.all(uploadPromises); 
    
        if (fileUrls.includes(null)) {
          return res.json({ success: false, message: "One or more files failed to upload" });
        }
    
        
        FetchedData.fileUrls.push(...fileUrls);
      } catch (error) {
        console.error("Error uploading files:", error);
        return res.json({ success: false, message: "File upload failed" });
      }
    }
    
    
    if (text) {
      FetchedData.text = text;
    }

    await FetchedData.save();
    return res.json({ success: true, id: FetchedData._id });
  });
});

router.get("/fetch/:uniqueId", async (req, res) => {
  const { uniqueId } = req.params;

  try {
    const fetchedData = await dataModel.findOne({ uniqueId });
    if (!fetchedData) {
      return res.json({ success: false, message: "Record not found" });
    }
    const dataToReturn = fetchedData.toObject(); // convert to plain object
    delete dataToReturn._id;
    return res.json({ success: true, data: dataToReturn });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.json({ success: false, message: "Error fetching data" });
  }
});

module.exports = router;
