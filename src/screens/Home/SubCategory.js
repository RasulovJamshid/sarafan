import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {View,Text,Image,StyleSheet,Loa} from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button'
import Card from '../../components/Card'
import Header from '../../components/Header'


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});

const Category = ({navigation,route}) => {
    const [likedArray,setLikedArray] = useState([])
    const token = useSelector((state) => state.token)
    const [subCategories,setSubCategories] = useState([]);
    const [isLoaded,setLoaded] = useState(false);
  
    useEffect(()=>{
      axios.post('/subcategories',{data:route.params.liked},{
          headers:{
              token:token
          }
      })
      .then(res=>{
          let arr1d = [].concat(...res.data.result);
          setSubCategories(arr1d);
          console.log(res.data.result)
          setLoaded(true);
      })
      .catch(
          e=>console.log(e));
    },[]);
  
    
    const swiped = (direction,cardIndex) => {
      
        let temp = subCategories[cardIndex];
        if(direction==="right"){
          temp.liked = true;
          setLikedArray([...likedArray,temp])
        }else{
          temp.liked = false;
          setLikedArray([...likedArray,temp])  
        }
    }
  
    const outOfFrame = (index) => {
      if(subCategories.length>0){
          navigation.reset({
            index: 0,
            routes: [{ name: 'List',params:{liked:likedArray} }],
          })
      }
  }
  return (
    <View style={styles.container}>
     {isLoaded&&
        
        <View>
        <Swiper
            disableBottomSwipe
            disableTopSwipe
            onSwipedLeft={(cardIndex)=>swiped('left',cardIndex)}
            onSwipedRight={(cardIndex)=>swiped('right',cardIndex)}
            cards={subCategories}
            renderCard={(card) => {
                        return (
                            <Card key={card.category_id} {...card}/>
                            )
                        }}
            onSwipedAll={outOfFrame}
            cardIndex={0}
            stackSize= {subCategories.length}>
        </Swiper>
        </View>
    }
    </View>
  )
}

export default Category
