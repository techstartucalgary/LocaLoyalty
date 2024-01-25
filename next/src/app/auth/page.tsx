"use client";
import { useAuthStore } from "@/utils/store";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { ProfileCompletionCard } from "@/components/ProfileCompletionCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ProgressDemo() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} />;
}

export default function AuthHome() {
  const { getToken } = useAuth();
  const { setToken } = useAuthStore();

  useEffect(() => {
    async function fetchToken() {
      const toFetch = await getToken();
      setToken(toFetch);
    }

    fetchToken();
  }, [getToken, setToken]);

  return (
    <div className="flex items-center justify-center my-auto h-full flex-col gap-10 my-20">
      {/*
        <Link href="/auth/profile" className="bg-red-500 p-5 mb-5">
          temp profile direct
        </Link>
        */}
      <div className="flex justify-center flex-col items-center gap-10 w-2/3 border-4 rounded-md border-black p-10">
        <div className="flex justify-evenly items-center">
          <div className="flex flex-col text-left items-center justify-center">
            <p className="text-7xl font-extrabold text-left w-2/3">25%</p>
            <p className="font-bold w-2/3 text-left text-xl">
              of your profile is complete!
            </p>
          </div>
          <div className="w-2/3 flex flex-col items-center gap-5 text-left">
            <ProgressDemo />
            <div className="w-full flex flex-col gap-2">
              <p className="text-xl font-semibold text-left w-full">
                Complete your profile to start your loyalty rewards program!
              </p>
              <p className="w-full text-slate-600">
                Kick start your journey by connecting to your Clover account,
                providing essential business details, and crafting your unique
                loyalty program structure. By completing your profile, you
                unlock exclusive benefits and a streamlined experience for both
                you and your customers. Don&apos;t miss out on the opportunity
                to enhance customer satisfaction and boost your business. Set up
                your profile now, and watch your loyalty program propel your
                success!
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-evenly w-11/12">
          <ProfileCompletionCard />
          <ProfileCompletionCard />
          <ProfileCompletionCard />
        </div>
      </div>

      <div className="w-2/3">
        <p className="font-semibold text-xl">Tips and resources</p>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="border-b-2 border-black">
              <p className="ml-7">What is a loyalty/rewards program?</p>
            </AccordionTrigger>
            <AccordionContent>Place holder text</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="border-b-2 border-black">
              <p className="ml-7">What type of promotions can you create?</p>
            </AccordionTrigger>
            <AccordionContent>Placeholder text</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="border-b-2 border-black">
              <p className="ml-7">
                What type of analytics are accessible to me?
              </p>
            </AccordionTrigger>
            <AccordionContent>Placeholder text</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="border-b-2 border-black">
              <p className="ml-7">How much does LocaLoyalty cost?</p>
            </AccordionTrigger>
            <AccordionContent>Placeholder text</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="w-2/4 p-5 border-black border-4 rounded-md">
        <p className="font-bold text-lg">Need more help?</p>
        <p className=" text-slate-500">
          Visit our <span className="underline">Help Center</span> or contact us
          at <span className="underline">localoyaltycalgary@gmail.com</span>
        </p>
      </div>
      <div className="text-slate-500 flex gap-5">
        <p>Privacy Policy</p>
        <p>Cookie Policy</p>
        <p>Terms & Conditions</p>
      </div>
    </div>
  );
}
