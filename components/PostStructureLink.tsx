import Link from "next/link";

interface PostStructureLinkProp {
  title: string;
  postId: string;
  expanded: boolean;
  active: boolean;
}

export default function PostStructureLink({
  title,
  postId,
  expanded,
  active,
}: PostStructureLinkProp) {
  return (
    <Link
      className={`block py-[0.4rem] px-10 cursor-pointer text-text-secondary border-l-custom hover:bg-layer-300 transition ${
        expanded ? "block" : "hidden"
      } ${active ? "border-l-custom-active bg-layer-300" : ""}`}
      href={`/posts/${postId}`}
    >
      {title}
    </Link>
  );
}
