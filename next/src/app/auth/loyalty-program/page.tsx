import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const OptionHeader = ({ title, info }: { title: string; info: string }) => {
  return (
    <div className="flex gap-3 items-center">
      <p className="text-xl font-semibold">{title}</p>
      <Popover>
        <PopoverTrigger>
          <Image src="/assets/info-icon.png" alt="" width={25} height={25} />
        </PopoverTrigger>
        <PopoverContent
          side="right"
          sideOffset={10}
          alignOffset={10}
          align="end"
        >
          {info}
        </PopoverContent>
      </Popover>
    </div>
  );
};

const StampLifeSection = () => {
  return (
    <div className="border-b-2 border-slate-300 py-5">
      <OptionHeader
        title="Stamp life"
        info="Choose how long your customer's stamps will last if they don't shop at your store for a certain duration"
      />

      <div className="flex gap-3 mt-3 ml-5">
        <Button size="sm">Forever</Button>
        <Button size="sm">3 months</Button>
        <Button size="sm">6 months</Button>
        <Button size="sm">9 months</Button>
        <Button size="sm">1 year</Button>
      </div>
    </div>
  );
};

const StampCountSection = () => {
  return (
    <div className="border-b-2 border-slate-300 py-5">
      <OptionHeader
        title="Stamp count"
        info="Choose the max amount of stamps your customer can have at a time"
      />
    </div>
  );
};

const ScaleRewardSection = () => {
  return (
    <div className="border-b-2 border-slate-300 py-5">
      <OptionHeader
        title="Scale reward"
        info="Define how much customers must spend to earn a stamp"
      />
    </div>
  );
};

const DefineRewardSection = () => {
  return (
    <div className="border-b-2 border-slate-300 py-5">
      <OptionHeader
        title="Define reward"
        info="Create rewards that your customers can cash their stamps out for!"
      />
    </div>
  );
};

export default function LoyaltyProgram() {
  return (
    <>
      <p className="text-2xl font-semibold pt-20 pb-5">
        Loyalty Program Builder
      </p>

      <div className="flex justify-start gap-20">
        <Tabs defaultValue="settings" className="w-3/5">
          <TabsList>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
          </TabsList>
          <TabsContent value="settings">
            <div className="ml-10">
              <StampLifeSection />
              <StampCountSection />
              <ScaleRewardSection />
              <DefineRewardSection />
            </div>
          </TabsContent>
          <TabsContent value="design">Change your password here.</TabsContent>
        </Tabs>
        <p className="bg-pink-500 w-1/3">live preview will go here</p>
      </div>
    </>
  );
}
