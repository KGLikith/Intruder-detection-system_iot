'use client';

import { useEffect, useState } from 'react';
import { database } from '@/lib/firebase';
import { ref, onValue, set } from 'firebase/database';

export function useSurveillanceStatus() {
  const [surveillanceMode, setSurveillanceMode] = useState<boolean>(false);
  const [humanDetected, setHumanDetected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const surveillanceModeRef = ref(database, 'settings/surveillance_mode');
    const humanDetectedRef = ref(database, 'status/human_detected');

    // Listen for surveillance_mode changes
    const unsubscribeSurveillanceMode = onValue(surveillanceModeRef, (snapshot) => {
      const data = snapshot.val();
      setSurveillanceMode(data === true);
      setLoading(false);
    });

    // Listen for human_detected changes
    const unsubscribeHumanDetected = onValue(humanDetectedRef, (snapshot) => {
      const data = snapshot.val();
      setHumanDetected(data === true);
    });

    return () => {
      unsubscribeSurveillanceMode();
      unsubscribeHumanDetected();
    };
  }, []);

  const toggleSurveillanceMode = async () => {
    try {
      const surveillanceModeRef = ref(database, 'settings/surveillance_mode');
      await set(surveillanceModeRef, !surveillanceMode);
    } catch (error) {
      console.error('Error toggling surveillance mode:', error);
    }
  };

  return { surveillanceMode, humanDetected, loading, toggleSurveillanceMode };
}

export function useImages() {
  const [images, setImages] = useState<string[]>([]);
  const [latestImage, setLatestImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const imagesRef = ref(database, 'images_list');

    const unsubscribe = onValue(imagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const imagesList = Array.isArray(data) ? data : Object.values(data);
        setImages(imagesList);
        
        // Set latest image
        if (imagesList.length > 0) {
          setLatestImage(imagesList[imagesList.length - 1]);
        }
      } else {
        setImages([]);
        setLatestImage(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { images, latestImage, loading };
}