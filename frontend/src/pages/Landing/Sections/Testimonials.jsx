import React from "react";

export default function Testimonials() {
  return (
    <div id="testimonials">
      <div className="bg-black">
        <div className=" max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto text-left">
          <>
            <p className="mb-6 md:text-lg text-left">
              <span className="font-semibold text-lime-400">Philip,</span>
              <span className="text-neutral-500">CEO Says...</span>
            </p>

            <p className="text-xl sm:text-2xl md:text-3xl md:leading-normal text-white text-left">
              "Donating is not just about money, it s about making a difference.
              Every little bit helps someone in need. Together, we can create a
              better world."
            </p>
          </>
        </div>
      </div>
    </div>
  );
}
