import { PostComponent } from "../../../components/PostComponent";
import fs from "fs";
import path from "path";

async function getPostData(postId) {
  const folder = "post_md";
  const dir = path.resolve("./public", folder, postId + ".md");

  const rawData = fs.readFileSync(dir, "utf8").split("\n");
  const bodyStartRow = rawData.indexOf("HEADER END") + 1;

  return rawData.slice(bodyStartRow).join("\n");
}

export default async function Page({ params }) {
  const data = await getPostData(params.postId);
  return <PostComponent>{data}</PostComponent>;
}
