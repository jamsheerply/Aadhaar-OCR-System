function extractAddress(text: string): string {
  console.log("address ", text);

  // Split the text into lines and clean each line
  const lines = text
    .replace(/\[.*?\]/g, "") // Remove content in square brackets
    .split("\n")
    .map((line) => line.trim());

  let addressLines: string[] = [];
  let isCapturingAddress = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Start capturing after Address: marker
    if (line.includes("Address:")) {
      isCapturingAddress = true;
      continue;
    }

    if (isCapturingAddress) {
      // Stop if we hit certain patterns
      if (
        line.match(/^\d{4}\s*\d{4}\s*\d{4}/) || // Aadhaar number pattern
        line.includes("VID:") ||
        line.includes("www.") ||
        line.includes("help@")
      ) {
        break;
      }

      // Skip empty lines and lines with only special characters
      if (!line.trim() || /^[-=_@#$%^&*()]+$/.test(line)) {
        continue;
      }

      // Clean and add the line if it contains commas or letters
      if (line.includes(",") || /[A-Za-z]/.test(line)) {
        addressLines.push(line);
      }
    }
  }

  // Join all address parts
  let fullAddress = addressLines.join(", ");

  // Extract everything up to and including "Kerala"
  const keralaMatch = fullAddress.match(/(.*?Kerala)/i);
  if (!keralaMatch) return fullAddress;

  let finalAddress = keralaMatch[1]
    .replace(/\s*-\s*\d+/g, "") // Remove postal codes
    .replace(/[^\w\s,]/g, " ") // Replace special chars with space
    .replace(/\s+/g, " ") // Normalize spaces
    .replace(/,\s*,/g, ",") // Fix double commas
    .replace(/\s*,\s*/g, ", ") // Normalize comma spacing
    .trim();

  // Clean up the parts
  finalAddress = finalAddress
    .split(",")
    .map((part) => part.trim())
    .filter((part) => {
      return (
        part &&
        !/^\d+$/.test(part) && // Remove number-only parts
        !part.includes("UIDAI") &&
        !part.includes("Unique") &&
        !part.includes("Identification")
      );
    })
    .join(", ");

  // console.log("return ", finalAddress);
  return finalAddress;
}

export default extractAddress;
