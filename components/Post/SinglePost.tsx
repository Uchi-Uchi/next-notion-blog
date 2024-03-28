import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type Props = {
  imege: string
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  isPagenationPage: boolean;
}

const SinglePost = (props: Props) => {

  const { imege, title, description, date, slug, tags, isPagenationPage } = props;

  return (
    <>
      {isPagenationPage ? (
        <>
          <section className='border-2 border-orange-200 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300'>
            <div className='flex flex-col'> 
              <h2 className='text-gray-900 hover:text-gray-500 text-2xl font-medium mb-2' >
                <Link href={`/posts/${slug}`}>
                  {title}
                </Link>
              </h2>
              <div className='text-gray-400 mb-2'>{date}</div> 
              <div className='flex flex-wrap'> 
                {tags.map((tag: string, index: number) => (
                  <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                    <span className='text-white bg-orange-600 hover:bg-orange-400 rounded-xl px-2 font-medium mr-2 mb-2'> 
                      {tag}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <p className='text-gray-900'>{description}</p>
            <Image src={imege} alt='Post image' width={960} height={540} />
          </section> 
        </>
      ) : (
        <>
          <section className='border-2 border-orange-200 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300'>
            <div className='flex flex-col'> 
              <h2 className='text-gray-900 hover:text-gray-500 text-2xl font-medium mb-2' >
                <Link href={`/posts/${slug}`}>
                  {title}
                </Link>
              </h2>
              <div className='text-gray-400 mb-2'>{date}</div> 
              <div className='flex flex-wrap'> 
                {tags.map((tag: string, index: number) => (
                  <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                    <span className='text-white bg-orange-600 hover:bg-orange-400 rounded-xl px-2 font-medium mr-2 mb-2'> 
                      {tag}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <p className='text-gray-900'>{description}</p>
            <Image src={imege} alt='Post image' width={960} height={540} />
          </section> 
        </>
      )}    
    </>
  )
}

export default SinglePost