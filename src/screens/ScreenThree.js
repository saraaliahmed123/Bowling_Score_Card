import React from "react";
import { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput
} from "react-native";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { AntDesign, MaterialCommunityIcons, Entypo} from "@expo/vector-icons";
import ItemContext from "../contexts/ItemContext";

const val = [];
const valTwo = [];
const names = [];

const SCORE = [
    {
      id: 1,
    },
  ];

const ScreenThree = ({navigation, route}) => {
     //player name boxes
     const { id } = route.params

    const {state, updateScreen, currentState, setCurrentState} = useContext(ItemContext);
    const currentItem = state.find((item) => item.id === id);

  //shots and total page boxes
  const [score, setScore] = useState(Array.from({length: currentItem.teamOneShots.length || [1] }).map((a,i) => {
    return {
      id: i
    }
  }));
  const [scoreTwo, setScoreTwo] = useState(Array.from({length: currentItem.teamTwoShots.length || [1] }).map((a,i) => {
    return {
      id: i
    }
  }));

    //shots and total page values player 1 and 2
    const [teamOneName, setTeamOneName] = useState(currentItem?.teamOneName);
    const [teamTwoName, setTeamTwoName] = useState(currentItem?.teamTwoName);  


  //shots and total page values player 1 and 2
  const [teamOneShots, setTeamOneShots] = useState(currentItem?.teamOneShots);
  const [teamTwoShots, setTeamTwoShots] = useState(currentItem?.teamTwoShots);

  const [images, setImages] = useState(currentItem?.images);

    //add shots and total boxes
  const addScore = () => {
    setScore((prev) => {
      return [...prev, { id: prev[prev.length - 1].id + 1 }];
    });
    setScoreTwo((prev) => {
      return [...prev, { id: prev[prev.length - 1].id + 1 }];
    });
  };

   //list of player 1 shots and total boxes displayed
   const scoreList = () => {
    return score.map((item, index) => {
      return (
        <View style={styles.inputThirdBigBox} key={index}>
            <InputBox
              keyboard="numeric"
              defaultVal={teamOneShots[index]}
              setter={a}
              index={index}
              shot={true}
              holder={true}
            />
          <View style={styles.inputBoxThird}>
            <TextInput
              style={styles.inputThird}
              editable={false}
              defaultValue={totalA(index)}
            />
          </View>
        </View>
      );
    });
  };

  //list of player 2 shots and total boxes displayed
  const scoreListTwo = () => {
    return scoreTwo.map((item, index) => {

      return (
        <View style={styles.inputThirdBigBox} key={index}>
            <InputBox
              keyboard="numeric"
              defaultVal={teamTwoShots[index]}
              setter={b}
              index={index}
              shot={true}
              holder={true}
            />
          <View style={styles.inputBoxThird}>
            <TextInput
              style={styles.inputThird}
              editable={false}
              defaultValue={totalB(index)}
            />
          </View>
        </View>
      );
    });
  };

     //shots value entered then 0 for player 2
     const a = (a, index) => {
        if (teamOneShots[index]) {
          if (teamOneShots[index] == 0) {
            setTeamTwoShots((prev) => {
              const arr = [...prev];
              arr[index] = "0";
              return arr;
            });
            setTeamOneShots((prev) => {
              const arr = [...prev];
              arr[index] = a;
              return arr;
            });
          }
          else if (parseInt(a) == 0)
          {
            setTeamOneShots((prev) => {
                const arr = [...prev];
                return arr;
              });
              setTeamTwoShots((prev) => {
                const arr = [...prev];
                return arr;
              });
          }
          else
          {
            setTeamOneShots((prev) => {
                const arr = [...prev];
                arr[index] = a;
                return arr;
              });
        
          }
        }
        else {
          setTeamOneShots((prev) => {
            return [...prev, a];
          });
    
          setTeamTwoShots((prev) => {
            return [...prev, "0"];
          });
        }

      };
    
      //shots value entered then 0 for player 1
      const b = (b, index) => {
        if (teamTwoShots[index]) {
          if (teamTwoShots[index] == 0) {
            setTeamOneShots((prev) => {
              const arr = [...prev];
              arr[index] = "0";
              return arr;
            });
            setTeamTwoShots((prev) => {
              const arr = [...prev];
              arr[index] = b;
              return arr;
            });
          }
          else if (parseInt(b) == 0)
          {
            setTeamOneShots((prev) => {
                const arr = [...prev];
                return arr;
              });
              setTeamTwoShots((prev) => {
                const arr = [...prev];
                return arr;
              });
          }
          else{
            setTeamTwoShots((prev) => {
                const arr = [...prev];
                arr[index] = b;
                return arr;
              });
        
          }
        }
        else{
          setTeamTwoShots((prev) => {
            return [...prev, b];
          });
    
          setTeamOneShots((prev) => {
            return [...prev, "0"];
          });
        
        }
      };

      //calculating total of player 1
  const totalA = (index) => {
    let tot = 0;
    teamOneShots.forEach((val, i) => {
      if (i <= index) {
        tot += parseInt(val);
      }
    });
    return tot.toString();
  };

  //calculating total of player 2
  const totalB = (index) => {
    let tot = 0;
    teamTwoShots.forEach((val, i) => {
      if (i <= index) {
        tot += parseInt(val);
      }
    });
    return tot.toString();
  };

  // console.log(state[1].teamOneShots)
  // console.log(state[1].teamTwoShots)

  // console.log(teamOneShots);
  // console.log(teamTwoShots)

  // console.log(state)

  useEffect(() => {
    setImages(currentItem?.images);
  }, [currentItem])

  const pictures = () => {
    return images.map((item, key) => {
      return (
        <View style={styles.imageList}>
          <Text style={styles.imageText}>Picture {key+1}...</Text>
          <TouchableOpacity
            onPress={() => {
              deleteImage(item)
            }}
            style={styles.button}
          >
            <Entypo name="cross" size={20} color="rgb(116,148, 185)" />
          </TouchableOpacity>
        </View>
      );
    });
    
  }

  console.log(images);

  const deleteImage = (item1) => {
      setImages((images) => {
        return (images.filter(item => item !== item1))
      })
    }


  // console.log(images.length);


  return (
    <ScrollView>
        <View style={styles.index}>
          <Text style={styles.newGame}>New Game suppppppp</Text>
          <Text style={styles.newGame}>Enter scores:</Text>
          <Text style={styles.title}>{teamOneName == "" ? "Team 1" : teamOneName}</Text>
          <View style={styles.shotsAndTotal}>
            <Text style={styles.titlethird}>Shots:</Text>
            <Text style={styles.titlethird}>Total:</Text>
          </View>

          <View>{scoreList()}</View>

          <Text style={styles.title}>{teamTwoName == "" ? "Team 2" : teamTwoName}</Text>
          <View style={styles.shotsAndTotal}>
            <Text style={styles.titlethird}>Shots:</Text>
            <Text style={styles.titlethird}>Total:</Text>
          </View>

          <View>{scoreListTwo()}</View>

          <View style={styles.addButtonBox}>
            <TouchableOpacity onPress={addScore}>
              <AntDesign
                name="pluscircleo"
                size={30}
                color="rgb(116,148, 185)"
              />
            </TouchableOpacity>
          </View>

      
            <TouchableOpacity onPress={() => {
              navigation.navigate("CameraScreen", {id});
            }}>
              <View style={styles.cameraButton}>
                <MaterialCommunityIcons 
                name="camera-plus-outline" 
                size={30} 
                color="rgb(116,148, 185)"
                />
              </View>
            </TouchableOpacity>

            <View>{pictures()}</View>


          <View style={styles.buttonView}>
            <Button onPress={() => {navigation.navigate("ScreenTwo", {id} )}} text="Back" />
            <Button onPress={() => {
                // navigation.push("ScreenOne");
              if (teamOneShots[0] && teamTwoShots[0])
                {
                  updateScreen(
                    currentItem.id,
                    currentItem.competition, 
                    currentItem.date, 
                    currentItem.rinkNo,
                    currentItem.teamOneName,
                    currentItem.teamTwoName,
                    currentItem.teamOne,
                    currentItem.teamTwo,
                    teamOneShots,
                    teamTwoShots,
                    images,
                  );
                  setCurrentState(null)
                  navigation.navigate("ScreenOne")
                  navigation.navigate("IndexScreen")
                }
              }}
                text="Done" 
                />
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
    inputBoxThird: {
      backgroundColor: "#E7EDF3",
      height: 55,
      borderRadius: 7,
      display: "flex",
      flexDirection: "row",
      width: 150,
      marginTop: 15,
      marginBottom: 20,
    },
    inputThirdBigBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginLeft: 25,
      marginRight: 25,
    },
    inputThird: {
      marginLeft: 10,
      width: 130,
    },
    titlethird: {
      marginLeft: 25,
      marginRight: 145,
      marginTop: 5,
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
    shotsAndTotal: {
      flexDirection: "row",
      width: 350,
      marginTop: 5,
    },
    title: {
        marginLeft: 25,
      },
      cameraButton:{
        marginLeft: 25,
        backgroundColor: "#E2E5EA",
        height: 52,
        borderRadius: 7,
        marginTop: 23,
        marginBottom: 20,
        marginRight: 20,
        // width: 350,
        alignItems: "center",
        justifyContent: "center"
      },
      imageList:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 25,
        marginRight: 25,
      },
      imageText:{
        color:"rgb(116,148, 185)",
        margin: 3
      }
  });

export default ScreenThree