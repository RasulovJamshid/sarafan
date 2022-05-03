import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {View,Text,Image} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import TinderCard, { propTypes } from 'react-tinder-card'

const Container =(props)=>(
    <View style={{display: 'flex',alignItems: 'center',justifyContent:'center',width:'100%'}}>
    {props.children}
    </View>
)

const Header = (props)=>(
    <Text style={{color: 'black',fontSize: 30,marginBottom: 30,textAlign:'center'}}>
        {props.children}
    </Text>
)


const CardContainer =(props)=>(
    <View style={{width: "90%",maxWidth:260,height:300}}>
    {props.children}
    </View>
)


const Card =(props)=>(
    <View style={{position: 'absolute',backgroundColor: '#fff',width:"100%",maxWidth:260,height:300,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 20,
        borderRadius: 20,
        resizeMode: 'cover'}}>
    {props.children}
    </View>
)

const CardImage =(props)=>(
    
    <Image source={{uri:`http://46.101.204.245:9000${props.source}`}} style={{
        width:"100%",
        height: "100%",
        overflow: 'hidden',
        borderRadius: 20}}/>
    )



const CardTitle = (props)=>(
    <Text style={{
        position: 'absolute',
        backgroundColor:"yellow",
        padding:5,
        borderRadius:5,
        bottom: 0,
        margin: 10,
        color: 'fff',textAlign:'center'}}>
        {props.children}
    </Text>
)

// const InfoText = styled.Text`
//     height: 28px;
//     justify-content: center;
//     display: flex;
//     z-index: -100;
// `


function Category({ navigation }){
  const [lastDirection, setLastDirection] = useState()
  const [likedArray,setLikedArray] = useState(5)
  const token = useSelector((state) => state.token)
  const [categories,setCategories] = useState([{"category_id": 2, "category_img": "/food.jpg", "category_name": "food", "liked": false}, {"category_id": 3, "category_img": "/clothes.jpg", "category_name": "clothes", "liked": false}, {"category_id": 4, "category_img": "/technology.jpg", "category_name": "technology", "liked": false}, {"category_id": 5, "category_img": "/books.jpg", "category_name": "books", "liked": false}]);
  const [isLoaded,setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    axios.get('/categories',{
        headers:{
            token:token
        }
    })
    .then(res=>{
        console.log(res.data);
        setCategories(res.data.result);
        setLoaded(true);
        console.log(categories)
        console.log(isLoaded);
    })
    .catch(
        e=>console.log(e));
  },[]);

  
  const swiped = (direction, nameToDelete) => {
    let temp={};

    if(direction=="right"){
     temp = categories.find((elem,index,array)=>(
         elem.category_id==nameToDelete
      ));
      setLikedArray(1)
      console.log('temp',temp);
      dispatch({type:"SET_LIKES",payload:temp})

    //   console.log('array',[...likedArray,temp]);
    }  
  }

  const outOfFrame = (index) => {
    if(index===0){
        console.log("liked",likedArray);
        navigation.navigate(
                'SubCategory',
                {liked:likedArray}
            )
    }
}

  return (isLoaded&&
    <Container>
      <Header>Please choose some category</Header>
      <CardContainer>
        {categories.map((category,index) =>
          <TinderCard onSwipe={(dir) => swiped(dir, category.category_id)} onCardLeftScreen={() => outOfFrame(index)} preventSwipe={['up','down']} key={category.category_id}>
            <Card>
              <CardImage source={category.category_img}/>
              <CardTitle>{category.category_name}</CardTitle>
            </Card>
          </TinderCard>
        )}
      </CardContainer>

    </Container>
  )
}

export default Category
