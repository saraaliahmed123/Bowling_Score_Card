import {React, useState, useContext, useEffect} from 'react'
import { StyleSheet, View, Image} from "react-native";
import Button from "../components/Button";
import ItemContext from '../contexts/ItemContext';

const ViewImageScreen = ({navigation, route}) => {

    const {state, updateScreen} = useContext(ItemContext);

    const { image, id } = route.params
    const currentItem = state.find((item) => item.id === id);

    console.log(currentItem)


  return (

    <View style={styles.container}>
                
        <Image style={styles.subContainer} source={{uri: image}}/>

        <View style={styles.buttons}>

            {/* <Button onPress={() => {navigation.pop()}} text="Back" /> */}

            <Button onPress={() => {
            updateScreen(
                currentItem.id,
                currentItem.competition, 
                currentItem.date, 
                currentItem.rinkNo,
                currentItem.teamOneName,
                currentItem.teamTwoName,
                currentItem.teamOne,
                currentItem.teamTwo,
                currentItem.teamOneShots,
                currentItem.teamTwoShots,
                currentItem.images
              );
        navigation.navigate("ScreenThree", {id} );
            }} text="Back" />

        </View>
    </View>

  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    subContainer:{
        backgroundColor: "transparent",
        height: '90%',
    },
    buttons:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        
    }

})

export default ViewImageScreen
