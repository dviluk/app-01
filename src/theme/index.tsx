import React, {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {
  PaperProvider,
  MD3LightTheme as LightTheme,
  MD3DarkTheme as DarkTheme,
} from 'react-native-paper';

import themes from './theme.json';

const defaultTheme = {
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
  },
};

type AppThemeProps = {
  children: React.ReactNode;
};
export default function AppTheme(props: AppThemeProps) {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const _colorScheme = colorScheme || 'light';
    if (_colorScheme === 'dark') {
      const darkTheme = {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          ...themes[_colorScheme],
        },
      };

      setTheme(darkTheme);
    } else {
      const lightTheme = {
        ...LightTheme,
        colors: {
          ...LightTheme.colors,
          ...themes[_colorScheme],
        },
      };

      setTheme(lightTheme);
    }
  }, [colorScheme]);

  return <PaperProvider theme={theme}>{props.children}</PaperProvider>;
}
