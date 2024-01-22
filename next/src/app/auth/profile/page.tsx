"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchAPI } from "@/utils/generalAxios";
import { useAuthStore } from "@/utils/store";
import { useAuth } from "@clerk/nextjs";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

export default function Profile() {
  //this is where the api call should be made

  interface ProfileData {
    businessName: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    merchantID: string;
    apiKey: string;
  }

  const defaultProfileData: ProfileData = {
    businessName: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    merchantID: "",
    apiKey: "",
  };

  const { getToken } = useAuth();
  const { token, setToken } = useAuthStore();

  const fetchInitialProfileData = async () => {
    return fetchAPI(
      "http://localhost:5001/business/profile",
      "GET",
      token,
      null,
      {}
    );
  };

  const sendModifiedProfileData = async () => {
    return fetchAPI(
      "http://localhost:5001/business/profile",
      "POST",
      token,
      savedProfileData,
      {}
    );
  };

  const mutation = useMutation({
    mutationFn: sendModifiedProfileData,
    onSuccess: () => {
      toast({
        title: "👌 Success!",
        description: "Your profile information has been updated successfully!",
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        title: "Hmmm.....",
        description:
          "Something went wrong.. Double check your values you put in",
        duration: 3000,
      });
    },
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["initialProfileData"],
    queryFn: fetchInitialProfileData,
    enabled: !!token,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [savedProfileData, setSavedProfileData] =
    useState<ProfileData>(defaultProfileData);
  const [profileData, setProfileData] =
    useState<ProfileData>(defaultProfileData);

  useEffect(() => {
    if (data) {
      setSavedProfileData(data);
      setProfileData(data);
    }
  }, [data]);

  useEffect(() => {
    async function fetchToken() {
      const toFetch = await getToken();
      setToken(toFetch);
    }

    fetchToken();
  }, [getToken, setToken]);

  const handleInputChange = (fieldName: keyof ProfileData, value: string) => {
    setProfileData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  return (
    <div className="bg-green-500 h-screen flex items-center justify-center">
      {isLoading && (
        <div>
          <p>loading....</p>
        </div>
      )}
      {data && (
        <div className="flex justify-evenly bg-blue-500 w-5/6 h-3/4">
          <div className="flex flex-col gap-1.5">
            <p>Business Details</p>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              disabled={!isEditing}
              type="text"
              id="businessName"
              placeholder="Your Business Name"
              value={profileData.businessName}
              onChange={(e) =>
                handleInputChange("businessName", e.target.value)
              }
            />
            <Label htmlFor="address">Address</Label>
            <Input
              disabled={!isEditing}
              type="text"
              id="Address"
              placeholder="123 Real Address"
              value={profileData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
            <Label htmlFor="city">City</Label>
            <Input
              disabled={!isEditing}
              type="text"
              id="City"
              placeholder="Calgary"
              value={profileData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
            <Label htmlFor="province">Province</Label>
            <Input
              disabled={!isEditing}
              type="text"
              id="province"
              placeholder="Alberta"
              value={profileData.province}
              onChange={(e) => handleInputChange("province", e.target.value)}
            />
            <Label htmlFor="postal">Postal Code</Label>
            <Input
              disabled={!isEditing}
              type="text"
              id="postal"
              placeholder="A1B2C3"
              value={profileData.postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div>
              <p>Contact Details</p>
              <p>Click on icon in the top right to edit</p>
            </div>

            <div>
              <p>Clover Details</p>
              <Label htmlFor="merchantID">Merchant ID</Label>
              <Input
                disabled={!isEditing}
                type="text"
                id="merchantID"
                placeholder=""
                value={profileData.merchantID}
                onChange={(e) =>
                  handleInputChange("merchantID", e.target.value)
                }
              />
              <Label htmlFor="API Key">API Key</Label>
              <Input
                disabled={!isEditing}
                type="text"
                id="postal"
                placeholder=""
                value={profileData.apiKey}
                onChange={(e) => handleInputChange("apiKey", e.target.value)}
              />
            </div>

            {isEditing ? (
              <div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-20 bg-red-500 hover:bg-gray-600">
                      Cancel
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete all your edits to your profile information
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          setIsEditing(false);
                          setProfileData(savedProfileData);
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button
                  className="w-20 bg-red-500 hover:bg-gray-600"
                  onClick={() => {
                    setIsEditing(false);
                    setSavedProfileData(profileData);
                    mutation.mutate();
                  }}
                >
                  Save
                </Button>
              </div>
            ) : (
              <Button
                className="w-20 bg-red-500 hover:bg-gray-600"
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
