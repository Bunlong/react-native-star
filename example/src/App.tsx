import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Star } from 'react-native-star';

export default function App() {
  return (
    <View style={styles.container}>
      <Star
        onChange={(value) => {
          console.log(value);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
