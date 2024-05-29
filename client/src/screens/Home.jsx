import React, { useState, useEffect } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { SearchBar, Icon } from '@rneui/themed';
import axios from 'axios';
import { BASE_URL } from '@env';
import styled from 'styled-components/native';
import { Colors, Fonts, Styles } from '../utils/CommonStyles';
import FoodListSkeleton from '../components/FoodListSkeleton';
import showToast from '../utils/showToast';
import FoodListCard from '../components/FoodListCard';

const { width, height } = Dimensions.get( 'window' );

const Home = () => {
  const [foods, setFoods] = useState( [] );
  const [searchText, setSearchText] = useState( '' );
  const [isLoading, setIsLoading] = useState( false );

  // controller for cancelling the previous incomplete Pending request
  const controller = new AbortController();

  useEffect( () => {
    fetchFoods();
    return () => controller.abort();   // will abort the request pending when User types next character
  }, [searchText.trim()] );

  const fetchFoods = async () => {
    setIsLoading( true );
    try {
      const queryParams = `?search=${ searchText }`;
      const response = await axios.get( `${ BASE_URL + queryParams }`, { signal: controller.signal } );
      setFoods( response.data );
      console.log( 'Reponse => ', response.data );
    } catch ( error ) {
      if ( axios.isCancel( error ) ) {
        // request was cancelled (due to a new search request)
        console.log( 'Previous Incomplete Request:', error.message );
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
  };

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
      
      {
        isLoading
          ? <FoodListSkeleton />
          : <FlatList
            data={ foods }
            renderItem={ ( { item } ) => <FoodListCard item={ item } /> }
            ListEmptyComponent={ <StyledText>No Food to show.</StyledText> }
            keyExtractor={ ( item ) => item._id.toString() }
          />
      }

    </Styles.Container>
  );
};

const SearchContainerStyles = {
  containerStyle: {
    backgroundColor: 'transparent',
    padding: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: height * 0.02,
    marginHorizontal: width * 0.03
  },
  style: {
    padding: 0,
    color: Colors.primaryColor1,
  },
  inputContainerStyle: {
    backgroundColor: Colors.primaryWhite,
    borderColor: Colors.primaryColor1,
    borderWidth: 1,
    borderBottomWidth: 1,
  },
};

const SearchContainer = styled( SearchBar ).attrs( () => ( {
  ...SearchContainerStyles
} ) )`
  flex: 1;
  height: ${ height * 0.065 }px;
  padding: 0 8px 0 8px;
  margin: 0;
  color: ${Colors.secondaryBlack};
`;

const StyledText = styled.Text`
  font-size: ${ Fonts.small }px;
  color: ${ Colors.primaryWhite };
  text-align: center;
  color: ${ Colors.primaryBlack };
`;

export default Home;