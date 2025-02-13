'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTags } from '@/lib/hooks/useTags';
import TagForm from '@/components/tag/TagForm';
import TagItem from '@/components/tag/TagItem';
import Link from 'next/link';

export default function NewTagForm() {
  const { getTags, deleteTag, tags, createTag } = useTags();
  const router = useRouter();

  useEffect(() => {
    getTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteTag = (id: number, name: string) => {
    const confirmed = window.confirm(`本当にこのタグ(${name})を削除しますか？`);
    if (confirmed) {
      deleteTag(id);
    }
  };


  const handleCreateTag = async (name: string, color: string) => {
    await createTag(name, color);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative">
      <div className="w-full max-w-[1000px] h-full flex flex-col justify-center items-center relative">
        <div className="absolute top-4 left-4">
          <button
            onClick={handleGoBack}
            className="w-14 h-14 flex items-center justify-center rounded-full 
               bg-white/80 shadow-md text-[#008080] hover:bg-white hover:shadow-lg 
               transition-all duration-300 pointer-events-auto mt-[80px]"
          >
            <span className="material-icons leading-none" style={{ fontSize: "38px" }}>
              reply
            </span>
          </button>
        </div>


        <div className="pointer-events-auto flex flex-wrap justify-center mt-6 gap-2 bg-white p-2 rounded-lg">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <div key={tag.id} onClick={() => handleDeleteTag(tag.id, tag.name)}>
                <TagItem id={tag.id} name={tag.name} color={tag.color} />
              </div>
            ))
          ) : (
            <p className="text-gray-500">タグがありません。</p>
          )}
        </div>

        <div className="w-full max-w-md p-6 pointer-events-auto">
          <TagForm onCreateTag={handleCreateTag} />
        </div>
      </div>
    </div>

  );
}
