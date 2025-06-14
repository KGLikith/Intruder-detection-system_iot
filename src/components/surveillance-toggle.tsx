"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSurveillanceStatus } from "@/lib/hooks/use-surveillance";
import { ShieldAlert, ShieldCheck } from "lucide-react";

export function SurveillanceToggle() {
  const { surveillanceMode, toggleSurveillanceMode, loading } = useSurveillanceStatus();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(surveillanceMode);
  }, [surveillanceMode]);

  const handleToggle = () => {
    toggleSurveillanceMode();
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {surveillanceMode ? (
            <ShieldAlert className="h-5 w-5 text-red-500" />
          ) : (
            <ShieldCheck className="h-5 w-5 text-muted-foreground" />
          )}
          <h3 className="text-lg font-medium">Surveillance Mode</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="surveillance-mode"
            checked={isChecked}
            onCheckedChange={handleToggle}
            disabled={loading}
          />
          <Label htmlFor="surveillance-mode" className="cursor-pointer">
            {surveillanceMode ? "ON" : "OFF"}
          </Label>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        {surveillanceMode
          ? "Surveillance is active. The system will detect any human presence."
          : "Surveillance is disabled. No detection or recording will occur."}
      </p>
      <div 
        className={`mt-2 h-1 w-full rounded-full transition-all ${
          surveillanceMode ? "bg-red-500" : "bg-gray-200 dark:bg-gray-700"
        }`}
      />
    </div>
  );
}