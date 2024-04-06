import { Dimensions } from "react-native";
import styled from 'styled-components/native';

const { height, width } = Dimensions.get( 'window' );

const Colors = {
  primaryBackgroundColor1: '#F5F5F5',
  primaryBackgroundColor2: '#DBD1FF',
  primaryColor1: '#491389',
  primaryColor2: '#6211C8',
  primaryColor3: '#742DDD',
  primaryColor4: '#C2A9FA',
  primaryBlack: '#333333',
  secondaryBlack: '#000000',
  primaryWhite: '#FFFFFF',
  greenShade: '#6FCABA',
  blueShade: '#5C63D8'
};

const Fonts = {
  small: width * 0.05,
  medium: width * 0.065,
  large: width * 0.07,
  extraLarge: width * 0.12,
};

const Styles = {
  Container: styled.View`
    flex: 1;
    padding: ${ width * 0.035 }px 0;
    background-color: ${ Colors.primaryBackgroundColor1 };
  `,
  CenteredConatiner: styled.View`
    flex: 1;
    padding: ${ width * 0.035 }px;
    background-color: ${ Colors.primaryBackgroundColor1 };
    justify-content: center;
    align-items: center;
  `,
  ScrollViewContainer: styled.ScrollView.attrs( () => ( {
    contentContainerStyle: {
      flexGrow: 1,
      justifyContent: 'center',
    }
  } ) )`
    flex: 1; 
    backgroundColor: ${ Colors.primaryBackgroundColor1 };
  `,
};

export { Colors, Fonts, Styles };