import React, { FC, useEffect, useState } from "react";
import SingleTitle from "./SingleTitle";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import { NC_POST_FULL_FRAGMENT } from "@/fragments";
import { FragmentType } from "@/__generated__";
import Link from "next/link";
import { formatDate } from "@/components/FormatDate";
import Rating from "@/components/Rating";

export interface SingleHeaderProps {
  hiddenDesc?: boolean;
  titleMainClass?: string;
  className?: string;
  post: any
}

const SingleHeader: FC<SingleHeaderProps> = ({
  titleMainClass,
  hiddenDesc = false,
  className = "",
  post,
}) => {
  const {
    title,
    content,
    excerpt,
    ncPostMetaData,
    categories,
    commentCount,
    databaseId,
    featuredImage,
    uri,
    date,
    author
  } = getPostDataFromPostFragment(post || {});

  let layoutStyle = post?.postData?.layoutStyle?.[0] ?? "Default"

  if (layoutStyle == "Comparison") {
    layoutStyle = 2
  } else {
    layoutStyle = 1
  }

  const products = post?.postData?.products
  const [headings, setHeadings] = useState<string[]>([]);

  const addIdsToH2Tags = (htmlContent: any) => {
    return htmlContent.replace(/<h2(.*?)>(.*?)<\/h2>/g, (match: any, p1: any, p2: any) => {
      const id = p2.trim().toLowerCase().replace(/[\s]+/g, '-').replace(/[^\w\-]+/g, '');
      return `<h2${p1} id="${id}">${p2}</h2>`;
    });
  };

  const updatedContent = addIdsToH2Tags(content);

  useEffect(() => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    const h2Elements = tempDiv.querySelectorAll('h2');
    const headingsArray = Array.from(h2Elements)
      .map((h2) => h2.textContent)
      .filter((text): text is string => text !== null);
    setHeadings(headingsArray);
  }, [content]);

  function strToSlug(str: any) {
    return str
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  const convertProsToArray = (prosString: any) => prosString?.trim()?.split('\n')?.map((line: any) => line.trim());

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


  return (
    <>
      <div className="space-y-4 lg:space-y-5">

        {headings.length > 0 && (
          <div className="mt-5 menu-article">
            <ul className="bg-[#f9f9f9] py-2 px-4 border-[#e9e9e9] flex flex-col md:flex-row items-start md:items-center gap-x-5 gap-y-2 flex-wrap">
              {headings?.map((heading: any, index: any) => (
                <React.Fragment key={index}>
                  <li><Link href={"#" + strToSlug(heading)} className="text-link-color text-base line-clamp-1">{heading}</Link></li>
                  {index < headings.length - 1 && <span className="text-xs hidden md:block">•</span>}
                </React.Fragment>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-2">
          <img src={featuredImage?.sourceUrl ?? "/"} alt={featuredImage?.altText ?? ""} className="w-full max-h-[400px] object-cover object-center rounded" />
          <span className="mt-3 block text-xs">Image by Prostock-studio</span>
        </div>

        <div className="h-fit justify-between items-center gap-5 flex hide-desktop">
          <p className="text-xs">Share</p>
          <div onClick={shareToFacebook} className="cursor-pointer hover:bg-slate-100 block p-2 transition-all rounded">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="18" viewBox="0 0 20 20" width="18"><path d="m20 10c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.891h2.54v-2.203c0-2.506 1.492-3.89 3.777-3.89 1.093 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.563v1.875h2.773l-.443 2.89h-2.33v6.988c4.78-.749 8.437-4.887 8.437-9.878" fill="#8a94a4" /></svg>
          </div>
          <div onClick={shareToX} className="cursor-pointer hover:bg-slate-100 block p-2 transition-all rounded">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="18" viewBox="0 0 20 20" width="18"><path clip-rule="evenodd" d="m13.288 19.167-4.625-6.591-5.789 6.591h-2.45l7.153-8.14-7.152-10.193h6.288l4.359 6.213 5.46-6.213h2.45l-6.82 7.764 7.414 10.57zm2.727-1.858h-1.649l-10.433-14.617h1.647l4.18 5.853.722 1.016z" fill="#8a94a4" fill-rule="evenodd" /></svg>
          </div>
          <div onClick={shareToReddit} className="cursor-pointer hover:bg-slate-100 block p-2 transition-all rounded">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="24" viewBox="0 0 24 24"><path clip-rule="evenodd" d="m21 12c0 4.9706-4.0294 9-9 9-4.97056 0-9-4.0294-9-9 0-4.97056 4.02944-9 9-9 4.9706 0 9 4.02944 9 9zm-4.3157-1.3158c.7263 0 1.3158.5895 1.3158 1.3158 0 .5368-.3263 1-.7579 1.2105.021.1263.0316.2526.0316.3895 0 2.021-2.3474 3.6526-5.2527 3.6526-2.90524 0-5.25261-1.6316-5.25261-3.6526 0-.1369.01053-.2737.03158-.4-.46316-.2105-.77895-.6632-.77895-1.2 0-.7263.58948-1.3158 1.31579-1.3158.34737 0 .67369.1474.90527.3684.90526-.6631 2.15792-1.07367 3.55792-1.11578l.6631-3.13684c.0211-.06316.0527-.11579.1053-.14737s.1158-.0421.1789-.03158l2.179.46316c.1474-.31579.4631-.52631.8316-.52631.5158 0 .9368.42105.9368.93684s-.421.93684-.9368.93684c-.5053 0-.9158-.4-.9369-.89474l-1.9473-.41052-.6 2.81052c1.3684.05263 2.6105.47368 3.5052 1.11578.2316-.2316.5474-.3684.9053-.3684zm-6.74739 1.3158c-.51578 0-.93684.421-.93684.9368s.42106.9369.93684.9369c.51579 0 .93689-.4211.93689-.9369s-.4211-.9368-.93689-.9368zm2.07369 4.0947c.3579 0 1.5789-.0421 2.2211-.6842.0947-.0947.0947-.2421.021-.3474-.0947-.0947-.2526-.0947-.3474 0-.4105.4-1.2631.5474-1.8842.5474-.621 0-1.4842-.1474-1.8842-.5474-.0947-.0947-.25262-.0947-.34735 0-.09474.0948-.09474.2527 0 .3474.63155.6316 1.86315.6842 2.22105.6842zm1.1158-3.1579c0 .5158.421.9369.9368.9369s.9369-.4211.9369-.9369-.4211-.9368-.9369-.9368-.9368.421-.9368.9368z" fill="#8a94a4" fill-rule="evenodd" /></svg>
          </div>
          <div onClick={shareToLinkedIn} className="cursor-pointer hover:bg-slate-100 block p-2 transition-all rounded">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 20 20"><path fill="#8a94a4" d="M18.52 0H1.477C.66 0 0 .645 0 1.441v17.114C0 19.352.66 20 1.477 20H18.52c.816 0 1.48-.648 1.48-1.441V1.44C20 .645 19.336 0 18.52 0M5.934 17.043h-2.97V7.496h2.97zM4.449 6.195a1.72 1.72 0 1 1-.006-3.439 1.72 1.72 0 0 1 .006 3.44m12.594 10.848h-2.965v-4.64c0-1.106-.02-2.532-1.543-2.532-1.543 0-1.777 1.207-1.777 2.453v4.719H7.797V7.496h2.844v1.305h.039c.394-.75 1.363-1.543 2.804-1.543 3.004 0 3.559 1.976 3.559 4.547z" /></svg>
          </div>
        </div>

        <div
          id="single-content"
          className="prose max-w-full text-[#2f3745]"
          dangerouslySetInnerHTML={{ __html: updatedContent }}
        />

        {layoutStyle == 2 && (
          <div className="py-8 border-y border-slate-600">
            <h2 className="mb-3">📝Our editor's top picks</h2>
            <p>Discover our curated list of some of the best grounding sheets on the market in our dedicated article. Each product was carefully vetted by the Healthnews Team.</p>
            <div className="mt-5">
              {products?.length && products?.map((item: any, index: any) => (
                <div className="review-item mb-20" key={index}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="review-item-image relative col-span-1 min-h-[300px] md:min-h-[400px]">
                      {item?.isBestSeller && (
                        <img className="absolute top-3 left-3" width={80} src="/images/posts/editor-choice.svg" alt="Editor Choice Award" />
                      )}
                      <img src={item?.image?.node?.sourceUrl} alt={item?.image?.node?.altText} />
                      {item?.salePercentage && (
                        <span className="absolute top-0 right-10 bg-black text-white p-2 px-5 -rotate-90 transform origin-top-right">{item?.salePercentage}% OFF</span>
                      )}
                    </div>
                    <div className="col-span-1">
                      <h5 className="font-semibold">{item?.name}</h5>
                      <p className="my-2 text-base">From {item?.brand}</p>
                      <div className="flex items-center gap-2 text-xs mt-3 mb-4">
                        <Rating rating={item?.rating?.starRating}></Rating>
                        <span><strong>{item?.rating?.starRating} / 5</strong> | {item?.rating?.totalReviews} Reviews</span>
                      </div>

                      {(item?.price?.salePrice || item?.price?.originPrice) && (
                        <div className="prod-price mb-4 flex items-end gap-3">
                          <strong className="text-2xl">{item?.price?.salePrice}</strong>
                          <span className="line-through text-slate-500">{item?.price?.originPrice}</span>
                        </div>
                      )}

                      {item?.actionButtons?.length && item?.actionButtons?.map((actionButton: any, index: any) => (
                        <Link href={actionButton?.actionLink ?? "/"} className="mb-3 bg-black text-white w-full block p-2 text-center">
                          <button className="text-center text-sm font-bold ">{actionButton?.actionText}</button>
                        </Link>
                      ))}

                      <div className="product-spec-list mt-10 flex flex-col gap-4 text-base" dangerouslySetInnerHTML={{ __html: item?.description?.shortDescription }}></div>
                    </div>
                  </div>

                  {(convertProsToArray(item?.prosCons?.pros)?.length || convertProsToArray(item?.prosCons?.cons)?.length) && (
                    <div className={`pros grid grid-cols-1 md:grid-cols-2 ${!item?.description?.shortDescription ? 'mt-5 md:mt-10' : 'mt-10'} `}>
                      <div className="col-span-1 border border-slate-300 p-4">
                        <strong className="pb-1">Pros</strong>
                        <ul className="mt-3 flex flex-col gap-3">
                          {convertProsToArray(item.prosCons.pros)?.map((node: any, index: number) => node && (
                            <li key={index} className="flex gap-2 items-start text-[15px]">
                              <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="18"><path d="m9 20.42-6.21-6.21 2.83-2.83 3.38 3.39 9.88-9.89 2.83 2.83z" fill="#0ec167" /></svg>
                              <p>{node}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-span-1 cons border border-slate-300 border-l md:border-l-0 border-t-0 md:border-t p-4">
                        <strong className="pb-1">Cons</strong>
                        <ul className="mt-3 flex flex-col gap-3">
                          {convertProsToArray(item.prosCons.cons)?.map((node: any, index: number) => (
                            index % 2 === 0 && node.nodeName !== '#text' && (
                              <li key={index} className="flex gap-2 items-start text-[15px]">
                                <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="18"><path d="m20 14h-16v-4h16z" fill="#ef171b" /></svg>
                                <p>{node}</p>
                              </li>
                            )
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="product-content mt-8">
                    <div className=" text-lg" dangerouslySetInnerHTML={{ __html: item?.description?.content }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleHeader;
