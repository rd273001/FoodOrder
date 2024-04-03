import React, { useState, useEffect } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { SearchBar, Icon } from '@rneui/themed';
import axios from 'axios';
import { BASE_URL } from '@env';
import styled from 'styled-components/native';
import { Colors, Fonts, Styles } from '../utils/CommonStyles';
import { LinearGradient as CustomLinearGradient } from '../components/LinearGradient';
import { FoodCardSkeleton } from '../components/SkeletonLoader';
import showToast from '../utils/showToast';

const { width, height } = Dimensions.get( 'window' );

const Home = ( { navigation } ) => {
  const [foods, setFoods] = useState( [] );
  const [searchText, setSearchText] = useState( '' );
  const [isLoading, setIsLoading] = useState( false );

  const controller = new AbortController();
  // Create a new cancel token
  const source = axios.CancelToken.source();

  useEffect( () => {
    fetchFoods();
  }, [searchText] );

  const fetchFoods = async () => {
    if ( searchText && String( searchText ).trim() === '' )
      return;
    setIsLoading( true );
    try {
      const queryParams = `?search=${ searchText }`;
      const response = await axios.get( `${ BASE_URL + queryParams }`, {
        signal: controller.signal,
        cancelToken: source.token,
      } );
      setFoods( response.data );
      console.log( 'Reponse => ', response.data );
    } catch ( error ) {
      if ( axios.isCancel( error ) ) {
        // request was cancelled (due to a new search request)
        console.log( 'Request cancelled:', error.message );
      } else {
        // handle other errors
        console.log( 'Error fetching data:', error.message );
        showToast( 'error', error.message );
      }
    } finally {
      setIsLoading( false );
    }
  };

  const handleSearch = ( text ) => {
    setSearchText( text );
    // cancel the previous request (if any)
    if ( source ) {
      source.cancel( 'New request initiated' );
    }
    fetchFoods();
  };

  const renderFoodItem = ( { item } ) => (
    <FoodCard colors={ [Colors.primaryColor3, Colors.primaryColor4] } useAngle>
      {
        isLoading ? <FoodCardSkeleton />
          : <>
            <FoodImage />
      
            <FoodDetailContainer>
              <FoodDetailLeft>
                <FoodName>{ item.name }</FoodName>
                <FoodType>{ item.type }</FoodType>
              </FoodDetailLeft>
              <FoodPrice>₹{ item.price }</FoodPrice>
            </FoodDetailContainer>
          </>
      }
    </FoodCard> );

  return (
    <Styles.Container>

      <SearchContainer
        placeholder='Search your food'
        value={ searchText }
        onChangeText={ handleSearch }
        showLoading={ isLoading }
        placeholderTextColor={ Colors.primaryBackgroundColor2 }
        round
        loadingProps={ { color: Colors.primaryColor4 } }
        searchIcon={ <Icon name='magnify' type='material-community' color={ Colors.primaryColor4 } size={ 25 } /> }
      />
      
      <FlatList
        data={ foods }
        renderItem={ renderFoodItem }
        ListEmptyComponent={
          <StyledText>No Food to show.</StyledText>
        }
        keyExtractor={ ( item ) => item._id.toString() }
      />
      
    </Styles.Container>
  );
};

const SearchContainer = styled( SearchBar ).attrs( props => ( {
  containerStyle: {
    backgroundColor: 'transparent',
    padding: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: height * 0.02
  },
  style: {
    padding: 0,
    color: Colors.primaryColor1
  },
  inputContainerStyle: {
    backgroundColor: '#fff',
    borderColor: Colors.primaryColor1,
    borderWidth: 1,
    borderBottomWidth: 1
  }
} ) )`
  flex: 1;
  height: ${ height * 0.065 }px;
  padding: 0 8px 0 8px;
  margin: 0;
  color: ${Colors.secondaryBlack};
`;

const FoodCard = styled( CustomLinearGradient ).attrs()`
  flex-direction: row;
  align-items: center;
  border-radius: ${ width * 0.03 }px;
  margin-bottom: ${ height * 0.02 }px;
  padding: ${ width * 0.03 }px;
  elevation: 7;
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
  margin-left: ${width * 0.04}px;
  padding-vertical: ${ height * 0.01 }px;
`;

const FoodDetailLeft = styled.View``;

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

const StyledText = styled.Text`
  font-size: ${ Fonts.small }px;
  color: ${ Colors.primaryWhite };
  text-align: center;
  color: ${ Colors.primaryBlack };
`;

export default Home;