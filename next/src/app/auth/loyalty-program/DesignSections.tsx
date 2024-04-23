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
    const { cardLayoutStyle, incrementCardLayoutStyle, decrementCardLayoutStyle, isEditing } = useLoyaltyProgramStore();

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

export const Star1Icon = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <path fill="none" stroke={color} stroke-width="1.5" d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182z" />
    </svg>
);

export const Star2Icon = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <path fill={color} d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182z" />
    </svg>
);

export const Heart1Icon = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <path fill={color} d="m8.962 18.91l.464-.588zM12 5.5l-.54.52a.75.75 0 0 0 1.08 0zm3.038 13.41l.465.59zm-5.612-.588C7.91 17.127 6.253 15.96 4.938 14.48C3.65 13.028 2.75 11.335 2.75 9.137h-1.5c0 2.666 1.11 4.7 2.567 6.339c1.43 1.61 3.254 2.9 4.68 4.024zM2.75 9.137c0-2.15 1.215-3.954 2.874-4.713c1.612-.737 3.778-.541 5.836 1.597l1.08-1.04C10.1 2.444 7.264 2.025 5 3.06C2.786 4.073 1.25 6.425 1.25 9.137zM8.497 19.5c.513.404 1.063.834 1.62 1.16c.557.325 1.193.59 1.883.59v-1.5c-.31 0-.674-.12-1.126-.385c-.453-.264-.922-.628-1.448-1.043zm7.006 0c1.426-1.125 3.25-2.413 4.68-4.024c1.457-1.64 2.567-3.673 2.567-6.339h-1.5c0 2.198-.9 3.891-2.188 5.343c-1.315 1.48-2.972 2.647-4.488 3.842zM22.75 9.137c0-2.712-1.535-5.064-3.75-6.077c-2.264-1.035-5.098-.616-7.54 1.92l1.08 1.04c2.058-2.137 4.224-2.333 5.836-1.596c1.659.759 2.874 2.562 2.874 4.713zm-8.176 9.185c-.526.415-.995.779-1.448 1.043c-.452.264-.816.385-1.126.385v1.5c.69 0 1.326-.265 1.883-.59c.558-.326 1.107-.756 1.62-1.16z"/>
    </svg>
);

export const Heart2Icon = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <path fill={color} d="M2 9.137C2 14 6.02 16.591 8.962 18.911C10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138c0-4.863-5.5-8.312-10-3.636C7.5.825 2 4.274 2 9.137"/>
    </svg>
);

export const Check1Icon = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <g fill="none" stroke={color} stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="m8.5 12.5l2 2l5-5"/></g>
    </svg>
);

export const Check2Icon = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <path fill={color} fill-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-5.97-3.03a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47l2.235-2.235L14.97 8.97a.75.75 0 0 1 1.06 0" clip-rule="evenodd"/>
    </svg>
);

