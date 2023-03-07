import fs from "fs";
import path from "path";
import PostSidebar from "../../components/PostSidebar";
import Sidebar from "../../components/Sidebar";

async function getPostStructure() {
  const folder = "post_md";
  const dir = path.resolve("./public", folder);
  const structure = {};

  fs.readdirSync(dir).forEach((fileName) => {
    const filePath = path.resolve(dir, fileName);

    const rawData = fs
      .readFileSync(filePath, "utf8")
      .split("\n")
      .filter(Boolean);
    const startRow = rawData.indexOf("HEADER START");
    const endRow = rawData.indexOf("HEADER END");

    const header = rawData.slice(startRow + 1, endRow);
    const postId = fileName.split(".")[0];
    const tagList =
      header.length < 4 ? ["All"] : ["All", ...header[3].split(",")];

    tagList.forEach((tag) => {
      if (tag in structure) {
        structure[tag].push({
          title: header[0],
          date: header[2],
          tags: header[3],
          postId,
        });
      } else {
        structure[tag] = [];
        structure[tag].push({
          title: header[0],
          date: header[2],
          tags: header[3],
          postId,
        });
      }
    });
  });

  return structure;
}

export default async function PostLayout({ children }) {
  const structure = await getPostStructure();

  return (
    <div className="max-w-[90rem] m-auto flex flex-row gap-5">
      <Sidebar>
        <PostSidebar structure={structure} />
      </Sidebar>
      <div className="min-[700px]:ml-80 w-full">
        <div className="m-8">{children}</div>
      </div>
    </div>
  );
}
