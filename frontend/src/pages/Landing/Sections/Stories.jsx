import React from "react";

export default function Stories() {
  return (
    <div id="agenda">
      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div class="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 class="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            Insights
          </h2>
          <p class="mt-1 text-gray-600 dark:text-neutral-400">
            View some recently Funded Projects
          </p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <a class="group" href="#">
            <div class="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
              <img
                class="size-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
                src="https://ik.imagekit.io/nh40wkvsj/pexels-photo-6646918.webp?updatedAt=1719073376050"
                alt="Image Description"
              />
              <span class="absolute top-0 end-0 rounded-se-xl rounded-es-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3 dark:bg-neutral-900">
                Sponsored
              </span>
            </div>

            <div class="mt-7">
              <h3 class="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-neutral-300 dark:group-hover:text-white">
              Hope After the Storm: Flood Relief Campaign
              </h3>
              <p class="mt-3 text-gray-800 dark:text-neutral-200">
              a  flood relief campaign dedicated to supporting communities devastated by recent floods.
              </p>
              <p class="mt-5 inline-flex items-center gap-x-1 text-blue-600 decoration-2 group-hover:underline font-medium">
                Acquired 1000 dollars
                <svg
                  class="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </p>
            </div>
          </a>

          <a class="group" href="#">
            <div class="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
              <img
                class="size-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
                src="https://ik.imagekit.io/nh40wkvsj/3d-woman-shape-glowing-with-bright-holographic-colors.jpg?updatedAt=1719073377011"
                alt="Image Description"
              />
            </div>

            <div class="mt-7">
              <h3 class="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-neutral-300 dark:group-hover:text-white">
                Metaverse Art Gallery
              </h3>
              <p class="mt-3 text-gray-800 dark:text-neutral-200">
                an exclusive NFT collection featuring original works from
                emerging and established digital artists around the world.
              </p>
              <p class="mt-5 inline-flex items-center gap-x-1 text-blue-600 decoration-2 group-hover:underline font-medium">
                Acquired 10000 Dollars in funding
                <svg
                  class="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </p>
            </div>
          </a>

          <a
            class="group relative flex flex-col w-full min-h-60 bg-[url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3000&q=80')] bg-center bg-cover rounded-xl hover:shadow-lg transition"
            href="#"
          >
            <div class="flex-auto p-4 md:p-6">
              <h3 class="text-xl text-white/90 group-hover:text-white">
                <span class="font-bold">FundChain: </span> Empowering Community Projects Through Crowdfunding
              </h3>
            </div>
          
          </a>
        </div>
      </div>
    </div>
  );
}
