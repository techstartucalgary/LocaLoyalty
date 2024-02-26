"use client";
import Image from "next/image";
import Link from "next/link";
import { IoIosCheckmarkCircle } from "react-icons/io";

const PublicLanding = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 pl-36 pt-10 z-0">
        <Image
          src="/assets/Bigstarbg.png"
          width={1200}
          height={1200}
          alt="Big star bg"
        />
      </div>
      <div className="flex flex-col items-center justify-center font-extrabold pt-10 text-8xl relative z-10">
        <h1 className="bg-white p-4">LOCALOYALTY</h1>
        <div className="w-3/5 flex items-center text-black font-bold px-30 text-4xl">
          <Image
            src="/assets/Image1.png"
            width={1200}
            height={1200}
            alt="Image 1"
          />
          <h2 className="bg-white py-4">
            The best rewards platform for small businesses
          </h2>
        </div>

        <button className="bg-black text-white text-2xl font-bold py-5 px-8 rounded-lg outline outline-2 outline-black transition duration-300 hover:bg-white hover:text-black">
          Get Started
        </button>

        <div className="flex items-center justify-center pt-10">
          <div className="text-left flex flex-col gap-3 w-1/2">
            <h1 className="font-bold text-4xl">Loyalty Programs Re-Invented</h1>
            <p className="font-normal text-3xl">
              LocaLoyalty is <span className="font-bold">THE</span> rewards app
              for all of your customer&apos;s small business rewards. No more
              physical stamp cards and white-label apps that they have to
              juggle.
            </p>
          </div>

          <div>
            <Image
              src="/assets/Image2.png"
              width={500}
              height={500}
              alt="Image 2"
              className=""
            />
          </div>
        </div>

        <div className="relative text-black">
          <div className="flex items-center justify-center">
            <div className="pt-32">
              <Image
                src="/assets/Image3.png"
                width={550}
                height={550}
                alt="Image 3"
              />
            </div>

            <div className="pt-10 w-1/2 pl-28 flex flex-col justify-center">
              <h1 className="font-bold text-4xl">User Benefits</h1>
              <div className="font-normal text-3xl">
                <ul className="list-none mt-2 font-semibold space-y-2">
                  <li>
                    <div className="flex items-center">
                      <IoIosCheckmarkCircle className="mr-2" />
                      <span className="px-1 py-1">Customer Retention</span>
                    </div>
                    <p className="font-light mx-10">
                      Loyalty programs encourage customers to continue shopping
                      with a particular business to earn rewards, fostering
                      long-term relationships
                    </p>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <IoIosCheckmarkCircle className="mr-2" />
                      <span className="px-1 py-1">
                        Increased Customer Spending
                      </span>
                    </div>
                    <p className="font-light mx-10">
                      Customers are likely to spend more to accumulate points or
                      reach a reward threshold, leading to increased average
                      transaction values
                    </p>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <IoIosCheckmarkCircle className="mr-2" />
                      <span className="px-1 py-1">Data Collection</span>
                    </div>
                    <p className="font-light mx-10">
                      Through loyalty programs, businesses can collect valuable
                      data about customer preferences and purchasing behaviors,
                      enabling them to tailor marketing strategies more
                      effectively
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid justify-center items-center grid-cols-2 pt-24 px-24 gap-20 ">
            <Image
              src="/assets/BusinessSettings.png"
              width={700}
              height={700}
              alt="Image 4"
            />
            <div className="pt-10">
              <h1 className="font-bold text-4xl ">Simplified Process</h1>
              <p className="font-normal text-3xl pt-5">
                Easily create, customize, and launch your own loyalty platform
                to the LocaLoyalty mobile app for your customers to access
              </p>
            </div>
          </div>

          <div className="grid gap-4 pt-24">
            <div className="flex flex-col text-center py-6">
              <h1 className="font-bold text-4xl">Seamless Integration</h1>
              <p className="font-normal text-3xl pt-5">
                With your favourite Point of Sales software
              </p>
            </div>
            <div className="grid grid-cols-2 gap-24 px-5 justify-self-center">
              <Image
                src="/assets/clover2.png"
                width={200}
                height={200}
                alt="Clover Logo"
              />
              <Image
                src="/assets/Square.png"
                width={200}
                height={200}
                alt="Square Logo"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center px-24 pt-20">
          <Image
            src="/assets/Image4.png"
            width={520}
            height={520}
            alt="Image 5"
          />
          <div className="w-2/5 pt-10 flex-col">
            <h1 className="font-bold text-4xl">
              Improve Your Customer Retention Today!
            </h1>
            <button className="bg-black text-white text-2xl font-bold py-5 px-8 rounded-lg outline outline-2 outline-black transition duration-300 hover:bg-white hover:text-black">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicLanding;
