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
import { FaPencilAlt } from "react-icons/fa";
import { Sketch } from '@uiw/react-color';
import { useState, useEffect, useRef } from "react";

function hexToRgb(hex: string) {
    hex = hex.replace(/^#/, '');
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return [r, g, b];
}

function luminance(r: number, g: number, b: number) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function determineTextColor(hex: string) {
    const [r, g, b] = hexToRgb(hex);
    return luminance(r, g, b) > 0.179 ? '#000000' : '#FFFFFF';
}

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
    const [showPickerIndex, setShowPickerIndex] = useState<number | null>(null);
    const { colors, colorLabels, setColorTheme } = useLoyaltyProgramStore();
    const pickerRef = useRef<HTMLDivElement | null>(null); // Ref type specified here

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setShowPickerIndex(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleColorChange = (color: { hex: string; }, index: number) => {
        setColorTheme(color.hex, index);
    };

    return (
        <div className="py-5">
            <OptionHeader title="Color Theme" info="..." />
            <div className="mt-3 ml-5 flex gap-4">
                {colors.map((color, index) => (
                    <div key={index} className="relative">
                        {showPickerIndex === index && (
                            <div ref={pickerRef} className="absolute z-10" style={{ marginTop: '-292.5px' }}>
                                <Sketch
                                    disableAlpha={true}
                                    color={color}
                                    onChange={(color) => {
                                        handleColorChange(color, index);
                                    }}
                                />
                            </div>
                        )}
                        <div className="flex flex-col justify-center w-fit bg-white p-2 drop-shadow rounded-md">
                            <div className="w-24 h-24 mb-2 flex items-center justify-center" style={{ backgroundColor: color }}>
                                <button
                                    onClick={() => setShowPickerIndex(index)}
                                >
                                    <FaPencilAlt className="w-4 h-4" style={{ color: determineTextColor(color) }} />
                                </button>
                            </div>
                            <h1 className="font-semibold text-sm">{colorLabels[index]}</h1>
                            <h1 className="font-semibold text-xs uppercase">{color}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};