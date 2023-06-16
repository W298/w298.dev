import fs from "fs";
import path from "path";
import Link from "next/link";

interface PostRowData {
  header: string[];
  postId: string;
}

interface DatePost {
  date?: string;
  postRowData?: PostRowData;
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

  let sortedPostList = postList.sort((a, b) => {
    let aDate = new Date(a.header[2]);
    let bDate = new Date(b.header[2]);
    return aDate > bDate ? -1 : aDate == bDate ? 0 : 1;
  });

  return sortedPostList;
}

function PostRow({ postRowData }: PostRowProp) {
  return (
    <Link
      className="flex flex-col gap-3 bg-layer-350 rounded-md border border-transparent hover:border-layer-100 transition"
      href={`/posts/${postRowData.postId}`}
    >
      <div className="px-6 pt-6 pb-2">
        <div className="font-light text-sm text-text-secondary">
          {postRowData.header[3].split(",").join(" / ")}
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

  const dateMap: DatePost = {};
  postList.forEach(({ postId, header }) => {
    const key = header[2].substring(0, 7);
    if (key in dateMap) dateMap[key].push({ postId, header });
    else dateMap[key] = [{ postId, header }];
  });

  return (
    <div className="pb-[40vh]">
      {Object.entries(dateMap)
        .sort(([ad, al], [bd, bl]) => (new Date(ad) < new Date(bd) ? 1 : -1))
        .map(([date, list]) => {
          return (
            <div className="pb-20 flex flex-col gap-4">
              <div className="text-text-secondary">{date}</div>
              <div className="grid max-[1000px]:grid-cols-1 min-[1000px]:grid-cols-2 gap-8">
                {list
                  .sort((a, b) =>
                    new Date(a.header[2]) < new Date(b.header[2]) ? 1 : -1
                  )
                  .map((postRowData) => (
                    <PostRow
                      key={`post-row-${postRowData.postId}`}
                      postRowData={postRowData}
                    />
                  ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}