export const Hearts1Icon = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <path fill={color} d="m8.962 19.338l.477-.578zM12 5.317l-.552.508a.75.75 0 0 0 1.104 0zm2.829 14.852l.45-.6zm1.671-7.01l-.527.533a.75.75 0 0 0 1.054 0zm1.671 7.01l-.45-.6zm-8.732-1.41C6.385 16.243 2.75 13.774 2.75 9.12h-1.5c0 5.516 4.404 8.465 7.235 10.798zM2.75 9.12c0-2.28 1.232-4.174 2.886-4.964c1.596-.763 3.75-.57 5.812 1.67l1.104-1.016C10.114 2.16 7.268 1.712 4.989 2.8C2.768 3.863 1.25 6.314 1.25 9.12zm5.735 10.798c.512.422 1.062.872 1.62 1.213c.556.34 1.196.62 1.895.62v-1.5c-.301 0-.66-.123-1.114-.4c-.452-.276-.921-.657-1.447-1.09zM22.75 9.12c0-2.805-1.518-5.256-3.74-6.318c-2.278-1.089-5.124-.64-7.562 2.008l1.104 1.016c2.062-2.24 4.216-2.433 5.812-1.67c1.654.79 2.886 2.684 2.886 4.964zm-11 5.94c0-.969.576-1.787 1.37-2.132c.757-.329 1.81-.264 2.853.765l1.054-1.067c-1.433-1.415-3.13-1.671-4.504-1.074a3.817 3.817 0 0 0-2.273 3.508zm2.63 5.71c.278.21.598.449.928.632c.33.183.736.349 1.192.349v-1.5c-.094 0-.238-.036-.463-.16a7.087 7.087 0 0 1-.758-.521zm4.24 0c.765-.572 1.806-1.272 2.62-2.144c.84-.899 1.51-2.047 1.51-3.565h-1.5c0 1.024-.436 1.824-1.106 2.541c-.695.745-1.568 1.328-2.423 1.968zm-.899-1.2a7.087 7.087 0 0 1-.758.52c-.225.125-.369.161-.463.161v1.5c.456 0 .861-.166 1.192-.35c.33-.182.65-.422.929-.63zm5.029-4.51a3.843 3.843 0 0 0-1.06-2.66l-1.085 1.037c.397.415.645.987.645 1.624zm-1.06-2.66a3.676 3.676 0 0 0-2.643-1.149c-1.044-.005-2.121.434-3.074 1.375l1.054 1.067c.71-.7 1.418-.945 2.013-.942c.603.003 1.159.26 1.565.685zm.134.842a9.41 9.41 0 0 0 .926-4.122h-1.5a7.91 7.91 0 0 1-.78 3.475zm-6.545 6.328a48.899 48.899 0 0 0-.434-.32l-.886 1.21l.42.31zm-.434-.32c-1.626-1.191-3.095-2.307-3.095-4.19h-1.5c0 2.767 2.227 4.315 3.709 5.4zm-.906.015c-.827.648-1.433.986-1.939.986v1.5c1.083 0 2.065-.679 2.865-1.306z"/>
    </svg>
);

export const Hearts2Icon = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <path fill={color} d="M16.5 13.287c-2.475-2.716-5.5-.712-5.5 2.112c0 2.56 1.814 4.035 3.358 5.292l.044.036l.427.35c.571.475 1.121.923 1.671.923s1.1-.448 1.671-.923C19.789 19.73 22 18.224 22 15.399c0-.927-.326-1.767-.853-2.38c-1.075-1.251-2.985-1.556-4.647.268"/><path fill={color} d="M8.106 18.247C5.298 16.083 2 13.542 2 9.137C2 4.274 7.5.825 12 5.501C16.5.825 22 4.274 22 9.137c0 .834-.118 1.6-.329 2.31a4.203 4.203 0 0 0-2.619-.947c-.89-.005-1.758.274-2.553.81c-1.39-.933-2.956-1.058-4.33-.395c-1.635.79-2.669 2.556-2.669 4.484c0 2.306 1.149 3.923 2.342 5.095c-.948-.076-1.897-.808-2.88-1.583c-.277-.219-.564-.44-.856-.664"/>
    </svg>
);

export const Coffee1Icon = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <g fill="none" stroke={color} stroke-width="1.5"><path d="M3.284 11.266c-.133-2-.2-2.999.393-3.632C4.27 7 5.272 7 7.276 7h5.449c2.003 0 3.005 0 3.598.634c.593.633.526 1.633.393 3.632l-.343 5.133c-.177 2.655-.265 3.982-1.13 4.792c-.865.809-2.196.809-4.856.809h-.774c-2.66 0-3.99 0-4.856-.81c-.865-.809-.953-2.136-1.13-4.79zM17 17h1a4 4 0 0 0 0-8h-1m-1 9H4"/><path stroke-linecap="round" d="m6.05 5.061l.411-.575a.707.707 0 0 0-.165-.987a.707.707 0 0 1-.165-.986l.41-.575m7.51 3.123l.41-.575a.707.707 0 0 0-.165-.987a.707.707 0 0 1-.165-.986l.41-.575m-4.49 3.123l.41-.575a.707.707 0 0 0-.165-.987a.707.707 0 0 1-.165-.986l.41-.575"/></g>
    </svg>
);

