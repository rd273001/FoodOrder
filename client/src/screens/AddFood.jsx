import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { Input, Button } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient as CustomLinearGradient } from '../components/LinearGradient';
import styled from 'styled-components/native';
import axios from 'axios';
import { BASE_URL } from '@env';
import { Colors, Styles } from '../utils/CommonStyles';
import LoadingIndicator from '../components/LoadingIndicator';
import showToast from '../utils/showToast';

const { width, height } = Dimensions.get( 'window' );

const AddFood = ( { navigation } ) => {
  const [foodDetails, setFoodDetails] = useState( {
    name: null,
    price: null,
    type: null
  } );
  const [error, setError] = useState( {
    nameError: null,
    priceError: null,
    typeError: null
  } );
  const [isLoading, setIsLoading] = useState( false );

  // destructuring food details
  const { name, price, type } = foodDetails;
  const { nameError, priceError, typeError } = error;

  const validateFoodDetails = () => {
    let valid = true;
    const errors = {
      nameError: null,
      priceError: null,
      typeError: null
    };

    if ( !name || !name.trim() ) {
      errors.nameError = 'Name is required';
      valid = false;
    }

    if ( !price || !price.trim() ) {
      errors.priceError = 'Price is required';
      valid = false;
    } else if ( isNaN( parseFloat( price ) ) ) {
      errors.priceError = 'Price must be a number';
      valid = false;
    }

    if ( !type || !type.trim() ) {
      errors.typeError = 'Type is required';
      valid = false;
    }

    setError( errors );
    return valid;
  };

  const handleAddFood = async () => {
    if ( !validateFoodDetails() )
      return;
    setIsLoading( true );
    try {
      await axios.post( `${ BASE_URL }/addfood`, foodDetails );
      showToast( 'success', 'Food Added Successfully...' );
      setFoodDetails( { name: null, price: null, type: null } );
      setError( { nameError: null, priceError: null, typeError: null } );
      navigation.navigate( 'Home' );
    } catch ( error ) {
      // console.log( 'Error adding food:', error.message );
      showToast( 'error', 'Failed to add food', { text2: error.message } );
    } finally {
      setIsLoading( false );
    }
  };

  const updateText = ( type, text ) => {
    setFoodDetails( prev => ( { ...prev, [type]: text } ) );
  };

  return (
    <Styles.ScrollViewContainer>

      <Form colors={ ['#ccc', '#fff', '#bbb'] } useAngle angle={ 210 }>
        <FormField
          value={ name }
          onChangeText={ text => updateText( 'name', text ) }
          errorMessage={ nameError }
          renderErrorMessage={ nameError }
          label='Name'
          placeholder='Enter food name'
        />

        <FormField
          value={ price }
          onChangeText={ text => updateText( 'price', text ) }
          errorMessage={ priceError }
          renderErrorMessage={ priceError }
          label='Price'
          keyboardType='numeric'
          placeholder='Enter  food price'
        />

        <FormField
          value={ type }
          onChangeText={ text => updateText( 'type', text ) }
          errorMessage={ typeError }
          renderErrorMessage={ typeError }
          label='Type'
          placeholder='Enter food type'
        />

        <AddButton
          title='Add Food'
          onPress={ handleAddFood }
          ViewComponent={ LinearGradient }
          linearGradientProps={ {
            colors: [Colors.primaryColor2, Colors.primaryColor4],
            useAngle: true,
            angle: 120
          } }
        />
      </Form>
      
      <LoadingIndicator visible={ isLoading } />
        
    </Styles.ScrollViewContainer>
  );
};

const Form = styled(CustomLinearGradient)`
  padding: ${ width * 0.1 }px ${ width * 0.05 }px;
  border-radius: ${ width * 0.05 }px;
  margin: ${ width * 0.035 }px;
  border: 2px solid ${ Colors.primaryColor4 };
`;

const FormField = styled( Input ).attrs( () => ( {
  inputContainerStyle: {
    borderWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#333',
    borderRadius: width * 0.03,
    padding: width * 0.012,
    backgroundColor: Colors.primaryWhite,
  },
  labelStyle: {
    color: Colors.primaryColor2,
    fontSize: width * 0.045,
  },
  containerStyle: {
    marginBottom: height * 0.03,
    paddingHorizontal: 0,
  },
  inputStyle: {
    color: Colors.secondaryBlack,
  },
} ) )``;

const AddButton = styled( Button ).attrs( () => ( {
  buttonStyle: {
    paddingVertical: height * 0.012,
  },
  containerStyle: {
    marginTop: height * 0.035,
    borderWidth: 2,
    minWidth: width * 0.6,
    alignSelf: 'center',
    borderRadius: width * 0.04,
    borderColor: Colors.primaryColor3
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: width * 0.05
  }
} ) )``;

export default AddFood;