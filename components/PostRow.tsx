import Link from "next/link";
import { FileDirectoryIcon } from "@primer/octicons-react";
import Image from "next/image";
import ImageLoading from "./ImageLoading";

interface PostRowData {
  header: string[];
  postId: string;
}

interface PostRowProp {
  postRowData: PostRowData;
}

export interface DatePost {
  date?: string;
  postRowData?: PostRowData;
}

export function PostRow({ postRowData }: PostRowProp) {
  return (
    <Link
      className="flex flex-col justify-between bg-layer-350 rounded-md border border-transparent hover:border-layer-100 transition"
      href={`/posts/${postRowData.postId}`}
    >
      <div className="flex flex-col gap-3">
        <div className="h-32 overflow-hidden relative">
          <ImageLoading
            src={`/imgs/post_imgs/${postRowData.postId}/thumnail.png`}
            loading="lazy"
            quality={100}
            unoptimized={false}
            width={510}
            height={227}
            className="object-cover min-h-full rounded-t-md"
            alt={postRowData.postId + "-thumnail"}
          />
        </div>
        <div className="px-6 py-2">
          <div className="font-light text-sm text-text-secondary flex flex-row gap-4">
            <div>{postRowData.header[3].split(",").join(" / ")}</div>
          </div>
          <div className="font-bold text-xl pt-1 pb-3">
            {postRowData.header[0]}
          </div>
          <div className="font-light text-sm">{postRowData.header[1]}</div>
        </div>
      </div>
      <div className="py-2 flex flex-col gap-3">
        <hr style={{ color: "#393939" }}></hr>
        <div className="font-light text-sm text-text-secondary px-6 flex justify-between">
          <div>{postRowData.header[2]}</div>
          <div>
            {postRowData.header[4] && (
              <div className="flex flex-row gap-2.5">
                <FileDirectoryIcon size={13} className="mt-[3px]" />
                <div className="font-light text-sm">
                  {postRowData.header[4]}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
