'use client';
import { useEffect } from 'react';
import { useTags } from '@/lib/hooks/useTags';
import TagForm from '@/components/tag/TagForm';
import TagItem from '@/components/tag/TagItem';

export default function NewTagForm() {
  const { getTags, deleteTag, tags } = useTags();

  useEffect(() => {
    getTags();
  }, []);

  const handleDeleteTag = (id: number) => {
    deleteTag(id);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen pointer-events-auto">
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
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg">
        <TagForm />
      </div>
    </div>
  );
}
