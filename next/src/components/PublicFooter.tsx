"use client";
import { IoMdHeart } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Image from 'next/image'

const PublicFooter = () => {
  return (
    <footer className="bg-white text-black">
      <div className="container mx-auto pt-10 px-8">
        <div className="col-span-5"></div>
        <div className="flex gap-40 justify-center">
          <div className="flex flex-col items-center">
            <Image
              src="/assets/Logo.png"
              width={70}
              height={70}
              alt="Picture of LocaLoyalty Logo"
            />
            <h1 className="font-extrabold text-xl pl-4">LOCALOYALTY</h1>
            <p className="flex items-center font-medium text-lg justify-center mt-6">
              Designed by <IoMdHeart className="mx-1" /> in 2024.
            </p>
            <p className="text-center text-lg font-medium">All rights reserved.
            </p>
          </div>
          <div className="flex gap-16 pl-10">
            <div className="lg:col-span-2 md:col-span-5 col-span-12">
              <h5 className="tracking-wide text-black font-semibold text-xl">
                Company{" "}
              </h5>
              <ul className="list-none mt-3.5 space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center font-medium text-lg hover:text-black transition-all duration-500 ease-in-out"
                  >
                    <IoIosArrowForward /> About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center font-medium text-lg hover:text-black transition-all duration-500 ease-in-out"
                  >
                    <IoIosArrowForward /> Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center font-medium text-lg hover:text-black transition-all duration-500 ease-in-out"
                  >
                    <IoIosArrowForward /> Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2 md:col-span-5 col-span-12">
              <h5 className="tracking-wide text-black font-semibold text-xl">
                Support{" "}
              </h5>
              <ul className="list-none mt-3.5 space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center font-medium text-lg hover:text-black transition-all duration-500 ease-in-out"
                  >
                    <IoIosArrowForward /> FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2 md:col-span-5 col-span-12">
              <h5 className="tracking-wide text-black font-semibold text-xl">
                Get In Touch{" "}
              </h5>
              <ul className="list-none mt-3.5 space-y-2">
                <li>
                  <a
                    className="flex items-center font-medium text-lg hover:text-black transition-all duration-500 ease-in-out"
                  >
                    Calgary, AB, Canada
                  </a>
                </li>
              </ul>
              <ul className="list-none mt-3.5 space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center hover:text-sky-600 font-medium text-lg hover:text-black transition-all duration-500 ease-in-out"
                  >
                    localoyaltycalgary@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr className="h-px mx-24 mt-10 mb-16 bg-black border-l border-black" />
    </footer >
  );
};

export default PublicFooter;
