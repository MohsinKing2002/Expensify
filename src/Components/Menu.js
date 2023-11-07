import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, useNavigationState } from "@react-navigation/native";

const Navbar = () => {
  const navigation = useNavigation();
  const state = useNavigationState((state) => state);
  const [route, setRoute] = useState(null);
  useEffect(() => {
    if (state?.routes?.length > 0) {
      setRoute(state?.routes?.[state?.routes?.length - 1]);
    } else setRoute(null);
  }, [state]);

  return (
    <View className=" flex flex-row items-center justify-around p-1.5 w-[80%]">
      <TouchableOpacity
        className="p-2"
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="home-outline" size={30} color="darkblue" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("History")}>
        <AntDesign name="clockcircleo" size={30} color="darkblue" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <Ionicons name="person-circle-outline" size={38} color="darkblue" />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
