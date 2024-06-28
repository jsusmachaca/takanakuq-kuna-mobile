import React, { useState, useEffect } from 'react';
import { Button, View, Platform, FlatList, Text, Alert, TextInput, StyleSheet, Touchable, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { scheduleNotification } from './components/notifications';
import { registerBackgroundTask } from './components/backgroundTask';

registerBackgroundTask();

export function Recipes() {
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showHours, setShowHours] = useState(false);
  
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [expirationHour, setExpirationHour] = useState(new Date());
  const [showExpirationDate, setShowExpirationDate] = useState(false);
  const [showExpirationHours, setShowExpirationHours] = useState(false);
  
  const [medicineName, setMedicineName] = useState('');
  const [amount, setAmount] = useState('');
  const [interval, setInterval] = useState('');

  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    loadAlarms();
  }, []);

  const loadAlarms = async () => {
    try {
      const storedAlarms = await AsyncStorage.getItem('@alarms');
      if (storedAlarms) {
        const parsedAlarms = JSON.parse(storedAlarms).map(alarm => ({
          ...alarm,
          date: new Date(alarm.date),
        }));
        setAlarms(parsedAlarms);
      }
    } catch (error) {
      console.error('Error loading alarms from AsyncStorage:', error);
    }
  };

  const saveAlarms = async (newAlarms) => {
    try {
      await AsyncStorage.setItem('@alarms', JSON.stringify(newAlarms));
      setAlarms(newAlarms);
    } catch (error) {
      console.error('Error saving alarms to AsyncStorage:', error);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    console.log(currentDate);
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setDate(new Date())
    setShowDate(true);
  };

  const onChangeHours = (event, selectedHour) => {
    const currentDate = selectedHour || hour;
    setShowHours(Platform.OS === 'ios');
    console.log(currentDate)
    setHour(currentDate);
  };

  const showHoursPicker = () => {
    setHour(new Date())
    setShowHours(true);
  };

//asdasddsadsadasdasdassda

const onChangeDateExpiration = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  setShowExpirationDate(Platform.OS === 'ios');
  console.log(currentDate);
  setExpirationDate(currentDate);
};

const showDateExpirationPicker = () => {
  setExpirationDate(new Date())
  setShowExpirationDate(true);
};

const onChangeHoursExpiration = (event, selectedHour) => {
  const currentDate = selectedHour || hour;
  setShowExpirationHours(Platform.OS === 'ios');
  console.log(currentDate);
  setExpirationHour(currentDate);
};

