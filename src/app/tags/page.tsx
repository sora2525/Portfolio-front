'use client';
import { useEffect } from 'react';
import { useTags } from '@/lib/hooks/useTags';
import TagForm from '@/components/tag/TagForm';
import TagItem from '@/components/tag/TagItem';
import Link from 'next/link';

export default function NewTagForm() {
  const { getTags, deleteTag, tags, createTag } = useTags();

  useEffect(() => {
    getTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteTag = (id: number) => {
    deleteTag(id);
  };

  const handleCreateTag = async (name: string, color: string) => {
    await createTag(name, color);  // タグ作成後、getTagsが呼ばれて最新のタグが反映される
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen pointer-events-auto">
        <Link href="/tasks">タスク一覧へ</Link>
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
    </>
  );
}
