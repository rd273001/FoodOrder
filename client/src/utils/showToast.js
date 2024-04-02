import { Dimensions } from 'react-native';
import Toast from 'react-native-toast-message';

const showToast = ( type, message, props ) => {
  Toast.show( { type, text1: message, topOffset: Dimensions.get( 'window' ).height * 0.1, ...props } );
};

export default showToast;