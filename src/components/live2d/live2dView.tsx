'use client';

import { LAppDelegate } from '@/lib/live2d/demo/lappdelegate';
import { LAppGlManager } from '@/lib/live2d/demo/lappglmanager';
import { useEffect, useRef } from 'react';

export default function Live2dView() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      initialize();
      window.addEventListener('resize', resizeView);
    }

    return () => {
      LAppDelegate.releaseInstance(); 
      window.removeEventListener('resize', resizeView);
    };
  }, []);

  const initialize = async () => {
    if (ref.current) {
      LAppGlManager.setCanvas(ref.current);
      const appDelegateInstance = LAppDelegate.getInstance();
      appDelegateInstance.initialize();
      appDelegateInstance.run();
    }
  };

  const resizeView = () => {
    const appDelegateInstance = LAppDelegate.getInstance();
    appDelegateInstance.onResize();
  };

  return (
    <div id="live2d-container">
      <canvas className="w-screen h-[800px] xxs:h-[900px] sm:h-[1200px]" ref={ref} />
    </div>
  );
}
