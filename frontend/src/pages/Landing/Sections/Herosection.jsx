import React from "react";
import TextAnimatedGradient from "../../../components/shared/TexAnimation";
import ButtonBackgroundShine from "../../../components/shared/ButtonBackgroundShine";
import { useNavigate } from "react-router-dom";
export default function Herosection() {
  const navigate= useNavigate()
  return (
    <>
      <div>
        
        <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
          <div class="flex justify-center">
            <a class="group cursor-pointer inline-block bg-white/10 hover:bg-white/10 border border-white/10 p-1 ps-4 rounded-full shadow-md focus:outline-none focus:ring-1 focus:ring-gray-600">
              <p class="me-2 inline-block text-white text-sm">
                Login as a guest
              </p>
              <span class="group-hover:bg-white/10 py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-white/10 font-semibold text-white text-sm">
                {">"}
              </span>
            </a>
          </div>

          <div class="max-w-3xl text-center mx-auto">
            <TextAnimatedGradient
              text={" Now it's easier than ever to Seek Funding"}
            />
          </div>

          <div class="max-w-3xl text-center mx-auto">
            <p class="text-lg text-gray-400">
              Fund Chain is an open source crowd funding platform with crpto
              based payments wher every single penny goes to the campaign
            </p>
          </div>

          <img
            className=" bluetoken hidden sm:block absolute right-40 top-20 "
            width={150}
            src="https://ik.imagekit.io/nh40wkvsj/glare-metal-coin-with-bright-colors.png?updatedAt=1719069802603"
            alt=""
          />
          <img
            className=" etherumtoken -z-20  absolute  top-24 w-[100px] sm:w-[150px]"
            src="https://ik.imagekit.io/nh40wkvsj/smart-coin-ethereum.png?updatedAt=1719069803107"
            alt=""
          />

          <div class="text-center">
            <ButtonBackgroundShine onClick={()=>{navigate('/register')}}  text={"Get Started"} />
          </div>
        </div>
      </div>
    </>
  );
}
