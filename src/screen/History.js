import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import qs from 'qs';
import { useIsFocused } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';


const History = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: ' 1', value: 'option1' },
    { label: ' 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ]);

  // const [research, serSearch] = useState();


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);

      setData([]);
      const us_id = await AsyncStorage.getItem('us_id');
      // console.log(startDate.toISOString().split('T')[0]);
      // console.log(endDate.toISOString().split('T')[0]);
      const response = await axios.post('https://righten.in/api/services/report/upi',
        qs.stringify({
          user_id: us_id,
          service_id: value,
          from_date: startDate.toISOString().split('T')[0],
          to_date: endDate.toISOString().split('T')[0]

        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        }
      );
      // console.log(response.data);
      if (!response.data.status === "success") {
        throw new Error('Network response was not ok');
      }
      setData(response.data.data);
      // console.log(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // console.log("trying");
    fetchData();
  }, [isFocused, startDate, endDate, value]);

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(false);
    setStartDate(currentDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndPicker(false);
    console.log(currentDate);
    setEndDate(currentDate);
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('main'); // Navigate back to the main screen
        return true; // Prevent the default behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation])
  );


  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}
      >
        <Text>Error: {error}</Text>
      </View>
    );
  }
  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={{
          flexDirection: 'row',
          padding: 10,
          borderBottomWidth: 1
        }}>
          <Text style={{ fontSize: 18, color: 'black', textAlign: 'left', width: 100, borderRightWidth: 1 }}>{item.user_id}</Text>

          <Text style={{ fontSize: 18, color: 'black', textAlign: 'left', width: 200, marginLeft: 10, borderRightWidth: 1 }}>{item.service_name}</Text>
          <Text style={{ fontSize: 18, color: 'black', textAlign: 'left', width: 100, marginLeft: 10, borderRightWidth: 1 }}>{item.amount}</Text>

          <Text style={{
            fontSize: 18, color: 'black', textAlign: 'center', width: 100, marginLeft: 10,
            backgroundColor: item.status === 'Success' ? '#22cc62' : 'red',
            color: 'white', fontWeight: 'bold',

          }}>{item.status}</Text>

          <Text style={{ fontSize: 18, color: 'black', textAlign: 'left', width: 150, marginLeft: 10, borderLeftWidth: 1, borderRightWidth: 1, paddingLeft: 10 }}>{item.userMobile}</Text>
          <Text style={{ fontSize: 18, color: 'black', textAlign: 'left', width: 150, marginLeft: 10, borderRightWidth: 1 }}>{item.sub_service}</Text>
          <Text style={{ fontSize: 18, color: 'black', textAlign: 'left', width: 250, marginLeft: 10, borderRightWidth: 1 }}>{item.txn_id}</Text>
          <Text style={{ fontSize: 18, color: 'black', textAlign: 'left', width: 200, marginLeft: 10, borderRightWidth: 1 }}>{item.utr}</Text>
          <Text style={{ fontSize: 18, color: 'black', textAlign: 'left', width: 150, marginLeft: 10, borderRightWidth: 1 }}>{item.date}</Text>

        </View>

      </View>


    )
  }


  const HeaderItem = () => {
    return (
      <View>
        <View style={{
          flexDirection: 'row',
          padding: 10,
          borderBottomWidth: 1
        }}>
          <Text style={{ fontSize: 18, color: 'black', textAlign: 'left', width: 100, borderRightWidth: 1 }}>Id</Text>

          <Text style={{ fontSize: 18, color: 'black', textAlign: 'left', width: 200, marginLeft: 10, borderRightWidth: 1 }}>Service Name</Text>
          <Text style={{ fontSize: 18, color: 'black', textAlign: 'left', width: 100, marginLeft: 10, borderRightWidth: 1 }}>amount</Text>

          <Text style={{
            fontSize: 18, color: 'black', textAlign: 'center', width: 100, marginLeft: 10,

          }}>status</Text>

          <Text style={{ fontSize: 18, color: 'black', textAlign: 'left', width: 150, marginLeft: 10, borderLeftWidth: 1, borderRightWidth: 1, paddingLeft: 10 }}>Mobile</Text>
          <Text style={{ fontSize: 18, color: 'black', textAlign: 'left', width: 150, marginLeft: 10, borderRightWidth: 1 }}>Sub Service</Text>
          <Text style={{ fontSize: 18, color: 'black', textAlign: 'left', width: 250, marginLeft: 10, borderRightWidth: 1 }}>Transaction id</Text>
          <Text style={{ fontSize: 18, color: 'black', textAlign: 'left', width: 200, marginLeft: 10, borderRightWidth: 1 }}>payment no</Text>
          <Text style={{ fontSize: 18, color: 'black', textAlign: 'left', width: 150, marginLeft: 10, borderRightWidth: 1 }}>date</Text>

        </View>

      </View>


    )
  }


  return (
    <View style={styles.container}>
      <View style={styles.datePickersContainer}>
        {/* Start Date Picker */}
        <View style={styles.datePickerWrapper}>
          <TouchableOpacity onPress={() => setShowStartPicker(true)}>
            <View style={{
              flexDirection: 'row',
              borderWidth: 2,
              padding: 5,
              paddingVertical: 10,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 15,
              backgroundColor: '#FFCB0A',
              justifyContent: 'space-evenly',
              alignItems: 'center'
            }}>
              <Text style={styles.dateButton}>Start Date</Text>
              <SvgXml xml={`<svg fill="#000000" width="25px" height="25px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M960 95.888l-256.224.001V32.113c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76h-256v-63.76c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76H64c-35.344 0-64 28.656-64 64v800c0 35.343 28.656 64 64 64h896c35.344 0 64-28.657 64-64v-800c0-35.329-28.656-63.985-64-63.985zm0 863.985H64v-800h255.776v32.24c0 17.679 14.32 32 32 32s32-14.321 32-32v-32.224h256v32.24c0 17.68 14.32 32 32 32s32-14.32 32-32v-32.24H960v799.984zM736 511.888h64c17.664 0 32-14.336 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32zm0 255.984h64c17.664 0 32-14.32 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.696 14.336 32 32 32zm-192-128h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32zm0-255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32zm-256 0h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32zm0 255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32z"></path></g></svg>`} />


            </View>
          </TouchableOpacity>
          {showStartPicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="spinner"
              onChange={handleStartDateChange}
              maximumDate={new Date()}
            />
          )}
          <Text style={styles.dateText}>{startDate.toDateString()}</Text>
        </View>

        {/* End Date Picker */}
        <View style={styles.datePickerWrapper}>
          <TouchableOpacity onPress={() => setShowEndPicker(true)}>
            <View style={{
              flexDirection: 'row',
              borderWidth: 2,
              padding: 5,
              paddingVertical: 10,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 15,
              backgroundColor: '#FFCB0A',
              justifyContent: 'space-evenly',
              alignItems: 'center'
            }}>
              <Text style={styles.dateButton}>End Date</Text>
              <SvgXml xml={`<svg fill="#000000" width="25px" height="25px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M960 95.888l-256.224.001V32.113c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76h-256v-63.76c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76H64c-35.344 0-64 28.656-64 64v800c0 35.343 28.656 64 64 64h896c35.344 0 64-28.657 64-64v-800c0-35.329-28.656-63.985-64-63.985zm0 863.985H64v-800h255.776v32.24c0 17.679 14.32 32 32 32s32-14.321 32-32v-32.224h256v32.24c0 17.68 14.32 32 32 32s32-14.32 32-32v-32.24H960v799.984zM736 511.888h64c17.664 0 32-14.336 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32zm0 255.984h64c17.664 0 32-14.32 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.696 14.336 32 32 32zm-192-128h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32zm0-255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32zm-256 0h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32zm0 255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32z"></path></g></svg>`} />


            </View>
          </TouchableOpacity>
          {showEndPicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="spinner"
              onChange={handleEndDateChange}
              maximumDate={new Date()}

            />
          )}
          <Text style={styles.dateText}>{endDate.toDateString()}</Text>
        </View>
      </View>

      {/* Dropdown Picker */}
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          open={dropdownOpen}
          value={value}
          items={items}
          setOpen={setDropdownOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select a service category"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownList}
        />
        {/* {value && <Text style={styles.selectedText}>Selected: {value}</Text>} */}

      </View>
      {/* <TouchableOpacity onPress={() => console.log('press')}>
        <Text style={styles.search_button}>Search</Text>
      </TouchableOpacity> */}

      <ScrollView horizontal showsHorizontalScrollIndicator={true}>

        <View style={{ flexDirection: 'column',
        paddingBottom:10,
        marginTop: 30, width: 1500 }}>
          <HeaderItem />
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}

          // scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default History


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  datePickersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    // backgroundColor: 'black',
    paddingTop: 10,
    // paddingVertical: 20,
    marginBottom: 5,
  },
  datePickerWrapper: {
    // backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
  },
  dateButton: {
    color: 'black',
    // marginBottom: 10,
    paddingRight: 5,
    fontSize: 20,

  },
  dateText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },
  dropdownContainer: {
    justifyContent: 'center',
    width: '90%',
    // marginTop: 20,
    // marginHorizontal: ,
    flexDirection: 'row'
  },
  dropdown: {
    backgroundColor: '#fafafa',
  },
  dropdownList: {
    backgroundColor: '#fafafa',
    fontSize: 20
  },
  selectedText: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
  search_button: {
    borderWidth: 2,
    marginTop: 15,
    borderRadius: 15,
    backgroundColor: '#FFCB0A',
    paddingHorizontal: '15%',
    paddingVertical: '2%',
    fontSize: 26,
    fontWeight: 'bold'
  }
});