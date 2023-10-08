"use client";
import Image from "next/image";
import { useMyContext } from "Context/Context";
import { formatName } from "@/utils/helpers";

const TripInfo = ({ data, direct, timeText }) => {
  const { userData, setUserData } = useMyContext();

  return (
    <>
      {data.map((item, index) => {
        if (item.direction === direct) {

          return (
            <div key={`direction-${direct}-index-${index}`} className='flex flex-wrap'>
              {item.items.map((item, i) => (
                <div key={`item-${i}`} className='flex mt-[2px]'>
                  {item.driver.avatar ? (
                    <Image
                      src={item.driver.avatar}
                      className="border-white border-2 shadow-black shadow-md rounded-full w-10 h-10 mr-[2px] mb-1"
                      width={34}
                      height={34}
                      alt="Avatar Driver"
                    />
                  ) : (
                    <div
                      key={timeText + "ab"}
                      className={`relative inline-flex items-center justify-center w-10 h-10 mr-[2px] mb-1 overflow-hidden bg-primaryHover border-white border-2 shadow-black shadow-md rounded-full `}
                    >
                      <span className="font-medium text-base md:text-xs text-baseColor drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        {formatName(item.driver.full_name)}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        }
      })}
    </>
  );
};

export { TripInfo };
