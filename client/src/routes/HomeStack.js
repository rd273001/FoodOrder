import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from '@rneui/themed';
import Home from '../screens/Home';
import AddFood from '../screens/AddFood';
import { Colors, Fonts } from '../utils/CommonStyles';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={ { headerStyle: { backgroundColor: Colors.primaryColor1 }, headerTintColor: Colors.primaryBackgroundColor1 } }>
        <Stack.Screen name='Home' component={ Home } options={ ( props ) => ( {
          title: 'Food Order',
          headerRight: () => (
            <Icon
              name='add-circle-outline'
              type='ionicon'
              onPress={ () => props.navigation.navigate( 'AddFood' ) }
              size={ Fonts.large }
              color={ Colors.primaryWhite }
              style={ { marginRight: '2%' } }
            />
          )
        } ) } />
        <Stack.Screen name='AddFood' component={ AddFood } options={ { title: 'Add Food' } } />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStack;