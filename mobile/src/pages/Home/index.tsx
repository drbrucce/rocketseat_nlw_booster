import React, {useState, useEffect} from 'react'
import { StyleSheet, ImageBackground, View, Image, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import RNPickerSelect from 'react-native-picker-select';


interface IBGEUFs {
  sigla: string,
  nome: string
}

interface SelectValues {
  label:string,
  value:string 
}
interface IBGECities {
  nome: string
}


const Home = ()=>{
  const navigator = useNavigation()
  const [ufs, setUfs] = useState<SelectValues[]>([])
  const [cities, setCities] = useState<SelectValues[]>([])
  const [selectedUF, setSelectedUF] = useState<string>('0')
  const [selectedCity, setSelectedCity] = useState<string>('0')

  function handleNavigateToPoints(){
    navigator.navigate('Points',{selectedUF, selectedCity})
  }

  useEffect(()=>{
      axios.get<IBGEUFs[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
          .then(response=>{
              const ufsInitials = response.data.map(uf => {
                return {label: `(${uf.sigla}) - ${uf.nome}`, value: uf.sigla}
              }).sort((a, b)=> a.label > b.label ? 1 : -1)

              setUfs(ufsInitials)
          })
  }, [])

  useEffect(()=>{
      axios.get<IBGECities[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
      .then(response=>{
          const cities = response.data.sort().map(city =>  {
            return {label:city.nome, value:city.nome} 
          })

          setCities(cities)
      })

  }, [selectedUF])

  return (
    <ImageBackground 
      source={require('../../assets/home-background.png')} 
      style={styles.container}
      imageStyle={{width:274, height:368}}
    > 
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')}/>
        <Text style={styles.title}>Seu marketplace para coleta de resíduos.</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
      </View>
      <View style={styles.footer}>
        <RNPickerSelect
            placeholder={{
              label: 'Selecione a UF',
              value: null,
            }}
            style={selectStyles}

            onValueChange={(value) => setSelectedUF(value)}
            items={ufs}
            />
      <RNPickerSelect
            placeholder={{
              label:"Selecione a Cidade",
              value:null
            }}
            style={selectStyles}
            onValueChange={(value) => setSelectedCity(value)}
            items={cities}
        />

        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon} >
            <Icon name="arrow-right" color="#FFF" size={24}/>
          </View>
          <Text style={styles.buttonText}>
            Entrar Agora
          </Text>
        </RectButton>
        
      </View>
    </ImageBackground>
  )
}

export default Home
const selectStyles = StyleSheet.create({
  inputIOS: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,

  },
  inputAndroid: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor:'#f0f0f5'
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});