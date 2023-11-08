import { Text, TouchableOpacity, View, Image } from "react-native";
import Navbar from "../Components/Menu";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import { PieChart } from "react-native-chart-kit";
import Logo from "../../assets/icon.png";

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const DailyExpenseCard = ({ purpose, time, amount }) => {
  return (
    <View className="mb-2 flex flex-row items-center justify-between">
      <View className="flex flex-row items-center">
        <View className="bg-bgGray p-2 rounded-full">
          <Ionicons name="ios-wallet-outline" size={20} color="red" />
        </View>
        <View className="ml-2">
          <Text className="text-base text-txtRed font-medium">{purpose}</Text>
          <Text className="text-xs text-txtBlue font-medium">{time}</Text>
        </View>
      </View>
      <Text className="text-lg text-txtRed font-semibold">₹ {amount}</Text>
    </View>
  );
};

const Home = () => {
  const data = [
    {
      name: "Budget",
      population: 5000,
      color: "rgb(21 128 61)",
      legendFontColor: "rgb(21 128 61)",
      legendFontSize: 14,
    },
    {
      name: "Expenses",
      population: 3000,
      color: "rgb(185 28 28)",
      legendFontColor: "rgb(185 28 28)",
      legendFontSize: 14,
    },
    {
      name: "Remaining",
      population: 2000,
      color: "#00008b",
      legendFontColor: "#00008b",
      legendFontSize: 14,
    },
  ];
  return (
    <View className="h-full bg-bgGray">
      {/* ********************** Header icon with app logo ************************************ */}
      <View className="bg-white mt-9 w-full p-2 flex flex-row items-center justify-center">
        <Image
          source={Logo}
          alt="logo"
          style={{
            height: 50,
            width: 50,
            borderRadius: 100,
            objectFit: "contain",
          }}
        />
        <View className="ml-3">
          <Text className="text-txtBlue text-xl font-semibold">Expensify</Text>
          <Text className="text-txtBlue text-sm font-medium">
            Monitor Your Expenses
          </Text>
        </View>
      </View>

      <View className="px-4 py-2">
        <View className="bg-white shadow-xl p-1 rounded-lg mb-2.5 flex items-center">
          <PieChart
            data={data}
            width={300}
            height={130}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            center={[10, 0]}
            // absolute
          />
        </View>

        <View className="bg-white shadow-xl py-2 px-4 rounded-lg mb-2.5 flex  flex-row items-center justify-between">
          <View>
            <Text className="text-txtGreen text-base font-medium">
              Budget Amount
            </Text>
            <Text className="text-txtRed text-base font-medium my-1">
              Expense Amount
            </Text>
            <Text className="text-txtBlue text-base font-medium">
              Remaining Amount
            </Text>
          </View>
          <View>
            <Text className="text-txtGreen text-base font-semibold">
              ₹ 5000
            </Text>
            <Text className="text-txtRed text-base font-semibold my-1">
              ₹ 2000
            </Text>
            <Text className="text-txtBlue text-base font-semibold">₹ 3000</Text>
          </View>
        </View>

        <View className="bg-white shadow-xl py-2 px-4 rounded-lg mb-1.5">
          <Text className="text-txtBlue text-base font-semibold">
            Today's Expenses
          </Text>
          <Divider bold className="my-2" />
          <DailyExpenseCard amount={200} purpose={"Lunch"} time={"01:20 pm"} />
          <DailyExpenseCard amount={300} purpose={"Dinner"} time={"09:00 pm"} />
          <DailyExpenseCard amount={100} purpose={"Dinner"} time={"09:00 pm"} />
          <DailyExpenseCard amount={300} purpose={"Dinner"} time={"09:00 pm"} />
          <DailyExpenseCard amount={600} purpose={"Dinner"} time={"09:00 pm"} />
          <Divider bold className="my-2" />
          <Text className="text-txtBlue text-base font-semibold">
            Today's Expenses
          </Text>
        </View>

        <View className="py-1.5 px-2.5 bg-white rounded w-[80%] flex flex-row items-center">
          <AntDesign name="star" size={18} color={"green"} />
          <Text className="ml-1.5 text-txtGreen text-sm font-medium">
            Spend ₹ {3000 / 20} per day
          </Text>
        </View>
      </View>

      {/* ********************** Navbar menu and create expense button ************************************ */}
      <View className="bg-sky-50 absolute bottom-1 w-full">
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
