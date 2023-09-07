import React from "react";
import { useState, useContext } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput} from "react-native";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { Feather, AntDesign} from "@expo/vector-icons";
import ItemContext from "../contexts/ItemContext";


const ScreenTwo = ({navigation, route}) => {

  const {state, updateScreen, deleteItem} = useContext(ItemContext);
  const { id } = route.params
  // console.log(id);
  const currentItem = state.find((item) => item.id === id);


  //player name boxes
  const [exampleState, setExampleState] = useState(Array.from({length: currentItem.teamOne.length || [1] }).map((a,i) => {
    return {
      id: i
    }
  }));
  const [exampleStateTwo, setExampleStateTwo] = useState(Array.from({length: currentItem.teamTwo.length || [1] }).map((a,i) => {
    return {
      id: i
    }
  }));
  // console.log(currentItem.competition);

  //player names
  const [teamOne, setTeamOne] = useState(currentItem?.teamOne);
  const [teamTwo, setTeamTwo] = useState(currentItem?.teamTwo);

  //team names
  const [teamOneName, setTeamOneName] = useState(currentItem?.teamOneName);
  const [teamTwoName, setTeamTwoName] = useState(currentItem?.teamTwoName);

      //list of player 1 boxes displayed
  const list = () => {
    return exampleState.map((item, index) => {
      // console.log(index);
      function m(te, index) {
        setTeamOne(prev => {
          prev[index] = te
          // console.log(prev);
          return [...prev]
        })
      }
      return (
        <View style={styles.inputBox} key={index}>
            <InputBox
              defaultVal={teamOne[index]}
              setter={m}
              index={index}
              icon={<Feather
                name="hash"
                size={25}
                color="rgb(116,148, 185)"
              />}
            />
        </View>
      );
    });
  };

  //list of player 2 boxes displayed
  const listTwo = () => {
    function ma(te, index) {
      setTeamTwo(prev => {
        prev[index] = te
        return [...prev]
      })
    }
    return exampleStateTwo.map((item, index) => {
      return (
        <View style={styles.inputBox} key={index}>
            <InputBox
              defaultVal={teamTwo[index]}
              setter={ma}
              index={index}
              icon={<Feather
                name="hash"
                size={25}
                color="rgb(116,148, 185)"
              />}
            />
        </View>
      );
    });
  };

  // console.log(teamOne);
  // console.log(teamTwo);

  //player 1 name enetered into state
  const playerOneName = (name) => {
    setTeamOne((prev) => {
      return [...prev, name];
    });
  };

  //player 2 name enetered into state
  const playerTwoName = (name) => {
    setTeamTwo((prev) => {
      return [...prev, name];
    });
  };

  //add player boxes only up to 4
  const addElement = () => {
    if (exampleState.length <= 3) {
      setExampleState((prev) => {
        return [...prev, { id: prev[prev.length - 1].id + 1 }];
      });
      setExampleStateTwo((prev) => {
        return [...prev, { id: prev[prev.length - 1].id + 1 }];
      });
    }
  };


  return (
    <ScrollView>
        <View>
          <Text style={styles.newGame}>New Game</Text>
          <View>

          <View style={styles.teamNameBox} >
            <TextInput 
            style={styles.title} 
            defaultValue = {teamOneName == "" ? "Team 1" : teamOneName} 
            onEndEditing={(text) => {
              setTeamOneName(text.nativeEvent.text);
            }}
            />
            <AntDesign name="edit" size={15} color="rgb(116,148, 185)" />
          </View>

            <View>{list()}</View>

            <View style={styles.teamNameBox} >
              <TextInput 
              style={styles.title} 
              defaultValue = {teamTwoName == "" ? "Team 2" : teamTwoName}  
              onEndEditing={(text) => {
                setTeamTwoName(text.nativeEvent.text);
              }}
              />
              <AntDesign name="edit" size={15} color="rgb(116,148, 185)" />
            </View>

            <View>{listTwo()}</View>
          </View>
          <View style={styles.addButtonBox}>
            <TouchableOpacity onPress={addElement}>
              <AntDesign
                name="pluscircleo"
                size={30}
                color="rgb(116,148, 185)"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonView}>
          <Button onPress={() => {navigation.navigate("ScreenOne")
          }} text="Back" />
          <Button onPress={() => {
          if (teamOne[0] && teamTwo[0] || teamOne[0] == '' && teamTwo[0] == '')
          {
              updateScreen(
              currentItem.id,
              currentItem.competition, 
              currentItem.date, 
              currentItem.rinkNo,
              teamOneName,
              teamTwoName,
              teamOne,
              teamTwo,
              currentItem.teamOneShots,
              currentItem.teamTwoShots,
              currentItem.images,
            );
              navigation.navigate("ScreenThree", {id})
          }
        
        }} text="Next" />
          </View>
        </View>
      </ScrollView>
  )
}


const styles = StyleSheet.create({
    newGame: {
      margin: 30,
      alignSelf: "center",
      fontSize: 18,
    },
    buttonView: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    addButtonBox: {
      // width: 350,
      // marginLeft: 25,
      marginRight: 20,
      alignItems: "flex-end",
    },
    title: {
        marginLeft: 25,
        marginRight: 10
    },
    teamNameBox:{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    }
});

export default ScreenTwo