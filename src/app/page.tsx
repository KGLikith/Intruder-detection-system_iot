import { SurveillanceToggle } from "@/components/surveillance-toggle";
import { StatusIndicator } from "@/components/status-indicator";
import { ImageDisplay } from "@/components/image-display";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">Surveillance Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <SurveillanceToggle />
          <StatusIndicator />
        </div>
        
        <div>
          <ImageDisplay />
        </div>
      </div>
      
      {/* <div className="mt-8 rounded-lg border bg-card p-4">
        <h2 className="mb-4 text-lg font-medium">System Information</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-md bg-muted p-3">
            <p className="text-sm font-medium">Camera Status</p>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
          <div className="rounded-md bg-muted p-3">
            <p className="text-sm font-medium">Detection Algorithm</p>
            <p className="text-xs text-muted-foreground">Human Detection v2.1</p>
          </div>
          <div className="rounded-md bg-muted p-3">
            <p className="text-sm font-medium">Last System Check</p>
            <p className="text-xs text-muted-foreground">Today at 12:00 PM</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}