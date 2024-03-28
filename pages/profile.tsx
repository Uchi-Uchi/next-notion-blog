import profileContents from '@/components/Contents/ProfileContents';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Profile = () => {
  return (
    <>
      <div className="container mx-auto lg:px-2 px-5 lg:w-2/5">
        <Head>
          <title>Profile</title>
          <meta name="profile" content="プロフィールページ" />
        </Head>
        <main className="container w-full">
          <h1 className="text-3xl font-bold mb-4 text-center">Profile</h1>
          <div className="border-2 border-orange-200 bg-white p-8 rounded-md shadow-md">
            <Image 
              src="/profile.jpg"
              alt="profileImege"
              width={960} 
              height={540}
              quality={100}
              className="rounded-full w-32 h-32 mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-center">駆け出しエンジニア</h3>
            <h2 className="text-xl font-bold text-center">UchiUchi</h2>
            <p className="text-center text-gray-600">{profileContents}</p>
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

export default Profile;