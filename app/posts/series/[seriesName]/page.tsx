import fs from "fs";
import path from "path";
import { PostRow, DatePost } from "../../../../components/PostRow";

async function getPostList(searchSeriesName) {
  const folder = "post_md";
  const dir = path.resolve("./public", folder);
  let postList = fs.readdirSync(dir).map((fileName) => {
    const filePath = path.resolve(dir, fileName);

    const rawData = fs
      .readFileSync(filePath, "utf8")
      .split("\n")
      .filter(Boolean);
    const startRow = rawData.indexOf("HEADER START");
    const endRow = rawData.indexOf("HEADER END");

    const header = rawData.slice(startRow + 1, endRow);
    const postId = fileName.split(".")[0];

    if (header[4] == null || header[4].toLowerCase() != searchSeriesName)
      return {};
    return { header, postId };
  });

  postList = postList.filter((d) => "header" in d && "postId" in d);

  let sortedPostList = postList.sort((a, b) => {
    let aDate = new Date(a.header[2]);
    let bDate = new Date(b.header[2]);
    return aDate > bDate ? -1 : aDate == bDate ? 0 : 1;
  });

  return sortedPostList;
}

export default async function Page({ params }) {
  const postList = await getPostList(params.seriesName);

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
              <div className="grid max-[1180px]:grid-cols-1 grid-cols-2 gap-5">
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
