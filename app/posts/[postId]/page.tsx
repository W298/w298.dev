import { PostComponent } from "../../../components/PostComponent";

var fs = require("fs");

async function getPostData(postId) {
  return fs.readFileSync(`public/post_md/${postId}.md`, "utf8");
}

export default async function Page({ params }) {
  const data = await getPostData(params.postId);
  return <PostComponent>{data}</PostComponent>;
}
