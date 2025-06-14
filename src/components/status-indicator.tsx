"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSurveillanceStatus } from "@/lib/hooks/use-surveillance";
import { AlertTriangle, User, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";

export function StatusIndicator() {
  const { humanDetected, loading } = useSurveillanceStatus();
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    if (!loading) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [humanDetected, loading]);

  return (
    <Card className={`transition-all duration-300 ${
      humanDetected 
        ? "border-red-500 shadow-md" 
        : ""
    } ${
      animate && humanDetected 
        ? "animate-pulse" 
        : ""
    }`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Detection Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {humanDetected ? (
              <>
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span className="font-medium text-red-500">Human Detected</span>
              </>
            ) : (
              <>
                <UserCheck className="h-5 w-5 text-green-500" />
                <span className="font-medium text-green-500">All Clear</span>
              </>
            )}
          </div>
          <Badge variant={humanDetected ? "destructive" : "default"} className="px-3 py-1">
            {humanDetected ? "ALERT" : "SAFE"}
          </Badge>
        </div>
        <div className="mt-4">
          <div className="text-sm text-muted-foreground">
            {humanDetected
              ? "A human presence has been detected. Check the latest image for details."
              : "No human presence detected in the monitored area."}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}