export const Coffee2Icon = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <path fill={color} fill-rule="evenodd" d="M3.284 11.266c-.133-2-.2-2.999.393-3.632C4.27 7 5.272 7 7.276 7h5.449c2.003 0 3.005 0 3.598.634c.162.173.275.374.35.616H17c2.526 0 4.75 1.812 4.75 4.25c0 2.438-2.224 4.25-4.75 4.25h-.65l-.035.5H3.685c-.02-.267-.038-.55-.058-.85zM16.45 15.25H17c1.892 0 3.25-1.322 3.25-2.75S18.892 9.75 17 9.75h-.2c-.012.43-.045.93-.084 1.516z" clip-rule="evenodd"/><path fill={color} d="M3.819 18.75h12.362c-.144 1.177-.378 1.917-.938 2.44c-.865.81-2.196.81-4.856.81h-.774c-2.66 0-3.99 0-4.856-.81c-.56-.523-.794-1.263-.938-2.44"/><path fill={color} fill-rule="evenodd" d="M6.977 1.327a.75.75 0 0 1 .175 1.046l-.386.541c.626.474.765 1.364.306 2.007l-.41.576a.75.75 0 0 1-1.222-.871l.386-.542a1.457 1.457 0 0 1-.306-2.007l.411-.575a.75.75 0 0 1 1.046-.175m4 0a.75.75 0 0 1 .175 1.046l-.386.541c.626.474.765 1.364.306 2.007l-.41.576a.75.75 0 1 1-1.222-.871l.386-.542a1.457 1.457 0 0 1-.306-2.007l.411-.575a.75.75 0 0 1 1.046-.175m4 0a.75.75 0 0 1 .175 1.046l-.386.541c.626.474.765 1.364.306 2.007l-.41.576a.75.75 0 1 1-1.222-.871l.386-.542a1.457 1.457 0 0 1-.306-2.007l.411-.575a.75.75 0 0 1 1.046-.175" clip-rule="evenodd"/>
    </svg>
);

export const Tea1Icon = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <g fill="none" stroke={color} stroke-width="1.5"><path d="M2.315 12.698c-.05-.427-.075-.641-.064-.817a2 2 0 0 1 1.646-1.85c.174-.031.389-.031.82-.031h10.567c.43 0 .645 0 .819.03a2 2 0 0 1 1.646 1.85c.01.177-.014.39-.064.818l-.401 3.428A5.515 5.515 0 0 1 11.807 21H8.193a5.515 5.515 0 0 1-5.477-4.874z"/><path d="M17 17h2a3 3 0 1 0 0-6h-1.5"/><path stroke-linecap="round" stroke-linejoin="round" d="M10 2a1.414 1.414 0 0 0 0 2a1.414 1.414 0 0 1 0 2M5 7.5l.116-.116A1.44 1.44 0 0 0 5.25 5.5a1.441 1.441 0 0 1 .134-1.884L5.5 3.5m9 4l.116-.116A1.44 1.44 0 0 0 14.75 5.5a1.441 1.441 0 0 1 .134-1.884L15 3.5"/></g>
    </svg>
);

export const Tea2Icon = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <path fill={color} fill-rule="evenodd" d="M2.25 11.88c-.01.177.015.39.065.818l.401 3.428A5.515 5.515 0 0 0 8.193 21h3.614a5.515 5.515 0 0 0 5.028-3.25H19a3.75 3.75 0 1 0 0-7.5h-2.279a1.996 1.996 0 0 0-.618-.22c-.174-.03-.39-.03-.82-.03H4.717c-.43 0-.645 0-.819.03a2 2 0 0 0-1.646 1.85m15.487-.13c.005.043.01.087.012.13c.01.177-.014.39-.064.818l-.401 3.428l-.016.124H19a2.25 2.25 0 0 0 0-4.5zM10.53 1.47a.75.75 0 0 1 0 1.06a.666.666 0 0 0 0 .94a2.164 2.164 0 0 1 0 3.06a.75.75 0 0 1-1.06-1.06c.26-.26.26-.68 0-.94a2.164 2.164 0 0 1 0-3.06a.75.75 0 0 1 1.06 0m-4.5 1.5a.75.75 0 0 1 0 1.06l-.116.116a.691.691 0 0 0-.064.904a2.191 2.191 0 0 1-.204 2.864l-.116.116a.75.75 0 0 1-1.06-1.06l.116-.116a.691.691 0 0 0 .064-.904a2.191 2.191 0 0 1 .204-2.864l.116-.116a.75.75 0 0 1 1.06 0m9.5 0a.75.75 0 0 1 0 1.06l-.116.116a.691.691 0 0 0-.064.904a2.191 2.191 0 0 1-.204 2.864l-.116.116a.75.75 0 1 1-1.06-1.06l.116-.116a.691.691 0 0 0 .064-.904a2.191 2.191 0 0 1 .204-2.864l.116-.116a.75.75 0 0 1 1.06 0" clip-rule="evenodd"/>
    </svg>
);

