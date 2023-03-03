import fs from "fs";
import path from "path";
import Link from "next/link";

interface PostRowData {
  header: string[];
  postId: string;
}

interface PostRowProp {
  postRowData: PostRowData;
}

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

function PostRow({ postRowData }: PostRowProp) {
  return (
    <Link
      className="flex flex-col gap-3 bg-layer-350 rounded-md border border-transparent hover:border-layer-100 transition"
      href={`/posts/${postRowData.postId}`}
    >
      <div className="px-6 pt-6 pb-2">
        <div className="font-light text-sm text-text-secondary">
          {postRowData.header[3]}
        </div>
        <div className="font-extrabold text-2xl pt-1 pb-3">
          {postRowData.header[0]}
        </div>
        <div className="font-light text-sm">{postRowData.header[1]}</div>
      </div>
      <hr style={{ color: "#393939" }}></hr>
      <div className="font-light text-sm text-text-secondary px-6 pb-3">
        {postRowData.header[2]}
      </div>
    </Link>
  );
}

export default async function Page() {
  const postList = await getPostList();

  return (
    <div className="flex flex-col gap-[2rem] pb-[50vh]">
      {postList.map((postRowData) => (
        <PostRow postRowData={postRowData} />
      ))}
    </div>
  );
}
