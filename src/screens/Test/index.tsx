/* eslint-disable */
import * as React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  Image,
} from 'react-native';
import {
  TextInput,
  HelperText,
  useTheme,
  MD2Colors,
  MD3Colors,
  List,
  Button,
} from 'react-native-paper';
import ScreenWrapper from './ScreenWrapper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MAX_LENGTH = 20;
type ReducerAction<T extends keyof State> = {
  payload: State[T];
  type: T;
};

type IconsColor = {
  flatLeftIcon: string | undefined;
  flatRightIcon: string | undefined;
  outlineLeftIcon: string | undefined;
  outlineRightIcon: string | undefined;
  customIcon: string | undefined;
};
export type State = {
  text: string;
  customIconText: string;
  name: string;
  outlinedText: string;
  largeText: string;
  flatTextPassword: string;
  outlinedLargeText: string;
  outlinedTextPassword: string;
  nameNoPadding: string;
  nameRequired: string;
  flatDenseText: string;
  flatDense: string;
  outlinedDenseText: string;
  outlinedDense: string;
  flatMultiline: string;
  flatTextArea: string;
  flatUnderlineColors: string;
  outlinedMultiline: string;
  outlinedTextArea: string;
  outlinedColors: string;
  outlinedLongLabel: string;
  maxLengthName: string;
  flatTextSecureEntry: boolean;
  outlineTextSecureEntry: boolean;
  iconsColor: IconsColor;
};

export function inputReducer<T extends keyof State>(
  state: State,
  action: ReducerAction<T>,
) {
  switch (action.type) {
    case action.type:
      state[action.type] = action.payload;
      return {...state};
    default:
      return {...state};
  }
}

const initialState: State = {
  text: '',
  customIconText: '',
  name: '',
  outlinedText: '',
  largeText: '',
  flatTextPassword: 'Password',
  outlinedLargeText: '',
  outlinedTextPassword: '',
  nameNoPadding: '',
  nameRequired: '',
  flatDenseText: '',
  flatDense: '',
  outlinedDenseText: '',
  outlinedDense: '',
  flatMultiline: '',
  flatTextArea: '',
  flatUnderlineColors: '',
  outlinedMultiline: '',
  outlinedTextArea: '',
  outlinedColors: '',
  outlinedLongLabel: '',
  maxLengthName: '',
  flatTextSecureEntry: true,
  outlineTextSecureEntry: true,
  iconsColor: {
    flatLeftIcon: undefined,
    flatRightIcon: undefined,
    outlineLeftIcon: undefined,
    outlineRightIcon: undefined,
    customIcon: undefined,
  },
};

type AvoidingViewProps = {
  children: React.ReactNode;
};

const TextInputAvoidingView = ({children}: AvoidingViewProps) => {
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior="padding"
      keyboardVerticalOffset={80}>
      {children}
    </KeyboardAvoidingView>
  ) : (
    <>{children}</>
  );
};

