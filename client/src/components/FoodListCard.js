import React from 'react';
import { Dimensions, View } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient as CustomLinearGradient } from './LinearGradient';
import { Colors, Fonts } from '../utils/CommonStyles';

const { width, height } = Dimensions.get( 'window' );

const FoodListCard = React.memo( ( { item } ) => {
  console.log( 'Item received => ', item );
  return (
    <FoodCard colors={ [Colors.primaryColor3, Colors.primaryColor4] } useAngle>

      {/* Food Image View */ }
      <FoodImage />

      <FoodDetailContainer>
        <View>
          <FoodName>{ item.name }</FoodName>
          <FoodType>{ item.type }</FoodType>
        </View>
        <FoodPrice>₹{ item.price }</FoodPrice>
      </FoodDetailContainer>

    </FoodCard>
  );
} );

export const FoodCard = styled( CustomLinearGradient ).attrs()`
  flex-direction: row;
  align-items: center;
  border-radius: ${ width * 0.03 }px;
  margin-bottom: ${ height * 0.02 }px;
  padding: ${ width * 0.03 }px;
  elevation: 7;
  margin-horizontal: ${ width * 0.03 }px;
`;

const FoodImage = styled.View`
  height: ${ width * 0.22 }px;
  width: ${ width * 0.22 }px;
  border-radius: ${ width * 0.5 }px;
  background-color: #ffffff55;
`;

const FoodDetailContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-left: ${ width * 0.04 }px;
  padding-vertical: ${ height * 0.01 }px;
`;

const FoodName = styled.Text`
  font-size: ${ Fonts.small }px;
  font-weight: bold;
  color: ${ Colors.secondaryBlack };
`;

const FoodPrice = styled.Text`
  font-size: ${ Fonts.small }px;
  align-self: center;
`;

const FoodType = styled.Text`
  font-size: ${ Fonts.small }px;
`;

export default FoodListCard;