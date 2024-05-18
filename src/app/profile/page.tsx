"use client";
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useCallback, useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { GetUserDataContext } from "@/src/contexts/UserDataContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  ChangeIcon,
  CopyIcon,
  DateIcon,
  DiscordIcon,
  TelegramIcon,
} from "../../components/Svglist";
import { PostFilterBar } from "../../components/PostFilterBar";
import SearchBar from "../../components/SearchBar";
import { PostCard } from "../../models/PostCard";
import { PostData } from "../../Data/data";
import { BiCheck } from "react-icons/bi";

const PostBar = dynamic(() => import("../../components/PostBar"), {
  ssr: false,
});

const Profile: NextPage = () => {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const { isAuthenticated, user } = useDynamicContext();
  const { userData } = useContext(GetUserDataContext);

  const redirectIfNotAuthenticated = useCallback(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isAuthenticated]);

  useEffect(() => {
    redirectIfNotAuthenticated();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [redirectIfNotAuthenticated]);

  const avatarImgUrl =
    userData.avatarImgUrl === ""
      ? "/imgs/avatars/initialAvatar.png"
      : process.env.NEXT_PUBLIC_PINATA_URL + userData.avatarImgUrl;
  const bannerImgUrl =
    userData.bannerImgUrl === ""
      ? "/imgs/banners/banner2.png"
      : process.env.NEXT_PUBLIC_PINATA_URL + userData.bannerImgUrl;

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const address = userData.userWallet;

  return (
    <div className="flex items-center justify-center w-full lg:ml-[250px] xl:ml-[250px] lg:mt-0 relative overflow-hidden flex-col">
      <div className="w-full relative">
        <div className="absolute z-[9994] left-[100px] top-4 right-0 flex items-center justify-center">
          <SearchBar />
        </div>
        <div className="w-full h-[250px] relative">
          <Image
            src={bannerImgUrl}
            alt="Banner"
            layout="fill"
            objectFit="cover"
            fill
          />
        </div>
        {/* <div
          className="text-white text-md font-bold flex item-center jsutify-center gap-2 bg-[#161616] border-[1px] border-[#2c2c2c] rounded-lg z-50
        absolute bottom-4 lg:right-[60px] right-[10px] p-2 cursor-pointer duration-300 transition-all hover:bg-[#111111]"
        >
          <span className="mt-1">
            <ChangeIcon width={16} height={16} />
          </span>
          <span className="hidden lg:block">{`Change cover`}</span>
        </div> */}
      </div>
      <div className="lg:w-[750px] xl:w-[1024px] 2xl:w-[1224px] w-full flex xl:flex-row flex-col xl:items-start items-center justify-between xl:px-[50px] lg:pl-[20px] p-2">
        <div className="flex xl:items-start xl:justify-start items-center justify-center gap-3 flex-col lg:w-[300px]">
          <div className="relative">
            <div className="w-[140px] h-[140px] lg:w-[140px] lg:h-[140px] xl:w-[140px] xl:h-[140px] relative lg:-mt-[70px] xl:-mt-[100px] -mt-[60px]">
              <img
                src={avatarImgUrl}
                alt="Profile Avatar"
                className="object-cover rounded-2xl border-4 border-black w-full h-full"
              />
            </div>
            {/* <div
              className="lg:rounded-xl rounded-md bg-[#161616] w-[26px] h-[26px] lg:w-[36px] lg:h-[36px] flex items-center justify-center p-1 absolute bottom-2 right-2
            lg:bottom-3 lg:right-3 cursor-pointer"
            >
              <ChangeIcon width={25} height={25} />
            </div> */}
          </div>
          <p className="text-white text-2xl font-bold">{userData.name}</p>
          <div className="flex items-center justify-start gap-3">
            <span className="text-[#5E6866] text-sm font-bold">
              {user?.verifiedCredentials[0].address?.slice(0, 5) +
                "..." +
                user?.verifiedCredentials[0].address?.slice(-5)}
            </span>
            <CopyToClipboard text={address} onCopy={handleCopy}>
              <div className="cursor-pointer">
                {isCopied ? <BiCheck color="#5E6866" /> : <CopyIcon />}
              </div>
            </CopyToClipboard>
          </div>
          <div className="flex flex-col items-start justify-start gap-4 mt-4">
            <p className="text-md text-white font-bold">{`About Me`}</p>
            <span className="text-sm text-[#909997]">{userData.bio}</span>
          </div>
          <div className="flex flex-col items-start justify-start gap-4 mt-4">
            <p className="text-md text-white font-bold">{`Socials`}</p>
            <span className="flex items-start justify-start gap-3">
              <span className="cursor-pointer">
                <TelegramIcon />
              </span>
              <span className="cursor-pointer">
                <DiscordIcon />
              </span>
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <DateIcon />
            <span className="text-[#909997] text-sm">{`Joined since june 24`}</span>
          </div>
        </div>
        <div className="xl:w-[calc(100%-300px)] w-full xl:pl-[50px] px-1 flex flex-col mt-[45px]">
          <div className="flex xl:flex-row flex-col items-center justify-between">
            <div className="flex items-center justify-center gap-1">
              <div className="flex flex-col gap-2 items-center xl:items-start justify-start w-[70px] lg:w-[100px] xl:w-[100px]">
                <p className="text-md font-bold text-white">{`23`}</p>
                <span className="text-[#5E6866] text-sm">{`Posts`}</span>
              </div>
              <div className="flex flex-col gap-2 items-center xl:items-start justify-start w-[70px] lg:w-[100px] xl:w-[100px]">
                <p className="text-md font-bold text-white">{`2.3k`}</p>
                <span className="text-[#5E6866] text-sm">{`Followers`}</span>
              </div>
              <div className="flex flex-col gap-2 items-center xl:items-start justify-start w-[70px] lg:w-[100px] xl:w-[100px]">
                <p className="text-md font-bold text-white">{`213`}</p>
                <span className="text-[#5E6866] text-sm">{`Collected`}</span>
              </div>
              <div className="flex flex-col gap-2 items-center xl:items-start justify-start w-[100px] lg:w-[100px] xl:w-[100px]">
                <p className="text-md font-bold text-white">{`23`}</p>
                <span className="text-[#5E6866] text-sm">{`Artist Backed`}</span>
              </div>
            </div>
            <div
              className="w-auto mt-4 xl:mt-0 cursor-pointer"
              onClick={() => router.push(`/profile/edit`)}
            >
              <div className="rounded-full border-[1px] border-[#0cdee4] bg-transparent text-white text-sm font-bold px-3 py-2 text-center duration-300 transition-all hover:bg-[#afafaf10]">
                {`Edit Profile`}
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-start lg:gap-4 gap-1 mt-6 text-sm lg:text-md">
            <div className="text-white rounded-full cursor-pointer border-[1px] border-[#2C2C2C] bg-[#161616] py-2 px-4">{`Post`}</div>
            <div className="text-[#909997] rounded-full cursor-pointer py-2 px-4">{`Collection`}</div>
            <div className="text-[#909997] rounded-full cursor-pointer py-2 px-4">{`Releases`}</div>
            <div className="text-[#909997] rounded-full cursor-pointer py-2 px-4">{`Playlist`}</div>
          </div>
          <div className="mt-5 flex flex-col gap-4">
            <PostBar />
            <PostFilterBar />
          </div>
          <div className="mt-5 h-[850px] overflow-y-auto pr-3">
            <div className="gap-10 flex flex-col items-center justify-center mb-[300px]">
              {PostData.map((data, index) => (
                <PostCard {...data} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
