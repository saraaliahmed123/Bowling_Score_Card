import {React, useContext} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import ItemContext from "../contexts/ItemContext";

const InfoCard = ({date, onPressEdit, rinkNo, competition, scoreOne, scoreTwo, id, onPressRemove, show}) => {

  const {state, updateScreen} = useContext(ItemContext);
  const currentItem = state.find((item) => item.id === id);


  const totalOne = () => {
    let tot = 0;
    scoreOne.map((item, id) => {
      tot += parseInt(item);
    })
    return tot.toString();
  }

  const totalTwo = () => {
    let tot = 0;
    scoreTwo.map((item, id) => {
      tot += parseInt(item);
    })
    return tot.toString();
  }

  return (
    <View style={styles.box}>
      {show ? 
      <View style={styles.titleAndIcons}>
        <TouchableOpacity
          onPress={onPressEdit}
          style={styles.button}
        >
          <Feather
            style={styles.editIcon}
            name="edit"
            size={22}
            color="rgb(116,148, 185)"
          />
        </TouchableOpacity>
        <Text>{competition}</Text>
        <TouchableOpacity
          onPress={onPressRemove}
          style={styles.button}
        >
          <Entypo name="cross" size={29} color="rgb(116,148, 185)" />
        </TouchableOpacity>
      </View>

      : <View style={styles.compAlone}>
          <Text>{competition}</Text>
        </View>}

      <View style={styles.main}>
        <View style={styles.rinkAndScore}>
          <View style={styles.rink}>
            <Text>Rink No:</Text>

            <View style={styles.inputBox}>
              <Text style={styles.input} >{rinkNo} </Text>
            </View>
          </View>
          <View style={styles.Score}>
            <Text>Score:</Text>

            <View style={styles.inputBox}>
              <Text style={styles.input}>{totalOne()} - {totalTwo()}</Text>
            </View>
            
          </View>
        </View>

        <View style={styles.compBox}>
          <Text style={styles.comp}>Date:</Text>

          <View style={styles.inputBoxComp}>
            <Text style={styles.input} >{date} </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 15,
    margin: 35,
    borderRadius: 10,
    backgroundColor: "#E7EDF3",
    width: 350,
    height: 170,
  },
  rinkAndScore: {
    display: "flex",
    flexDirection: "row",
  },
  compBox: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    alignItems: 'center'
  },
  rink: {
    display: "flex",
    flexDirection: "row",
    paddingRight: 20,
    alignItems: 'center'
  },
  Score: {
    display: "flex",
    flexDirection: "row",
    paddingRight: 10,
    alignItems: 'center'
  },
  titleAndIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  editIcon: {
    marginTop: 2,
    marginLeft: 2,
  },
  main: {
    marginLeft: 10,
    marginRight: 10,
    height: 115,
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    backgroundColor: "#7494B9",
    borderRadius: 7,
    width: 50,
    marginLeft: 10,
  },
  inputBoxComp: {
    backgroundColor: "#7494B9",
    borderRadius: 7,
    width: '60%',
    marginLeft: 10,
    marginTop: 10,
  },
  comp: {
    marginTop: 13,
  },
  input:{
    alignSelf: 'center',
    margin: 5
  },
  compAlone:{
    alignItems:'center',
    marginBottom: 5
  }
});

export default InfoCard;
