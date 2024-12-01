'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';  
import { useTags } from '@/lib/hooks/useTags';
import TagForm from '@/components/tag/TagForm';
import TagItem from '@/components/tag/TagItem';

export default function NewTagForm() {
  const { getTags, deleteTag, tags, createTag } = useTags();
  const router = useRouter();  

  useEffect(() => {
    getTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteTag = (id: number) => {
    deleteTag(id);
  };

  const handleCreateTag = async (name: string, color: string) => {
    await createTag(name, color);  
  };

  const handleGoBack = () => {
    router.back();  
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen pointer-events-auto">
      <button 
        onClick={handleGoBack}  
        className="absolute top-[80px] left-4 text-3xl text-[#008080] pointer-events-auto"
      >
        <span className="material-icons" style={{ fontSize: '48px' }}>
          reply
        </span>
      </button>

      <div className="flex flex-wrap justify-center mt-6 gap-2 bg-white p-2 rounded-lg">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <div key={tag.id} onClick={() => handleDeleteTag(tag.id)}>
              <TagItem id={tag.id} name={tag.name} color={tag.color} />
            </div>
          ))
        ) : (
          <p className="text-gray-500">タグがありません。</p>
        )}
      </div>

      <div className="w-full max-w-md p-6">
        <TagForm onCreateTag={handleCreateTag} />
      </div>
    </div>
  );
}
