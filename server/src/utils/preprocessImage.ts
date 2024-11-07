import sharp from "sharp";

// Utility function to process image for better OCR results
async function preprocessImage(base64Image: string): Promise<Buffer> {
  // Remove data:image/...;base64, prefix
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
  const imageBuffer = Buffer.from(base64Data, "base64");

  // Process image for better OCR
  return await sharp(imageBuffer)
    .greyscale() // Convert to greyscale
    .normalize() // Normalize the image
    .sharpen() // Sharpen the image
    .toBuffer();
}

export default preprocessImage;
