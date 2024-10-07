import { StyleSheet, Text, TouchableOpacity, View, Platform, ActivityIndicator, FlatList, ScrollView, Button, Alert, PermissionsAndroid, Linking } from 'react-native'
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
import { WebView } from 'react-native-webview';
import RNFS from 'react-native-fs';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const History = ({ navigation }) => {
  const isFocused = useIsFocused();


  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [showDoc, setShowDoc] = useState(false);
  const [selectitem, setselectitem] = useState([])
  // const [research, serSearch] = useState();
  const [searchdata, setsearchdata] = useState([])

  const getSearchData = async () => {
    if (selectitem && selectitem.action) {
      setsearchdata([])
      console.log(selectitem.action);
      const response = await axios.get(selectitem.action);


      // const response = await axios.get('https://righten.in/api/services/view_all_data?service_id=2&row_id=MTYzNA==');
      console.log(response.data.data);
      setsearchdata(response.data.data)
    }
    // console.log(selectitem.action);

  }

  useEffect(() => {
    getSearchData();
  }, [selectitem])

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const downloadFile = (url) => {
    const extension = url.split('.').pop(); // Extract the file extension from the URL
    const filePath =
      Platform.OS === 'android'
        ? RNFS.DownloadDirectoryPath + `/righten${Date.now()}.${extension}`
        : RNFS.DocumentDirectoryPath + `/righten${Date.now()}.${extension}`;

    console.log('File path:', filePath);

    RNFS.downloadFile({
      fromUrl: url,
      toFile: filePath,
      background: true, // Enable downloading in the background (iOS only)
      discretionary: true, // Allow the OS to control the timing and speed (iOS only)
      progress: (res) => {
        const progress = (res.bytesWritten / res.contentLength) * 100;
        console.log(`Progress: ${progress.toFixed(2)}%`);
      },
    })
      .promise.then((response) => {
        console.log(response.statusCode);
        console.log('File downloaded!', response);
      })
      .catch((err) => {
        console.log('Download error:', err);
      });
  };




  const fetchData = async () => {
    try {
      setLoading(true);

      setData([]);
      const us_id = await AsyncStorage.getItem('us_id');
      // console.log(startDate.toISOString().split('T')[0]);
      // console.log(endDate.toISOString().split('T')[0]);
      const response = await axios.post('https://righten.in/api/services/report',
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

  const fetchOptionData = async () => {
    try {
      setLoading(true);

      try {
        const response = await axios.get(`https://righten.in/api/users/services/level`);
        // console.log(response.data);
        if (!response.data.status === "success") {
          throw new Error('Network response was not ok');
        }
        const updatedData = response.data.data.map(item => {
          return {
            ...item,
            label: item.level,
          };
        });
        const newElement = {
          value: "",
          label: "All servicce",
          status: "1"
        };
        updatedData.unshift(newElement);

        setItems(updatedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
      // console.log(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // console.log("trying");
    setShowDoc(false);
    fetchData();
    fetchOptionData();
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
        setShowDoc(false);
        setsearchdata([]);
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
  if (showDoc) {
    // console.log(selectitem);
    // console.log(response.data.status);
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ backgroundColor: 'white', paddingHorizontal: 14 }} >


          <View style={{ alignItems: 'center', borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Retailer Details</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 5 }}>
            <View style={{ width: 100 }}>
              <Text style={{ fontSize: 16, color: 'black' }}>Name </Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ fontSize: 16, color: 'black' }}>:{'  '}{searchdata.user_name}</Text>
            </View>
          </View>


          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 5 }}>
            <View style={{ width: 100 }}>
              <Text style={{ fontSize: 16, color: 'black' }}>User </Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ fontSize: 16, color: 'black' }}>:{'  '}{searchdata.user_id}</Text>
            </View>
          </View>



          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 5 }}>
            <View style={{ width: 100 }}>
              <Text style={{ fontSize: 16, color: 'black' }}>Mobile </Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ fontSize: 16, color: 'black' }}>:{'  '}{searchdata.user_mobile}</Text>
            </View>
          </View>


          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 5 }}>
            <View style={{ width: 100 }}>
              <Text style={{ fontSize: 16, color: 'black' }}>Village </Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ fontSize: 16, color: 'black' }}>:{'  '}{searchdata.vill}</Text>
            </View>
          </View>



          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 5 }}>
            <View style={{ width: 100 }}>
              <Text style={{ fontSize: 16, color: 'black' }}>Block </Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ fontSize: 16, color: 'black' }}>:{'  '}{searchdata.block}</Text>
            </View>
          </View>


          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 5 }}>
            <View style={{ width: 100 }}>
              <Text style={{ fontSize: 16, color: 'black' }}>District </Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ fontSize: 16, color: 'black' }}>:{'  '}{searchdata.city}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 5 }}>
            <View style={{ width: 100 }}>
              <Text style={{ fontSize: 16, color: 'black' }}>State </Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ fontSize: 16, color: 'black' }}>:{'  '}{searchdata.state}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 5 }}>
            <View style={{ width: 100 }}>
              <Text style={{ fontSize: 16, color: 'black' }}>Pin </Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ fontSize: 16, color: 'black' }}>:{'  '}{searchdata.pin}</Text>
            </View>
          </View>





          <View style={{ alignItems: 'center', borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Customer Details</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 5 }}>
            <View style={{ width: 100 }}>
              <Text style={{ fontSize: 16, color: 'black' }}>Name </Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ fontSize: 16, color: 'black' }}>:{'  '}{searchdata.name}</Text>
            </View>
          </View>






          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 5 }}>
            <View style={{ width: 100 }}>
              <Text style={{ fontSize: 16, color: 'black' }}>Mobile </Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ fontSize: 16, color: 'black' }}>:{'  '}{searchdata.mobile}</Text>
            </View>
          </View>


          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 5 }}>
            <View style={{ width: 100 }}>
              <Text style={{ fontSize: 16, color: 'black' }}>TXN </Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ fontSize: 16, color: 'black' }}>:{'  '}{searchdata.txn_id}</Text>
            </View>
          </View>



          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 5 }}>
            <View style={{ width: 100 }}>
              <Text style={{ fontSize: 16, color: 'black' }}>UTR </Text>
            </View>
            <View style={{ flex: 1, }}>
              <Text style={{ fontSize: 16, color: 'black' }}>:{'  '}{searchdata.utr_no}</Text>
            </View>
          </View>


          <View style={{ alignItems: 'center', borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Documents</Text>
          </View>

          {/* {searchdata.retail_img.length()} */}
          <View>
            {searchdata?.retail_img ? (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                {Object.values(searchdata.retail_img).map((item, index) => (
                  <View
                    key={index}
                    style={{
                      width: '30%', // Each item takes up 30% of the width
                      marginBottom: 10, // Margin between rows
                    }}
                  >
                    {item.file_path ? (
                      // {/* {searchdata.retail_img_path} */}
                      //   {/* {item.file_path} */}
                      <TouchableOpacity onPress={() => {
                        console.log(searchdata.retail_img_path + item.file_path);
                        downloadFile(searchdata.retail_img_path + item.file_path)
                      }}>

                        <Text style={{
                          fontSize: 20, color: 'white', borderWidth: 1, fontWeight: 'bold', borderColor: "#009743",
                          borderRadius: 5, paddingHorizontal: 10, backgroundColor: "#009743", paddingVertical: 5,
                          textAlign: 'center', marginTop: 15
                        }}>Download</Text>
                      </TouchableOpacity>

                    ) : null}
                  </View>
                ))}
              </View>
            ) : (
              null
            )}
          </View>
          {searchdata.coupon_no ?
            <View>

              <View style={{ alignItems: 'center', borderBottomWidth: 1 }}>
                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Tracking</Text>
              </View>
              <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', textAlign: 'center',padding:15 }}>Coupon No : {' '}
                <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', backgroundColor: 'yellow' }}>{searchdata.coupon_no}</Text>

              </Text>

            </View>
            : null}



          <View style={{ alignItems: 'center', borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Admin Documents</Text>
          </View>

          <View>
            {searchdata?.admin_img ? (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                {Object.values(searchdata.admin_img).map((item, index) => (
                  <View
                    key={index}
                    style={{
                      width: '30%', // Each item takes up 30% of the width
                      marginBottom: 10, // Margin between rows
                    }}
                  >
                    {item.file_path ? (
                      // {/* {searchdata.retail_img_path} */}
                      //   {/* {item.file_path} */}
                      <TouchableOpacity onPress={() => {
                        console.log(searchdata.admin_img_path + item.file_path);
                        downloadFile(searchdata.admin_img_path + item.file_path)
                      }}>

                        <Text style={{
                          fontSize: 20, color: 'white', borderWidth: 1, fontWeight: 'bold', borderColor: "#009743",
                          borderRadius: 5, paddingHorizontal: 10, backgroundColor: "#009743", paddingVertical: 5,
                          textAlign: 'center', marginTop: 15
                        }}>Download</Text>
                      </TouchableOpacity>

                    ) : null}
                  </View>
                ))}
              </View>
            ) : (
              null
            )}
          </View>










        </View>
      </ScrollView>
    )
  }
  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={{
          flexDirection: 'row',
          padding: 10,
          borderBottomWidth: 1
        }}>
          <Text style={{ fontSize: 18, color: 'black', textAlign: 'left', width: 100, borderRightWidth: 1 }}>{item.id}

          </Text>
          <View style={{ borderRightWidth: 1 }}>
            <TouchableOpacity onPress={() => {
              // console.log("clicked");
              // console.log(item);
              setselectitem(item);
              setShowDoc(true)
            }}>
              <Text style={{
                fontSize: 18, color: 'black', textAlign: 'center', width: 100, marginLeft: 10, marginRight: 10,
                backgroundColor: '#22cc62',
                color: 'white', fontWeight: 'bold',

              }}>Show</Text>


            </TouchableOpacity>

          </View>


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
          <View style={{ borderRightWidth: 1 }}>
            <Text style={{
              fontSize: 18, color: 'black', textAlign: 'center', width: 100, marginLeft: 10, marginRight: 10

            }}>Action</Text>
          </View>
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

        <View style={{
          flexDirection: 'column',
          paddingBottom: 10,
          marginTop: 30, width: 1600
        }}>
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