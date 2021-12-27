import React from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'

import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing'

export default function App() {
  let [selectedImage, setSelectedImage] = React.useState(null)

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync()

    if (permissionResult.granted === false) {
      alert('Permissão negada')
      return
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync()
    if (pickerResult.cancelled === true) {
      return
    }
    setSelectedImage({ localUri: pickerResult.uri })
  }

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert('Compartilhamento indisponivel')
      return
    }
    await Sharing.shareAsync(setSelectedImage.localUri)
  }

  if (selectedImage !== null) {
    return (
      <View View style={styles.container}>
        <Image source={{ uri: setSelectedImage.localUri }} />
        <TouchableOpacity onPress={openShareDialogAsync}>
          <Text>Compartilhe essa Imagem</Text>
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://www.sindssedf.org.br/wp-content/uploads/2015/04/sem-imagem-800.gif'
          }}
          style={styles.imagem}
        />
        <Text style={styles.instrucoes}>
          Para compartilhar uma imagem, pressione o botão abaixo
        </Text>
        <TouchableOpacity onPress={openImagePickerAsync}>
          <Text style={styles.button}>Escolher imagem</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imagem: {
    width: 300,
    height: 300,
    resizeMode: 'contain'
  },
  instrucoes: {
    color: '#888',
    fontSize: 18
  },
  button: {
    fontSize: 20,
    borderRadius: 8,
    color: '#FFF'
  }
})
