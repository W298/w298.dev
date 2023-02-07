import Link from "next/link";

export default function PostStructureLink({ title, postId, expanded }) {
  return (
    <Link
      className={`block py-[0.4rem] px-10 cursor-pointer text-text-secondary border-l-custom hover:bg-layer-300 transition ${
        expanded ? "block" : "hidden"
      }`}
      href={`/posts/${postId}`}
    >
      {title}
    </Link>
  );
}
