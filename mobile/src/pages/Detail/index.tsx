import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Text, SafeAreaView, Linking} from 'react-native'
import { Feather as Icon, FontAwesome} from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import api from '../../services/api'
import * as MailComposer from 'expo-mail-composer'

interface Params {
  id:number
}
interface Point {
  name: string, 
  address: string,
  number: string,
  zipcode: string,
  city: string,
  uf: string,
  whatsapp: string, 
  email:string,
  longitude: number, 
  latitude:number,
  image: string,
  items: {title:string}[],
}

const Detail = ()=>{
  const navigator = useNavigation()
  const route = useRoute()
  const routeParams = route.params as Params;

  const [point, setPoint] = useState<Point>({} as Point)

  useEffect(() => {
    api.get(`/points/${routeParams.id}`)
      .then(response=>{
        setPoint(response.data)
      })
  }, [])

  function handleWhattsapp(){
    Linking.openURL(`whatsapp://send?phone=+${point.whatsapp}&text=Tenho interesse sobre a coleta`)
  }

  function handleMailComposer(){

    MailComposer.composeAsync({
      subject: 'Solicitação de Coleta',
      recipients: [point.email]
    })
  }

  function handlePreviousScreen(){
    navigator.goBack()
  }

  if(!point){
    return null
  }

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePreviousScreen}>
        <Icon name="arrow-left" size={20} color="#34cb79"/>
      </TouchableOpacity>
      
      
      <Image 
        style={styles.pointImage}
        source={{uri:point.image}} 
      />
      <Text style={styles.pointName}>{point?.name}</Text>
      <Text style={styles.pointItems}>{point.items && point.items.map(item=>item.title).join(', ')}</Text>

      <View style={styles.address}>
        <Text style={styles.addressTitle}>Endereço</Text>
        <Text style={styles.addressContent}>{`${point?.address}, ${point?.number} - ${point?.city} / ${point?.uf}  - CEP ${point?.zipcode}`}</Text>
      </View>
    </View>
    <View style={styles.footer}>
      <RectButton style={styles.button} onPress={handleWhattsapp}>
        <FontAwesome name="whatsapp" size={20} color="#FFF"/>
        <Text style={styles.buttonText}>Whatsapp</Text>
      </RectButton>
      <RectButton style={styles.button} onPress={handleMailComposer}>
        <Icon name="mail" size={20} color="#FFF"/>
        <Text style={styles.buttonText}>Email</Text>
      </RectButton>
    </View>
    </SafeAreaView>
  )
}


export default Detail


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20,
  },

  pointImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  pointItems: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  address: {
    marginTop: 32,
  },
  
  addressTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  
  button: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Roboto_500Medium',
  },
});