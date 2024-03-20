"use client";
import {
  CompletionCardProps,
  useAuthStore,
  useOnboardingStore,
} from "@/utils/store";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { ProfileCompletionCard } from "@/components/ProfileCompletionCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/utils/generalAxios";

export function ProgressDemo() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} />;
}

const calculateProfileCompletion = (
  completionCards: CompletionCardProps[]
): number => {
  let progress = 0;
  const total = completionCards.length;

  // Assuming each card has an `isCompleted` property
  completionCards.forEach((card) => {
    if (card.isCompleted) {
      progress++;
    }
  });

  return Math.round((progress / total) * 100);
};

export default function AuthHome() {
  const { getToken } = useAuth();
  const { token, setToken } = useAuthStore();
  const { completionCards, setCompletionCards } = useOnboardingStore();

  useEffect(() => {
    async function fetchToken() {
      const toFetch = await getToken();
      setToken(toFetch);
    }
    fetchToken();
  }, [getToken, setToken]);

  const fetchOnboardingData = async () => {
    return fetchAPI(
      "http://localhost:5001/business/api/onboarding",
      "GET",
      await getToken(),
      null,
      {}
    );
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["onboardingData"],
    queryFn: fetchOnboardingData,
    enabled: !!token,
  });

  useEffect(() => {
    if (data) {
      const { results } = data;
      console.log("Fetched data reached");
      setCompletionCards(results);
    }
  }, [data, setCompletionCards]);

  return (
    <div className="flex items-center justify-center h-full flex-col gap-10">
      <div className="flex justify-center flex-col items-center gap-10 w-3/4 2xl:w-2/3 border-4 rounded-md border-black p-10 mt-20">
        <div className="flex justify-evenly items-center">
          <div className="flex flex-col text-left items-center justify-center">
            <p className="text-7xl font-extrabold text-left w-2/3">
              {calculateProfileCompletion(completionCards)}%
            </p>
            <p className="font-bold w-2/3 text-left text-xl">
              of your profile is complete
            </p>
          </div>
          <div className="w-2/3 flex flex-col items-center gap-5 text-left">
            <Progress value={calculateProfileCompletion(completionCards)} />
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
          {completionCards
            .filter((item) => !item.isCompleted)
            .map((filteredItem) => (
              <ProfileCompletionCard key={filteredItem.id} {...filteredItem} />
            ))}
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
      <div className="text-slate-500 flex gap-5 mb-20">
        <p>Privacy Policy</p>
        <p>Cookie Policy</p>
        <p>Terms & Conditions</p>
      </div>
    </div>
  );
}
