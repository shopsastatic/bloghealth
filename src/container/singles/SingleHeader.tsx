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
  const [headings, setHeadings] = useState([]);

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
    const headingsArray = Array.from(h2Elements).map((h2) => h2.textContent);
    setHeadings(headingsArray?.length > 0 ? headingsArray);
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


  return (
    <>
      <div className="space-y-4 lg:space-y-5">
        <SingleTitle mainClass={titleMainClass} title={title || ""} />

        <span className="text-sm !mt-0 py-3 block border-b border-slate-200">
          By{' '}
          <Link
            href={author?.uri ?? '/'}
            className="text-link-color capitalize"
          >
            {author?.name}
          </Link>{' '}
          &nbsp;&#8226;&nbsp; updated {formatDate(date, true)}{' '}
        </span>

        <div className="flex items-center gap-3">
          <span className="text-xs flex items-center gap-2 bg-[#eff8ff] py-1 px-3 rounded-full"><img src="/images/posts/check-icon.svg" alt="" /> Expert reviewed by</span>
          <Link href={"/experts"} className="text-xs hover:underline underline-offset-2 text-link-color">Our Research Team</Link>
        </div>

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

        <div
          id="single-content"
          className="prose max-w-full"
          dangerouslySetInnerHTML={{ __html: updatedContent }}
        />

        {layoutStyle == 2 && (
          <div className="py-8 border-y border-slate-600">
            <h2 className="mb-3">📝Healthnews editor's top picks</h2>
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
                      <h4 className="text-xl font-semibold">{item?.name}</h4>
                      <p className="my-2">From {item?.brand}</p>
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
                    <div className={`pros grid grid-cols-2 ${!item?.description?.shortDescription ? 'mt-5 md:mt-10' : 'mt-10'} `}>
                      <div className="col-span-1 border border-slate-300 p-4">
                        <strong className="pb-1">Pros</strong>
                        <ul className="mt-3 flex flex-col gap-3">
                          {convertProsToArray(item.prosCons.pros)?.map((node: any, index: number) => node && (
                            <li key={index} className="flex gap-2 items-start text-[15px]">
                              <img width={15} className="pros-cons-icon" src={"/images/posts/circle-check.svg"} alt="" />
                              <p>{node}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-span-1 cons border border-slate-300 border-l-0 p-4">
                        <strong className="pb-1">Cons</strong>
                        <ul className="mt-3 flex flex-col gap-3">
                          {convertProsToArray(item.prosCons.cons)?.map((node: any, index: number) => (
                            index % 2 === 0 && node.nodeName !== '#text' && (
                              <li key={index} className="flex gap-2 items-start text-[15px]">
                                <img width={15} className="pros-cons-icon" src={"/images/posts/circle-xmark.svg"} alt="" />
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
