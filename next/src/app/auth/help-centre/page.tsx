
"use client";
import { cn } from "@/lib/utils";
import { BiSolidChevronLeftSquare, BiSolidChevronRightSquare } from "react-icons/bi";
import { useState } from "react";
import ReactDOM from "react-dom/client";

import { Button } from "@/components/ui/button"

export default function AuthHome() {
  // initializing current state as the first slide
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // slide 1
    {
      "id": 1,
      "image": "/assets/slide1.png",
      "title": "Help Center > Clover Account",
      "subheading": "Explore the step-by-step slideshow below to effortlessly connect your Clover account to LocaLoyalty and unlock a seamless integration experience for enhanced convenience and functionality.",
      "description": "1. Sign in to your Clover business account and go to the \"More Tools\" section in the side navigation bar."
    },
    // slide 2
    {
      "id": 2,
      "image": "/assets/slide1.png",
      "title": "Help Center > Clover Account",
      "subheading": "Explore the step-by-step slideshow below to effortlessly connect your Clover account to LocaLoyalty and unlock a seamless integration experience for enhanced convenience and functionality.",
      "description": "2. Use the search bar to find \"LocaLoyalty.\""
    },
    // slide 3
    {
      "id": 3,
      "image": "/assets/slide1.png",
      "title": "Help Center > Clover Account",
      "subheading": "Explore the step-by-step slideshow below to effortlessly connect your Clover account to LocaLoyalty and unlock a seamless integration experience for enhanced convenience and functionality.",
      "description": "3. Click on \"Connect\" to add LocaLoyalty to your dashboard."
    },
    // slide 4
    {
      "id": 4,
      "image": "/assets/slide1.png",
      "title": "Help Center > Clover Account",
      "subheading": "Explore the step-by-step slideshow below to effortlessly connect your Clover account to LocaLoyalty and unlock a seamless integration experience for enhanced convenience and functionality.",
      "description": "4. Head to \"Account & Setup\" in the side navigation bar and copy your merchant ID."
    },
    // slide 5
    {
      "id": 5,
      "image": "/assets/slide1.png",
      "title": "Help Center > Clover Account",
      "subheading": "Explore the step-by-step slideshow below to effortlessly connect your Clover account to LocaLoyalty and unlock a seamless integration experience for enhanced convenience and functionality.",
      "description": "5. Visit LocaLoyalty's settings in the side navigation bar, paste your merchant ID, and save your changes."
    },
    // slide 6
    {
      "id": 6,
      "image": "/assets/slide1.png",
      "title": "Help Center > Clover Account",
      "subheading": "Explore the step-by-step slideshow below to effortlessly connect your Clover account to LocaLoyalty and unlock a seamless integration experience for enhanced convenience and functionality.",
      "description": "6. Congratulations! Your Clover account is now successfully linked to LocaLoyalty."
    }
  ]

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) { // If the button is pressed at the last slide, set the current slide to the first slide 
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const previousSlide = () => {
    if (currentSlide === 0) { // Note: === is strictly equal to
      setCurrentSlide(slides.length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const order = slides[currentSlide];

  return (
    <div className="flex flex-col items-center w-full h-full py-6">
      <div className="w-full max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold">{order.title}</h1>
          <p className="text-2sm mt-2 mb-4">{order.subheading}</p>
        </div>

        <div className="w-400 max-h-300 p-16 bg-white border-2 border-gray-200 rounded-md">

          <div className="relative flex items-center justify-center">
            <button onClick={previousSlide} className="absolute left-0 z-10">
              <BiSolidChevronLeftSquare size={50} />
            </button>

            <img src={order.image} alt={"Slide ${order.id}"} className="mx-auto w-3/4 h-auto" />

            <button onClick={nextSlide} className="absolute right-0 z-10">
              <BiSolidChevronRightSquare size={50} />
            </button>
          </div>

          <div className="flex items-center justify-center mt-4 space-x-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1 w-1 rounded-full ${index === currentSlide ? 'transform scale-150 bg-blue-600' : 'bg-gray-400'} hover:scale-150 transform transition duration-150 ease-in-out`}
              />
            ))}
          </div>
          <p className="text-center text-sm font-semibold mt-6">{order.description}</p>
        </div>

        <div className="flex flex-col items-center justify-center mt-10">
          <p className="text-center text-sm font-semibold">Need further help?</p>
          <button className="bg-black text-white text-sm font-bold py-2.5 px-4 mt-4 rounded-lg outline outline-2 outline-black transition duration-300 hover:bg-white hover:text-black">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}