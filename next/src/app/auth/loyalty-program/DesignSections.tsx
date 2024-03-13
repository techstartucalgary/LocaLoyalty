"use client";
import { useAuthStore, useLoyaltyProgramStore } from "@/utils/store";
import { fetchAPI } from "@/utils/generalAxios";
import { OptionHeader } from "./page";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const CardLayoutStyleSection = () => {
    const {
        cardLayoutStyle,
        incrementCardLayoutStyle,
        decrementCardLayoutStyle,
    } = useLoyaltyProgramStore();

    return (
        <div className="border-b-2 border-slate-300 py-5">
            <OptionHeader
                title="Card layout style"
                info="Choose the card layout style for your loyalty program, this is what customers will see"
            />
            <div className="flex items-center gap-5 mt-3 ml-5">
                <Button
                    size="sm"
                    className="h-7 w-7 font-semibold text-lg"
                    onClick={() => decrementCardLayoutStyle()}
                >
                    &#60;
                </Button>
                <p className="text-lg font-semibold">{cardLayoutStyle}</p>
                <Button
                    size="sm"
                    className="h-7 w-7 font-semibold text-lg"
                    onClick={() => incrementCardLayoutStyle()}
                >
                    &#62;
                </Button>
            </div>
        </div>
    );
};

export const ActiveStampSection = () => {
    // const activeStampOptions = [
    //     { value: "star1", label: "Star 1", Icon: FaStar },
    //     { value: "star2", label: "Star 2", Icon: FaRegStar },
    //     { value: "heart1", label: "Heart 1", Icon: FaHeart },
    //     { value: "heart2", label: "Heart 2", Icon: FaRegHeart },
    //     { value: "smile1", label: "Smile 1", Icon: FaSmile },
    //     { value: "smile2", label: "Smile 2", Icon: FaRegSmile },
    //     { value: "check1", label: "Check 1", Icon: FaCheck },
    //     { value: "check2", label: "Check 2", Icon: FaRegCheckCircle },
    //     { value: "leaf1", label: "Leaf 1", Icon: IoLeaf },
    //     { value: "leaf2", label: "Leaf 2", Icon: IoLeafOutline },
    //     { value: "sun1", label: "Sun 1", Icon: IoSunny },
    //     { value: "sun2", label: "Sun 2", Icon: IoSunnyOutline },
    //     { value: "moon1", label: "Moon 1", Icon: IoMoon },
    //     { value: "moon2", label: "Moon 2", Icon: IoMoonOutline },
    //     { value: "paw1", label: "Paw 1", Icon: IoPaw },
    //     { value: "paw2", label: "Paw 2", Icon: IoPawOutline },
    //     { value: "rocket1", label: "Rocket 1", Icon: IoRocket },
    //     { value: "rocket2", label: "Rocket 2", Icon: IoRocketOutline },
    //     { value: "flower1", label: "Flower 1", Icon: PiFlower },
    //     { value: "flower2", label: "Flower 2", Icon: PiFlowerFill },
    //     { value: "sparkle1", label: "Sparkle 1", Icon: IoSparkles },
    //     { value: "sparkle2", label: "Sparkle 2", Icon: IoSparklesOutline },
    // ];

    const activeStampOptions = [
        { value: "check1", label: "Check 1", Icon: "/assets/stamp_icons/solar--check-circle-bold.svg" },
        { value: "check2", label: "Check 2", Icon: "/assets/stamp_icons/solar--check-circle-linear.svg" },
        { value: "heart1", label: "Heart 1", Icon: "/assets/stamp_icons/solar--heart-bold.svg" },
        { value: "heart2", label: "Heart 2", Icon: "/assets/stamp_icons/solar--heart-linear.svg" },
        { value: "hearts1", label: "Hearts 1", Icon: "/assets/stamp_icons/solar--hearts-bold.svg" },
        { value: "hearts2", label: "Hearts 2", Icon: "/assets/stamp_icons/solar--hearts-linear.svg" },
        { value: "star1", label: "Star 1", Icon: "/assets/stamp_icons/solar--star-bold.svg" },
        { value: "star2", label: "Star 2", Icon: "/assets/stamp_icons/solar--star-linear.svg" },
        { value: "coffee1", label: "Coffee 1", Icon: "/assets/stamp_icons/solar--cup-hot-bold.svg" },
        { value: "coffee2", label: "Coffee 2", Icon: "/assets/stamp_icons/solar--cup-hot-linear.svg" },
        { value: "tea1", label: "Tea 1", Icon: "/assets/stamp_icons/solar--tea-cup-bold.svg" },
        { value: "tea2", label: "Tea 2", Icon: "/assets/stamp_icons/solar--tea-cup-linear.svg" },
        { value: "chefhat1", label: "Chef Hat 1", Icon: "/assets/stamp_icons/solar--chef-hat-heart-bold.svg" },
        { value: "chefhat2", label: "Chef Hat 2", Icon: "/assets/stamp_icons/solar--chef-hat-heart-linear.svg" },
        { value: "trophy1", label: "Trophy 1", Icon: "/assets/stamp_icons/solar--cup-star-bold.svg" },
        { value: "trophy2", label: "Trophy 2", Icon: "/assets/stamp_icons/solar--cup-star-linear.svg" },
        { value: "shiningheart1", label: "Shining Heart 1", Icon: "/assets/stamp_icons/solar--heart-shine-bold.svg" },
        { value: "shiningheart2", label: "Shining Heart 2", Icon: "/assets/stamp_icons/solar--heart-shine-linear.svg" },
        { value: "moon1", label: "Moon 1", Icon: "/assets/stamp_icons/solar--moon-stars-bold.svg" },
        { value: "moon2", label: "Moon 2", Icon: "/assets/stamp_icons/solar--moon-stars-linear.svg" },
        { value: "smile1", label: "Smile 1", Icon: "/assets/stamp_icons/solar--smile-circle-bold.svg" },
        { value: "smile2", label: "Smile 2", Icon: "/assets/stamp_icons/solar--smile-circle-linear.svg" },
    ];

    return (
        <div className="border-b-2 border-slate-300 py-5">
            <OptionHeader title="Active stamp" info="..." />

            <div className="mt-3 ml-5">
                <Select>
                    <SelectTrigger className="w-[220px] border-2 border-black">
                        <SelectValue placeholder="Select a stamp" />
                    </SelectTrigger>
                    <SelectContent className="max-h-44 overflow-y-auto">
                        <SelectGroup>
                            {activeStampOptions.map(({ value, label, Icon }) => (
                                <SelectItem key={value} value={value}>
                                    <div className="flex items-center">
                                        <img src={Icon} alt={label} className="w-6 h-6 mr-2" />
                                        {label}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export const ColorThemeSection = () => {
    const HexColorCodes = [
        {
            value: "theme1",
            id: "t1",
            color1: "#000000",
            color2: "#FFFFFF",
            color3: "#EDEDED",
        },
        {
            value: "theme2",
            id: "t2",
            color1: "#CD6464",
            color2: "#FFC3CB",
            color3: "#FFFFFF",
        },
        {
            value: "theme3",
            id: "t3",
            color1: "#2C5E92",
            color2: "#A9CEF4",
            color3: "#FFFFFF",
        },
        {
            value: "theme4",
            id: "t4",
            color1: "#5952A5",
            color2: "#94A3DB",
            color3: "#FFFFFF",
        },
    ];

    return (
        <div className="py-5">
            <OptionHeader title="Color Theme" info="..." />

            <div className="mt-3 ml-5">
                <RadioGroup defaultValue="theme1">
                    {HexColorCodes.map(({ value, id, color1, color2, color3 }) => (
                        <div className="flex items-center" key={id}>
                            <RadioGroupItem
                                value={value}
                                id={id}
                                className="w-6 h-6 border-2 mr-4"
                            />
                            <div className="flex gap-2">
                                <div
                                    className="h-7 w-7 rounded-md border-2 border-black"
                                    style={{ backgroundColor: color1 }}
                                ></div>
                                <div
                                    className="h-7 w-7 rounded-md border-2 border-black"
                                    style={{ backgroundColor: color2 }}
                                ></div>
                                <div
                                    className="h-7 w-7 rounded-md border-2 border-black"
                                    style={{ backgroundColor: color3 }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </div>
    );
};