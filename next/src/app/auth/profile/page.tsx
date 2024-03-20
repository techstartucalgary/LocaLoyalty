"use client";
import { Button } from "@/components/ui/button";
import { fetchAPI } from "@/utils/generalAxios";
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
import {
  LongTextInput,
  ProfileImageInput,
  ProfileTextInput,
} from "@/components/ProfileInputs";

export default function Profile() {
  //this is where the api call should be made

  interface ProfileData {
    name: string;
    business_email: string;
    business_phone: string;
    address: string;
    city: string;
    province: string;
    postal_code: string;
    merchant_id: string;
    clover_api_key: string;
    business_image: File | null;
    business_logo: File | null;
    description: string;
  }

  const defaultProfileData: ProfileData = {
    name: "",
    business_email: "",
    business_phone: "",
    address: "",
    city: "",
    province: "",
    postal_code: "",
    merchant_id: "",
    clover_api_key: "",
    business_image: null,
    business_logo: null,
    description: "",
  };

  const { getToken } = useAuth();

  const fetchInitialProfileData = async () => {
    return fetchAPI(
      "http://localhost:5001/business/profile",
      "GET",
      await getToken(),
      null,
      {}
    );
  };

  const sendModifiedProfileData = async () => {
    // Loop over the savedProfileData and append each item to formData
    const formData = new FormData();

    (Object.keys(savedProfileData) as Array<keyof ProfileData>).forEach(
      (key) => {
        const value = savedProfileData[key];
        if (key === "business_image" || key === "business_logo") {
          // Only append if it's a file
          if (value instanceof File) {
            formData.append(key, value, value.name);
          }
        } else if (value != null) {
          // Check for null or undefined
          formData.append(key, String(value));
        }
      }
    );

    // Make the API call with formData
    return fetchAPI(
      "http://localhost:5001/business/profile",
      "POST",
      await getToken(),
      formData,
      {
        /* headers (if necessary) */
      }
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

  const handleTextInputChange = (
    fieldName: keyof ProfileData,
    value: string
  ) => {
    setProfileData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleImageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    imageKey: keyof ProfileData // Add this parameter
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setProfileData((prevState) => ({
        ...prevState,
        [imageKey]: file, // Use the key to update the correct property
      }));

      // Additional logic for the file
    }
  };

  return (
    <div className="flex items-center justify-center">
      {isLoading && (
        <div>
          <p>loading....</p>
        </div>
      )}
      {data && (
        <div className="flex items-center justify-center w-5/6 border-4 flex-col rounded-md border-slate-500 my-20">
          <div className="flex justify-evenly items-center flex-col my-5">
            <p className="text-xl font-bold text-left w-full">
              Business Details
            </p>
            <div className="flex ml-5 gap-32 mt-3">
              <div className="flex flex-col gap-3">
                <ProfileTextInput
                  id="businessName"
                  title="Business Name"
                  disabled={!isEditing}
                  placeholder="Your business name"
                  value={profileData.name}
                  onChange={(e) =>
                    handleTextInputChange("name", e.target.value)
                  }
                />

                <ProfileTextInput
                  id="businessPhone"
                  title="Business Phone"
                  disabled={!isEditing}
                  placeholder="1231231234"
                  value={profileData.business_phone}
                  onChange={(e) =>
                    handleTextInputChange("business_phone", e.target.value)
                  }
                />

                <ProfileTextInput
                  id="businessEmail"
                  title="Business Email"
                  disabled={!isEditing}
                  placeholder="placeholder@gmail.com"
                  value={profileData.business_email}
                  onChange={(e) =>
                    handleTextInputChange("business_email", e.target.value)
                  }
                />

                <ProfileTextInput
                  id="address"
                  title="Address"
                  disabled={!isEditing}
                  placeholder="123 Real Address"
                  value={profileData.address}
                  onChange={(e) =>
                    handleTextInputChange("address", e.target.value)
                  }
                />

                <ProfileTextInput
                  id="city"
                  title="City"
                  disabled={!isEditing}
                  placeholder="Calgary"
                  value={profileData.city}
                  onChange={(e) =>
                    handleTextInputChange("city", e.target.value)
                  }
                />

                <ProfileTextInput
                  id="province"
                  title="Province"
                  disabled={!isEditing}
                  placeholder="Alberta"
                  value={profileData.province}
                  onChange={(e) =>
                    handleTextInputChange("province", e.target.value)
                  }
                />

                <ProfileTextInput
                  id="postal"
                  title="Postal Code"
                  disabled={!isEditing}
                  placeholder="A1B2C3"
                  value={profileData.postal_code}
                  onChange={(e) =>
                    handleTextInputChange("postal_code", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-3">
                <ProfileImageInput
                  id="businessImage"
                  title="Business Image"
                  disabled={!isEditing}
                  onChange={(e) => handleImageInputChange(e, "business_image")}
                />
                <ProfileImageInput
                  id="businessLogo"
                  title="Business Logo"
                  disabled={!isEditing}
                  onChange={(e) => handleImageInputChange(e, "business_logo")}
                />
                <LongTextInput
                  id="description"
                  title="Business Description"
                  disabled={!isEditing}
                  placeholder="your store is really cool"
                  value={profileData.description}
                  onChange={(e) =>
                    handleTextInputChange("description", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex gap-20 self-start mt-10">
              <div>
                <p className="text-xl font-bold">Contact Details</p>
                <p className="ml-5 mt-3 w-60">
                  To change details such as your phone number or email, click on
                  icon in the top right to edit!
                </p>
              </div>

              <div>
                <p className="text-xl font-bold">Clover Details</p>
                <div className="flex flex-col gap-3 ml-5 mt-3">
                  <ProfileTextInput
                    id="merchantID"
                    title="Merchant ID"
                    disabled={!isEditing}
                    placeholder="123456789"
                    value={profileData.merchant_id}
                    onChange={(e) =>
                      handleTextInputChange("merchant_id", e.target.value)
                    }
                  />

                  <ProfileTextInput
                    id="apiKey"
                    title="API Key"
                    disabled={!isEditing}
                    placeholder=""
                    value={profileData.clover_api_key}
                    onChange={(e) =>
                      handleTextInputChange("clover_api_key", e.target.value)
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
