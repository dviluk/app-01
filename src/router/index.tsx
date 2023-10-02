import React, {useEffect, useState} from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  DarkTheme,
  Theme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {adaptNavigationTheme, useTheme} from 'react-native-paper';

import {DemoScreen, HomeScreen} from '@app/screens';

const Stack = createNativeStackNavigator();

export default function AppRouter() {
  const paperTheme = useTheme();
  const [theme, setTheme] = useState<Theme>(DefaultTheme);

  useEffect(() => {
    const {DarkTheme: darkTheme, LightTheme: lightTheme} = adaptNavigationTheme(
      {
        reactNavigationDark: DarkTheme,
        reactNavigationLight: DefaultTheme,
        materialDark: paperTheme,
        materialLight: paperTheme,
      },
    );

    setTheme(paperTheme.dark ? darkTheme : lightTheme);
  }, [paperTheme]);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen name="Demo" component={DemoScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
