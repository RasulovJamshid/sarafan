import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';

const styles = StyleSheet.create({
    card: {
      flex: 1,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: "#E8E8E8",
      justifyContent: "center",
      backgroundColor: "white"
    },
    text: {
        position: 'absolute',
        backgroundColor:"yellow",
        padding:5,
        borderRadius:5,
        bottom: 0,
        margin: 10,
        color: 'black',
        textAlign:'center'},
    image:{
        width:"100%",
        height: "100%",
        resizeMode:'contain',
        overflow: 'hidden',
        borderRadius: 20
    }
  });

const Card=(props)=>{
    return(
        <View style={styles.card}>
                <Image style={styles.image} source={{uri:`http://46.101.204.245:9000${props.category_img}`}}/>
                <Text style={styles.text}>{props.category_name}</Text>
        </View>
    )
}



export default Card;