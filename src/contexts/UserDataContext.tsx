"use client";
import { GetUserDataContextValue, UserDataType } from "../types/menu";
import { createContext, useEffect, useMemo, useState } from "react";
import { getAllUserData, getUserData } from "../utils/api";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export const GetUserDataContext = createContext<GetUserDataContextValue>({
  userData: {
    name: "",
    userId: "",
    email: "",
    userWallet: "",
    bio: "",
    followers: [],
    avatarImgUrl: "",
    bannerImgUrl: "",
    twitterUrl: "",
    discordUrl: "",
  },
  allUserDataForFollow: [],
  getAllUserLoadingState: false,
  setUserDataFunc: () => {},
  getAllUser: async () => {},
});

const GetUserDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, user } = useDynamicContext();

  const [userData, setUserData] = useState<UserDataType>({
    name: "",
    userId: "",
    email: "",
    userWallet: "",
    bio: "",
    followers: [],
    avatarImgUrl: "",
    bannerImgUrl: "",
    twitterUrl: "",
    discordUrl: "",
  });
  const [allUserDataForFollow, setAllUserData] = useState<UserDataType[]>([]);
  const [getAllUserLoadingState, setGetAllUserLoadingState] = useState(false);

  const setUserDataFunc = async () => {
    if (user && user.userId) {
      console.log("user", user.userId);
      const userD = await getUserData(user.userId);
      setUserData(userD);
    } else {
      setUserData({
        name: "",
        userId: "",
        email: "",
        userWallet: "",
        bio: "",
        followers: [],
        avatarImgUrl: "",
        bannerImgUrl: "",
        twitterUrl: "",
        discordUrl: "",
      });
    }
  };

  const getAllUser = async () => {
    setGetAllUserLoadingState(true);
    const data = await getAllUserData();
    setAllUserData(data);
    setGetAllUserLoadingState(false);
  };

  useEffect(() => {
    getAllUser();
  }, [isAuthenticated]);

  useEffect(() => {
    setUserDataFunc();

    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isAuthenticated]);

  return (
    <GetUserDataContext.Provider
      value={{
        userData,
        allUserDataForFollow,
        getAllUserLoadingState,
        setUserDataFunc,
        getAllUser,
      }}
    >
      {children}
    </GetUserDataContext.Provider>
  );
};

export default GetUserDataProvider;
