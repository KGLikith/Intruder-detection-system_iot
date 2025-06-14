import { ImagesGrid } from "@/components/images-grid";

export default function ImagesPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold md:text-3xl">Surveillance Images</h1>
        <p className="text-sm text-muted-foreground">
          All captured images from surveillance cameras
        </p>
      </div>
      
      <div className="mb-6 rounded-lg border bg-card p-4">
        <p className="text-sm text-muted-foreground">
          Images are automatically captured when human presence is detected while surveillance mode is active.
          Click on any image to view it in full size.
        </p>
      </div>
      
      <ImagesGrid />
    </div>
  );
}