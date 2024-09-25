import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import SingleHeader from "../SingleHeader";
import { FragmentType } from "@/__generated__";
import { NC_POST_FULL_FRAGMENT } from "@/fragments";
import SingleContent from "../SingleContent";
import Link from "next/link";
import { formatDate } from "@/components/FormatDate";
import SingleTitle from "../SingleTitle";

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

  if (layoutStyle == "Comparison") {
    layoutStyle = 2
  } else {
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

        <div className="flex gap-3 items-center">
          {categories?.nodes?.map((item: any, index: any) => (
            <React.Fragment key={item.id || index}>
              <Link
                className="text-sm font-light"
                href={item?.uri ?? '/'}
              >
                {item.name}
              </Link>
              {index < (categories?.nodes?.length ?? 0) - 1 && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={6} fill="#696969"><path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"/></svg>}
            </React.Fragment>
          ))}
        </div>

        <div className="my-4">
          <h1>{title}</h1>
          <span className="text-sm !mt-0 py-3 block border-b border-slate-200">
            By{' '}
            <Link
              href={author?.uri ?? '/'}
              className="text-link-color capitalize"
            >
              {author?.name}
            </Link>{' '}
            &nbsp;&#8226;&nbsp; Updated {formatDate(date, true)}{' '}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs flex items-center gap-2 bg-[#eff8ff] py-1 px-3 rounded-full"><img src="/images/posts/check-icon.svg" alt="" /> Expert reviewed by</span>
          <Link href={"/experts"} className="text-xs hover:underline underline-offset-2 text-link-color">Our Research Team</Link>
        </div>

        <div className="relative overflow-visible grid grid-cols-1 lg:grid-cols-3 gap-0  lg:gap-10 mt-5">
          <div className="absolute -left-16 hidden min-[1300px]:block">
            <div className="fixed top-44 h-fit flex flex-col items-center gap-5">
              <p className="text-xs">Share</p>
              <div onClick={shareToFacebook} className="cursor-pointer hover:bg-slate-100 block p-2 transition-all rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="20" viewBox="0 0 20 20" width="20"><path d="m20 10c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.891h2.54v-2.203c0-2.506 1.492-3.89 3.777-3.89 1.093 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.563v1.875h2.773l-.443 2.89h-2.33v6.988c4.78-.749 8.437-4.887 8.437-9.878" fill="#8a94a4" /></svg>
              </div>
              <div onClick={shareToX} className="cursor-pointer hover:bg-slate-100 block p-2 transition-all rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="20" viewBox="0 0 20 20" width="20"><path clip-rule="evenodd" d="m13.288 19.167-4.625-6.591-5.789 6.591h-2.45l7.153-8.14-7.152-10.193h6.288l4.359 6.213 5.46-6.213h2.45l-6.82 7.764 7.414 10.57zm2.727-1.858h-1.649l-10.433-14.617h1.647l4.18 5.853.722 1.016z" fill="#8a94a4" fill-rule="evenodd" /></svg>
              </div>
              <div onClick={shareToReddit} className="cursor-pointer hover:bg-slate-100 block p-2 transition-all rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="25" viewBox="0 0 24 24"><path clip-rule="evenodd" d="m21 12c0 4.9706-4.0294 9-9 9-4.97056 0-9-4.0294-9-9 0-4.97056 4.02944-9 9-9 4.9706 0 9 4.02944 9 9zm-4.3157-1.3158c.7263 0 1.3158.5895 1.3158 1.3158 0 .5368-.3263 1-.7579 1.2105.021.1263.0316.2526.0316.3895 0 2.021-2.3474 3.6526-5.2527 3.6526-2.90524 0-5.25261-1.6316-5.25261-3.6526 0-.1369.01053-.2737.03158-.4-.46316-.2105-.77895-.6632-.77895-1.2 0-.7263.58948-1.3158 1.31579-1.3158.34737 0 .67369.1474.90527.3684.90526-.6631 2.15792-1.07367 3.55792-1.11578l.6631-3.13684c.0211-.06316.0527-.11579.1053-.14737s.1158-.0421.1789-.03158l2.179.46316c.1474-.31579.4631-.52631.8316-.52631.5158 0 .9368.42105.9368.93684s-.421.93684-.9368.93684c-.5053 0-.9158-.4-.9369-.89474l-1.9473-.41052-.6 2.81052c1.3684.05263 2.6105.47368 3.5052 1.11578.2316-.2316.5474-.3684.9053-.3684zm-6.74739 1.3158c-.51578 0-.93684.421-.93684.9368s.42106.9369.93684.9369c.51579 0 .93689-.4211.93689-.9369s-.4211-.9368-.93689-.9368zm2.07369 4.0947c.3579 0 1.5789-.0421 2.2211-.6842.0947-.0947.0947-.2421.021-.3474-.0947-.0947-.2526-.0947-.3474 0-.4105.4-1.2631.5474-1.8842.5474-.621 0-1.4842-.1474-1.8842-.5474-.0947-.0947-.25262-.0947-.34735 0-.09474.0948-.09474.2527 0 .3474.63155.6316 1.86315.6842 2.22105.6842zm1.1158-3.1579c0 .5158.421.9369.9368.9369s.9369-.4211.9369-.9369-.4211-.9368-.9369-.9368-.9368.421-.9368.9368z" fill="#8a94a4" fill-rule="evenodd" /></svg>
              </div>
              <div onClick={shareToLinkedIn} className="cursor-pointer hover:bg-slate-100 block p-2 transition-all rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path fill="#8a94a4" d="M18.52 0H1.477C.66 0 0 .645 0 1.441v17.114C0 19.352.66 20 1.477 20H18.52c.816 0 1.48-.648 1.48-1.441V1.44C20 .645 19.336 0 18.52 0M5.934 17.043h-2.97V7.496h2.97zM4.449 6.195a1.72 1.72 0 1 1-.006-3.439 1.72 1.72 0 0 1 .006 3.44m12.594 10.848h-2.965v-4.64c0-1.106-.02-2.532-1.543-2.532-1.543 0-1.777 1.207-1.777 2.453v4.719H7.797V7.496h2.844v1.305h.039c.394-.75 1.363-1.543 2.804-1.543 3.004 0 3.559 1.976 3.559 4.547z" /></svg>
              </div>
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
              <h3>Latest news</h3>
              <Link href={lasttestPost?.[0]?.uri ?? "/"}><img className="my-3 rounded w-full h-auto lg:h-[230px] object-center object-cover" src={lasttestPost?.[0]?.featuredImage?.node?.sourceUrl} alt={lasttestPost?.[0]?.featuredImage?.node?.altText} /></Link>
              <span className="text-xs">{formatDate(lasttestPost?.[0]?.date, true, false)}</span>
              <Link href={lasttestPost?.[0]?.uri ?? "/"}><h5 className="mt-1 font-semibold">{lasttestPost?.[0]?.title}</h5></Link>
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
