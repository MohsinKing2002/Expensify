import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { TextInput, Avatar } from "react-native-paper";
import Logo from "../../assets/icon.png";
import { useNavigation } from "@react-navigation/native";
import { account } from "../../AppWriteConfig";

const Login = () => {
  const navigation = useNavigation();
  const [Loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    setLoading(true);
    return await account
      .createEmailSession(email, password)
      .then((res) => {
        const user = account.get();
        user
          .then(() => {
            setLoading(false);
            navigation.navigate("Home");
            setEmail("");
            setPassword("");
          })
          .catch((err) => {
            setLoading(false);
            Alert.alert("Failed to Login");
            console.log("login get user error", err);
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log("login err", err);
      });
  };

  useEffect(() => {
    let user = account.get();
    if (user) navigation.navigate("Home");
  }, [navigation]);

  return (
    <View className="h-full bg-white flex items-center justify-center">
      <View className=" w-[80%] flex items-center justify-center">
        <Avatar.Image size={100} source={Logo} />
        <Text className="text-txtBlue text-3xl font-semibold my-6">
          Welcome Back !
        </Text>
        <View className="w-full">
          <TextInput
            outlineStyle={{ borderRadius: 8, borderColor: "purple" }}
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={(text) => setEmail(text)}
            left={
              <TextInput.Icon
                icon={() => <Feather name="mail" size={16} color="purple" />}
              />
            }
          />
          <TextInput
            outlineStyle={{ borderRadius: 8, borderColor: "purple" }}
            className="my-7"
            label="Password"
            mode="outlined"
            value={password}
            onChangeText={(text) => setPassword(text)}
            left={
              <TextInput.Icon
                icon={() => <Feather name="lock" size={16} color="purple" />}
              />
            }
          />

          <TouchableOpacity
            className={
              " items-center justify-center flex-row py-3 px-8 rounded-lg bg-purple-950"
            }
            disabled={Loading}
            onPress={loginUser}
          >
            <Text className="font-bold text-white text-xl">
              {" "}
              {Loading ? "Logging in" : "Login"}
            </Text>
            <View className={`ml-6 bg-purple-900 p-1.5 rounded-full`}>
              <Feather name="check" size={18} color="white" className="" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            className="mt-3 flex flex-row items-center justify-center"
          >
            <Text className="text-sm text-txtGray">
              Don't have an Account ?
            </Text>
            <Text className="text-base  text-txtBlue font-semibold">
              {" "}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
