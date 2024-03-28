import Pagenation from "@/components/Pagenation/Pagenation";
import SinglePost from "@/components/Post/SinglePost";
import Tag from "@/components/Tag/Tag";
import { getAllPosts, getAllTags, getNumberOfPages, getPostForTopPage, getPostsByPage } from "@/lib/notionAPI";
import Head from "next/head";

export const getStaticPaths = async () => {
  const numberOfPage = await getNumberOfPages();

  let params = [];
  for (let i = 1; i <= numberOfPage; i++) {
    params.push({ params: { page: i.toString() } })
  }

  return {
    // paths: [
    //   { params: { page: "1" }},
    //   { params: { page: "2" }},
    //   { params: { page: "3" }},
    // ],
    paths: params,
    fallback: "blocking",
  }
}

export const getStaticProps = async (context: any) => {
  // const allPosts = await getAllPosts(); 全件取得
  // const fourPosts = await getPostForTopPage(4); 4件取得

  const currentPage = context.params?.page;
  const postByPage = await getPostsByPage(parseInt(currentPage.toString(), 10));

  const numberOfPage = await getNumberOfPages();
  const allTags = await getAllTags();

  return {
    props: {
      postByPage: postByPage,
      numberOfPage: numberOfPage,
      allTags: allTags
    },
    revalidate: 60,
  }
}

const BlogPageList = ({ postByPage, numberOfPage, allTags }: any) =>  {
  // console.log(fourPosts);
  return (
    <div className="container h-full w-full mx-auto">
      <Head>
        <title>Notion-Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/public/favicon.ico"/>
      </Head>

      <main className="container w-full">
        <Tag tags={allTags}/>
        <section className="sm:grid grid-cols-2 w-5/6 gap-3 mx-auto">
          {postByPage.map((post: any) => (
            <div className="mx-4" key={post.id}>
              <SinglePost
                imege={post.imege} 
                title={post.title}
                description={post.description}
                date={post.date}
                slug={post.slug}
                tags={post.tags}
                isPagenationPage={true}
              />
            </div>
          ))} 
        </section>
        <Pagenation 
          numberOfPage={numberOfPage}
          tag={""}
        />
      </main>
    </div>
  );
}
export default BlogPageList;