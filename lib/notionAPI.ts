import { NUMBER_OF_POSTS_PERE_PAGE } from "@/constants/constants";
import { Client } from "@notionhq/client";
const { NotionToMarkdown } = require("notion-to-md");

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getAllPosts = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || "",
    page_size: 100,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      }
    ]
  });

  const allPosts = posts.results;

  return allPosts.map((post) => {
    return getPageMetaData(post);
  });
};

const getPageMetaData = (post: any ) => {

  const getTags = (tags: any) => {
    const allTags = tags.map((tag: any) => {
      return tag.name
    });
    return allTags;
  }
  // console.log(post.properties.Image.files[0].file.url)

  return {
    id: post.id,
    imege: post.properties.Image.files[0].file.url,
    title: post.properties.Name.title[0].plain_text,
    description: post.properties.Description.rich_text[0].plain_text,
    date: post.properties.Date.date.start,
    slug: post.properties.Slug.rich_text[0].plain_text,
    tags: getTags(post.properties.Tags.multi_select),
  }
}

export const getSinglePost = async (slug: any) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || "",
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        }
      }
    }
  })

  const page = response.results[0];
  const metadata = getPageMetaData(page)
  // console.log(metadata);

  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdBlocks);
  console.log(mdString);

  return {
    metadata: metadata,
    markdown: mdString,
  }
} 

/* TOPページ用記事の取得(4つ) */
export const getPostForTopPage = async (pageSixe: number) => {
  const allPosts = await getAllPosts();
  const fourPosts = allPosts.slice(0, pageSixe);

  return fourPosts;
}

/* ページ蛮行に応じた記事取得 */
export const getPostsByPage = async (page: number) => {
  const allPosts = await getAllPosts();

  const startIndex = (page - 1) * NUMBER_OF_POSTS_PERE_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PERE_PAGE;

  return allPosts.slice(startIndex, endIndex);
}

export const  getNumberOfPages = async () => {
  const allPosts = await getAllPosts();

  return (
    Math.floor(allPosts.length / NUMBER_OF_POSTS_PERE_PAGE) + 
    (allPosts.length % NUMBER_OF_POSTS_PERE_PAGE > 0 ? 1 : 0)
  )
}

export const getPostsByTagAndPage = async (tagName: string, page: number) => {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter((post) => 
    post.tags.find((tag: string) => tag === tagName )
  );

  const startIndex = (page - 1) * NUMBER_OF_POSTS_PERE_PAGE;
  const endIndex = startIndex + NUMBER_OF_POSTS_PERE_PAGE;

  return posts.slice(startIndex, endIndex);
}
/* タグの一覧取得(重複なし)*/
export const getAllTags = async () => {
  const allPosts = await getAllPosts();

  const allTagsDuplicationLists = allPosts.flatMap((post) => post.tags);
  const set = new Set(allTagsDuplicationLists);
  const allTagList = Array.from(set);
  // console.log(allTagList);

  return allTagList;
}

export const getNumberOfPagesByTag = async (tagName: string) => {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter((post) => 
    post.tags.find((tag: string) => tag === tagName)
  );

  return (
    Math.floor(posts.length / NUMBER_OF_POSTS_PERE_PAGE) + 
    (posts.length % NUMBER_OF_POSTS_PERE_PAGE > 0 ? 1 : 0)
  )

}