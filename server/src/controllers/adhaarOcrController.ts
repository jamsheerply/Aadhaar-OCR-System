import { NextFunction, Request, Response } from "express";
import * as Tesseract from "tesseract.js";
import { body, validationResult } from "express-validator";
import preprocessImage from "../utils/preprocessImage";
import extractName from "../utils/extractName";
import extractAadhaarNumber from "../utils/extractAadhaarNumber";
import extractDOB from "../utils/extractDOB";
import extractGender from "../utils/extractGender";
import extractAddress from "../utils/extractAddress";
import isUIDDocument from "../utils/IsUIDDocumentBack";
import extractPincode from "../utils/extractPincode";
import isGovernmentOfIndiaDocument from "../utils/isGovernmentOfIndiaDocument";
import hasMatchingNumber from "../utils/hasMatchingNumber";

// Validation middleware
const validateImages = [
  body("frontImage").notEmpty().withMessage("Front image is required"),
  body("backImage").notEmpty().withMessage("Back image is required"),
];

const adhaarOcrController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { frontImage, backImage } = req.body;
    console.log(frontImage, backImage);
    // Preprocess images
    const processedFrontImage = await preprocessImage(frontImage);
    const processedBackImage = await preprocessImage(backImage);

    // Perform OCR on front image
    const frontResult = await Tesseract.recognize(processedFrontImage, "eng", {
      // logger: (info) => console.log(info),
    });

    // console.log(frontResult.data.text);
    // Perform OCR on back image
    const backResult = await Tesseract.recognize(processedBackImage, "eng", {
      // logger: (info) => console.log(info),
    });

    // Validate the back side of the Aadhaar document
    if (!isUIDDocument(backResult.data.text)) {
      throw new Error("Not a valid Aadhaar back document");
    }

    // Validate the front side of the Aadhaar document
    if (!isGovernmentOfIndiaDocument(frontResult.data.text)) {
      throw new Error("Not a valid Aadhaar front document");
    }

    // Check if the number on the front and back documents match
    if (!hasMatchingNumber(frontResult.data.text, backResult.data.text)) {
      throw new Error(
        "Front and back documents do not contain the same Aadhaar number"
      );
    }

    // Extract information using regex patterns
    const extractedData = {
      name: extractName(frontResult.data.text),
      aadhaarNumber: extractAadhaarNumber(frontResult.data.text),
      dob: extractDOB(frontResult.data.text),
      gender: extractGender(frontResult.data.text),
      address: extractAddress(backResult.data.text),
      pincode: extractPincode(backResult.data.text),
    };

    res.json(extractedData);
  } catch (error) {
    console.log("error:", error);
    next(error);
  }
};

export default adhaarOcrController;
