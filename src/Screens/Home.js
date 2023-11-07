import { Text, TouchableOpacity, View } from "react-native";
import Navbar from "../Components/Menu";
import { AntDesign } from "@expo/vector-icons";
import { Divider } from "react-native-paper";

const Home = () => {
  return (
    <View className="h-full bg-bgGray">
      <View className="p-4 mt-8">
        <View className="bg-white shadow-xl p-3 rounded-lg mb-3">
          <Text className="text-red-700 text-xl font-bold">Graph / chart</Text>
        </View>

        <View className="bg-white shadow-xl p-3 rounded-lg mb-3">
          <Text className="text-red-700 text-xl font-bold">Budget - 6000</Text>
          <Text className="text-red-700 text-xl font-bold">
            Expenses - 2000
          </Text>
          <Text className="text-red-700 text-xl font-bold">Remaing - 4000</Text>
          <Text className="text-red-700 text-xl font-bold">
            suggestion - 110/day
          </Text>
        </View>

        <Text className="text-txtBlue text-base font-semibold mb-1">
          Today's Expenses
        </Text>
        <View className="bg-white shadow-xl p-3 rounded-lg mb-3">
          <Text className="text-red-700 text-xl font-bold">
            individual expense -- time
          </Text>
          <Text className="text-red-700 text-xl font-bold">
            individual expense -- time
          </Text>
          <Text className="text-red-700 text-xl font-bold">
            individual expense -- time
          </Text>
          <Text className="text-red-700 text-xl font-bold">
            individual expense -- time
          </Text>

          <Divider bold className="my-2" />
          <Text>Total ---- 500</Text>
        </View>
      </View>

      {/* ********************** Navbar menu and create expense button ************************************ */}
      <View className="bg-sky-50 absolute bottom-1.5 w-full">
        <View className="absolute right-6 top-[-40px] bg-bgGray rounded-full p-1.5 z-10">
          <TouchableOpacity className="bg-sky-50 p-3 rounded-full">
            <AntDesign name="pluscircleo" size={35} color="darkblue" />
          </TouchableOpacity>
        </View>
        <Navbar />
      </View>
    </View>
  );
};

export default Home;