const showHoursExpirationPicker = () => {
  setExpirationHour(new Date())
  setShowExpirationHours(true);
};

  const setAlarm = async () => {
    if( medicineName.trim() === "" || interval.trim() === "" || amount.trim() === ""){
      Alert.alert("Ingresa todos los campos")
      return
    }

    const currentDate = new Date();

    var fechaInicio = date
    
    fechaInicio.setHours(hour.getHours());
    fechaInicio.setMinutes(hour.getMinutes());
    fechaInicio.setSeconds(0);
    
    const timeDifference = fechaInicio - currentDate;
    
    var expiracion = expirationDate
    
    expiracion.setHours(expirationHour.getHours())
    expiracion.setMinutes(expirationHour.getMinutes());
    expiracion.setSeconds(0);
    
    console.log(`Estas son las fechas ${currentDate} \n Fecha de inicio ${fechaInicio} \n Fecha de expiracion ${expiracion}`)

    if (timeDifference >= 0  && expiracion > fechaInicio && new Date() !== fechaInicio)  {
      
      setTimeout(async () => {
      const notificationId = await scheduleNotification(medicineName, parseInt(amount), parseInt(interval));
      const newAlarm = { id: Date.now(), date: new Date(date), notificationId, medicineName, amount, interval, expiracion};
      const updatedAlarms = [...alarms, newAlarm];
      saveAlarms(updatedAlarms);
      
      setMedicineName("");
      setAmount("");
      setInterval("");
      

      const cancelNotification = async () => {
        try {
          // Esperar hasta la fecha de expiración para cancelar la notificación
          await new Promise(resolve => setTimeout(resolve, expiracion - fechaInicio));
          await Notifications.cancelScheduledNotificationAsync(notificationId);
          console.log('Notificación cancelada automáticamente');
        } catch (error) {
          console.error('Error cancelling notification:', error);
          console.log('Error al cancelar la notificación automáticamente');
        }
      };

      // Iniciar la función de cancelación automática
      cancelNotification();
      
      Alert.alert('Alarma configurada');

     }, timeDifference);        
    } else {
      Alert.alert('Las fechas tienen que ser proximas y no pueden ser iguales ');
    }
  };

  const removeAlarm = async (id, notificationId) => {
    try{
      const updatedAlarms = alarms.filter(alarm => alarm.id !== id);
      saveAlarms(updatedAlarms);
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      Alert.alert('Alarma eliminada');
    }catch(err){
      console.log(err)
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>Medicina: {item.medicineName}</Text>
        <Text style={styles.itemText}>Cantidad: {item.amount}</Text>
        <Text style={styles.itemText}>Intervalo: {item.interval} segundos</Text>
        <Text style={styles.itemText}>Fecha y hora: {item.date.toLocaleString()}</Text>
      </View>
      <Button title="Eliminar Alarma" onPress={() => removeAlarm(item.id, item.notificationId)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 35, fontWeight: '700'}}>Receta medica</Text>
      <Text style={styles.subtitulos}>Crear un recordatorio</Text>
      <View style={styles.inputContainer}>
        <Text>Nombre de medicamento</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del medicamento"
          value={medicineName}
          onChangeText={text => setMedicineName(text)}
        />
        <Text>Cantidad de medicamento</Text>
        <TextInput
          style={styles.input}
          placeholder="Cantidad"
          keyboardType="numeric"
          value={amount}
          onChangeText={text => setAmount(text)}
        />
        <Text>Intervalo de tiempo</Text>
        <TextInput
          style={styles.input}
          placeholder="Intervalo (segundos)"
          keyboardType="numeric"
          value={interval}
          onChangeText={text => setInterval(text)}
        />
      <Text>Inicio y Fin de las Alarmas </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
          <Image source={require('./assets/calendar.png')} />
          <Text>Fecha de inicio</Text>
        </TouchableOpacity>
        {showDate && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
        <TouchableOpacity onPress={showHoursPicker} style={styles.dateButton}>
          <Image source={require('./assets/time-check.png')}/>
          <Text>Hora de inicio</Text>
        </TouchableOpacity>
        {showHours && (
          <DateTimePicker
            value={hour}
            mode="time"
            is24Hour={false}
            display="spinner"
            onChange={onChangeHours}
          />
        )}

        <TouchableOpacity onPress={showDateExpirationPicker} style={styles.dateButton}>
          <Image source={require('./assets/calendar-x.png')}/>
          <Text>Fecha de fin</Text>
        </TouchableOpacity>
        {showExpirationDate && (
          <DateTimePicker
            value={expirationDate}
            mode="date"
            display="default"
            onChange={onChangeDateExpiration}
          />
        )}
        <TouchableOpacity onPress={showHoursExpirationPicker} style={styles.dateButton}>
          <Image source={require('./assets/clock-dont.png')}/>
          <Text>Hora de fin</Text>
        </TouchableOpacity>
        {showExpirationHours && (
          <DateTimePicker
            value={expirationHour}
            mode="time"
            is24Hour={false}
            display="spinner"
            onChange={onChangeHoursExpiration}
          />
        )}
      </View>
        <TouchableOpacity onPress={setAlarm} style={styles.confirmarButton}>
          <Text>Configurar Recordatorio</Text>
        </TouchableOpacity>
        {alarms.length !== 0 && <Text style={[{alignSelf: 'flex-start'}, styles.subtitulos]}>Historial de recordatorios</Text>}
      <FlatList
        style={styles.list}
        data={alarms}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingHorizontal: 25
  },

  textButton: {
    fontSize: 12
  },
  subtitulos:{
    fontSize: 20,
    marginVertical: 7,
    fontWeight : '500',
    alignSelf: 'flex-start'
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  dateButton: {
    alignItems: 'center',
    backgroundColor: '#ccd0d3',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    padding: 2
  },
  confirmarButton:{
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1, 
    borderColor: 'black'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  list: {
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    width: '100%',
    borderWidth: 1
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
});