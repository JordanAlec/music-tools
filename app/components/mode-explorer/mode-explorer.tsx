"use client";

import { useState } from "react";
import { MODE_FAMILIES, type ModeOption } from "@/lib/music/mode-explorer";
import ButtonGroup from "../button-group";
import ModeDetails from "./mode-details";
import ModePicker from "./mode-picker";

export default function ModeExplorer() {
  const [mode, setMode] = useState(MODE_FAMILIES[0].modes[0]);
  const [selected, setSelected] = useState(mode.keys[0]);

  // Keep the tonic when switching modes if the new mode can be spelled on it.
  function selectMode(option: ModeOption) {
    setMode(option);
    setSelected(option.keys.find(({ tonic }) => tonic === selected.tonic) ?? option.keys[0]);
  }

  return (
    <div className="space-y-8">
      <ModePicker families={MODE_FAMILIES} selected={mode} onSelect={selectMode} />
      <div className="space-y-2">
        <h2 className="text-center text-sm font-medium text-neutral-500">Tonic</h2>
        <ButtonGroup
          label="Tonic"
          options={mode.keys}
          selected={selected}
          optionLabel={({ tonic }) => tonic}
          onSelect={setSelected}
        />
      </div>
      <ModeDetails mode={selected} />
    </div>
  );
}
