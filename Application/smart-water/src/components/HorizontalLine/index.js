import React from "react";
import { View, StyleSheet } from 'react-native';

function HorizontalLine(props) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: props.background
    },
    line: {
      borderBottomColor: props.color,
      borderBottomWidth: props.size,
      marginVertical: props.vertical,
      marginHorizontal: props.horizontal
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.line} />
    </View>
  )
}

export default HorizontalLine;