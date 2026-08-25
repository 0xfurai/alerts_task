import { SafeAreaView, StyleSheet } from "react-native";
import { UnitsScreen } from "./screens/UnitsScreen";

export function App() {
  return (
    <SafeAreaView style={styles.container}>
      <UnitsScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
