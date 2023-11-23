import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TextInput, Avatar } from "react-native-paper";
import Logo from "../../assets/icon.png";
import { useNavigation } from "@react-navigation/native";
import { ID, account, permission } from "../../AppWriteConfig";

const Register = () => {
  const navigation = useNavigation();
  const [Loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    if (!email || !name || !password)
      return Alert.alert("Please fill the mandotory details.");
    setLoading(true);
    await account.create(ID.unique(), email, password, name);

    return await account
      .createEmailSession(email, password)
      .then((res) => {
        Alert.alert(`Welcome ${name}`);
        setEmail("");
        setName("");
        setPassword("");
        setLoading(false);
        navigation.navigate("Home");
      })
      .catch((err) => {
        setLoading(false);
        console.log("sign up error", err);
      });
  };

  return (
    <View className="h-full bg-white flex items-center justify-center">
      <View className=" w-[80%] flex items-center justify-center">
        <Avatar.Image size={100} source={Logo} />
        <Text className="text-txtBlue text-3xl font-semibold my-6">
          New Account
        </Text>
        <View className="w-full">
          <TextInput
            outlineStyle={{ borderRadius: 8, borderColor: "purple" }}
            label="Name"
            mode="outlined"
            value={name}
            onChangeText={(text) => setName(text)}
            className="mb-4"
            left={
              <TextInput.Icon
                icon={() => <Feather name="user" size={16} color="purple" />}
              />
            }
          />
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
            className="my-4"
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
            onPress={registerUser}
          >
            <Text className="font-bold text-white text-xl">
              {Loading ? "Registering.." : "Register"}
            </Text>
            <View className={`ml-6 bg-purple-900 p-1.5 rounded-full`}>
              <Feather name="check" size={18} color="white" className="" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            className="mt-3 flex flex-row items-center justify-center"
          >
            <Text className="text-sm text-txtGray">
              Already have an Account ?
            </Text>
            <Text className="text-base  text-txtBlue font-semibold">
              {" "}
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;
