"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useImages } from "@/lib/hooks/use-surveillance";
import { Camera, ImageOff } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";

export function ImageDisplay() {
  const { latestImage, loading } = useImages();
  const [isOpen, setIsOpen] = useState(false);

  if (loading) {
    return (
      <Card className="h-[320px] w-full">
        <CardHeader>
          <CardTitle className="text-lg">Latest Capture</CardTitle>
          <Skeleton className="h-4 w-1/3" />
        </CardHeader>
        <CardContent className="flex h-[200px] items-center justify-center">
          <Skeleton className="h-full w-full rounded-md" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full w-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Latest Capture</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <div className="relative flex h-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-md border bg-muted/30 transition-all hover:bg-muted/50">
              {latestImage ? (
                <div className="relative h-full w-full">
                  <img
                    src={latestImage}
                    alt="Latest surveillance capture"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-center text-xs text-white">
                    Click to enlarge
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <ImageOff className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">No images captured yet</p>
                </div>
              )}
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogTitle className="sr-only">{`Surveillance image `}</DialogTitle>

            {latestImage && (
              <div className="relative flex h-[70vh] max-h-[800px] w-full items-center justify-center overflow-hidden">
                <img
                  src={latestImage}
                  alt="Latest surveillance capture"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex w-full items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Camera className="h-4 w-4" />
            <span>Surveillance Camera</span>
          </div>
          <span>
            {latestImage
              ? "Latest detection captured"
              : "No captures available"}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}