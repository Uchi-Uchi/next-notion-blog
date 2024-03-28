import AboutContents from '@/components/Contents/AboutContents';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const About = () => {
  return (
    <>
      <div className="container mx-auto lg:px-2 px-5 lg:w-2/5">
        <Head>
          <title>About</title>
          <meta name="About" content="説明ページ" />
        </Head>
        <main className="container w-full">
          <h1 className="text-3xl font-bold mb-4 text-center">About</h1>
          <div className="border-2 border-orange-200 bg-white p-8 rounded-md shadow-md">
            <Image 
              src="/profile.jpg"
              alt="profileImege"
              width={960} 
              height={540}
              quality={100}
              className="w-50 h-40 mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-center">駆け出しエンジニアUchiUchiの勉強を記録</h2>
            <p className="text-center text-gray-600">{AboutContents}</p>
          </div>
          <div className="mb-6 mt-3 mx-auto rounded-md px-5 block text-center">
            <Link href="/" className="text-center text-orange-600 duration-300 hover:text-orange-300 cursor-pointer">
              ホームに戻る
            </Link>
          </div>
        </main> 
      </div>
    </>
  );
}

export default About;