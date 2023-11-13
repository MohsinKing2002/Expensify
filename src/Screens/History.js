import moment from "moment";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { DailyExpenseCard, containerStyle } from "./Home";
import { Modal, Portal } from "react-native-paper";
import CalendarPicker from "react-native-calendar-picker";

const History = () => {
  const [SelectedDate, setSelectedDate] = useState(new Date());
  const [ActionModalOpen, setActionModalOpen] = useState(false);
  const arr = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  // console.log(SelectedDate);
  return (
    <View className="h-full bg-bgGray px-3 py-2">
      <View className="bg-white shadow-xl p-3 rounded-lg">
        <View>
          {/******* calendar navigation bar *********/}
          <View className="flex-row items-center justify-between border-b border-gray-300 p-2 mb-2.5">
            <TouchableOpacity
              onPress={() => {
                let prevDate = moment(SelectedDate).subtract(1, "day");
                setSelectedDate(prevDate);
              }}
            >
              <Feather name="chevron-left" size={20} color="rgb(59 7 100)" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActionModalOpen(true)}>
              <Text className=" text-lg font-semibold text-txtBlue">
                {moment(new Date()).format("DD MMMM, Y") ===
                moment(SelectedDate).format("DD MMMM, Y")
                  ? "Today, "
                  : ""}
                {moment(SelectedDate).format("DD MMMM, Y")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={
                moment(SelectedDate).format("DD/MM/Y") ===
                moment().format("DD/MM/Y")
              }
              onPress={() => {
                let postDate = moment(SelectedDate).add(1, "days");
                if (moment().isAfter(postDate)) {
                  setSelectedDate(postDate);
                }
              }}
            >
              <Feather
                name="chevron-right"
                size={20}
                color={
                  moment(SelectedDate).format("DD/MM/Y") ===
                  moment().format("DD/MM/Y")
                    ? "rgba(0,0,0,0.1))"
                    : "rgb(59 7 100)"
                }
              />
            </TouchableOpacity>
          </View>
          {/* all transaction data for selected date */}
          {arr.map((item) => (
            <DailyExpenseCard
              key={item}
              purpose={"Dinner"}
              time={"09:10am"}
              amount={item}
            />
          ))}

          <View className="pt-2 border-t border-gray-300  flex flex-row items-center justify-between">
            <Text className="text-txtBlue text-base font-semibold">
              Today's Expenses
            </Text>
            <Text className="text-txtRed text-base font-semibold">₹ 3000</Text>
          </View>
        </View>
      </View>

      <Portal>
        <Modal
          visible={ActionModalOpen}
          onDismiss={() => setActionModalOpen(false)}
          contentContainerStyle={containerStyle}
        >
          <View className="p-2">
            <View className="border-b border-gray-300 flex flex-row items-center justify-between pb-3 mb-4">
              <Text className="text-lg text-txtBlue font-medium">
                Pick a Date
              </Text>
              <TouchableOpacity onPress={() => setActionModalOpen(false)}>
                <AntDesign name="closecircleo" size={24} color="#00008b" />
              </TouchableOpacity>
            </View>
            <View>
              <CalendarPicker
                weekdays={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
                previousComponent={
                  <Feather name="chevron-left" size={20} color="black" />
                }
                nextComponent={
                  <Feather name="chevron-right" size={20} color="black" />
                }
                restrictMonthNavigation={true}
                headerWrapperStyle={{
                  gap: 20,
                }}
                customDayHeaderStyles={() => ({
                  style: { border: 0 },
                })}
                selectedDayStyle={{
                  backgroundColor: "purple",
                }}
                selectedDayTextColor="white"
                date={SelectedDate}
                maxDate={moment()}
                onDateChange={(date) => {
                  setSelectedDate(moment(date).format("YYYY-MM-DD"));
                }}
              />
              <TouchableOpacity
                className="items-center justify-center flex flex-row p-3 mt-5 bg-txtBlue rounded-lg"
                onPress={() => setActionModalOpen(false)}
              >
                <Text className="text-xl font-semibold text-white">
                  Continue
                </Text>
                <View className={`ml-6 bg-purple-900 p-1.5 rounded-full`}>
                  <AntDesign
                    name="check"
                    size={18}
                    color="white"
                    className=""
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default History;
