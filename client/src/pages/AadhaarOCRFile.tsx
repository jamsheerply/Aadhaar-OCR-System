import { useState, ChangeEvent } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OcrResult {
  name: string;
  aadhaarNumber: string;
  dob: string;
  gender: string;
  address: string;
  pincode: string;
}

const AadhaarOCRFile = () => {
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [ocrResults, setOcrResults] = useState<OcrResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement>,
    side: "front" | "back"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload only image files.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB");
      return;
    }

    // Store the actual file
    if (side === "front") {
      setFrontFile(file);
    } else {
      setBackFile(file);
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      if (side === "front") {
        setFrontImage(reader.result as string);
      } else {
        setBackImage(reader.result as string);
      }
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const processOCR = async () => {
    if (!frontFile || !backFile) {
      setError("Please upload both front and back images");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("frontImage", frontFile);
      formData.append("backImage", backFile);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ocr`, {
        method: "POST",
        body: formData,
        // Don't set Content-Type header - browser will set it automatically with boundary
      });

      if (!response.ok) throw new Error("OCR processing failed");

      const data = await response.json();
      setOcrResults(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  // Rest of the component remains the same...
  const ImageUploadCard = ({
    side,
    image,
  }: {
    side: "front" | "back";
    image: string | null;
  }) => (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">
        Aadhaar {side.charAt(0).toUpperCase() + side.slice(1)}
      </h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="h-60 w-full">
          {image ? (
            <div className="relative h-full w-full">
              <img
                src={image}
                alt={`Aadhaar ${side}`}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="bg-gray-100 h-full w-full flex flex-col items-center justify-center">
              <input
                type="file"
                onChange={(e) => handleImageUpload(e, side)}
                className="hidden"
                id={`${side}-upload-initial`}
                accept="image/*"
              />
              <label
                htmlFor={`${side}-upload-initial`}
                className="cursor-pointer text-blue-600 hover:text-blue-700 flex flex-col items-center"
              >
                <Camera className="w-8 h-8 mb-2" />
                <span className="text-sm">Click here to Upload/Capture</span>
              </label>
            </div>
          )}
        </div>
        {image && (
          <div className="mt-4">
            <input
              type="file"
              onChange={(e) => handleImageUpload(e, side)}
              className="hidden"
              id={`${side}-upload-recapture`}
              accept="image/*"
            />
            <label
              htmlFor={`${side}-upload-recapture`}
              className="flex items-center justify-center w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300 transition-colors"
            >
              <Camera className="w-5 h-5 mr-2" />
              Press to Re-capture/Upload
            </label>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
        Aadhaar Card OCR System
      </h1>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 lg:pr-4 mb-6 lg:mb-0">
          <ImageUploadCard side="front" image={frontImage} />
          <ImageUploadCard side="back" image={backImage} />
          <Button
            onClick={processOCR}
            disabled={loading || !frontImage || !backImage}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? "Processing..." : "PARSE AADHAAR"}
          </Button>
        </div>

        <div className="hidden lg:block w-px bg-gray-300 mx-4"></div>

        <div className="w-full lg:w-1/2 lg:pl-4 mt-6 lg:mt-0">
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {ocrResults && (
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 max-w-5xl">
              <h2 className="text-xl font-semibold mb-4">Parsed Data</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Aadhaar Number:</p>
                  <p>{ocrResults.aadhaarNumber || "Not found"}</p>
                </div>
                <div>
                  <p className="font-medium">Name on Aadhaar:</p>
                  <p>{ocrResults.name || "Not found"}</p>
                </div>
                <div>
                  <p className="font-medium">Date of Birth:</p>
                  <p>{ocrResults.dob || "Not found"}</p>
                </div>
                <div>
                  <p className="font-medium">Gender:</p>
                  <p>{ocrResults.gender || "Not found"}</p>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <p className="font-medium">Address:</p>
                  <p>{ocrResults.address || "Not found"}</p>
                </div>
                <div>
                  <p className="font-medium">Pincode:</p>
                  <p>{ocrResults.pincode || "Not found"}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AadhaarOCRFile;
