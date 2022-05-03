import axios from "axios";
import React, { useEffect, useState } from "react";
import { Avatar, List as Listing, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import {View} from 'react-native'
import Button from "../../components/Button";




const List = ({navigation,route})=>{
    const token = useSelector((state) => state.token)
    const [final,setFinal] = useState([]);
    const [isLoaded,setLoaded] = useState(false);

    useEffect(()=>{
        axios.post('/final',{data:route.params.liked},{
            headers:{
                token:token
            }
        })
        .then(res=>{
            // let arr1d = [].concat(...res.data.result);
            setFinal(res.data.result);
            setLoaded(true);
        })
        .catch(
            e=>console.log(e));
    },[])

    return(
        isLoaded?
        <View>
        <View>
        {
            final.categories.map((item,i)=>(
            <Listing.Item
            key={item.category_id}
            title={item.category_name}
            left={()=><Avatar.Image size={35} source={{uri:`http://46.101.204.245:9000${item.category_img}`}} />}
            />
        ))
        }

        </View>
        <View>
        {
            final.subcategories.map((item,i)=>(
            <Listing.Item
            key={item.category_id}
            title={item.category_name}
            left={()=><Avatar.Image size={35} source={{uri:`http://46.101.204.245:9000${item.category_img}`}} />}
            />
            ))
        }
        </View>
        <Button onPress={()=>navigation.reset({index: 0,routes: [{ name: 'Category' }],})}>Retry</Button>
        </View>:
        <Text>Nothing to show</Text>
    )
}

export default List;