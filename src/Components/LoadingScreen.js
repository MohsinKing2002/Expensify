import React from "react";
import { View, Image } from "react-native";
import LogoAnimation from "../../assets/splash.gif";

const LoadingScreen = () => {
  return (
    <View className=" h-full flex items-center justify-center">
      <Image style={{ height: 800, width: 400 }} source={LogoAnimation} />
    </View>
  );
};

export default LoadingScreen;
