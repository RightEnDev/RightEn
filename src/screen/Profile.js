import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
const Profile = ({ navigation }) => {
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
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.upper_circle}>
        <View style={styles.inner_circle}>
        </View>
      </View>

      <View style={styles.upper_box}>
        <View style={styles.row}>
          <SvgXml
            xml={`<svg width="30px" height="30px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>profile_round [#1342]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -2159.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598" id="profile_round-[#1342]"> </path> </g> </g> </g> </g></svg>`}
          />
          <Text style={styles.profileText}>Name</Text>
        </View>
        <View style={styles.row}>
          <SvgXml xml={`<svg viewBox="0 0 48 48" width=30 height=30 xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>user-id</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="icons_Q2" data-name="icons Q2"> <g> <path d="M38,6H29.9V4a2,2,0,0,0-2-2h-8a2,2,0,0,0-2,2V6H10A2,2,0,0,0,8,8V44a2,2,0,0,0,2,2H38a2,2,0,0,0,2-2V8A2,2,0,0,0,38,6ZM36,42H12V39.2a24.1,24.1,0,0,1,24,0Zm0-7.3a28,28,0,0,0-24,0V10H22V6h4v4H36Z"></path> <path d="M16,22a8,8,0,1,0,8-8A8,8,0,0,0,16,22Zm12,0a4,4,0,1,1-4-4A4,4,0,0,1,28,22Z"></path> </g> </g> </g> </g></svg>`} />
          <Text style={styles.profileText}>UserID</Text>
        </View>
        <View style={styles.row}>
          <SvgXml
            xml={`<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 18H13M9.2 21H14.8C15.9201 21 16.4802 21 16.908 20.782C17.2843 20.5903 17.5903 20.2843 17.782 19.908C18 19.4802 18 18.9201 18 17.8V6.2C18 5.0799 18 4.51984 17.782 4.09202C17.5903 3.71569 17.2843 3.40973 16.908 3.21799C16.4802 3 15.9201 3 14.8 3H9.2C8.0799 3 7.51984 3 7.09202 3.21799C6.71569 3.40973 6.40973 3.71569 6.21799 4.09202C6 4.51984 6 5.07989 6 6.2V17.8C6 18.9201 6 19.4802 6.21799 19.908C6.40973 20.2843 6.71569 20.5903 7.09202 20.782C7.51984 21 8.07989 21 9.2 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`}
          />
          <Text style={styles.profileText}>phone</Text>
        </View>
        <View style={styles.row}>
          <SvgXml
            xml={`<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 9.00005L10.2 13.65C11.2667 14.45 12.7333 14.45 13.8 13.65L20 9" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 9.17681C3 8.45047 3.39378 7.78123 4.02871 7.42849L11.0287 3.5396C11.6328 3.20402 12.3672 3.20402 12.9713 3.5396L19.9713 7.42849C20.6062 7.78123 21 8.45047 21 9.17681V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V9.17681Z" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> </g></svg>`} />
          <Text style={styles.profileText}>email</Text>
        </View>
        <View style={styles.row}>
          <SvgXml
            xml={`<svg fill="#000000" width="30px" height="30px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Layer_2" data-name="Layer 2"> <g id="Layer_1-2" data-name="Layer 1"> <path d="M8,8A4,4,0,1,0,4,4,4,4,0,0,0,8,8ZM8,1A3,3,0,1,1,5,4,3,3,0,0,1,8,1Zm4,7a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,7a3,3,0,1,1,2.27-4.94.54.54,0,0,0-.12.09L11.5,12.79l-.65-.64a.49.49,0,0,0-.7.7l1,1a.48.48,0,0,0,.7,0l2.94-2.93A3,3,0,0,1,15,12,3,3,0,0,1,12,15Zm-4,.5a.5.5,0,0,1-.5.5h-6A1.5,1.5,0,0,1,0,14.5,4.51,4.51,0,0,1,4.5,10h2a.5.5,0,0,1,0,1h-2A3.5,3.5,0,0,0,1,14.5a.5.5,0,0,0,.5.5h6A.5.5,0,0,1,8,15.5Z"></path> </g> </g> </g></svg>`} />
          <Text style={styles.profileText}>iskyc</Text>
        </View>
      </View>

      <View style={styles.upper_box}>
        <View style={styles.row}>
          <SvgXml
            xml={`<svg width="30px" height="30px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#000000" fill-rule="evenodd" d="M11.2 1.65a2 2 0 00-2.4 0L1.885 6.836a2.017 2.017 0 00-.783 1.907c.145.99.398 2.92.398 4.257 0 1.11-.175 2.638-.32 3.702C1.019 17.899 1.94 19 3.178 19h13.646c1.236 0 2.16-1.1 1.997-2.298-.145-1.064-.32-2.592-.32-3.702 0-1.337.253-3.268.398-4.257a2.017 2.017 0 00-.783-1.907L11.2 1.65zM3.085 8.436L10 3.25l6.915 5.186.001.001.002.003a.025.025 0 010 .013C16.776 9.435 16.5 11.5 16.5 13c0 1.258.193 2.903.338 3.97v.013a.035.035 0 01-.014.017H14v-5a4 4 0 00-8 0v5H3.176c-.001 0-.004-.002-.006-.005a.035.035 0 01-.007-.012.026.026 0 010-.012c.144-1.068.337-2.713.337-3.971 0-1.5-.275-3.565-.419-4.547l.001-.013.003-.004zM8 17h4v-5a2 2 0 10-4 0v5z"></path> </g></svg>`} />
          <Text style={styles.profileText}>village</Text>
        </View>
        <View style={styles.row}>
          <SvgXml
            xml={`<svg width="30px" height="30px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#000000" fill-rule="evenodd" d="M11.2 1.65a2 2 0 00-2.4 0L1.885 6.836a2.017 2.017 0 00-.783 1.907c.145.99.398 2.92.398 4.257 0 1.11-.175 2.638-.32 3.702C1.019 17.899 1.94 19 3.178 19h13.646c1.236 0 2.16-1.1 1.997-2.298-.145-1.064-.32-2.592-.32-3.702 0-1.337.253-3.268.398-4.257a2.017 2.017 0 00-.783-1.907L11.2 1.65zM3.085 8.436L10 3.25l6.915 5.186.001.001.002.003a.025.025 0 010 .013C16.776 9.435 16.5 11.5 16.5 13c0 1.258.193 2.903.338 3.97v.013a.035.035 0 01-.014.017H14v-5a4 4 0 00-8 0v5H3.176c-.001 0-.004-.002-.006-.005a.035.035 0 01-.007-.012.026.026 0 010-.012c.144-1.068.337-2.713.337-3.971 0-1.5-.275-3.565-.419-4.547l.001-.013.003-.004zM8 17h4v-5a2 2 0 10-4 0v5z"></path> </g></svg>`} />
          <Text style={styles.profileText}>post</Text>
        </View>
        <View style={styles.row}>
          <SvgXml
            xml={`<svg width="30px" height="30px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C8.44772 18 8 18.4477 8 19V42H6V19C6 17.3431 7.34315 16 9 16H21C22.6569 16 24 17.3431 24 19V42H22V19C22 18.4477 21.5523 18 21 18H9Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M39 20H32V18H39C40.6569 18 42 19.3431 42 21V42H40V21C40 20.4477 39.5523 20 39 20Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M18 6C17.4477 6 17 6.44772 17 7V17H15V7C15 5.34315 16.3431 4 18 4H30C31.6569 4 33 5.34315 33 7V42H31V7C31 6.44772 30.5523 6 30 6H18Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M44 44H4V42H44V44Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M20 8C19.4477 8 19 8.44772 19 9V11C19 11.5523 19.4477 12 20 12H22C22.5523 12 23 11.5523 23 11V9C23 8.44772 22.5523 8 22 8H20Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M11 20C10.4477 20 10 20.4477 10 21V23C10 23.5523 10.4477 24 11 24H13C13.5523 24 14 23.5523 14 23V21C14 20.4477 13.5523 20 13 20H11Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M17 20C16.4477 20 16 20.4477 16 21V23C16 23.5523 16.4477 24 17 24H19C19.5523 24 20 23.5523 20 23V21C20 20.4477 19.5523 20 19 20H17Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M20 14C19.4477 14 19 14.4477 19 15V17C19 17.5523 19.4477 18 20 18H22C22.5523 18 23 17.5523 23 17V15C23 14.4477 22.5523 14 22 14H20Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M11 26C10.4477 26 10 26.4477 10 27V29C10 29.5523 10.4477 30 11 30H13C13.5523 30 14 29.5523 14 29V27C14 26.4477 13.5523 26 13 26H11Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M11 32C10.4477 32 10 32.4477 10 33V35C10 35.5523 10.4477 36 11 36H13C13.5523 36 14 35.5523 14 35V33C14 32.4477 13.5523 32 13 32H11Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M17 26C16.4477 26 16 26.4477 16 27V29C16 29.5523 16.4477 30 17 30H19C19.5523 30 20 29.5523 20 29V27C20 26.4477 19.5523 26 19 26H17Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M17 32C16.4477 32 16 32.4477 16 33V35C16 35.5523 16.4477 36 17 36H19C19.5523 36 20 35.5523 20 35V33C20 32.4477 19.5523 32 19 32H17Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M26 8C25.4477 8 25 8.44772 25 9V11C25 11.5523 25.4477 12 26 12H28C28.5523 12 29 11.5523 29 11V9C29 8.44772 28.5523 8 28 8H26Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M26 14C25.4477 14 25 14.4477 25 15V17C25 17.5523 25.4477 18 26 18H28C28.5523 18 29 17.5523 29 17V15C29 14.4477 28.5523 14 28 14H26Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M26 20C25.4477 20 25 20.4477 25 21V23C25 23.5523 25.4477 24 26 24H28C28.5523 24 29 23.5523 29 23V21C29 20.4477 28.5523 20 28 20H26Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M26 26C25.4477 26 25 26.4477 25 27V29C25 29.5523 25.4477 30 26 30H28C28.5523 30 29 29.5523 29 29V27C29 26.4477 28.5523 26 28 26H26Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M35 22C34.4477 22 34 22.4477 34 23V25C34 25.5523 34.4477 26 35 26H37C37.5523 26 38 25.5523 38 25V23C38 22.4477 37.5523 22 37 22H35Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M35 28C34.4477 28 34 28.4477 34 29V31C34 31.5523 34.4477 32 35 32H37C37.5523 32 38 31.5523 38 31V29C38 28.4477 37.5523 28 37 28H35Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M35 34C34.4477 34 34 34.4477 34 35V37C34 37.5523 34.4477 38 35 38H37C37.5523 38 38 37.5523 38 37V35C38 34.4477 37.5523 34 37 34H35Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M26 32C25.4477 32 25 32.4477 25 33V35C25 35.5523 25.4477 36 26 36H28C28.5523 36 29 35.5523 29 35V33C29 32.4477 28.5523 32 28 32H26Z" fill="#000000"></path> </g></svg>`}
          />
          <Text style={styles.profileText}>block</Text>
        </View>
        <View style={styles.row}>
          <SvgXml
            xml={`<svg width="30px" height="30px" viewBox="0 0 1024 1024" fill="#000000" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M512 1012.8c-253.6 0-511.2-54.4-511.2-158.4 0-92.8 198.4-131.2 283.2-143.2h3.2c12 0 22.4 8.8 24 20.8 0.8 6.4-0.8 12.8-4.8 17.6-4 4.8-9.6 8.8-16 9.6-176.8 25.6-242.4 72-242.4 96 0 44.8 180.8 110.4 463.2 110.4s463.2-65.6 463.2-110.4c0-24-66.4-70.4-244.8-96-6.4-0.8-12-4-16-9.6-4-4.8-5.6-11.2-4.8-17.6 1.6-12 12-20.8 24-20.8h3.2c85.6 12 285.6 50.4 285.6 143.2 0.8 103.2-256 158.4-509.6 158.4z m-16.8-169.6c-12-11.2-288.8-272.8-288.8-529.6 0-168 136.8-304.8 304.8-304.8S816 145.6 816 313.6c0 249.6-276.8 517.6-288.8 528.8l-16 16-16-15.2zM512 56.8c-141.6 0-256.8 115.2-256.8 256.8 0 200.8 196 416 256.8 477.6 61.6-63.2 257.6-282.4 257.6-477.6C768.8 172.8 653.6 56.8 512 56.8z m0 392.8c-80 0-144.8-64.8-144.8-144.8S432 160 512 160c80 0 144.8 64.8 144.8 144.8 0 80-64.8 144.8-144.8 144.8zM512 208c-53.6 0-96.8 43.2-96.8 96.8S458.4 401.6 512 401.6c53.6 0 96.8-43.2 96.8-96.8S564.8 208 512 208z" fill=""></path></g></svg>`} />
          <Text style={styles.profileText}>city</Text>
        </View>
        <View style={styles.row}>
          <SvgXml
            xml={`<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 19H21M12 12V19M18 12V19M6 12V19M12.4472 3.22361L20.59 7.29502C21.4395 7.71974 21.1372 9 20.1875 9H3.81246C2.86276 9 2.56053 7.71974 3.40997 7.29502L11.5528 3.22361C11.8343 3.08284 12.1657 3.08284 12.4472 3.22361Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`} />
          <Text style={styles.profileText}>state</Text>
        </View>
        <View style={styles.row}>
          <SvgXml
            xml={`<svg fill="#000000" width="30px" height="30px" viewBox="0 0 100.00 100.00" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="10"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M49,18.92A23.74,23.74,0,0,0,25.27,42.77c0,16.48,17,31.59,22.23,35.59a2.45,2.45,0,0,0,3.12,0c5.24-4.12,22.1-19.11,22.1-35.59A23.74,23.74,0,0,0,49,18.92Zm0,33.71a10,10,0,1,1,10-10A10,10,0,0,1,49,52.63Z"></path></g></svg>`}
          />
          <Text style={styles.profileText}>pin</Text>
        </View>
      </View>

      <TouchableOpacity>
        <View style={{
          backgroundColor: '#fff', width: '50%', marginLeft: 20,
          marginTop: 10,flex:1,flexDirection:'row',borderWidth:2,
          borderRadius:10,paddingLeft:10
        }}>
          <SvgXml 
          xml={`<svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 12H22M22 12L18.6667 8M22 12L18.6667 16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 7V5.1736C14 4.00352 12.9999 3.08334 11.8339 3.18051L3.83391 3.84717C2.79732 3.93356 2 4.80009 2 5.84027V18.1597C2 19.1999 2.79733 20.0664 3.83391 20.1528L11.8339 20.8195C12.9999 20.9167 14 19.9965 14 18.8264V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`}
         />
          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            fontFamily: 'BAHUS93',
            color:'#000'
          }}>Log Out</Text>
        </View>
      </TouchableOpacity>

    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexGrow: 1,

    backgroundColor: '#fff',
    // padding: 16,
  },
  upper_circle: {
    backgroundColor: '#d9d9d9',
    height: "25%",
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10
  },
  inner_circle: {
    backgroundColor: 'gray',
    height: '100%',
    width: undefined,
    aspectRatio: 1,
    // width: '42%',
    borderWidth: 4,
    borderColor: '#FFCB0A',
    borderTopLeftRadius: 500,
    borderTopRightRadius: 500,
    borderBottomLeftRadius: 500,
    borderBottomRightRadius: 500,

  },
  upper_box: {
    marginTop: 10,
    borderWidth: 2,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
    paddingVertical: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', // Ensure items are vertically centered
    marginLeft: 10,
    marginRight: 20,
    paddingVertical: 2

  },
  profileText: {
    color: 'black',
    marginLeft: 16, // Add some space between the icon and text
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'BAHUS93'
  },
  lower_box: {
    // Your styles for the lower box
  },
})