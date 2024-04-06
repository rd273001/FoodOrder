import React from 'react';
import { Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { FoodCard } from './FoodListCard';
import { Colors } from '../utils/CommonStyles';

const { width, height } = Dimensions.get( 'window' );

const FoodListSkeleton = () => {
  return (

    // length is 11(safe case) because max  9-10  cards can be visible at a time as per height of card
    [...Array( 6 )].map( ( _, index ) => (
      <FoodCard key={ index } colors={ [Colors.primaryColor3, Colors.primaryColor4] } useAngle>
        <SkeletonPlaceholder backgroundColor='#C9C9C9' borderRadius={ width * 0.03 }>
          <SkeletonPlaceholder.Item style={ { flexDirection: 'row', alignItems: 'center' } }>
            <SkeletonPlaceholder.Item width={ width * 0.22 } height={ width * 0.22 } borderRadius={ width * 0.5 } />
            <SkeletonPlaceholder.Item marginLeft={ width * 0.04 } style={ { flexDirection: 'row', justifyContent: 'space-between' } }>
              <SkeletonPlaceholder.Item>
                <SkeletonPlaceholder.Item width={ 120 } height={ 20 } />
                <SkeletonPlaceholder.Item marginTop={ 6 } width={ 80 } height={ 20 } />
              </SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item width={ 60 } height={ 40 } alignSelf='center' marginLeft={ width * 0.1 } />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </FoodCard>
    
    ) )
  );
};

export default FoodListSkeleton;