"use client";

import { Card } from "@/components/ui/card";
import { useImages } from "@/lib/hooks/use-surveillance";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Camera, ImageOff } from "lucide-react";
import { useState } from "react";

export function ImagesGrid() {
  const { images, loading } = useImages();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="aspect-video w-full" />
            <div className="p-2">
              <Skeleton className="h-4 w-2/3" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <ImageOff className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-2 text-lg font-medium">No Images Available</h3>
        <p className="max-w-md text-sm text-muted-foreground">
          No surveillance images have been captured yet. Images will appear here once the system detects human presence while in surveillance mode.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image, index) => (
          <Card
            key={index}
            className="group overflow-hidden transition-all hover:shadow-md"
          >
            <Dialog>
              <DialogTrigger asChild>
                <div 
                  className="cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src={image}
                      alt={`Surveillance image ${index + 1}`}
                      className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <div className="flex items-center justify-between p-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Camera className="h-3.5 w-3.5" />
                      <span>Image {index + 1}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Click to view</span>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
              <DialogTitle className="sr-only">{`Surveillance image ${index + 1}`}</DialogTitle>
                <div className="relative flex h-[70vh] max-h-[800px] w-full items-center justify-center overflow-hidden">
                  <img
                    src={image}
                    alt={`Surveillance image ${index + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </Card>
        ))}
      </div>
    </>
  );
}