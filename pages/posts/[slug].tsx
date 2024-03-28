import { getAllPosts, getSinglePost } from '@/lib/notionAPI';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {vscDarkPlus} from 'react-syntax-highlighter/dist/cjs/styles/prism'

export const getStaticPaths = async () => {

  const allPosts = await getAllPosts();
  const paths = allPosts.map(({ slug }) => ({ params: { slug } }));
  
  return {
    // paths: [
    //   { params: { slug: "first-post" }},
    //   { params: { slug: "second-post" }},
    //   { params: { slug: "third-post" }},
    // ],
    paths: paths,  //pathsだけでもOK!
    fallback: "blocking",
  }
}


export const getStaticProps = async ({ params }: any) => {
  const post = await getSinglePost(params.slug);
  // console.log(post);

  return {
    props: {
      post: post,
    },
    revalidate: 60,
  }
}

const Post = ({post}: any) => {
  return (
    <>
      <section className='container lg:px-2 px-5 h-screen lg:w-2/5 mx-auto mt-20'>
        <h2 className='w-full text-2xl font-medium'>{post.metadata.title}</h2>
        <div className='border-b-2 w-1/3 mt-1 border-amber-700'></div>
        <span className='text-gray-500'>{post.metadata.date}</span>
        <br />
        {post.metadata.tags.map((tag: string, index: number) =>(
          <p className='text-white bg-orange-600 hover:bg-orange-400 rounded-xl font-medium mt-2 px-2 inline-block mr-2' key={index}>
            <Link href={`/posts/tag/${tag}/page/1`}>
              {tag}
            </Link>
          </p> 
        ))}
        <Image src={post.metadata.imege} alt='Post image' width={960} height={540} />
        <div className='mt-10 font-medium'>
          <Markdown
            components={{
              code(props) {
                const {children, className, node, ...rest} = props
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <SyntaxHighlighter
                    PreTag="div"
                    language={match[1]}
                    style={vscDarkPlus}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                )
              }
          }}>
            {post.markdown.parent}
          </Markdown>
          <div className="mb-6 mt-3 mx-auto rounded-md block text-left ">
            <Link href="/" className="text-orange-600 duration-300 hover:text-orange-300 cursor-pointer">
              ←ホームに戻る
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Post