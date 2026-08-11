import { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { listAlerts, type Alert } from "../api/alerts";

export function AlertsScreen() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  async function loadAlerts(): Promise<void> {
    setAlerts(await listAlerts());
  }

  return (
    <ScrollView contentContainerStyle={styles.list}>
      <Button title="Refresh" onPress={loadAlerts} />
      {alerts.map((alert, index) => (
        <View key={index} style={styles.alert}>
          <Text style={styles.unitName}>{alert.unit_name}</Text>
          {/* TODO: Add the acknowledge action and its per-alert UI state. */}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  alert: { borderBottomWidth: 1, paddingVertical: 16 },
  unitName: { fontSize: 18, fontWeight: "600" },
});
