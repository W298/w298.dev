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
      className="flex flex-col justify-between bg-layer-350 border border-transparent hover:border-layer-100 transition rounded-md"
      href={`/posts/${postRowData.postId}`}
    >
      <div className="flex flex-col gap-1">
        <div className="h-32 overflow-hidden relative">
          <ImageLoading
            src={`/imgs/post_imgs/${postRowData.postId}/thumnail.png`}
            loading="lazy"
            quality={100}
            width={510}
            height={227}
            unoptimized={true}
            className="object-cover min-h-full max-w-fit rounded-t-md"
            top="4rem"
            alt={postRowData.postId + "-thumnail"}
            isFull
          />
        </div>
        <div className="px-4 py-3">
          <div className="font-light text-[12px] text-text-secondary flex flex-row gap-4">
            <div>{postRowData.header[3].split(",").join(" / ")}</div>
          </div>
          <div className="font-bold text-[18px] pt-1 pb-1.5">
            {postRowData.header[0]}
          </div>
          <div className="font-light text-[13px]">{postRowData.header[1]}</div>
        </div>
      </div>
      <div className="flex flex-col">
        <hr style={{ color: "#393939" }}></hr>
        <div className="font-light text-[13px] text-text-secondary px-4 py-2 flex justify-between">
          <div>{postRowData.header[2]}</div>
          <div>
            {postRowData.header[4] && (
              <div className="flex flex-row gap-2.5">
                <FileDirectoryIcon size={13} className="mt-[3px]" />
                <div className="font-light text-[13px]">
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