export const ChefHat1Icon = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <g fill="none"><path fill={color} d="M19 18h.75zM5 14.584h.75a.75.75 0 0 0-.45-.687zm14 0l-.3-.687a.75.75 0 0 0-.45.687zM15.75 7a.75.75 0 0 0 1.5 0zm-9 0a.75.75 0 0 0 1.5 0zM7 4.25A5.75 5.75 0 0 0 1.25 10h1.5A4.25 4.25 0 0 1 7 5.75zm10 1.5A4.25 4.25 0 0 1 21.25 10h1.5A5.75 5.75 0 0 0 17 4.25zm-2 15.5H9v1.5h6zm-6 0c-.964 0-1.612-.002-2.095-.067c-.461-.062-.659-.169-.789-.3l-1.06 1.062c.455.455 1.022.64 1.65.725c.606.082 1.372.08 2.294.08zM4.25 18c0 .922-.002 1.688.08 2.294c.084.628.27 1.195.725 1.65l1.061-1.06c-.13-.13-.237-.328-.3-.79c-.064-.482-.066-1.13-.066-2.094zm14 0c0 .964-.002 1.612-.067 2.095c-.062.461-.169.659-.3.789l1.062 1.06c.455-.455.64-1.022.725-1.65c.082-.606.08-1.372.08-2.294zM15 22.75c.922 0 1.688.002 2.294-.08c.628-.084 1.195-.27 1.65-.726l-1.06-1.06c-.13.13-.328.237-.79.3c-.482.064-1.13.066-2.094.066zm-8-17c.214 0 .423.016.628.046l.219-1.484A5.792 5.792 0 0 0 7 4.25zm5-4.5a5.252 5.252 0 0 0-4.973 3.563l1.42.482A3.752 3.752 0 0 1 12 2.75zM7.027 4.813A5.245 5.245 0 0 0 6.75 6.5h1.5c0-.423.07-.828.198-1.205zM17 4.25c-.287 0-.57.021-.847.062l.22 1.484A4.29 4.29 0 0 1 17 5.75zm-5-1.5a3.752 3.752 0 0 1 3.552 2.545l1.42-.482A5.252 5.252 0 0 0 12 1.25zm3.552 2.545c.128.377.198.782.198 1.205h1.5c0-.589-.097-1.156-.277-1.687zM5.75 18v-3.416h-1.5V18zm-.45-4.103A4.251 4.251 0 0 1 2.75 10h-1.5a5.751 5.751 0 0 0 3.45 5.271zm12.95.687V18h1.5v-3.416zm3-4.584a4.251 4.251 0 0 1-2.55 3.897l.6 1.374A5.751 5.751 0 0 0 22.75 10zm-5.5-3.5V7h1.5v-.5zm-9 0V7h1.5v-.5zm4.293 7.169l-.444.605zM12 9.995l-.519.542a.75.75 0 0 0 1.038 0zm.957 3.674l-.444-.605zm-.957.462v-.75zm-.514-1.067c-.417-.306-.878-.69-1.227-1.092c-.368-.426-.509-.757-.509-.972h-1.5c0 .77.441 1.451.875 1.953c.453.524 1.014.983 1.474 1.32zM9.75 11c0-.576.263-.826.492-.907c.25-.088.714-.06 1.24.444l1.037-1.084c-.825-.79-1.861-1.095-2.773-.775C8.812 9.005 8.25 9.903 8.25 11zm3.65 3.274c.46-.338 1.022-.797 1.475-1.321c.434-.502.875-1.183.875-1.953h-1.5c0 .215-.141.546-.51.972c-.348.403-.809.786-1.226 1.092zM15.75 11c0-1.097-.562-1.995-1.496-2.322c-.912-.32-1.948-.014-2.773.775l1.038 1.084c.525-.504.989-.532 1.24-.444c.228.08.491.331.491.907zm-5.15 3.274c.368.27.782.607 1.4.607v-1.5c-.024 0-.04 0-.094-.029a3.994 3.994 0 0 1-.42-.288zm1.914-1.21a3.994 3.994 0 0 1-.42.288c-.054.029-.07.029-.094.029v1.5c.618 0 1.032-.337 1.4-.607z"/><path stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 18h14"/></g>
    </svg>
);

