import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import SingleHeader from "../SingleHeader";
import { FragmentType } from "@/__generated__";
import { NC_POST_FULL_FRAGMENT } from "@/fragments";
import SingleContent from "../SingleContent";
import Link from "next/link";
import { formatDate } from "@/components/FormatDate";

export interface SingleType1Props {
  post: any
}

const SingleType1: FC<SingleType1Props> = ({ post }) => {
  //
  const {
    title,
    content,
    date,
    author,
    databaseId,
    excerpt,
    featuredImage,
    categories,
    uri,
    ncPostMetaData,
  } = getPostDataFromPostFragment(post || {});


  let lasttestPost = (categories as any)?.nodes?.[0]?.posts?.nodes?.slice(-5)
  let layoutStyle = post?.postData?.layoutStyle?.[0] ?? "Default"

  if(layoutStyle == "Comparison") {
    layoutStyle = 2
  }else {
    layoutStyle = 1
  }

  const getBaseURL = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return '';
  };

  const baseURL = getBaseURL();

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(baseURL + uri)}`,
      'popup',
      'width=600,height=400'
    );
  };

  const shareToX = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(baseURL + uri)}&text=${encodeURIComponent(post?.title)}`,
      'popup',
      'width=600,height=400'
    );
  };

  const shareToReddit = () => {
    window.open(`https://reddit.com/submit?url=${encodeURIComponent(baseURL + uri)}&title=${encodeURIComponent(post?.title)}`,
      'popup',
      'width=600,height=400'
    );
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(baseURL + uri)}&title=${encodeURIComponent(post?.title)}`,
      'popup',
      'width=600,height=400'
    );
  };


  //
  return (
    <>
      <header className="container rounded-xl pt-4">
        {layoutStyle == 2 && (
          <p className="text-xs mb-5">If you purchase via links on our site, we may receive commissions. However, our experts carefully research and evaluate each product or service, ensuring it meets our quality standards.</p>
        )}

        <div className="flex gap-2 items-center">
          {categories?.nodes?.map((item: any, index: any) => (
            <React.Fragment key={item.id || index}>
              <Link
                className="text-sm"
                href={item?.uri ?? '/'}
              >
                {item.name}
              </Link>
              {index < (categories?.nodes?.length ?? 0) - 1 && <span>{'>'}</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="relative overflow-visible grid grid-cols-1 lg:grid-cols-3 gap-0  lg:gap-10 mt-5">
          <div className="absolute -left-16">
            <div className="fixed top-44 h-fit flex flex-col items-center gap-5">
              <p className="text-xs">Share</p>
              <div onClick={shareToFacebook} className="cursor-pointer hover:bg-slate-100 block p-2 transition-all rounded"><img src="/images/socials/facebook-icon.svg" /></div>
              <div onClick={shareToX} className="cursor-pointer hover:bg-slate-100 block p-2 transition-all rounded"><img src="/images/socials/x-icon.svg" /></div>
              <div onClick={shareToReddit} className="cursor-pointer hover:bg-slate-100 block p-2 transition-all rounded"><img src="/images/socials/reddit-icon.svg" /></div>
              <div onClick={shareToLinkedIn} className="cursor-pointer hover:bg-slate-100 block p-2 transition-all rounded"><img src="/images/socials/in-icon.svg" /></div>
            </div>
          </div>
          <div className="col-span-2">
              <SingleHeader post={{ ...post }} />
            <div className="mt-5">
              <SingleContent post={{ ...post }} />
            </div>
          </div>

          <div className="col-span-1 sticky top-20 h-fit mt-14 lg:mt-0">
            <div className="post-item">
              <h2 className="font-semibold text-2xl">Latest news</h2>
              <Link href={lasttestPost?.[0]?.uri ?? "/"}><img className="my-3 rounded w-full h-[230px] object-center object-cover" src={lasttestPost?.[0]?.featuredImage?.node?.sourceUrl} alt={lasttestPost?.[0]?.featuredImage?.node?.altText} /></Link>
              <span className="text-xs">{formatDate(lasttestPost?.[0]?.date, true, false)}</span>
              <Link href={lasttestPost?.[0]?.uri ?? "/"}><h3 className="mt-1">{lasttestPost?.[0]?.title}</h3></Link>
              <span className="block my-4 text-xs mb-5"><Link href={lasttestPost?.[0]?.uri ?? "/"} className="text-link-color font-bold">News</Link> • 2 min read</span>
            </div>
            <div className="flex flex-col gap-5">
              {lasttestPost?.length > 1 && lasttestPost?.slice(1, 5)?.map((item: any, index: any) => (
                <Link href={item?.uri ?? "/"}>
                  <div className="flex items-center gap-4 post-item">
                    <img className="rounded w-full max-w-[100px] min-w-fit h-[66px] object-cover object-center" width={100} src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
                    <p className="text-sm font-medium">{item?.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </header>
    </>
  );
};

export default SingleType1;
