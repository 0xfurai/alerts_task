import { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { listUnits, type Unit } from "../api/units";

export function UnitsScreen() {
  const [units, setUnits] = useState<Unit[]>([]);

  async function loadUnits(): Promise<void> {
    setUnits(await listUnits());
  }

  return (
    <ScrollView contentContainerStyle={styles.list}>
      <Button title="Refresh" onPress={() => loadUnits()} />

      {units.map((unit, index) => (
        <View key={index} style={styles.unit}>
          <Text style={styles.unitName}>{unit.name}</Text>
          <Text style={styles.meta}>{unit.status}</Text>
          <Text style={styles.meta}>
            Last cleaned: {unit.last_cleaned_at ?? "never"}
          </Text>
          {/* TODO: Add the "Start cleaning" action and its per-unit UI state. */}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  unit: { borderBottomWidth: 1, paddingVertical: 16 },
  unitName: { fontSize: 18, fontWeight: "600" },
  meta: { color: "#555", marginTop: 4 },
});
