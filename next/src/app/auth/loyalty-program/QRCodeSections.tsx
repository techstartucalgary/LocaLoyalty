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
import { useEffect, useState } from "react";
import { fetchAPI } from "@/utils/generalAxios";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

export const SecretQRSection = () => {
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
    <div className="border-b-2 border-slate-300 py-5">
      <OptionHeader
        title="Secret QR Code"
        info="Download a PDF that contains the QR code that acts as your key. When customers want to collect stamps, have them scan this QR code using the LocaLoyalty mobile app and assign them the required stamps."
      />
      <div className="mt-2 ml-5">
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
                Make sure to carefully place this PDF once printed so that it is
                not out in the public. If it is ever taken advantage of,
                regenerate the secret QR Code by clicking on the regenerate
                button
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
      </div>
    </div>
  );
};
