"use client";
import { useLoyaltyProgramStore } from "@/utils/store";
import { fetchAPI } from "@/utils/generalAxios";
import { OptionHeader } from "./page";
import { Button } from "@/components/ui/button";
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
import { Sketch } from "@uiw/react-color";
import { useState, useEffect, useRef } from "react";
import { activeStampOptions } from "./DesignIcons";

function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, "");
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
  return luminance(r, g, b) > 0.179 ? "#000000" : "#FFFFFF";
}

export const CardLayoutStyleSection = () => {
  const {
    cardLayoutStyle,
    incrementCardLayoutStyle,
    decrementCardLayoutStyle,
    isEditing,
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
          onClick={() => {
            if (isEditing) decrementCardLayoutStyle();
          }}
        >
          &#60;
        </Button>
        <p className="text-lg font-semibold">{cardLayoutStyle}</p>
        <Button
          size="sm"
          className="h-7 w-7 font-semibold text-lg"
          onClick={() => {
            if (isEditing) incrementCardLayoutStyle();
          }}
        >
          &#62;
        </Button>
      </div>
    </div>
  );
};

export const ActiveStampSection = () => {
  const { setActiveStamp, activeStampValue, setActiveStampValue, isEditing } =
    useLoyaltyProgramStore();

  const handleSelect = (value: string) => {
    const selectedOption = activeStampOptions.find(
      (option) => option.value === value
    );
    if (selectedOption) {
      setActiveStamp(selectedOption.Icon);
      setActiveStampValue(value);
    }
  };

  return (
    <div className="border-b-2 border-slate-300 py-5">
      <OptionHeader title="Active stamp" info="..." />
      <div className="mt-3 ml-5">
        <Select
          onValueChange={handleSelect}
          defaultValue={activeStampValue}
          disabled={!isEditing}
        >
          <SelectTrigger className="w-[220px] border-2 border-black">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-44 overflow-y-auto">
            <SelectGroup>
              {activeStampOptions.map(({ value, label, Icon }) => (
                <SelectItem key={value} value={value}>
                  <div className="flex items-center gap-2">
                    <Icon color="black" size={24} />
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
  const { colors, colorLabels, setColorTheme, isEditing } =
    useLoyaltyProgramStore();
  const pickerRef = useRef<HTMLDivElement | null>(null); // Ref type specified here

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPickerIndex(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleColorChange = (color: { hex: string }, index: number) => {
    setColorTheme(color.hex, index);
  };

  return (
    <div className="py-5">
      <OptionHeader title="Color Theme" info="..." />
      <div className="mt-3 ml-5 flex gap-4">
        {colors.map((color, index) => (
          <div key={index} className="relative">
            {showPickerIndex === index && (
              <div
                ref={pickerRef}
                className="absolute z-10"
                style={{ marginTop: "-292.5px" }}
              >
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
              <div
                className="w-24 h-24 mb-2 flex items-center justify-center"
                style={{ backgroundColor: color }}
              >
                <button
                  onClick={() => {
                    if (isEditing) setShowPickerIndex(index);
                  }}
                >
                  <FaPencilAlt
                    className="w-4 h-4"
                    style={{ color: determineTextColor(color) }}
                  />
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
