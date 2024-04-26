import { Progress } from "@/components/ui/progress";
import { useLoyaltyProgramStore } from "@/utils/store";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Image from "next/image";

const CurrentStamps = () => {
  const { stampCount, activeStamp, colors } = useLoyaltyProgramStore();
  const ActiveStampIcon = activeStamp;

  return (
    <div
      className={`flex justify-center flex-wrap gap-4 mx-auto ${
        stampCount > 7 ? "w-3/4" : ""
      }`}
    >
      {Array.from({ length: stampCount }, (_, i) => i + 1).map((number) => (
        <div
          key={number}
          className="rounded-full p-3"
          style={{ backgroundColor: colors[0] }}
        >
          <ActiveStampIcon color={colors[2]} size={30} />
        </div>
      ))}
    </div>
  );
};

const Contact = () => {
  const { businessPhone, businessEmail, colors } = useLoyaltyProgramStore();

  return (
    <div className="flex justify-center gap-10">
      <div className="flex gap-2 items-center">
        <FaPhoneAlt color={colors[0]} />
        <p style={{ color: colors[0] }}>{businessPhone}</p>
      </div>
      <div className="flex gap-2 items-center">
        <IoMdMail color={colors[0]} />
        <p style={{ color: colors[0] }}>{businessEmail}</p>
      </div>
    </div>
  );
};

export const LoyaltyProgress = () => {
  const { scaleAmount } = useLoyaltyProgramStore();

  return (
    <div className="w-11/12 mx-auto flex flex-col gap-3">
      <div className="flex justify-between">
        <p className="font-semibold">Your progress</p>
        <p>$X until your next stamp</p>
      </div>
      <Progress value={50} />
      <p className="text-right font-semibold">${scaleAmount}</p>
    </div>
  );
};

export const RewardsPreview = () => {
  const { definedRewards, activeStamp, colors } = useLoyaltyProgramStore();
  const ActiveStampIcon = activeStamp;

  return (
    <div className="flex flex-col gap-3 w-5/6 mx-auto">
      {definedRewards &&
        definedRewards
          .sort((a, b) => a.requiredStamps - b.requiredStamps)
          .map((item) => {
            return (
              <div
                key={item.reward_id}
                className="border-black border-2 rounded-md p-4 flex items-center justify-between"
              >
                <p className="font-semibold text-xl">{item.title}</p>
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-xl">{item.requiredStamps}</p>
                  <div
                    className="rounded-full p-3"
                    style={{ backgroundColor: colors[0] }}
                  >
                    <ActiveStampIcon color={colors[2]} size={20} />
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export const Variant = () => {
  const { cardLayoutStyle } = useLoyaltyProgramStore();

  const renderVariant = () => {
    switch (cardLayoutStyle) {
      case 1:
        return <Variant1 />;
      case 2:
        return <Variant2 />;
      case 3:
        return <Variant3 />;
      default:
        return <Variant3 />;; // Handle other cases if needed
    }
  };

  return (
    <div>
      {renderVariant()}
    </div>
  );
};

export const Variant1 = () => {
  const { businessName, businessLogo, colors } = useLoyaltyProgramStore();

  return (
    <div
      className="border-black border-2 rounded-lg px-5 py-7 flex flex-col gap-7 drop-shadow-lg"
      style={{ backgroundColor: colors[1] }}
    >
      <div className="flex items-center justify-center gap-10">
        {businessLogo ? (
          <Image alt="" src={businessLogo} width={100} height={100} className="rounded-lg"/>
        ) : null}

        <p className="text-4xl font-semibold" style={{ color: colors[0] }}>
          {businessName}
        </p>
      </div>
      <CurrentStamps />
      <Contact />
    </div>
  );
};

export const Variant2 = () => {
  const { businessName, businessLogo, colors } = useLoyaltyProgramStore();

  return (
    <div
      className="border-black border-2 rounded-lg flex flex-col gap-[13px] drop-shadow-lg"
      style={{ backgroundColor: colors[1] }}
    >
      <div className="h-[15px]" style={{ backgroundColor: colors[0] }}></div>
      <div className="flex flex-col gap-7 px-5">
        <div className="flex items-center justify-center gap-10">
          {businessLogo ? (
            <Image alt="" src={businessLogo} width={100} height={100} className="rounded-lg"/>
          ) : null}

          <p className="text-4xl font-semibold" style={{ color: colors[0] }}>
            {businessName}
          </p>
        </div>
        <CurrentStamps />
        <Contact />
      </div>
      <div className="h-[15px]" style={{ backgroundColor: colors[0] }}></div>
    </div>
  );
};

export const Variant3 = () => {
  const { businessName, businessLogo, colors } = useLoyaltyProgramStore();

  return (
    <div
      className="border-black border-2 rounded-lg py-7 flex flex-col gap-7 drop-shadow-lg"
      style={{ backgroundColor: colors[1] }}
    >
      <div className=" flex flex-col gap-7 px-5">
        <div className="flex items-center justify-center gap-10">
          {businessLogo ? (
            <Image alt="" src={businessLogo} width={100} height={100} className="rounded-lg" />
          ) : null}

          <p className="text-4xl font-semibold" style={{ color: colors[0] }}>
            {businessName}
          </p>
        </div>
        <CurrentStamps />
      </div>
      <div className="flex items-center justify-center" style={{ backgroundColor: colors[2] }}>
        <Contact />
      </div>
    </div>
  );
};