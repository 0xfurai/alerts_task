import { SafeAreaView, StyleSheet } from "react-native";
import { AlertsScreen } from "./screens/AlertsScreen";

export function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AlertsScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