export const ChefHat2Icon = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <path fill={color} fill-rule="evenodd" d="M2 10a5 5 0 0 1 5.737-4.946a4.502 4.502 0 0 1 8.526 0A5 5 0 0 1 19 14.584v2.666H5v-2.666A5.001 5.001 0 0 1 2 10m9.043 3.67C10.165 13.024 9 11.984 9 11c0-1.673 1.65-2.297 3-1.005c1.35-1.292 3-.668 3 1.005c0 .985-1.165 2.025-2.043 2.67c-.42.307-.63.461-.957.461c-.328 0-.537-.154-.957-.462" clip-rule="evenodd"/><path fill={color} d="M5.586 21.414c-.503-.502-.574-1.267-.584-2.664h13.996c-.01 1.397-.081 2.162-.584 2.664C17.828 22 16.886 22 15 22H9c-1.886 0-2.828 0-3.414-.586"/>
    </svg>
);

export const Trophy1Icon = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <g fill="none" stroke={color} stroke-width="1.5"><path d="M12 16c-5.76 0-6.78-5.74-6.96-10.294c-.051-1.266-.076-1.9.4-2.485c.475-.586 1.044-.682 2.183-.874A26.374 26.374 0 0 1 12 2c1.784 0 3.253.157 4.377.347c1.139.192 1.708.288 2.184.874c.476.586.45 1.219.4 2.485c-.18 4.553-1.2 10.294-6.96 10.294Z"/><path stroke-linecap="round" d="M12 16v3"/><path stroke-linecap="round" stroke-linejoin="round" d="M15.5 22h-7l.34-1.696a1 1 0 0 1 .98-.804h4.36a1 1 0 0 1 .98.804z"/><path d="m19 5l.949.316c.99.33 1.485.495 1.768.888c.283.393.283.915.283 1.958v.073c0 .86 0 1.291-.207 1.643c-.207.352-.584.561-1.336.98L17.5 12.5M5 5l-.949.316c-.99.33-1.485.495-1.768.888C2 6.597 2 7.12 2 8.162v.073c0 .86 0 1.291.207 1.643c.207.352.584.561 1.336.98L6.5 12.5m4.646-6.477C11.526 5.34 11.716 5 12 5c.284 0 .474.34.854 1.023l.098.176c.108.194.162.29.246.354c.085.064.19.088.4.135l.19.044c.738.167 1.107.25 1.195.532c.088.283-.164.577-.667 1.165l-.13.152c-.143.167-.215.25-.247.354c-.032.104-.021.215 0 .438l.02.203c.076.785.114 1.178-.115 1.352c-.23.174-.576.015-1.267-.303l-.178-.082c-.197-.09-.295-.135-.399-.135c-.104 0-.202.045-.399.135l-.178.082c-.691.319-1.037.477-1.267.303c-.23-.174-.191-.567-.115-1.352l.02-.203c.021-.223.032-.334 0-.438c-.032-.103-.104-.187-.247-.354l-.13-.152c-.503-.588-.755-.882-.667-1.165c.088-.282.457-.365 1.195-.532l.19-.044c.21-.047.315-.07.4-.135c.084-.064.138-.16.246-.354z"/><path stroke-linecap="round" d="M18 22H6"/></g>
    </svg>
);

