import { PostComponent } from "../../../components/PostComponent";
import fs from "fs";
import path from "path";

async function getPostData(postId) {
  const folder = "post_md";
  const dir = path.resolve("./public", folder, postId + ".md");
  const res = fs.readFileSync(dir, "utf8");

  return res;
}

export default async function Page({ params }) {
  const data = await getPostData(params.postId);
  return <PostComponent>{data}</PostComponent>;
}
