import React from 'react';
import { Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const { width, height } = Dimensions.get( 'window' );

const FoodCardSkeleton = ( { isLoading } ) => {
  return (

    <SkeletonPlaceholder borderRadius={ width * 0.03 }>
      <SkeletonPlaceholder.Item flexDirection='row' alignItems='center'>
        <SkeletonPlaceholder.Item width={ width * 0.15 } height={ width * 0.15 } borderRadius={ width * 0.5 } />
        <SkeletonPlaceholder.Item marginLeft={ 20 } style={ { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } }>
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item width={ 120 } height={ 20 } />
            <SkeletonPlaceholder.Item marginTop={ 6 } width={ 80 } height={ 20 } />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={ 100 } height={ 40 } />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
    
  );
};

export { FoodCardSkeleton };