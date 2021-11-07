
import React from 'react';
import { View ,StyleSheet,} from 'react-native';

const ProgressBar = (props:any) => {
  return (
    <View style={styles.main}>
      <View
        style={[styles.child, { width: Math.abs(10 * props.vote_average) }]}>
     </View>
    </View>
  );
};

export default ProgressBar;


const styles = StyleSheet.create({
    main: {
        width: 100,
        height: 10,
        backgroundColor: 'tomato',
        borderRadius: 5,
        marginRight: 10,
      },
      child: {
        position: 'absolute',
        height: 10,
        backgroundColor: 'lightgreen',
        borderRadius: 5,
      },
  });