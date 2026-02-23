import { useEffect, useState } from 'react';
import { CaptionMessage } from '@/types';
import { subscribeToCaptions } from '@/services/socket';

export function useCaptions() {
  const [captions, setCaptions] = useState<CaptionMessage[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToCaptions((incoming) => {
      setCaptions((current) => [incoming, ...current].slice(0, 20));
    });
    return unsubscribe;
  }, []);

  return captions;
}
