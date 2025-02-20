"use client";

import { LAppDelegate } from '@/lib/live2d/demo/lappdelegate';
import { LAppGlManager } from '@/lib/live2d/demo/lappglmanager';
import { useEffect, useRef, useCallback, memo } from 'react';

function Live2dViewComponent() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  // 🎯 `resizeView` を useCallback でメモ化し、不要な関数の再生成を防ぐ
  const resizeView = useCallback(() => {
    const appDelegateInstance = LAppDelegate.getInstance();
    appDelegateInstance.onResize();
  }, []);

  useEffect(() => {
    if (ref.current) {
      LAppGlManager.setCanvas(ref.current);
      const appDelegateInstance = LAppDelegate.getInstance();
      appDelegateInstance.initialize();
      appDelegateInstance.run();

      window.addEventListener('resize', resizeView);
    }

    return () => {
      LAppDelegate.releaseInstance();
      window.removeEventListener('resize', resizeView);
    };
  }, [resizeView]); 

  return (
    <div id="live2d-container">
      <canvas className="w-screen h-[800px] xxs:h-[900px] sm:h-[1200px] md:h-[1400px] lg:h-[1600px]" ref={ref} />
    </div>
  );
}

export const Live2dView = memo(Live2dViewComponent);
