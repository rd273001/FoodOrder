import React from 'react';
import { Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const { width, height } = Dimensions.get( 'window' );

const FoodCardSkeleton = ( { isLoading } ) => {
  return (

    <SkeletonPlaceholder enabled={ isLoading } backgroundColor='#C9C9C9' borderRadius={ width * 0.03 }>
      <SkeletonPlaceholder.Item style={ { flexDirection: 'row', alignItems:'center' } }>
        <SkeletonPlaceholder.Item width={ width * 0.22 } height={ width * 0.22 } borderRadius={ width * 0.5 } />
        <SkeletonPlaceholder.Item marginLeft={ width * 0.04 } style={ { flexDirection: 'row', justifyContent: 'space-between' } }>
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item width={ 120 } height={ 20 } />
            <SkeletonPlaceholder.Item marginTop={ 6 } width={ 80 } height={ 20 } />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={ 60 } height={ 40 } alignSelf='center' marginLeft={width * 0.1} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
    
  );
};

export { FoodCardSkeleton };