export const Trophy2Icon = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <path fill={color} d="M22 8.162v.073c0 .86 0 1.291-.207 1.643c-.207.352-.584.561-1.336.98l-.793.44c.546-1.848.729-3.834.796-5.532l.01-.221l.002-.052c.651.226 1.017.395 1.245.711c.283.393.283.915.283 1.958m-20 0v.073c0 .86 0 1.291.207 1.643c.207.352.584.561 1.336.98l.794.44c-.547-1.848-.73-3.834-.797-5.532l-.01-.221l-.001-.052c-.652.226-1.018.395-1.246.711C2 6.597 2 7.12 2 8.162"/><path fill={color} fill-rule="evenodd" d="M12 2c1.784 0 3.253.157 4.377.347c1.139.192 1.708.288 2.184.874c.476.586.45 1.219.4 2.485c-.172 4.349-1.11 9.78-6.211 10.26V19.5h1.43a1 1 0 0 1 .98.804l.19.946H18a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1 0-1.5h2.65l.19-.946a1 1 0 0 1 .98-.804h1.43v-3.534c-5.1-.48-6.038-5.912-6.21-10.26c-.051-1.266-.076-1.9.4-2.485c.475-.586 1.044-.682 2.183-.874A26.374 26.374 0 0 1 12 2m.952 4.199l-.098-.176C12.474 5.34 12.284 5 12 5c-.284 0-.474.34-.854 1.023l-.098.176c-.108.194-.162.29-.246.354c-.085.064-.19.088-.4.135l-.19.044c-.738.167-1.107.25-1.195.532c-.088.283.164.577.667 1.165l.13.152c.143.167.215.25.247.354c.032.104.021.215 0 .438l-.02.203c-.076.785-.114 1.178.115 1.352c.23.174.576.015 1.267-.303l.178-.082c.197-.09.295-.135.399-.135c.104 0 .202.045.399.135l.178.082c.691.319 1.037.477 1.267.303c.23-.174.191-.567.115-1.352l-.02-.203c-.021-.223-.032-.334 0-.438c.032-.103.104-.187.247-.354l.13-.152c.503-.588.755-.882.667-1.165c-.088-.282-.457-.365-1.195-.532l-.19-.044c-.21-.047-.315-.07-.4-.135c-.084-.064-.138-.16-.246-.354" clip-rule="evenodd"/>
    </svg>
);

export const ShiningHeart1Icon = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <g fill="none"><path fill={color} d="m10.785 15.354l.469-.585zM12 9.9l-.545.516a.75.75 0 0 0 1.09 0zm1.215 5.453l.47.585zm-1.961-.585c-.633-.507-1.246-.945-1.738-1.508c-.466-.533-.766-1.123-.766-1.881h-1.5c0 1.218.504 2.144 1.136 2.868c.607.694 1.385 1.255 1.93 1.691zm-2.504-3.39c0-.714.397-1.283.891-1.513c.444-.206 1.105-.199 1.814.55l1.09-1.03c-1.091-1.153-2.43-1.394-3.536-.88c-1.056.49-1.759 1.611-1.759 2.874zm1.566 4.56c.2.16.444.356.7.508c.253.15.59.303.984.303v-1.5c-.007 0-.069-.004-.219-.093a4.977 4.977 0 0 1-.527-.388zm3.368 0c.545-.436 1.323-.997 1.93-1.691c.632-.723 1.136-1.65 1.136-2.868h-1.5c0 .758-.3 1.348-.766 1.881c-.492.563-1.105 1-1.738 1.508zm3.066-4.56c0-1.262-.703-2.383-1.759-2.873c-1.106-.514-2.445-.273-3.536.88l1.09 1.03c.709-.749 1.37-.756 1.814-.55c.494.23.891.799.891 1.514zm-4.004 3.39c-.214.172-.378.3-.527.388c-.15.089-.212.093-.219.093v1.5c.393 0 .731-.153.985-.303c.255-.152.499-.347.7-.508z"/><path stroke={color} stroke-linecap="round" stroke-width="1.5" d="M12 2v2m0 16v2M2 12h2m16 0h2M6 18l.343-.343M17.657 6.343L18 6m0 12l-.343-.343M6.343 6.343L6 6"/></g>
    </svg>
);

