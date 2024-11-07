function extractPincode(text: string): string {
  //   console.log("extracting pincode from:", text);

  // Split the text into lines
  const lines = text.split("\n");

  // Find the line containing Kerala
  const keralaLine = lines.find(
    (line) => line.includes("Kerala") && /\d{6}/.test(line) // Line should contain 6 digits
  );

  if (!keralaLine) {
    // If not found in the same line, check the next line after Kerala
    const keralaIndex = lines.findIndex((line) => line.includes("Kerala"));
    if (keralaIndex !== -1 && keralaIndex < lines.length - 1) {
      // Check next few lines for pincode
      for (
        let i = keralaIndex;
        i < Math.min(keralaIndex + 3, lines.length);
        i++
      ) {
        const match = lines[i].match(/\d{6}/);
        if (match) {
          return match[0];
        }
      }
    }
  } else {
    // Extract 6-digit number from Kerala line
    const match = keralaLine.match(/\d{6}/);
    if (match) {
      return match[0];
    }
  }

  // If no pincode found
  return "";
}

export default extractPincode;
