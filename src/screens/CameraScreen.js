import {React, useState, useContext, useEffect} from 'react'
import {Pressable, StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import {Camera} from 'expo-camera';
import ItemContext from '../contexts/ItemContext';
import Button from "../components/Button";

const CameraScreen = ({navigation, route}) => {
    const {state, updateScreen} = useContext(ItemContext);

    const { id } = route.params
    const currentItem = state.find((item) => item.id === id);

    // console.log(currentItem);

    const [hasPermission, setHasPermission] = useState(null);
    const [images, setImages] = useState(currentItem?.images);
    const [picture, setPicture] = useState();
    const getPermission = async () => {
        const {status} = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    useEffect(() => {
        getPermission();
    }, []);


    let camera;
    const getPicture = async () => {
        if (camera) {
            const photo = await camera.takePictureAsync();
            setPicture(photo);
            setImages((prev) => {
                return [...prev, photo.uri];
            })
            // console.log(photo.uri);
         }
    }

    const viewPicture = () => {
        if (!picture)
        {
        return(
        <Camera style={styles.subContainer} ref={(ref) => {camera = ref}}>
        </Camera>    
        )
        }
        else
        {
            return(
                <Image style={styles.subContainer} source={{uri: picture.uri}}/>
            )
        }
    }
    

    console.log(images);

  return (
    <View style={styles.container}>
        
        {viewPicture()}

        <View style={styles.buttons}>

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
                images
              );
        navigation.navigate("ScreenThree", {id} );
            }} text="Back" />
        <Button onPress={() => {getPicture()}} text="Take" />
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
                images
              );
        navigation.navigate("ScreenThree", {id} );
            }} text="Done" />

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
    buttonStyle: {
        alignItems: "center",
        borderWidth: 5,
        height: 50,
        width: 100
    },
    imageStyle:{
        flex: 1,
        alignSelf: "stretch"
    },
    buttons:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        
    }
});

export default CameraScreen