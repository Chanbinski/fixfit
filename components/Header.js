import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Header as HeaderRNE, HeaderProps } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export function Header() {
    let [fontsLoaded] = useFonts({
        'SFPro': require('../assets/fonts/SF-Pro-Display-Bold.otf'),
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      }

  return (
    <SafeAreaProvider>
    <HeaderRNE
      leftComponent={{
        text: 'Fixfit', style: styles.heading
      }}
      
      rightComponent={
          <View style="styles.headerRight">
            <Ionicons name="reorder-three-outline" size={40} />
          </View>
      }

      backgroundColor="#f7ecde"
    />
  </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: '#000000',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'SFPro',
    marginLeft : 16,
    marginTop : 5,
    display: 'flex',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
  },
});
