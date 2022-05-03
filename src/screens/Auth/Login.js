import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, View,ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import * as Keychain from "react-native-keychain";
import Header from '../../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import { theme } from '../../core/theme'
import { nameValidator } from '../../helpers/nameValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import axios from 'axios'
import { useDispatch } from 'react-redux';

export default function Login({ navigation }) {
    const dispatch = useDispatch();
  const [username, setUsername] = useState({ value: 'user1234', error: '' })
  const [password, setPassword] = useState({ value: 'password1234', error: '' })

//   useEffect(() => {
//     (async () => {
//       try {
//         const credentials = await Keychain.getGenericPassword();
//         if (credentials) {
//           dispatch({type:"SET_TOKEN",payload:credentials});
//           navigation.reset({
//             index: 0,
//             routes: [{ name: 'Category' }],
//           })
//         } else {
//           console.log("No credentials stored");
//         }
//       } catch (error) {
//         console.log("Keychain couldn't be accessed!", error);
//       }
//     })();
//   }, []);

  const onLoginPressed = () => {
    const usernameError = nameValidator(username.value)
    const passwordError = passwordValidator(password.value)

    if (usernameError || passwordError) {
      setUsername({ ...username, error: usernameError })
      setPassword({ ...password, error: passwordError })
      return
    }else{
          axios.post("/auth/login",{
                login:username.value,
                password:password.value
            })
            .then(res=>{
                console.log(res.data);
                Keychain.setGenericPassword(username.value, res.data.result);
                dispatch({type:"SET_TOKEN",payload:res.data.result});
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Category' }],
                })
            })
            .catch(e=>console.log(e));

    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' ,padding:5}}>
      <Header>Swipper</Header>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: '' })}
        error={!!username.error}
        errorText={username.error}
        />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
