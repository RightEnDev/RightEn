import { StyleSheet, Text, View, ActivityIndicator,FlatList,Dimensions ,Image} from 'react-native'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const { width } = Dimensions.get('window');
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

const DetailsScreen = ({ route ,navigation}) => {
  const isFocused = useIsFocused();

  const { service_code,app_icon } = route.params;
  console.log(service_code);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useFocusEffect(
    React.useCallback(() => {
      // Reset the state when the screen is unfocused
      return () => {
        setData([]);
        setLoading(true);
        setError(null);
        console.log("data reset done ---------------------------------- ");
        // fetchData();

      };
    }, [])
  );

  const fetchData = async () => {
    try {
      setLoading(true);

      setData([]);
      const response = await axios.get(`https://righten.in/api/users/services/sub_service?service_code=${service_code}`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
      console.log(response.data);
      if (!response.data.status === "success") {
        throw new Error('Network response was not ok');
      }
      setData(response.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // console.log("trying");
    fetchData();
  }, [isFocused]);

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
    // console.log(item.charges);
    return(
    <View >
      <View style={styles.CardContainer}>
          <View style={styles.image_container}>

            <Image
            source={{ uri: `https://righten.in/public/admin/assets/img/service_icon/${data[0].app_banner}` }}
            style={styles.panCardImage}
              resizeMode='cover'
            />
          </View>
          <View style={styles.service_option_text_view}>
            <Text style={styles.service_option_text}>{item.name}</Text>

          </View>
          <View style={styles.service_option_price_view}>

            <Text style={styles.service_option_price}>₹{item.charges}</Text>
          </View>

        </View>
      
    </View>)
  }

  return (
    <View  style={styles.container}>
      {/* <Text style={{ color: 'black' }}>DetailsScreen</Text> */}
      <View style={{
        marginLeft: 14,
        marginRight: 14,
      }}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `https://righten.in/public/admin/assets/img/service_icon/${app_icon}` }}
            style={styles.image}
            resizeMode='cover'
          />
        </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        ListEmptyComponent={<Text>No data available</Text>}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.service_row}
      />
      </View>

    </View>
  )
}

export default DetailsScreen;


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor:'red'
  },
  imageContainer: {
    marginTop: 15,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.5,
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 15,
  },
  image_container: {
    width: (width / 3) - 28,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,

  },
  CardContainer: {
    marginLeft:5,
    marginRight:5,
    marginTop:10,
    alignItems: 'center',
  },
  panCardImage: {
    width: 'auto',
    height: undefined,
    aspectRatio: 1,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'black'

  },
  service_row: {
    width: "100%",
    justifyContent: 'center',
    alignItems: "center",
    flex: 1,

  },
  service_option_text_view: {
    width: (width / 3) - 28,
    borderTopWidth: 2,
    borderTopColor: '#009743',
    height: 35,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black'
  },
  service_option_text: {
    textAlign: 'center',
    fontFamily: 'BAUHS93',
    // fontSize: 20,
    fontWeight: 'bold',
    color:'black'
  },
  service_option_price: {
    textAlign: 'center',
    fontFamily: 'BAUHS93',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  service_option_price_view: {
    width: (width / 3) - 28,
    borderTopWidth: 2,
    borderColor: '#000000',
    height: 45,
    borderWidth: 3,
    borderColor: '#009743',
    backgroundColor: '#FFCB0A',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent:'center',
    alignItems:'center'
  }
});
