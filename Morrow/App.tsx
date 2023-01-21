import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TodoScreen } from "./TodoScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Find the bugs!</Text>
      <TodoScreen titleStringFromParent={"My Todo List"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
