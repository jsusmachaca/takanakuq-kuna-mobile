import { View, Image, Text, FlatList, Dimensions, ActivityIndicator, RefreshControl, Alert, TouchableOpacity, Modal, TextInput, Platform } from "react-native"
import { Path, Svg } from "react-native-svg"
import { styles } from "../styles/details"


export const EditUserDetails = ({ userDetails, image, defaultProfile, description, setDescription, profileHandler, setModalVisible, pickImage }) => {
  return (
    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, .5)', }}>
    <View
      style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'rgb(255, 255, 255)',
        width: '93%',
        height: 650
      }}
    >
      <View style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 30 }}>
        <TouchableOpacity onPress={setModalVisible}>
          <Svg viewBox='0 0 512 512' width='40' height='40'>
            <Path 
              d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z'
              fill='#F44E19'
            />
          </Svg>
        </TouchableOpacity>
      </View>

      <View style={styles.formulario}>
        <View style={styles.profileImageContainer}>
          <View style={styles.iconAdd}>
          <TouchableOpacity onPress={() => pickImage()}>
            <View style={styles.touchIcon}>
              <View style={styles.iconLinesH}></View>
              <View style={styles.iconLinesV}></View>
            </View>
          </TouchableOpacity>
          </View>
            <View style={styles.imageContainer}>
              {
                image ?
                  <></>
                :
                <Text style={styles.textImage}>Cambiar foto de perfil</Text>
              }        
              <Image 
                source={
                  image 
                  ?
                  { 
                    uri: image
                  }
                  : 
                  
                  userDetails.profile_image ? 
                  {
                    uri: userDetails.profile_image 
                  }
                  :
                  defaultProfile
                } 
                style={styles.profileImage} 
              />
                {
                  image ?
                    <></>
                  :
                    <View style={styles.coverBg}></View>
                }
            </View>
        </View>
        <TextInput 
          placeholder='Ingrese una breve descripción acerca de usted.'
          style={styles.profileInput}
          value={description}
          multiline={true}
          onChangeText={(data) => setDescription(data)}
        />
        <TouchableOpacity style={styles.loginButton}
          onPress={() => profileHandler()}
        >
          <Text style={styles.buttonText}>Listo</Text>
        </TouchableOpacity>             
      </View>
    </View>
  </View>
  )
}