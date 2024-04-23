import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { OptionHeader } from "./page";
import { Button } from "@/components/ui/button";
import { fetchAPI } from "@/utils/generalAxios";
import { useAuth } from "@clerk/nextjs";

const SecretDownloadDialog = () => {
  const { getToken } = useAuth();
  const fetchSecretQR = async (): Promise<any> => {
    try {
      const response = await fetchAPI(
        "http://localhost:5001/business/qr", // Your API endpoint
        "GET", // HTTP method
        await getToken(), // Access token
        null, // No data needs to be sent for a GET request
        {}, // No URL parameters
        "blob" // Set response type as blob for file download
      );

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "localoyalty-secret-qr.pdf"); // Set the filename for download
      document.body.appendChild(link);
      link.click();
      link.remove(); // Clean up the DOM
      window.URL.revokeObjectURL(url); // Free up resources by revoking the blob URL
    } catch (error) {
      console.error("Failed to download file:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-20 bg-black text-white hover:bg-white hover:border-2 hover:text-black hover:border-black">
          Download
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Warning!</AlertDialogTitle>
          <AlertDialogDescription>
            Make sure to carefully place this PDF once printed so that it is not
            out in the public. If it is ever taken advantage of, regenerate the
            secret QR Code by clicking on the regenerate button
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-20 bg-white text-black hover:bg-red-500 border-2 hover:text-white border-black hover:border-none">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-20 bg-black hover:bg-white hover:border-2 hover:text-black border-black"
            onClick={() => {
              fetchSecretQR();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const SecretRegenerateDialog = () => {
  const { getToken } = useAuth();

  const fetchUpdatedSecretQR = async (): Promise<any> => {
    try {
      const response = await fetchAPI(
        "http://localhost:5001/business/qr", // Your API endpoint
        "POST", // HTTP method
        await getToken(), // Access token
        null, // No data needs to be sent for a GET request
        {}, // No URL parameters
        "blob" // Set response type as blob for file download
      );

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "localoyalty-secret-qr.pdf"); // Set the filename for download
      document.body.appendChild(link);
      link.click();
      link.remove(); // Clean up the DOM
      window.URL.revokeObjectURL(url); // Free up resources by revoking the blob URL
    } catch (error) {
      console.error("Failed to download file:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-24 bg-black text-white hover:bg-white hover:border-2 hover:text-black hover:border-black">
          Regenerate
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Warning!</AlertDialogTitle>
          <AlertDialogDescription>
            Regenerating your QR code will require you to re-print the PDF you
            use to give out stamps. Only press continue if you're really sure
            you need to regenerate the QR Code!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-20 bg-white text-black hover:bg-red-500 border-2 hover:text-white border-black hover:border-none">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-20 bg-black hover:bg-white hover:border-2 hover:text-black border-black"
            onClick={() => {
              fetchUpdatedSecretQR();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const SecretQRSection = () => {
  return (
    <div className="border-b-2 border-slate-300 py-5">
      <OptionHeader
        title="Secret QR Code"
        info="Download a PDF that contains the QR code that acts as your key. When customers want to collect stamps, have them scan this QR code using the LocaLoyalty mobile app and assign them the required stamps."
      />
      <div className="mt-2 ml-5 flex gap-4">
        <SecretDownloadDialog />
        <SecretRegenerateDialog />
      </div>
    </div>
  );
};
