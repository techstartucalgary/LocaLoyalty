"use client";
import Image from "next/image";
import Link from "next/link";
import { IoIosCheckmarkCircle } from "react-icons/io";

const PublicLanding = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="relative">
        <Image
          src="/assets/Bigstarbg.png"
          width={2374}
          height={1146}
          alt="Big star bg"
          className="absolute inset-0 px-24 py-8"
        />

        <div className="relative z-10 pt-10">
          <div className="flex flex-col items-center">
            <h1 className="text-black font-extrabold text-8xl">
              LOCALOYALTY
            </h1>
            <div className="flex items-center px-64">
              <Image
                src="/assets/Image1.png"
                alt=""
                width={474}
                height={352}
              />
              <h1 className="text-black font-bold text-4xl">
                The best rewards platform for small businesses
              </h1>
            </div>
            <button className="bg-black text-white text-2xl font-bold py-5 px-8 rounded-lg outline outline-2 outline-black transition duration-300 hover:bg-white hover:text-black">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-10">
        <div className="px-24">
          <h1 className="font-bold text-4xl">
            Loyalty Programs
          </h1>
          <h1 className="font-bold text-4xl">
            Re-Invented
          </h1>
          <p className="font-normal text-3xl mt-4">
            LocaLoyalty is <span className="font-bold">THE</span> rewards app for all of your customer's small business rewards.
            No more physical stamp cards and white-label apps that they have to juggle.
          </p>
        </div>

        <Image 
          src="/assets/Image2.png"
          alt=""
          width={474}
          height={352}
        />
      </div>

      <div className="flex items-center justify-center gap-24">
        <Image 
          src="/assets/Image3.png"
          alt=""
          width={499}
          height={434}
        />

        <div className="w-1/2">
          <h1 className="font-bold text-4xl">
            User Benefits
          </h1>
          <div className="text-3xl mt-3">
            <ul className="list-none font-semibold mt-2 space-y-4">
              <li>
                <div className="flex items-center">
                  <IoIosCheckmarkCircle className="mr-2" />
                  <h1>Customer Retention</h1>
                </div>
                <p className="font-normal mx-10 mt-2">
                  Loyalty programs encourage customers to continue shopping with a particular business to earn rewards,
                  fostering long-term relationships
                </p>
              </li>
              <li>
                <div className="flex items-center">
                  <IoIosCheckmarkCircle className="mr-2" />
                  <h1>Increased Customer Spending</h1>
                </div>
                <p className="font-normal mx-10 mt-2">
                  Customers are likely to spend more to accumulate points or reach a reward threshold,
                  leading to increased average transaction values
                </p>
              </li>
              <li>
                <div className="flex items-center">
                  <IoIosCheckmarkCircle className="mr-2" />
                  <h1>Data Collection</h1>
                </div>
                <p className="font-normal mx-10 mt-2">
                  Through loyalty programs, businesses can collect valuable data about customer preferences and
                  purchasing behaviors, enabling them to tailor marketing strategies more effectively
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-20 px-24 pt-10">
        <Image
          src="/assets/BusinessSettings.png"
          alt=""
          width={600}
          height={475}
          className="drop-shadow-lg"
        />

        <div>
          <h1 className="font-bold text-4xl">
          Simplified Process
          </h1>
          <p className="font-normal text-3xl pt-4">
          Easily create, customize, and launch your own loyalty platform to the
          LocaLoyalty mobile app for your customers to access
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center pt-10">
        <div className="text-center">
          <h1 className="font-bold text-4xl">
            Seamless Integration
          </h1>
          <p className="font-normal text-3xl pt-5">
            With your favourite Point of Sales software
          </p>
        </div>

        <div className="flex gap-20 pt-10">
          <Image 
            src="/assets/Clover.png"
            alt=""
            width={215}
            height={52.5}
          />
          <Image 
            src="/assets/Square.png"
            alt=""
            width={209}
            height={52.5}
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Image
          src="/assets/Image4.png"
          alt=""
          width={474}
          height={352}
        />
        <div>
          <h1 className="font-bold text-4xl">
            Improve Your Customer
          </h1>
          <h1 className="font-bold text-4xl">
            Retention Today!
          </h1>
          <button className="bg-black text-white text-2xl font-bold py-5 px-8 mt-8 rounded-lg outline outline-2 outline-black transition duration-300 hover:bg-white hover:text-black">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicLanding;