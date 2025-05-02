import { Circle } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className=" mt-32">
      <div className="container w-full max-w-[1600px] flex flex-col justify-center items-center">
        <div className="grid grid-cols-3 w-full place-items-end justify-items-center">
          <div className=" ">
            {" "}
            <h2 className="lg:text-4xl xl:text-7xl">
              Helping to Create Better Technologies
            </h2>
            <div className="flex justify-start gap-3">
              {[1, 2, 3, 4].map((_, idx) => (
                <div
                  key={idx}
                  className="size-8 rounded-full bg-yellow-300"
                ></div>
              ))}
            </div>
          </div>

          <div className=" ">
            <p className=" text-lg font-[500] font-Satoshi">
              <span className="mt-1 inline-block">
                {" "}
                <Circle size={"10"} weight="fill" />
              </span>{" "}
              Quick Links
            </p>
            <div className="grid mt-4 grid-cols-4 gap-x-10 gap-y-5">
              {["Home", "About", "Skills", "Contact"].map((i, idx) => (
                <Link
                  className="px-6 text-purple-950 bg-[#f3ecfa] hover:bg-[#ece5f4] w-fit py-2 rounded-full"
                  href={"/"}
                  key={idx}
                >
                  <p>{i}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="">
            <p className=" text-lg font-[500] font-Satoshi">
              <span className="mt-1 inline-block">
                {" "}
                <Circle size={"10"} weight="fill" />
              </span>{" "}
              Contact
            </p>
            <div className="mt-4 text-slate-700 text-lg font-Satoshi">
              <p className="mt-2">+91 85880 47098</p>
              <p className="mt-2">faheemk793@gmail.com</p>
              <p className="mt-2">Delhi, New Delhi, India </p>
            </div>
          </div>
        </div>

         
      </div>
    </div>
  );
};

export default Footer;
