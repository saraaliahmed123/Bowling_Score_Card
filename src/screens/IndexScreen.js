import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import InfoCard from "../components/InfoCard";
import ItemContext from "../contexts/ItemContext";


const IndexScreen = ({ navigation, route }) => {

  const {state, deleteItem, setCurrentState} = useContext(ItemContext);
  // const {totalOne, totalTwo} = route.params;

  // console.log(state);

  return (
    <ScrollView>
      <View style={styles.index}>
        {state.map((card, id) => {
          return (
            <InfoCard key={id}
              rinkNo={card.rinkNo}
              competition={card.competition}
              scoreOne={card.teamOneShots}
              scoreTwo={card.teamTwoShots}
              date={card.date}
              show={true}
              id = {id}
              onPressEdit={() => 
                {setCurrentState(card.id);
                navigation.navigate("AddScreenf")}
              }
              onPressRemove={() => 
                deleteItem(card.id)
              }
            />
          )
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  index: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IndexScreen;