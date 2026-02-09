
import React from 'react';
import { EcoMetrics } from '../types';
import { Leaf, Droplets, Zap, Cloud } from 'lucide-react';

interface Props {
  metrics: EcoMetrics;
}

const EcoReport: React.FC<Props> = ({ metrics }) => {
  const percentageSaved = Math.round(((metrics.estimatedNormalTokens - metrics.tokensUsed) / metrics.estimatedNormalTokens) * 100);

  return (
    <div className="mt-4 p-4 rounded-xl border border-emerald-100 bg-emerald-50/50">
      <div className="flex items-center gap-2 mb-3 text-emerald-700 font-semibold text-sm">
        <Leaf size={16} className="animate-leaf" />
        <span>ECO IMPACT REPORT</span>
        <span className="ml-auto bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs">
          -{percentageSaved}% waste
        </span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white/60 p-2 rounded-lg border border-emerald-50 shadow-sm">
          <div className="flex items-center gap-1.5 text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">
            <Zap size={10} className="text-amber-500" /> Energy
          </div>
          <div className="text-sm font-bold text-slate-800">
            {metrics.energySavedKWh.toFixed(5)} <span className="text-[10px] font-normal text-slate-500">kWh</span>
          </div>
        </div>

        <div className="bg-white/60 p-2 rounded-lg border border-emerald-50 shadow-sm">
          <div className="flex items-center gap-1.5 text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">
            <Droplets size={10} className="text-blue-500" /> Water
          </div>
          <div className="text-sm font-bold text-slate-800">
            {metrics.waterSavedLitres.toFixed(3)} <span className="text-[10px] font-normal text-slate-500">L</span>
          </div>
        </div>

        <div className="bg-white/60 p-2 rounded-lg border border-emerald-50 shadow-sm">
          <div className="flex items-center gap-1.5 text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">
            <Cloud size={10} className="text-slate-400" /> Carbon
          </div>
          <div className="text-sm font-bold text-slate-800">
            {metrics.carbonSavedGrams.toFixed(2)} <span className="text-[10px] font-normal text-slate-500">g</span>
          </div>
        </div>

        <div className="bg-white/60 p-2 rounded-lg border border-emerald-50 shadow-sm">
          <div className="flex items-center gap-1.5 text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">
            <Leaf size={10} className="text-emerald-500" /> Tokens
          </div>
          <div className="text-sm font-bold text-slate-800">
            {metrics.tokensUsed} / {metrics.estimatedNormalTokens}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoReport;
