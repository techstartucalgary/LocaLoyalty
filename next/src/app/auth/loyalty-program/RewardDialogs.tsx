"use client";
import { Button } from "@/components/ui/button";
import { useLoyaltyProgramStore } from "@/utils/store";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { OptionHeader } from "./page";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";

export const CreateRewardDialog = () => {
  const { stampCount, addReward, isEditing } = useLoyaltyProgramStore();
  const [isClient, setIsClient] = useState(false);
  const [rewardTitle, setRewardTitle] = useState("");
  const [requiredStamps, setRequiredStamps] = useState(1);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <Dialog>
        <DialogTrigger disabled={!isEditing}>
          <Button size="sm" className="h-7 w-7 font-semibold text-lg">
            +
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Create a new reward</DialogTitle>
            <DialogDescription className="text-lg">
              Define enticing rewards your customers will be excited to work
              towards!
            </DialogDescription>
          </DialogHeader>
          <div className="border-b-2 border-slate-300 py-5">
            <OptionHeader
              title="Reward title"
              info="This is the name that your customers will see when they use the mobile app. Examples of things you can do are freebies and discounts!"
            />

            <Input
              type="text"
              value={rewardTitle}
              className="w-1/2 border-2 border-slate-400 mt-3 ml-5"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setRewardTitle(event.target.value);
              }}
            />
          </div>
          <div className="border-b-2 border-slate-300 py-5">
            <OptionHeader
              title="Required Stamps"
              info="How many stamps will your customers need to get the reward?"
            />

            <div className="flex items-center gap-5 mt-3 ml-5">
              <Button
                size="sm"
                className="h-7 w-7 font-semibold text-lg"
                onClick={() => {
                  if (requiredStamps > 1) {
                    setRequiredStamps(requiredStamps - 1);
                  }
                }}
              >
                -
              </Button>
              <p className="text-lg font-semibold">{requiredStamps}</p>
              <Button
                size="sm"
                className="h-7 w-7 font-semibold text-lg"
                onClick={() => {
                  if (requiredStamps < stampCount) {
                    setRequiredStamps(requiredStamps + 1);
                  }
                }}
              >
                +
              </Button>
            </div>
          </div>
          <DialogClose className="w-full">
            <div className="flex justify-end gap-5 mt-3">
              <Button
                className="border-2 border-black w-1/6 text-black hover:bg-white bg-white"
                onClick={() => {
                  setRewardTitle("");
                  setRequiredStamps(1);
                }}
              >
                Cancel
              </Button>
              <Button
                className="w-1/6"
                onClick={() => {
                  addReward({
                    title: rewardTitle,
                    requiredStamps: requiredStamps,
                  });
                }}
              >
                Save
              </Button>
            </div>
          </DialogClose>
        </DialogContent>
      </Dialog>
    )
  );
};

export const EditRewardDialog = ({
  initialTitle,
  initialRequiredStamps,
}: {
  initialTitle: string;
  initialRequiredStamps: number;
}) => {
  const { stampCount, updateReward, isEditing } = useLoyaltyProgramStore();
  const [isClient, setIsClient] = useState(false);
  const [rewardTitle, setRewardTitle] = useState(initialTitle);
  const [requiredStamps, setRequiredStamps] = useState(initialRequiredStamps);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <Dialog>
        <DialogTrigger disabled={!isEditing}>
          <div className="bg-black p-2 rounded-md">
            <FaPencilAlt size={15} color="white" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Edit existing reward</DialogTitle>
          </DialogHeader>
          <div className="border-b-2 border-slate-300 py-5">
            <OptionHeader
              title="Reward title"
              info="This is the name that your customers will see when they use the mobile app. Examples of things you can do are freebies and discounts!"
            />

            <Input
              type="text"
              value={rewardTitle}
              className="w-1/2 border-2 border-slate-400 mt-3 ml-5"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setRewardTitle(event.target.value);
              }}
            />
          </div>
          <div className="border-b-2 border-slate-300 py-5">
            <OptionHeader
              title="Required Stamps"
              info="How many stamps will your customers need to get the reward?"
            />

            <div className="flex items-center gap-5 mt-3 ml-5">
              <Button
                size="sm"
                className="h-7 w-7 font-semibold text-lg"
                onClick={() => {
                  if (requiredStamps > 1) {
                    setRequiredStamps(requiredStamps - 1);
                  }
                }}
              >
                -
              </Button>
              <p className="text-lg font-semibold">{requiredStamps}</p>
              <Button
                size="sm"
                className="h-7 w-7 font-semibold text-lg"
                onClick={() => {
                  if (requiredStamps < stampCount) {
                    setRequiredStamps(requiredStamps + 1);
                  }
                }}
              >
                +
              </Button>
            </div>
          </div>
          <DialogClose className="w-full">
            <div className="flex justify-end gap-5 mt-3">
              <Button
                className="border-2 border-black w-1/6 text-black hover:bg-white bg-white"
                onClick={() => {
                  setRewardTitle(initialTitle);
                  setRequiredStamps(initialRequiredStamps);
                }}
              >
                Cancel
              </Button>
              <Button
                className="w-1/6"
                onClick={() => {
                  updateReward(
                    {
                      title: initialTitle,
                      requiredStamps: initialRequiredStamps,
                    },
                    {
                      title: rewardTitle,
                      requiredStamps: requiredStamps,
                    }
                  );
                }}
              >
                Save
              </Button>
            </div>
          </DialogClose>
        </DialogContent>
      </Dialog>
    )
  );
};

export const DeleteRewardDialog = ({
  title,
  requiredStamps,
}: {
  title: string;
  requiredStamps: number;
}) => {
  const [isClient, setIsClient] = useState(false);
  const { deleteReward, isEditing } = useLoyaltyProgramStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <Dialog>
        <DialogTrigger disabled={!isEditing}>
          <div className="bg-white border-2 border-black p-2 rounded-md">
            <FaRegTrashAlt size={15} />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Delete this reward?</DialogTitle>
            <DialogDescription className="text-lg">
              This action can&apos;t be undone once you click confirm. Your
              reward will be permanently deleted!
            </DialogDescription>
          </DialogHeader>

          <DialogClose className="w-full">
            <div className="flex justify-end gap-5 mt-3">
              <Button className="border-2 border-black w-1/6 text-black hover:bg-white bg-white">
                Cancel
              </Button>
              <Button
                className="w-1/6"
                onClick={() => {
                  deleteReward({
                    title: title,
                    requiredStamps: requiredStamps,
                  });
                }}
              >
                Confirm
              </Button>
            </div>
          </DialogClose>
        </DialogContent>
      </Dialog>
    )
  );
};
