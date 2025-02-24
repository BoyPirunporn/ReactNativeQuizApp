// import React from 'react';

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './home/HomeScreen';

// import useStoreAuth from '@/stores/useStoreAuth';
// import { type NativeStackScreenProps } from '@react-navigation/native-stack';
// import { useEffect } from 'react';
// import { Text, TouchableOpacity, View } from 'react-native';
// import { useTheme } from 'react-native-paper';
// import Login from './auth/LoginScreen';
// import Register from './auth/RegisterScreen';
// import BoardScreen from './board/BoardScreen';
// import ResultScreen from './result/ResultScreen';

// import useStoreDialog from '@/stores/useStoreDialog';
// import useStoreLoading from '@/stores/useStoreLoading';
// import IonicIcons from 'react-native-vector-icons/Ionicons';
// import QuestionScreen from './questions/QuizV2/QuestionScreen';
// import UseFirebaseHook from '@/hooks/useFirebaseHook';
// export type RootStackProps = {
//     Home: undefined,
//     Question: undefined;
//     Board: undefined;
//     Result: undefined;
//     Login: undefined;
//     Register: undefined;
// };

// export type PropsNavieStack = NativeStackScreenProps<RootStackProps>;
// const Stack = createStackNavigator();

// const delay = (duration: number) => new Promise(resolve => setTimeout(resolve, duration));
// const AppNavigator = () => {
//     const theme = useTheme();
//     const {listenToAuthChanges, signOut} = UseFirebaseHook();
//     const { user,   } = useStoreAuth();
//     const loading = useStoreLoading();
//     const dialog = useStoreDialog();
//     useEffect(() => {
//         listenToAuthChanges();
//     }, []);

//     const handleLogout = async () => {
//         try {
//             dialog.onDismiss();
//             loading.setLoading(true);
//             await signOut();
//             loading.setLoading(false);
//         } catch (error) {
//             console.error('Logout error:', error);
//         }
//     };


//     const headerRight = () => (
//         <TouchableOpacity onPress={async () => {
//             dialog.onOpen({
//                 title: "LogOut",
//                 children: () => (
//                     <View style={{
//                         flexDirection: "column",
//                         gap: 20
//                     }}>
//                         <Text>Are you sure you want to log out?</Text>
//                         <View style={{
//                             justifyContent: "flex-end",
//                             flexDirection: "row",
//                         }}>
//                             <TouchableOpacity
//                                 style={{
//                                     height: 45,
//                                     width: 80,
//                                     backgroundColor: theme.colors.error,
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     borderRadius: 10,

//                                 }}
//                                 onPress={handleLogout}>
//                                 <Text style={{ color: "#fff" }}>Ok</Text>
//                             </TouchableOpacity>

//                         </View>
//                     </View>
//                 )
//             });
//         }} style={{ marginRight: 10 }}>
//             <IonicIcons name="log-out-outline" size={30} style={{
//                 color: "white"
//             }} />
//         </TouchableOpacity>
//     );

//     return (
//         <NavigationContainer>
//             <Stack.Navigator initialRouteName="Home" >
//                 {/* Get Started เป็นหน้าแรก */}
//                 <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />

//                 <Stack.Group
//                     screenOptions={
//                         {
//                             title: "",
//                             headerLeft: () => null,
//                             animationEnabled: false,
//                             gestureEnabled: true,
//                             headerBackTitleVisible: false,
//                             headerTintColor: theme.colors.primary, // Back button color
//                             headerTitleStyle: {
//                                 color: "#fff",
//                                 backgroundColor: theme.colors.inversePrimary
//                             },
//                             headerStyle: { backgroundColor: theme.colors.inversePrimary },
//                         }
//                     }
//                 >
//                     {user ? (
//                         <Stack.Group >
//                             <Stack.Screen name='Question' component={QuestionScreen} options={{
//                                 title: 'Questions',
//                             }} />
//                             <Stack.Screen name='Board' component={BoardScreen} options={{
//                                 title: 'Scoreboard',
//                                 headerRight,
//                             }} />
//                             <Stack.Screen name='Result' component={ResultScreen} options={{
//                                 title: 'Finish',
//                             }} />
//                         </Stack.Group>
//                     ) : (
//                         <Stack.Group>
//                             <Stack.Screen name="Login" component={Login} />
//                             <Stack.Screen name="Register" component={Register} />
//                         </Stack.Group>
//                     )}

//                 </Stack.Group>

//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// };



// export default AppNavigator;