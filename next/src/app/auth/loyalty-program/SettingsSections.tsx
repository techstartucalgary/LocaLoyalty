"use client";
import { Button } from "@/components/ui/button";
import { useAuthStore, useLoyaltyProgramStore } from "@/utils/store";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  CreateRewardDialog,
  DeleteRewardDialog,
  EditRewardDialog,
} from "./RewardDialogs";
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
import { fetchAPI } from "@/utils/generalAxios";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

export const StampLifeSection = () => {
  const { stampLife, setStampLife, isEditing } = useLoyaltyProgramStore();

  const determineStyle = (value: number | null) => {
    return stampLife === value
      ? "bg-black"
      : "bg-green-500 text-black border-2 border-black bg-white hover:text-white";
  };

  const stampLifeValues = [
    { value: null, label: "Forever" },
    { value: 3, label: "3 Months" },
    { value: 6, label: "6 Months" },
    { value: 9, label: "9 Months" },
    { value: 12, label: "1 Year" },
  ];

  return (
    <div className="border-b-2 border-slate-300 py-5">
      <OptionHeader
        title="Stamp life"
        info="Choose how long your customer's stamps will last if they don't shop at your store for a certain duration"
      />

      <div className="flex gap-3 mt-3 ml-5">
        {stampLifeValues.map((item) => {
          return (
            <Button
              key={item.value}
              size="sm"
              className={determineStyle(item.value)}
              onClick={() => {
                if (isEditing) setStampLife(item.value);
              }}
            >
              {item.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export const StampCountSection = () => {
  const { stampCount, incrementStampCount, decrementStampCount, isEditing } =
    useLoyaltyProgramStore();

  return (
    <div className="border-b-2 border-slate-300 py-5">
      <OptionHeader
        title="Stamp count"
        info="Choose the max amount of stamps your customer can have at a time"
      />
      <div className="flex items-center gap-5 mt-3 ml-5">
        <Button
          size="sm"
          className="h-7 w-7 font-semibold text-lg"
          onClick={() => {
            if (isEditing) decrementStampCount();
          }}
        >
          -
        </Button>
        <p className="text-lg font-semibold">{stampCount}</p>
        <Button
          size="sm"
          className="h-7 w-7 font-semibold text-lg"
          onClick={() => {
            if (isEditing) incrementStampCount();
          }}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export const ScaleRewardSection = () => {
  const { scaleAmount, setScaleAmount, isEditing } = useLoyaltyProgramStore();
  const [invalidInput, setInvalidInput] = useState(false);

  return (
    <div className="border-b-2 border-slate-300 py-5">
      <OptionHeader
        title="Scale reward"
        info="Define how much customers must spend to earn a stamp"
      />
      <div className="flex items-center gap-2 mt-3 ml-5">
        <p className="font-semibold text-lg">$</p>
        <Input
          type="text"
          value={scaleAmount}
          disabled={!isEditing}
          className={`border-2 border-slate-400 w-20 ${
            invalidInput ? "border-red-500" : ""
          }`}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const input = event.target.value;

            // Allow clearing the input
            if (input === "") {
              setScaleAmount("");
              setInvalidInput(true); // Consider empty input as valid or manage separately
            } else {
              const newValue = Number(input);
              if (!isNaN(newValue) && newValue > 0) {
                setInvalidInput(false);
                setScaleAmount(input); // Ensure scaleAmount is a string for consistency
              } else {
                setInvalidInput(true);
              }
            }
          }}
        />

        {invalidInput ? <p>Invalid Value!</p> : null}
      </div>
    </div>
  );
};

export const DefineRewardSection = () => {
  const { definedRewards } = useLoyaltyProgramStore();

  return (
    <div className="border-b-2 border-slate-300 py-5">
      <div className="flex justify-between">
        <OptionHeader
          title="Define reward"
          info="Create rewards that your customers can cash their stamps out for!"
        />
        <CreateRewardDialog />
      </div>

      <div className="flex flex-col gap-3 mt-3 ml-5">
        {definedRewards.map((item) => {
          return (
            <div key={item.title} className="flex items-center gap-5">
              <div className="flex items-center border-2 p-5 justify-between font-semibold text-lg border-black rounded-md w-2/3">
                <p>{item.title}</p>
                <p className="text-xl">{item.requiredStamps} stamps</p>
              </div>
              <EditRewardDialog
                initial_id={item.reward_id}
                initialTitle={item.title}
                initialRequiredStamps={item.requiredStamps}
              />
              <DeleteRewardDialog
                id={item.reward_id}
                title={item.title}
                requiredStamps={item.requiredStamps}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const EditSection = ({
  refetch,
}: {
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
}) => {
  const {
    isEditing,
    setIsEditing,
    stampLife,
    stampCount,
    scaleAmount,
    definedRewards,
    incrementRefetch,
  } = useLoyaltyProgramStore();
  const { token } = useAuthStore();
  const sendModifiedLoyaltyProgramData = async () => {
    // Make the API call with formData
    return fetchAPI(
      "http://localhost:5001/business/loyalty-program",
      "POST",
      token,
      {
        stampLife: stampLife,
        stampCount: stampCount,
        scaleAmount: scaleAmount,
        definedRewards: definedRewards,
      },
      {
        /* headers (if necessary) */
      }
    );
  };

  const mutation = useMutation({
    mutationFn: sendModifiedLoyaltyProgramData,
    onSuccess: () => {
      toast({
        title: "👌 Success!",
        description:
          "Your loyalty program information has been updated successfully!",
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

  return (
    <div className="w-full flex justify-end my-5">
      {isEditing ? (
        <div className="flex gap-5">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-20 bg-white text-black hover:bg-red-500 border-2 hover:text-white border-black hover:border-none">
                Cancel
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all
                  your edits to your profile information
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="w-20 bg-white text-black hover:bg-red-500 border-2 hover:text-white border-black hover:border-none">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="w-20 bg-black hover:bg-white hover:border-2 hover:text-black border-black"
                  onClick={() => {
                    setIsEditing();
                    incrementRefetch();
                    refetch();
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
              setIsEditing();
              mutation.mutate();
            }}
          >
            Save
          </Button>
        </div>
      ) : (
        <Button
          className="w-20 bg-black hover:bg-white hover:border-2 hover:text-black border-black"
          onClick={() => {
            setIsEditing();
          }}
        >
          Edit
        </Button>
      )}
    </div>
  );
};
