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

interface ProfileInputProps {
  id: string;
  title: string;
  disabled: boolean;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileInput = ({
  id,
  title,
  disabled,
  placeholder,
  value,
  onChange,
}: ProfileInputProps) => {
  return (
    <>
      <Label htmlFor={id} className="text-slate-500">
        {title}
      </Label>
      <Input
        disabled={disabled}
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

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
    <div className="h-screen flex items-center justify-center">
      {isLoading && (
        <div>
          <p>loading....</p>
        </div>
      )}
      {data && (
        <div className="flex items-center w-5/6 h-3/4 border-4 rounded-md border-slate-500 ">
          <div className="flex justify-evenly items-center w-full ">
            <div className="flex flex-col gap-1.5 self-start">
              <p className="text-xl font-bold">Business Details</p>
              <div className="ml-5 flex flex-col gap-3 mt-3">
                <ProfileInput
                  id="businessName"
                  title="Business Name"
                  disabled={!isEditing}
                  placeholder="Your business name"
                  value={profileData.businessName}
                  onChange={(e) =>
                    handleInputChange("businessName", e.target.value)
                  }
                />

                <ProfileInput
                  id="address"
                  title="Address"
                  disabled={!isEditing}
                  placeholder="123 Real Address"
                  value={profileData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />

                <ProfileInput
                  id="city"
                  title="City"
                  disabled={!isEditing}
                  placeholder="Calgary"
                  value={profileData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />

                <ProfileInput
                  id="province"
                  title="Province"
                  disabled={!isEditing}
                  placeholder="Alberta"
                  value={profileData.province}
                  onChange={(e) =>
                    handleInputChange("province", e.target.value)
                  }
                />

                <ProfileInput
                  id="postal"
                  title="Postal Code"
                  disabled={!isEditing}
                  placeholder="A1B2C3"
                  value={profileData.postalCode}
                  onChange={(e) =>
                    handleInputChange("postalCode", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 self-start">
              <div>
                <p className="text-xl font-bold">Contact Details</p>
                <p className="ml-5 mt-3">
                  Click on icon in the top right to edit
                </p>
              </div>

              <div>
                <p className="text-xl font-bold mt-10">Clover Details</p>
                <div className="flex flex-col gap-3 ml-5 mt-3">
                  <ProfileInput
                    id="merchantID"
                    title="Merchant ID"
                    disabled={!isEditing}
                    placeholder="123456789"
                    value={profileData.merchantID}
                    onChange={(e) =>
                      handleInputChange("merchantID", e.target.value)
                    }
                  />

                  <ProfileInput
                    id="apiKey"
                    title="API Key"
                    disabled={!isEditing}
                    placeholder=""
                    value={profileData.apiKey}
                    onChange={(e) =>
                      handleInputChange("apiKey", e.target.value)
                    }
                  />
                </div>

                {isEditing ? (
                  <div className="mt-5 ml-5 flex gap-5">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="w-20 bg-white text-black hover:bg-red-500 border-2 hover:text-white border-black hover:border-none">
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
                          <AlertDialogCancel className="w-20 bg-white text-black hover:bg-red-500 border-2 hover:text-white border-black hover:border-none">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="w-20 bg-black hover:bg-white hover:border-2 hover:text-black border-black"
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
                      className="w-20 bg-black hover:bg-white hover:border-2 hover:text-black border-black"
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
                    className="w-20 bg-black hover:bg-white hover:border-2 hover:text-black border-black  mt-5 ml-5"
                    onClick={() => {
                      setIsEditing(true);
                    }}
                  >
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
