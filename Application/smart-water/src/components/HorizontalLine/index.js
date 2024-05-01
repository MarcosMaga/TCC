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
      marginTop: props.top || 0,
      marginBottom: props.bottom || 0,
      marginHorizontal: props.horizontal || 0
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.line} />
    </View>
  )
}

export default HorizontalLine;