"use client";

import Link from "next/link";
import Image from "next/image";
import { IoMdHeart, IoIosArrowForward } from "react-icons/io";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

const PublicFooter = () => {
  return (
    <footer className="bg-white text-black">
      <div className="container mx-auto pt-10 px-8">
        <div className="flex gap-40 justify-center">
          <div className="flex flex-col items-center">
            <Image
              src="/assets/Logo.png"
              width={65}
              height={65}
              alt="Picture of LocaLoyalty Logo"
            />
            <h1 className="font-extrabold text-2xl">LOCALOYALTY</h1>
            <p className="flex items-center font-medium text-lg justify-center mt-6">
              Designed with <IoMdHeart className="mx-1" size={20} /> in 2024.
            </p>
            <p className="text-center text-lg font-medium">
              All rights reserved.
            </p>
          </div>

          <div className="flex gap-24 pl-10">
            <div className="lg:col-span-2 md:col-span-5 col-span-12">
              <h1 className="font-semibold text-xl">Company</h1>
              <ul className="list-none mt-3.5 space-y-2">
                <li>
                  <Link href="" className="flex items-center text-lg">
                    <IoIosArrowForward />
                    <h1 className="font-medium">About</h1>
                  </Link>
                </li>
                <li>
                  <Link
                    href=""
                    className="flex items-center font-medium text-lg"
                  >
                    <IoIosArrowForward />
                    <h1 className="font-medium">Contact</h1>
                  </Link>
                </li>
                <li>
                  <Link
                    href=""
                    className="flex items-center font-medium text-lg"
                  >
                    <IoIosArrowForward />
                    <h1 className="font-medium">Pricing</h1>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2 md:col-span-5 col-span-12">
              <h1 className="font-semibold text-xl">Support</h1>
              <ul className="list-none mt-3.5 space-y-2">
                <li>
                  <Link href="" className="flex items-center text-lg">
                    <IoIosArrowForward />
                    <h1 className="font-medium">FAQs</h1>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2 md:col-span-5 col-span-12">
              <h1 className="font-semibold text-xl">Get In Touch</h1>
              <ul className="list-none mt-3.5 space-y-2">
                <li>
                  <h1 className="font-medium text-lg">Calgary, AB, Canada</h1>
                </li>
              </ul>
              <ul className="list-none mt-3.5 space-y-2">
                <li>
                  <h1 className="font-medium text-lg">
                    localoyaltycalgary@gmail.com
                  </h1>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr className="h-px mx-24 mt-6 mb-6 bg-black border-l border-black" />
      <div className="flex mx-24 mb-6 justify-between">
        <div className="flex gap-12">
          <Link href="">
            <h1 className="font-semibold text-lg hover:underline">
              Privacy Policy
            </h1>
          </Link>

          <Link href="">
            <h1 className="font-semibold text-lg hover:underline">
              Cookie Policy
            </h1>
          </Link>

          <Link href="">
            <h1 className="font-semibold text-lg hover:underline">
              Terms & Conditions
            </h1>
          </Link>
        </div>

        <div className="flex gap-5">
          <Link href="">
            <FaLinkedinIn size={24} />
          </Link>

          <Link href="">
            <RiTwitterXLine size={24} />
          </Link>

          <Link href="">
            <FaInstagram size={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
