import { useContext, useRef } from "react";
import Image from "next/image";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { GetPageContext } from "../../contexts/PageContext";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import {
  AccountSettingsIcon,
  BigDollarIcon,
  CopyIcon,
  LogoutIcon,
  StarIcon,
} from "../Svglist";
import { GetUserDataContext } from "@/src/contexts/UserDataContext";

export const ProfileDropdown = () => {
  const { showProfileDropdownFunc, showProfileDropdown } =
    useContext(GetPageContext);
  const { userData } = useContext(GetUserDataContext);
  const { handleLogOut } = useDynamicContext();

  const divRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(divRef, () => showProfileDropdownFunc(false));

  const avatarImgUrl =
    userData?.avatarImgUrl === ""
      ? "/imgs/avatars/initialAvatar.png"
      : process.env.NEXT_PUBLIC_PINATA_URL + userData?.avatarImgUrl;

  return (
    <div
      className={`absolute right-0 z-[9999] top-12 shadow-2xl shadow-[#ffffff34] rounded-3xl ${
        !showProfileDropdown && "hidden"
      }`}
    >
      <div
        className="w-[298px] rounded-3xl bg-[#161616] border-[1px] border-[#2c2c2c] p-4 flex-col items-start justify-start gap-4 flex"
        ref={divRef}
      >
        <div className="flex items-center justify-start gap-[10px]">
          <div className="w-10 h-10 relative cursor-pointer">
            <Image
              src={avatarImgUrl}
              alt="Avatar"
              className="rounded-full"
              fill
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-md font-bold text-white">{userData?.name}</p>
            <p className="flex items-center justify-center gap-2">
              <span className="text-sm text-[#6B6B6B]">
                {userData.userWallet.slice(0, 5) +
                  "..." +
                  userData.userWallet.slice(-5)}
              </span>
              <span className="cursor-pointer">
                <CopyIcon />
              </span>
            </p>
          </div>
        </div>
        <div className="w-full rounded-xl bg-black p-4 flex flex-col gap-4">
          <div className="w-full flex items-center justify-between">
            <span className="text-[#5E686] text-sm">{`Solana`}</span>
            <p className="text-white text-lg font-bold">
              {0} {`SOL`}
            </p>
          </div>
          <div className="w-full flex items-center justify-between gap-5">
            <div className="text-white text-sm rounded-full font-bold border-[1px] border-[#0cdee4] px-3 py-2 w-1/2 text-center cursor-pointer">
              {`Bridge`}
            </div>
            <div className="text-black font-bold text-sm rounded-full bg-[#0cdee4] hover:bg-[#0cdde4c7] duration-300 px-3 py-2 w-1/2 text-center cursor-pointer">
              {`Send`}
            </div>
          </div>
        </div>
        <div className="flex items-start justify-start gap-3 flex-col w-full">
          <div className="flex items-center justify-start gap-3 cursor-pointer">
            <BigDollarIcon />
            <p className="text-white text-sm">{`My Earnings`}</p>
          </div>
          <div className="flex items-center justify-start gap-3 cursor-pointer">
            <AccountSettingsIcon />
            <p className="text-white text-sm">{`Account Settings`}</p>
          </div>
          <div className="flex items-center justify-start gap-3 cursor-pointer">
            <StarIcon />
            <p className="text-white text-sm">{`For Artist`}</p>
          </div>
          <div
            className="flex items-center justify-start gap-3 cursor-pointer text-[#FF7B72] hover:text-[#FF7B72] "
            onClick={handleLogOut}
          >
            <LogoutIcon />
            <p className="text-sm duration-300">{`Logout`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
