import {React, useContext, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import ItemContext from "../contexts/ItemContext";
import InfoCard from "../components/InfoCard";

const SearchScreen = () => {
  const {state, currentState} = useContext(ItemContext);

  // const hey = state.find((item) => item.id === currentState)

  const [itemm, setItemm] = useState()
  const [currentItem, setCurrentItem] = useState()

  const search = () => {
   setCurrentItem(state.find((item) => item.competition.toLowerCase() == itemm.toLowerCase()))
  }

  const show = () => {
    if (currentItem)
    {
      return (
        <InfoCard 
            key={currentItem.id}
            rinkNo={currentItem.rinkNo}
            competition={currentItem.competition}
            scoreOne={currentItem.teamOneShots}
            scoreTwo={currentItem.teamTwoShots}
            date={currentItem.date}
            show={false}
          />

      )
    }

  }

  console.log(itemm);

  return (
    <ScrollView>
      <View>
        <Text style={styles.newGame}>Search</Text>

        <View style={styles.box}>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.inputOther}
              placeholder="Competition"
              onEndEditing={(text) => {
                setItemm(text.nativeEvent.text);
              }}
            ></TextInput>
          </View>

          <TouchableOpacity
             onPress={() => {
                search()
             }}
            style={styles.button}
          >
            <Feather name="search" size={35} color="rgb(116,148, 185)" />
          </TouchableOpacity>
        </View>

        <View>{show()}</View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  newGame: {
    margin: 30,
    alignSelf: "center",
    fontSize: 18,
  },
  button: {
    paddingBottom: 10,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputBox: {
    backgroundColor: "#E7EDF3",
    // width: 350,
    height: 55,
    // marginLeft: 25,
    marginHorizontal: 25,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 7,
    display: "flex",
    flexDirection: "row",
    paddingLeft: 2,
  },
  inputOther: {
    padding: 15,
    width: 290,
  },
});

export default SearchScreen;