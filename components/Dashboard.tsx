import { EcoMetrics } from "../types";
import { useCountUp } from "../hooks/useCountUp";
import { useState } from "react";
import "./Dashboard.css";

type Props = {
  metrics: EcoMetrics;
};

export default function Dashboard({ metrics }: Props) {
  const baselineTokens =
    metrics.tokensUsed > 0 ? Math.round(metrics.tokensUsed / 0.31) : 0;

  const wasteReduced =
    baselineTokens > 0
      ? Math.round((1 - metrics.tokensUsed / baselineTokens) * 100)
      : 0;

  const tokens = useCountUp(metrics.tokensUsed, 600);
  const baseline = useCountUp(baselineTokens, 600);
  const energy = useCountUp(metrics.energySavedKWh, 700, 4);
  const water = useCountUp(metrics.waterSavedLitres, 700, 3);
  const carbon = useCountUp(metrics.carbonSavedGrams, 700, 2);

  const [showEco, setShowEco] = useState(false);

  return (
    <div className="dashboard">
      <div className="metric-row">
        <MetricCard
          title="Carbon Offset"
          value={`${carbon} g CO₂`}
          icon="🌍"
          color="green"
        />
        <MetricCard
          title="Tokens Saved"
          value={`${tokens} / ${baseline}`}
          sub={`−${wasteReduced}% waste`}
          icon="📉"
          color="blue"
        />
        <MetricCard
          title="Energy Saved"
          value={`${energy} kWh`}
          icon="⚡"
          color="yellow"
        />
        <MetricCard
          title="Water Footprint"
          value={`${water} L`}
          icon="💧"
          color="purple"
        />
      </div>

      <button className="eco-fab" onClick={() => setShowEco(true)}>
        🌱 Eco Report
      </button>

      {showEco && (
        <div className="eco-float">
          <div className="eco-header">
            🌱 Eco Impact Report
            <button onClick={() => setShowEco(false)}>✕</button>
          </div>

          <div className="eco-grid">
            <EcoItem label="Energy" value={`${energy} kWh`} icon="⚡" />
            <EcoItem label="Water" value={`${water} L`} icon="💧" />
            <EcoItem label="Carbon" value={`${carbon} g`} icon="🌍" />
            <EcoItem label="Tokens" value={`${tokens}`} icon="📊" />
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- SUB COMPONENTS ---------- */

function MetricCard({ title, value, icon, color, sub }: any) {
  return (
    <div className={`metric-card ${color}`}>
      <div className="metric-icon">{icon}</div>
      <div>
        <div className="metric-title">{title}</div>
        <div className="metric-value">{value}</div>
        {sub && <div className="metric-sub">{sub}</div>}
      </div>
    </div>
  );
}

function EcoItem({ label, value, icon }: any) {
  return (
    <div className="eco-item">
      <span>{icon}</span>
      <div>
        <strong>{label}</strong>
        <div>{value}</div>
      </div>
    </div>
  );
}