export const ShiningHeart2Icon = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <path fill={color} fill-rule="evenodd" d="M12 1.25a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75M5.47 5.47a.75.75 0 0 1 1.06 0l.344.343a.75.75 0 0 1-1.061 1.06L5.47 6.53a.75.75 0 0 1 0-1.06m13.06 0a.75.75 0 0 1 0 1.06l-.343.344a.75.75 0 0 1-1.06-1.061l.343-.343a.75.75 0 0 1 1.06 0M1.25 12a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75m18 0a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75M6.873 17.127a.75.75 0 0 1 0 1.06l-.343.343a.75.75 0 0 1-1.06-1.06l.343-.343a.75.75 0 0 1 1.06 0m10.254 0a.75.75 0 0 1 1.06 0l.343.343a.75.75 0 1 1-1.06 1.06l-.343-.343a.75.75 0 0 1 0-1.06M12 19.25a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75" clip-rule="evenodd"/><path fill={color} d="M7 11.06c0 2.542 2.01 3.897 3.48 5.11c.52.427 1.02.83 1.52.83s1-.403 1.52-.83c1.47-1.213 3.48-2.568 3.48-5.11c0-2.543-2.75-4.346-5-1.902c-2.25-2.444-5-.64-5 1.902"/>
    </svg>
);

export const Moon1Icon = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <g fill="none"><path stroke={color} d="M19.9 2.307a.483.483 0 0 0-.9 0l-.43 1.095a.484.484 0 0 1-.272.274l-1.091.432a.486.486 0 0 0 0 .903l1.091.432a.48.48 0 0 1 .272.273L19 6.81c.162.41.74.41.9 0l.43-1.095a.484.484 0 0 1 .273-.273l1.091-.432a.486.486 0 0 0 0-.903l-1.091-.432a.484.484 0 0 1-.273-.274zM16.033 8.13a.483.483 0 0 0-.9 0l-.157.399a.484.484 0 0 1-.272.273l-.398.158a.486.486 0 0 0 0 .903l.398.157c.125.05.223.148.272.274l.157.399c.161.41.739.41.9 0l.157-.4a.484.484 0 0 1 .272-.273l.398-.157a.486.486 0 0 0 0-.903l-.398-.158a.484.484 0 0 1-.272-.273z"/><path fill={color} d="m21.067 11.857l-.642-.388zm-8.924-8.924l-.388-.642zM21.25 12A9.25 9.25 0 0 1 12 21.25v1.5c5.937 0 10.75-4.813 10.75-10.75zM12 21.25A9.25 9.25 0 0 1 2.75 12h-1.5c0 5.937 4.813 10.75 10.75 10.75zM2.75 12A9.25 9.25 0 0 1 12 2.75v-1.5C6.063 1.25 1.25 6.063 1.25 12zm12.75 2.25A5.75 5.75 0 0 1 9.75 8.5h-1.5a7.25 7.25 0 0 0 7.25 7.25zm4.925-2.781A5.746 5.746 0 0 1 15.5 14.25v1.5a7.247 7.247 0 0 0 6.21-3.505zM9.75 8.5a5.747 5.747 0 0 1 2.781-4.925l-.776-1.284A7.246 7.246 0 0 0 8.25 8.5zM12 2.75a.384.384 0 0 1-.268-.118a.285.285 0 0 1-.082-.155c-.004-.031-.002-.121.105-.186l.776 1.284c.503-.304.665-.861.606-1.299c-.062-.455-.42-1.026-1.137-1.026zm9.71 9.495c-.066.107-.156.109-.187.105a.285.285 0 0 1-.155-.082a.384.384 0 0 1-.118-.268h1.5c0-.717-.571-1.075-1.026-1.137c-.438-.059-.995.103-1.299.606z"/></g>
    </svg>
);

export const Moon2Icon = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <path fill={color} d="M19.9 2.307a.483.483 0 0 0-.9 0l-.43 1.095a.484.484 0 0 1-.272.274l-1.091.432a.486.486 0 0 0 0 .903l1.091.432a.48.48 0 0 1 .272.273L19 6.81c.162.41.74.41.9 0l.43-1.095a.484.484 0 0 1 .273-.273l1.091-.432a.486.486 0 0 0 0-.903l-1.091-.432a.484.484 0 0 1-.273-.274zM16.033 8.13a.483.483 0 0 0-.9 0l-.157.399a.484.484 0 0 1-.272.273l-.398.158a.486.486 0 0 0 0 .903l.398.157c.125.05.223.148.272.274l.157.399c.161.41.739.41.9 0l.157-.4a.484.484 0 0 1 .272-.273l.398-.157a.486.486 0 0 0 0-.903l-.398-.158a.484.484 0 0 1-.272-.273z"/><path fill={color} d="M12 22c5.523 0 10-4.477 10-10c0-.463-.694-.54-.933-.143a6.5 6.5 0 1 1-8.924-8.924C12.54 2.693 12.463 2 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10"/>
    </svg>
);

