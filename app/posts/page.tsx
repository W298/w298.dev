import fs from "fs";
import path from "path";
import Link from "next/link";

async function getPostList() {
  const folder = "post_md";
  const dir = path.resolve("./public", folder);
  const postList = fs.readdirSync(dir).map((fileName) => {
    const filePath = path.resolve(dir, fileName);

    const rawData = fs
      .readFileSync(filePath, "utf8")
      .split("\n")
      .filter(Boolean);
    const startRow = rawData.indexOf("HEADER START");
    const endRow = rawData.indexOf("HEADER END");

    const header = rawData.slice(startRow + 1, endRow);
    const postId = fileName.split(".")[0];
    return { header, postId };
  });

  return postList;
}

function PostRow({ postData }) {
  return (
    <Link
      className="flex flex-col gap-1 p-6 bg-layer-350 rounded-md border border-transparent hover:border-layer-100 transition"
      href={`/posts/${postData.postId}`}
    >
      <div className="font-extrabold text-2xl pb-2">{postData.header[0]}</div>
      <div className="font-light text-sm text-text-secondary">
        {postData.header[1]}
      </div>
      <div className="font-light text-sm text-text-secondary">
        {postData.header[2]}
      </div>
    </Link>
  );
}

export default async function Page() {
  const postList = await getPostList();

  return (
    <div className="flex flex-col gap-[2rem]">
      {postList.map((postData) => (
        <PostRow postData={postData} />
      ))}
    </div>
  );
}
