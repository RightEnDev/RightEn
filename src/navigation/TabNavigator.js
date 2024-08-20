import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Example1 from '../screen/Example1';
import Example2 from '../screen/Example2';

import { TouchableOpacity, View, Text } from 'react-native';
import { Image } from 'react-native';
import HomeScreen from '../screen/HomeScreen';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  function MyTabBar({ state, descriptors, navigation }) {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#CFF7FF' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          const icon = route.name === 'main'
            ? require('../../assets/images/SERVICEICON/gst.png')
            : route.name === 'Example1_1'
              ? require('../../assets/images/SERVICEICON/passport.png')
              : require('../../assets/images/SERVICEICON/gst.png');


          const label_text_value = route.name === 'main'
            ? "Home"
            : route.name === 'Example1_1'
              ? "settings"
              : "notification";
          // Apply different styles for the "home" tab
          if (route.name === 'main') {
            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}
                key={index}
              >
                <View style={{ alignItems: 'center', width: '100%', marginTop: 5 }}>
                  <View style={{
                    alignItems: 'center', justifyContent: 'center', width: '100%', position: 'static',

                  }}>
                    <View style={{
                      borderWidth: 2,
                      borderRadius: 50,
                      borderColor: '#FFCB0A'
                    }}>
                      <Image
                        source={icon}
                        style={{
                          width: route.name === 'main' ? 60 : 40,
                          height: route.name === 'main' ? 60 : 40,
                          // borderRadius: 30
                        }}
                      />
                    </View>
                  </View>
                  <Text style={{ color: '#000' }} >
                    {label_text_value}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  flex: 1, justifyContent: 'center', alignItems: "center",
                }}
                key={index}
              >
                <View style={{
                  alignItems: 'center', justifyContent: 'center', width: '100%',
                }}>
                  <Image
                    source={icon}
                    style={{
                      width: route.name === 'Example1_1' ? 40 : 40,
                      height: route.name === 'main' ? 40 : 40,
                    }}
                  />
                  <Text style={{ color: '#000' }}>
                    {label_text_value}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }


        })}
      </View>
    );
  }
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />} initialRouteName="main">
      <Tab.Screen name="Example1_1" component={Example1}
        options={{
          headerStyle: { backgroundColor: '#CFF7FF' }, // Customize header color for this tab
          headerTintColor: '#fff', // Customize header text color
          headerTitleStyle: { color: 'black', fontSize: 20 },
          headerLeft: () => (
            <Image
              source={require('../../assets/images/RightEnStr.jpg')}
              style={{ width: 150, height: 30, marginRight: 10, marginLeft: 50 }}
            />
          ),
        }}
      />

      <Tab.Screen name="Example1_2" component={Example1}
        options={{
          headerStyle: { backgroundColor: '#CFF7FF' }, // Customize header color for this tab
          headerTintColor: '#fff', // Customize header text color
          headerTitleStyle: { color: 'black', fontSize: 20 },
          headerLeft: () => (
            <Image
              source={require('../../assets/images/RightEnStr.jpg')}
              style={{ width: 150, height: 30, marginRight: 10, marginLeft: 50 }}
            />
          ),
        }}
      />
      <Tab.Screen name="main" component={HomeScreen}
        options={{
          headerStyle: { backgroundColor: '#CFF7FF' }, // Customize header color for this tab
          headerTintColor: '#fff', // Customize header text color
          headerTitle: '',
          headerTitleStyle: { color: 'black', fontSize: 20 },
          headerLeft: () => (
            <Image
              source={require('../../assets/images/RightEnStr.jpg')}
              style={{ width: 150, height: 30, marginRight: 'auto', marginLeft: 10 }}
            />
          ),
        }}
      />
      <Tab.Screen name="Example2_1" component={Example2}
        options={{
          headerStyle: { backgroundColor: '#CFF7FF' }, // Customize header color for this tab
          headerTintColor: '#fff', // Customize header text color
          headerTitleStyle: { color: 'black', fontSize: 20 },
          headerLeft: () => (
            <Image
              source={require('../../assets/images/RightEnStr.jpg')}
              style={{ width: 150, height: 30, marginRight: 'auto', marginLeft: 'auto' }}
            />
          ),
        }}
      />

      <Tab.Screen name="Example2_2" component={Example2}
        options={{
          headerStyle: { backgroundColor: '#CFF7FF' }, // Customize header color for this tab
          headerTintColor: '#fff',
          headerTitleStyle: { color: 'black', fontSize: 20 },
          headerLeft: () => (
            <Image
              source={require('../../assets/images/RightEnStr.jpg')}
              style={{ width: 150, height: 30, marginRight: 10, marginLeft: 50 }}
            />
          ),
        }}

      />
    </Tab.Navigator>
  );
}
export default TabNavigator;