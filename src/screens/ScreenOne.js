import React from "react";
import { useState, useContext, useReducer, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import ItemContext from "../contexts/ItemContext";

const names = [];

const ScreenOne = ({navigation, route}) => {

  const {create, state, currentState, updateScreen} = useContext(ItemContext);

    const currentItem = state.find((item) => item.id === currentState);

  //comp and date and rink no page
  const [competition, setCompetition] = useState('');
  // const [date, setDate] = useState('');
  const [rinkNo, setRinkNo] = useState(0);

  //team names
  const [teamOneName, setTeamOneName] = useState("");
  const [teamTwoName, setTeamTwoName] = useState("");

  const [teamOne, setTeamOne] = useState([]);
  const [teamTwo, setTeamTwo] = useState([]);
  const [teamOneShots, setTeamOneShots] = useState([]);
  const [teamTwoShots, setTeamTwoShots] = useState([]);
  const [images, setImages] = useState([]);

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setCompetition(currentItem?.competition);
    if (currentState)
    {
    //   console.log("hi")
      setDate(new Date(currentItem.date));
    }
    else
    {
      setDate(new Date());
    }
    // console.log("sup")
    setRinkNo(currentItem?.rinkNo);
    setTeamOneName(currentItem?.teamOneName),
    setTeamTwoName(currentItem?.teamTwoName),
    setTeamOne(currentItem?.teamOne);
    setTeamTwo(currentItem?.teamTwo);
    setTeamOneShots(currentItem?.teamOneShots);
    setTeamTwoShots(currentItem?.teamTwoShots);
    setImages(currentItem?.images);
  }, [currentState])


  return (
    <ScrollView>
        <View style={styles.index}>
          <Text style={styles.newGame}>{competition ? competition : "New Game"}</Text>
          <View>
            <View>
            <Text style={styles.title}>Competition:</Text>
                <InputBox
                defaultVal={competition}
                setter={setCompetition}
                icon={false}
                />
            </View>
            <View>
             <Text style={styles.title}>Date:</Text>   

              <View style={styles.inputBox}>

                <Entypo style={styles.iconView} name="calendar" size={25} color="rgb(116,148, 185)" />

                <Text style={styles.inputOther}>{date.toDateString()}</Text>
              </View>

            </View>
            <View>
                <Text style={styles.title}>Rink No:</Text>
                <InputBox
                keyboard = "numeric"
                defaultVal={rinkNo}
                setter={setRinkNo}
                icon={<Feather
                    // style={styles.icon}
                    name="hash"
                    size={25}
                    color="rgb(116,148, 185)"
                />}
                />
            </View>
          </View>
          <View style={styles.buttonView}>
          <Button onPress={() => { 
              if (competition && rinkNo)
              {
                if (!currentState)
                {
                  const id = create(competition, date.toDateString(), rinkNo, "", "", [], [], [],[], []);
                  navigation.navigate("ScreenTwo", {id})
            
                }
                else{
                  updateScreen(
                    currentState,
                    competition, date.toDateString(), rinkNo, teamOneName, teamTwoName, teamOne, teamTwo, teamOneShots,teamTwoShots, images)
                  navigation.navigate("ScreenTwo", {id: currentState})
                }
            }
        
          }
          } text="Player" />
          </View>
        </View>
      </ScrollView>
  )
}


const styles = StyleSheet.create({
  inputOther: {
    padding: 15,
    width: 350,
  },
  inputBox: {
    backgroundColor: "#E7EDF3",
    // width: 350,
    height: 55,
    // marginLeft: 25,
    marginHorizontal: 25,
    marginTop: 15,
    marginBottom: 20,
    borderRadius: 7,
    display: "flex",
    flexDirection: "row",
  },
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
    title: {
        marginLeft: 25,
      },
    iconView: {
      borderRightColor: 'rgb(116,148, 185)',
      borderRightWidth: 2,
      padding: 15,
    },
  });

export default ScreenOne