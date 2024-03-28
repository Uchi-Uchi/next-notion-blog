import Link from 'next/link'
import React from 'react'

type Props = {
  tags: string[]
}

const Tag = (props: Props) => {

  const { tags } = props;

  return (
    <>
      <div className='mx-4'>
        <section className='border-2 border-orange-200 lg:w-1/2 mb-8 mx-auto rounded-md p-5 shadow-2xl'>
          <div className='font-medium mv-4 text-center mb-5'>タグ検索</div>
          <div className='flex flex-wrap gap-5'>
            {tags.map((tag: string, index: number) => (
              <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                <span 
                  className='cursor-pointer bg-orange-300 hover:bg-orange-200 text-amber-900 px-2 font-medium pb-1 rounded-xl bg-gray-400 inline-block'>
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

export default Tag