export const DemoScreen = () => {
  const [state, dispatch] = React.useReducer(inputReducer, initialState);
  const {
    text,
    customIconText,
    name,
    outlinedText,
    largeText,
    flatTextPassword,
    outlinedLargeText,
    outlinedTextPassword,
    nameNoPadding,
    nameRequired,
    flatDenseText,
    flatDense,
    outlinedDenseText,
    outlinedDense,
    flatMultiline,
    flatTextArea,
    flatUnderlineColors,
    outlinedMultiline,
    outlinedTextArea,
    outlinedColors,
    maxLengthName,
    flatTextSecureEntry,
    outlineTextSecureEntry,
    iconsColor: {
      flatLeftIcon,
      flatRightIcon,
      outlineLeftIcon,
      outlineRightIcon,
      customIcon,
    },
  } = state;

  const _isUsernameValid = (name: string) => /^[a-zA-Z]*$/.test(name);

  const theme = useTheme();

  const inputActionHandler = (type: keyof State, payload: string) =>
    dispatch({
      type: type,
      payload: payload,
    });

  const changeIconColor = (name: keyof State['iconsColor']) => {
    const color = state.iconsColor[name];

    const newColors = {
      ...state.iconsColor,
      [name]: !color
        ? theme.isV3
          ? theme.colors.primary
          : theme.colors.secondary
        : undefined,
    };

    dispatch({
      type: 'iconsColor',
      payload: newColors,
    });
  };

  const color = theme.isV3
    ? theme.colors.inversePrimary
    : theme.colors.secondary;

  return (
    <TextInputAvoidingView>
      <ScreenWrapper
        keyboardShouldPersistTaps={'always'}
        removeClippedSubviews={false}>
        <List.Section title="Flat inputs">
          <TextInput
            style={styles.inputContainerStyle}
            label="Flat input"
            placeholder="Type something"
            value={text}
            onChangeText={text => inputActionHandler('text', text)}
            left={
              <TextInput.Icon
                icon="magnify"
                color={flatLeftIcon}
                onPress={() => {
                  changeIconColor('flatLeftIcon');
                }}
              />
            }
            right={<TextInput.Affix text="/100" />}
          />
          <TextInput
            style={styles.inputContainerStyle}
            label="Flat input with custom icon"
            placeholder="Type something"
            value={customIconText}
            onChangeText={text => inputActionHandler('customIconText', text)}
            right={<TextInput.Affix text="/100" />}
            left={
              <TextInput.Icon
                icon={() => (
                  <Icon
                    name="home"
                    size={24}
                    color={customIcon}
                    onPress={() => {
                      changeIconColor('customIcon');
                    }}
                  />
                )}
              />
            }
          />
          <TextInput
            style={[styles.inputContainerStyle, styles.fontSize]}
            label="Flat input large font"
            placeholder="Type something"
            value={largeText}
            onChangeText={largeText =>
              inputActionHandler('largeText', largeText)
            }
            left={<TextInput.Affix text="#" />}
            right={
              <TextInput.Icon
                icon="magnify"
                color={flatRightIcon}
                onPress={() => {
                  changeIconColor('flatRightIcon');
                }}
              />
            }
          />
          <TextInput
            style={[styles.inputContainerStyle, styles.fontSize]}
            label="Flat input large font"
            placeholder="Type something"
            value={flatTextPassword}
            onChangeText={flatTextPassword =>
              inputActionHandler('flatTextPassword', flatTextPassword)
            }
            secureTextEntry={flatTextSecureEntry}
            right={
              <TextInput.Icon
                icon={flatTextSecureEntry ? 'eye' : 'eye-off'}
                onPress={() =>
                  dispatch({
                    type: 'flatTextSecureEntry',
                    payload: !flatTextSecureEntry,
                  })
                }
                forceTextInputFocus={false}
              />
            }
          />
        </List.Section>
        <List.Section title="Outline inputs">
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Outlined input"
            placeholder="Type something"
            value={outlinedText}
            onChangeText={outlinedText =>
              inputActionHandler('outlinedText', outlinedText)
            }
            left={
              <TextInput.Icon
                icon="magnify"
                color={outlineLeftIcon}
                onPress={() => {
                  changeIconColor('outlineLeftIcon');
                }}
              />
            }
            right={<TextInput.Affix text="/100" />}
          />
          <TextInput
            mode="outlined"
            style={[styles.inputContainerStyle, styles.fontSize]}
            label="Outlined large font"
            placeholder="Type something"
            value={outlinedLargeText}
            onChangeText={outlinedLargeText =>
              inputActionHandler('outlinedLargeText', outlinedLargeText)
            }
            left={<TextInput.Affix text="$" />}
            right={
              <TextInput.Icon
                icon="magnify"
                color={outlineRightIcon}
                onPress={() => {
                  changeIconColor('outlineRightIcon');
                }}
              />
            }
          />
          <TextInput
            mode="outlined"
            style={[styles.inputContainerStyle, styles.fontSize]}
            label="Outlined large font"
            placeholder="Type something"
            value={outlinedTextPassword}
            onChangeText={outlinedTextPassword =>
              inputActionHandler('outlinedTextPassword', outlinedTextPassword)
            }
            secureTextEntry={outlineTextSecureEntry}
            right={
              <TextInput.Icon
                icon={outlineTextSecureEntry ? 'eye' : 'eye-off'}
                onPress={() =>
                  dispatch({
                    type: 'outlineTextSecureEntry',
                    payload: !outlineTextSecureEntry,
                  })
                }
              />
            }
          />
        </List.Section>
        <List.Section title="Disabled inputs">
          <TextInput
            disabled
            style={styles.inputContainerStyle}
            label="Disabled flat input"
          />
          <TextInput
            disabled
            style={styles.inputContainerStyle}
            label="Disabled flat input with value"
            value="Disabled flat input value"
          />
          <TextInput
            mode="outlined"
            disabled
            style={styles.inputContainerStyle}
            label="Disabled outlined input"
          />
          <TextInput
            mode="outlined"
            disabled
            style={styles.inputContainerStyle}
            label="Disabled outlined input"
            value="Disabled outlined input with value"
          />
        </List.Section>
        <List.Section title="Dense inputs">
          <TextInput
            style={styles.inputContainerStyle}
            dense
            label="Dense flat input"
            placeholder="Type something"
            value={flatDenseText}
            onChangeText={flatDenseText =>
              inputActionHandler('flatDenseText', flatDenseText)
            }
            left={<TextInput.Affix text="#" />}
            right={
              <TextInput.Icon
                icon="chevron-up"
                color={focused => (focused ? theme.colors?.primary : undefined)}
              />
            }
          />
          <TextInput
            style={styles.inputContainerStyle}
            dense
            placeholder="Dense flat input without label"
            value={flatDense}
            onChangeText={flatDense =>
              inputActionHandler('flatDense', flatDense)
            }
          />
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            dense
            label="Dense outlined input"
            placeholder="Type something"
            value={outlinedDenseText}
            onChangeText={outlinedDenseText =>
              inputActionHandler('outlinedDenseText', outlinedDenseText)
            }
            left={<TextInput.Affix text="$" />}
          />
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            dense
            placeholder="Dense outlined input without label"
            value={outlinedDense}
            onChangeText={outlinedDense =>
              inputActionHandler('outlinedDense', outlinedDense)
            }
          />
        </List.Section>
        <List.Section title="Multiline inputs">
          <TextInput
            style={styles.inputContainerStyle}
            label="Flat input multiline"
            multiline
            placeholder="Type something"
            value={flatMultiline}
            onChangeText={flatMultiline =>
              inputActionHandler('flatMultiline', flatMultiline)
            }
          />
          <TextInput
            style={[styles.inputContainerStyle, styles.textArea]}
            label="Flat input text area"
            multiline
            placeholder="Type something"
            value={flatTextArea}
            onChangeText={flatTextArea =>
              inputActionHandler('flatTextArea', flatTextArea)
            }
          />
          <View style={styles.inputContainerStyle}>
            <TextInput
              mode="flat"
              label="Flat multiline text input with fixed height"
              multiline
              style={styles.fixedHeight}
            />
          </View>
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Outlined input multiline"
            multiline
            placeholder="Type something"
            value={outlinedMultiline}
            onChangeText={outlinedMultiline =>
              inputActionHandler('outlinedMultiline', outlinedMultiline)
            }
          />
          <TextInput
            mode="outlined"
            style={[styles.inputContainerStyle, styles.textArea]}
            label="Outlined input text area"
            multiline
            placeholder="Type something"
            value={outlinedTextArea}
            onChangeText={outlinedTextArea =>
              inputActionHandler('outlinedTextArea', outlinedTextArea)
            }
          />
          <View style={styles.inputContainerStyle}>
            <TextInput
              mode="outlined"
              label="Outlined multiline text input with fixed height"
              multiline
              style={styles.fixedHeight}
            />
          </View>
        </List.Section>
        <List.Section title="Inputs with helpers">
          <View style={styles.inputContainerStyle}>
            <TextInput
              label="Input with helper text"
              placeholder="Enter username, only letters"
              value={name}
              error={!_isUsernameValid(name)}
              onChangeText={name => inputActionHandler('name', name)}
            />
            <HelperText type="error" visible={!_isUsernameValid(name)}>
              Error: Only letters are allowed
            </HelperText>
          </View>
          <View style={styles.inputContainerStyle}>
            <TextInput
              label="Input with helper text and character counter"
              placeholder="Enter username, only letters"
              value={maxLengthName}
              error={!_isUsernameValid(maxLengthName)}
              onChangeText={maxLengthName =>
                inputActionHandler('maxLengthName', maxLengthName)
              }
              maxLength={MAX_LENGTH}
            />
            <View style={styles.helpersWrapper}>
              <HelperText
                type="error"
                visible={!_isUsernameValid(maxLengthName)}
                style={styles.helper}>
                Error: Numbers and special characters are not allowed
              </HelperText>
              <HelperText type="info" visible style={styles.counterHelper}>
                {maxLengthName.length} / {MAX_LENGTH}
              </HelperText>
            </View>
          </View>
          <View style={styles.inputContainerStyle}>
            <TextInput
              label={
                <Text>
                  <Text
                    style={{
                      color: theme.isV3 ? MD3Colors.error50 : MD2Colors.red500,
                    }}>
                    *
                  </Text>{' '}
                  Label as component
                </Text>
              }
              style={styles.noPaddingInput}
              placeholder="Enter username, required"
              value={nameRequired}
              error={!nameRequired}
              onChangeText={nameRequired =>
                inputActionHandler('nameRequired', nameRequired)
              }
            />
            <HelperText type="error" padding="none" visible={!nameRequired}>
              Error: Username is required
            </HelperText>
          </View>
        </List.Section>
        <List.Section title="Custom inputs">
          <TextInput
            style={styles.inputContainerStyle}
            label="Flat input with custom underline colors"
            placeholder="Type something"
            value={flatUnderlineColors}
            onChangeText={flatUnderlineColors =>
              inputActionHandler('flatUnderlineColors', flatUnderlineColors)
            }
            underlineColor={
              theme.isV3 ? MD3Colors.primary70 : MD2Colors.pink400
            }
            activeUnderlineColor={
              theme.isV3 ? MD3Colors.tertiary50 : MD2Colors.amber900
            }
          />
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Outlined input with custom outline colors"
            placeholder="Type something"
            value={outlinedColors}
            onChangeText={outlinedColors =>
              inputActionHandler('outlinedColors', outlinedColors)
            }
            outlineColor={theme.isV3 ? MD3Colors.primary70 : MD2Colors.pink400}
            activeOutlineColor={
              theme.isV3 ? MD3Colors.tertiary50 : MD2Colors.amber900
            }
          />
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Outlined with super long label which is truncating at some point"
            placeholder="Type something"
            onChangeText={outlinedLongLabel =>
              inputActionHandler('outlinedLongLabel', outlinedLongLabel)
            }
          />

          <View style={styles.inputContainerStyle}>
            <TextInput
              label="Input with no padding"
              style={styles.noPaddingInput}
              placeholder="Enter username, only letters"
              value={nameNoPadding}
              error={!_isUsernameValid(nameNoPadding)}
              onChangeText={nameNoPadding =>
                inputActionHandler('nameNoPadding', nameNoPadding)
              }
            />
            <HelperText
              type="error"
              padding="none"
              visible={!_isUsernameValid(nameNoPadding)}>
              Error: Only letters are allowed
            </HelperText>
          </View>

          <View style={styles.inputContainerStyle}>
            <TextInput
              label="Input with text align center"
              style={styles.centeredText}
            />
          </View>
          <View style={styles.inputContainerStyle}>
            <TextInput
              mode="outlined"
              label="Outlined input with text align center"
              style={styles.centeredText}
            />
          </View>
          <View style={styles.inputContainerStyle}>
            <TextInput
              mode="outlined"
              theme={{
                roundness: 25,
              }}
              label="Outlined text input with custom roundness"
            />
          </View>
          <View style={styles.inputContainerStyle}>
            <TextInput
              mode="outlined"
              label="Outlined text input without roundness"
              theme={{roundness: 0}}
            />
          </View>
          <View style={styles.inputContainerStyle}>
            <TextInput
              mode="outlined"
              label="Outlined text input with error"
              error
            />
          </View>
        </List.Section>
        <List.Section title={`Text button ${theme.isV3 ? '(text)' : ''}`}>
          <View style={styles.row}>
            <Button onPress={() => {}} style={styles.button}>
              Default
            </Button>
            <Button textColor={color} onPress={() => {}} style={styles.button}>
              Custom
            </Button>
            <Button disabled onPress={() => {}} style={styles.button}>
              Disabled
            </Button>
            <Button icon="camera" onPress={() => {}} style={styles.button}>
              Icon
            </Button>
            <Button loading onPress={() => {}} style={styles.button}>
              Loading
            </Button>
            <Button
              icon="camera"
              onPress={() => {}}
              style={styles.button}
              contentStyle={styles.flexReverse}>
              Icon right
            </Button>
          </View>
        </List.Section>
        {theme.isV3 && (
          <List.Section title="Contained-tonal button (tonal)">
            <View style={styles.row}>
              <Button
                mode="contained-tonal"
                onPress={() => {}}
                style={styles.button}>
                Default
              </Button>
              <Button
                mode="contained-tonal"
                buttonColor={color}
                onPress={() => {}}
                style={styles.button}>
                Custom
              </Button>
              <Button
                mode="contained-tonal"
                disabled
                onPress={() => {}}
                style={styles.button}>
                Disabled
              </Button>
              <Button
                mode="contained-tonal"
                icon="camera"
                onPress={() => {}}
                style={styles.button}>
                Icon
              </Button>
              <Button
                mode="contained-tonal"
                loading
                onPress={() => {}}
                style={styles.button}>
                Loading
              </Button>
              <Button
                mode="contained-tonal"
                icon="camera"
                onPress={() => {}}
                style={styles.button}
                contentStyle={styles.flexReverse}>
                Icon right
              </Button>
            </View>
          </List.Section>
        )}
        <List.Section
          title={`Outlined button ${theme.isV3 ? '(outlined)' : ''}`}>
          <View style={styles.row}>
            <Button mode="outlined" onPress={() => {}} style={styles.button}>
              Default
            </Button>
            <Button
              mode="outlined"
              textColor={color}
              onPress={() => {}}
              style={styles.button}>
              Custom
            </Button>
            <Button
              mode="outlined"
              disabled
              onPress={() => {}}
              style={styles.button}>
              Disabled
            </Button>
            <Button
              mode="outlined"
              icon="camera"
              onPress={() => {}}
              style={styles.button}>
              Icon
            </Button>
            <Button
              mode="outlined"
              loading
              onPress={() => {}}
              style={styles.button}>
              Loading
            </Button>
            <Button
              mode="outlined"
              icon="camera"
              onPress={() => {}}
              style={styles.button}
              contentStyle={styles.flexReverse}>
              Icon right
            </Button>
          </View>
        </List.Section>
        <List.Section
          title={`Contained button ${theme.isV3 ? '(filled)' : ''}`}>
          <View style={styles.row}>
            <Button mode="contained" onPress={() => {}} style={styles.button}>
              Default
            </Button>
            <Button
              mode="contained"
              buttonColor={color}
              onPress={() => {}}
              style={styles.button}>
              Custom
            </Button>
            <Button
              mode="contained"
              disabled
              onPress={() => {}}
              style={styles.button}>
              Disabled
            </Button>
            <Button
              mode="contained"
              icon="camera"
              onPress={() => {}}
              style={styles.button}>
              Icon
            </Button>
            <Button
              mode="contained"
              loading
              onPress={() => {}}
              style={styles.button}>
              Loading
            </Button>
            <Button
              mode="contained"
              icon="camera"
              onPress={() => {}}
              style={styles.button}
              contentStyle={styles.flexReverse}>
              Icon right
            </Button>
          </View>
        </List.Section>
        {theme.isV3 && (
          <List.Section title={'Elevated button (elevated)'}>
            <View style={styles.row}>
              <Button mode="elevated" onPress={() => {}} style={styles.button}>
                Default
              </Button>
              <Button
                mode="elevated"
                buttonColor={color}
                onPress={() => {}}
                style={styles.button}>
                Custom
              </Button>
              <Button
                mode="elevated"
                disabled
                onPress={() => {}}
                style={styles.button}>
                Disabled
              </Button>
              <Button
                mode="elevated"
                icon="camera"
                onPress={() => {}}
                style={styles.button}>
                Icon
              </Button>
              <Button
                mode="elevated"
                loading
                onPress={() => {}}
                style={styles.button}>
                Loading
              </Button>
              <Button
                mode="elevated"
                icon="camera"
                onPress={() => {}}
                style={styles.button}
                contentStyle={styles.flexReverse}>
                Icon right
              </Button>
            </View>
          </List.Section>
        )}
        <List.Section title="Custom">
          <View style={styles.row}>
            <Button
              mode="outlined"
              icon={{
                uri: 'https://avatars0.githubusercontent.com/u/17571969?v=3&s=400',
              }}
              onPress={() => {}}
              style={styles.button}>
              Remote image
            </Button>
            <Button mode="outlined" onPress={() => {}} style={styles.button}>
              Required asset
            </Button>
            <Button mode="outlined" onPress={() => {}} style={styles.button}>
              Custom component
            </Button>
            <Button
              icon="heart"
              mode="outlined"
              onPress={() => {}}
              style={styles.button}
              labelStyle={[
                styles.fontStyles,
                theme.isV3 && styles.md3FontStyles,
              ]}>
              Custom Font
            </Button>
          </View>
        </List.Section>
      </ScreenWrapper>
    </TextInputAvoidingView>
  );
};

DemoScreen.title = 'TextInput';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  button: {
    margin: 4,
  },
  flexReverse: {
    flexDirection: 'row-reverse',
  },
  md3FontStyles: {
    lineHeight: 32,
  },
  fontStyles: {
    fontWeight: '800',
    fontSize: 24,
  },
  helpersWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    flex: 1,
  },
  helper: {
    flexShrink: 1,
  },
  counterHelper: {
    textAlign: 'right',
  },
  inputContainerStyle: {
    margin: 8,
  },
  fontSize: {
    fontSize: 32,
  },
  textArea: {
    height: 80,
  },
  noPaddingInput: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  centeredText: {
    textAlign: 'center',
  },
  fixedHeight: {
    height: 100,
  },
});