export const Smile1Icon = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <g fill="none"><circle cx="12" cy="12" r="10" stroke={color} stroke-width="1.5"/><path stroke={color} stroke-linecap="round" stroke-width="1.5" d="M9 16c.85.63 1.885 1 3 1s2.15-.37 3-1"/><path fill={color} d="M16 10.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5s.448-1.5 1-1.5s1 .672 1 1.5"/><ellipse cx="9" cy="10.5" fill={color} rx="1" ry="1.5"/></g>
    </svg>
);

export const Smile2Icon = ({ color, size }: { color: string, size: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <path fill={color} fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m-3.603-6.447a.75.75 0 0 1 1.05-.155c.728.54 1.607.852 2.553.852s1.825-.313 2.553-.852a.75.75 0 1 1 .894 1.204A5.766 5.766 0 0 1 12 17.75a5.766 5.766 0 0 1-3.447-1.148a.75.75 0 0 1-.156-1.049M16 10.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5s.448-1.5 1-1.5s1 .672 1 1.5M9 12c.552 0 1-.672 1-1.5S9.552 9 9 9s-1 .672-1 1.5s.448 1.5 1 1.5" clip-rule="evenodd"/>
    </svg>
);

export const ActiveStampSection = () => {
    const { setActiveStamp, activeStampValue, setActiveStampValue, isEditing } = useLoyaltyProgramStore();
    const activeStampOptions = [
        { value: "star1", label: "Star 1", Icon: Star1Icon },
        { value: "star2", label: "Star 2", Icon: Star2Icon },
        { value: "heart1", label: "Heart 1", Icon: Heart1Icon },
        { value: "heart2", label: "Heart 2", Icon: Heart2Icon },
        { value: "check1", label: "Check 1", Icon: Check1Icon },
        { value: "check2", label: "Check 2", Icon: Check2Icon },
        { value: "hearts1", label: "Hearts 1", Icon: Hearts1Icon },
        { value: "hearts2", label: "Hearts 2", Icon: Hearts2Icon },
        { value: "coffee1", label: "Coffee 1", Icon: Coffee1Icon },
        { value: "coffee2", label: "Coffee 2", Icon: Coffee2Icon },
        { value: "tea1", label: "Tea 1", Icon: Tea1Icon },
        { value: "tea2", label: "Tea 2", Icon: Tea2Icon },
        { value: "chefhat1", label: "Chef Hat 1", Icon: ChefHat1Icon },
        { value: "chefhat2", label: "Chef Hat 2", Icon: ChefHat2Icon },
        { value: "trophy1", label: "Trophy 1", Icon: Trophy1Icon },
        { value: "trophy2", label: "Trophy 2", Icon: Trophy2Icon },
        { value: "shiningheart1", label: "Shining Heart 1", Icon: ShiningHeart1Icon },
        { value: "shiningheart2", label: "Shining Heart 2", Icon: ShiningHeart2Icon },
        { value: "moon1", label: "Moon 1", Icon: Moon1Icon },
        { value: "moon2", label: "Moon 2", Icon: Moon2Icon },
        { value: "smile1", label: "Smile 1", Icon: Smile1Icon },
        { value: "smile2", label: "Smile 2", Icon: Smile2Icon },
    ];

    const handleSelect = (value: string) => {
        const selectedOption = activeStampOptions.find(option => option.value === value);
        if (selectedOption) {
            setActiveStamp(selectedOption.Icon);
            setActiveStampValue(value);
        }
    };

    return (
        <div className="border-b-2 border-slate-300 py-5">
            <OptionHeader title="Active stamp" info="..." />
            <div className="mt-3 ml-5">
                <Select onValueChange={handleSelect} defaultValue={activeStampValue} disabled={!isEditing}>
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
    const { colors, colorLabels, setColorTheme, isEditing } = useLoyaltyProgramStore();
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
                                    onClick={() => {
                                        if (isEditing) setShowPickerIndex(index);
                                    }}
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