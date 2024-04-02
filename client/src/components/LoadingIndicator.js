import React from 'react';
import { Modal, Dimensions, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { Colors, Fonts } from '../utils/CommonStyles';
import { LinearGradient } from './LinearGradient';

const { height, width } = Dimensions.get( 'window' );

const LoadingIndicator = ( { visible } ) => {
  return (
    <Modal visible={ visible } transparent>
      <ModalView>
        <LoadingContainer>
          <ActivityIndicator size={ Fonts.extraLarge } color={ Colors.primaryColor4 } />
        </LoadingContainer>
      </ModalView>
    </Modal>
  );
};

const ModalView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: 'rgba(0, 0, 0, 0.6)';
  `;
const LoadingContainer = styled( LinearGradient )`
    width: ${ width * 0.2 }px;
    height: ${ width * 0.2 }px;
    border-radius: ${ width * 0.04 }px;
    justify-content: center;
  `;

export default LoadingIndicator;