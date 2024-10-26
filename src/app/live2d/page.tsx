import Live2dView from '@/components/live2d/live2dView';

export default function Live2D() {
  return (
    <>
        <div className="absolute top-0 left-0 w-full h-full">
          <Live2dView />
        </div>
    </>
  );
}
