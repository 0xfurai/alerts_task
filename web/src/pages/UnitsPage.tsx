import { useState } from "react";
import { listUnits, type Unit } from "../api/units";

export function UnitsPage() {
  const [units, setUnits] = useState<Unit[]>([]);

  async function loadUnits(): Promise<void> {
    setUnits(await listUnits());
  }

  return (
    <div className="page">
      <h1>Units</h1>

      <button type="button" onClick={() => loadUnits()}>
        Refresh
      </button>

      <ul className="list">
        {units.map((unit, index) => (
          <li key={index} className="unit">
            <span className="unit-name">{unit.name}</span>
            <span className="meta">{unit.status}</span>
            <span className="meta">
              Last cleaned: {unit.last_cleaned_at ?? "never"}
            </span>
            {/* TODO: Add the "Start cleaning" action and its per-unit UI state. */}
          </li>
        ))}
      </ul>
    </div>
  );
}
