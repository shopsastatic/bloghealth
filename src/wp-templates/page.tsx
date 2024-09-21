import { gql } from "@/__generated__";
import EntryHeader from "../components/entry-header";
import {
  GetPageQuery,
  NcgeneralSettingsFieldsFragmentFragment,
} from "../__generated__/graphql";
import { FaustTemplate, flatListToHierarchical } from "@faustwp/core";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import PageLayout from "@/container/PageLayout";
import MyWordPressBlockViewer from "@/components/MyWordPressBlockViewer";
import Home from "@/pages/Home";
import Link from "next/link";
import ButtonPrimary from "@/components/Button/ButtonPrimary";

const Page: FaustTemplate<GetPageQuery> = (props) => {
  // LOADING ----------
  if (props.loading) {
    return <>Loading...</>;
  }

  // for this page
  const { title, editorBlocks, featuredImage, ncPageMeta } =
    props.data?.page || {};

  const isGutenbergPage =
    !!props.__SEED_NODE__?.isFrontPage || ncPageMeta?.isFullWithPage;

  const blocks = flatListToHierarchical(editorBlocks as any, {
    idKey: "clientId",
    parentKey: "parentClientId",
  });

  const homeData = props?.data?.page2?.pageCategory
  const postBanner = homeData?.postBanner?.nodes
  const breakingNews = homeData?.breakingNews?.nodes
  const homeCategory1 = homeData?.homeCategory1?.nodes?.[0]
  const homeCategory2 = homeData?.homeCategory2?.nodes?.[0]
  const homeCategory3 = homeData?.homeCategory3?.nodes?.[0]
  const homeCategory4 = homeData?.homeCategory4?.nodes?.[0]

  if (props.__SEED_NODE__?.isFrontPage) {
    return (
      <>
        <PageLayout
          headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
          footerMenuItems={homeData || []}
          pageFeaturedImageUrl={featuredImage?.node?.sourceUrl}
          pageTitle={title}
          generalSettings={
            props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
          }
        >
          <div className="container">
            <div className="banner grid grid-cols-1 md:grid-cols-2 mt-10 gap-10 md:gap-5">
              <div className='col-span-1'>
                <Link href={postBanner?.[0]?.uri}>
                  <img className='w-full h-auto md:w-[550px] md:h-[366px] object-cover object-fit rounded' src={postBanner?.[0]?.featuredImage?.node?.sourceUrl} alt={postBanner?.[0]?.featuredImage?.node?.altText} />
                </Link>
                <Link href={postBanner?.[0]?.uri}>
                  <h2 className='my-3 text-xl md:text-3xl'>{postBanner?.[0]?.title}</h2>
                </Link>
                {postBanner?.[0]?.excerpt && (
                  <div className='line-clamp-2 mb-2 md:mb-5' dangerouslySetInnerHTML={{ __html: postBanner?.[0]?.excerpt }}></div>
                )}

                <div className='flex gap-2 text-sm'>
                  <Link href={postBanner?.[0]?.categories?.nodes?.[0]?.uri ?? "/"} className="text-link-color font-semibold line-clamp-1">{postBanner?.[0]?.categories?.nodes?.[0]?.name}</Link>
                  <span>•</span>
                  <span className="min-w-fit">9 mins read</span>
                </div>
              </div>

              <div className="col-span-1 flex flex-col gap-5">
                {postBanner?.length && postBanner?.slice(1, 4)?.map((item: any, index: any) => (
                  <div className='flex gap-5 items-center md:items-start' key={index}>
                    <div className='w-[200px]'>
                      <Link href={item?.uri}>
                        <img className='min-w-[140px] md:min-w-[160px] lg:min-w-[200px] h-[100px] md:h-[113px] lg:h-[133px] object-cover object-fit rounded' src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
                      </Link>
                    </div>
                    <div className='w-full'>
                      <Link href={item?.uri}><h2 className='my-3 leading-6 md:leading-7 text-lg md:text-xl line-clamp-3'>{item?.title}</h2></Link>

                      <div className='flex gap-2 text-sm'>
                        <Link href={item?.categories?.nodes?.[0]?.uri} className="text-link-color font-semibold line-clamp-1">
                          {item?.categories?.nodes?.[0]?.name}
                        </Link>
                        <span>•</span>
                        <span className='min-w-fit'>9 mins read</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="my-10" />

            <div className='flex justify-between items-center mt-10'>
              <h2>Breaking news</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-10 mt-10">
              {breakingNews?.length && breakingNews?.map((item: any, index: any) => (
                <div className='col-span-1' key={index}>
                  <Link href={item?.uri ?? "/"}>
                    <img className='w-full h-auto md:h-[124px] lg:h-[160px] object-cover object-fit rounded' src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
                  </Link>
                  <span className="block my-2 mt-3 text-xs md:text-sm">2 hours ago</span>
                  <Link href={"/"}>
                    <h2 className='my-3 text-lg md:text-xl leading-6 line-clamp-3'>{item?.title}</h2>
                  </Link>
                  <div className='line-clamp-2 mb-2 md:mb-5' dangerouslySetInnerHTML={{ __html: item?.excerpt }}></div>

                  {item?.categories?.nodes?.[0]?.uri && (
                    <div className='flex gap-2 text-sm'>
                      <Link href={item?.categories?.nodes?.[0]?.uri ?? "/"} className="text-link-color font-semibold line-clamp-1">
                        {item?.categories?.nodes?.[0]?.name}
                      </Link>
                      <span>•</span>
                      <span className="min-w-fit">9 mins read</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="our-experts my-14">
              <div className="grid grid-col-1 md:grid-cols-7 gap-0 md:gap-10 lg:gap-14">
                <div className="col-span-3 bg-[#f9f9f9] border border-slate-300 rounded flex flex-col gap-14 items-center justify-center p-5 md:p-10">
                  <p className="text-2xl text-center">Our commitment lies in <span className="font-semibold">delivering accurate</span> and <span className="font-semibold">quality content</span> that demystifies health topics and guides you through the sea of information.</p>
                  <ButtonPrimary href="/about-us" className="w-full md:w-fit">
                    <span className="font-bold">Explore Our Process</span>
                  </ButtonPrimary>
                </div>

                <div className="col-span-4 mt-10 md:mt-0">
                  <div className="border-t border-b py-5">
                    <div className='flex justify-between items-center'>
                      <h5 className="font-medium">Our Research Team</h5>
                      <Link href="/our-experts" className='text-link-color'>View all</Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 my-5 justify-items-center gap-3">
                      <Link href={"/author/emma-grace"} className="flex flex-col gap-1 justify-center items-center">
                        <img width={80} className="rounded-full" src="/images/experts/expert-1.png" alt="" />
                        <p className="text-sm font-medium leading-6 text-center">Emma Grace</p>
                      </Link>

                      <Link href={"/author/olivia-williams"} className="flex flex-col gap-1 justify-center items-center">
                        <img width={80} className="rounded-full" src="/images/experts/expert-2.png" alt="" />
                        <p className="text-sm font-medium leading-6 text-center">Olivia Williams</p>
                      </Link>

                      <Link href={"/author/james-alexander-smith"} className="hidden md:flex flex-col gap-1 justify-center items-center">
                        <img width={80} className="rounded-full" src="/images/experts/expert-3.png" alt="" />
                        <p className="text-sm font-medium leading-6 text-center">James Alexander Smith</p>
                      </Link>
                    </div>

                  </div>


                  <div className='flex justify-between items-center my-3'>
                    <h5 className="font-medium">Board of Experts</h5>
                    <Link href="/our-experts" className='text-link-color'>View all</Link>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 my-5 justify-items-center gap-3">
                    <Link href={"/author/isabella-faith"} className="flex flex-col gap-1 justify-center items-center">
                      <img width={80} className="rounded-full" src="/images/experts/expert-4.png" alt="" />
                      <p className="text-sm font-medium leading-6 text-center">Isabella Faith</p>
                    </Link>

                    <Link href={"/author/michael-davis"} className="flex flex-col gap-1 justify-center items-center">
                      <img width={80} className="rounded-full" src="/images/experts/expert-5.png" alt="" />
                      <p className="text-sm font-medium leading-6 text-center">Michael Davis</p>
                    </Link>

                    <Link href={"/author/laurene-rose"} className="hidden md:flex flex-col gap-1 justify-center items-center">
                      <img width={80} className="rounded-full" src="/images/experts/expert-6.png" alt="" />
                      <p className="text-sm font-medium leading-6 text-center">Laurene Rose</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <hr className="my-10" />
              <div className='flex justify-between items-center my-10'>
                <h2>{homeCategory2?.name}</h2>
                <Link href={homeCategory2?.uri ?? "/"} className='text-link-color'>View all</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-5 lg:gap-12">
                <div className="col-span-1 flex flex-col gap-8">
                  <Link href={homeCategory2?.children?.nodes?.[0]?.name ?? "/"} className="flex justify-between gap-5 w-full p-3 border-b border-blue-500 bg-blue-50">
                    <span className="font-semibold">{homeCategory2?.children?.nodes?.[0]?.name}</span>
                    <img width={20} src="/images/arrow-right.svg" alt="" />
                  </Link>
                  {homeCategory2?.children?.nodes?.[0]?.posts?.nodes?.length && homeCategory2?.children?.nodes?.[0]?.posts?.nodes?.slice(0, 3)?.map((post: any, index: any) => (
                    <Link href={post?.uri ?? "/"} className="flex gap-3 items-center" key={index}>
                      <div className='w-[100px]'>
                        <img className='min-w-[100px] h-[66px] object-cover object-fit rounded' src={post?.featuredImage?.node?.sourceUrl} alt={post?.featuredImage?.node?.altText} />
                      </div>
                      <div className='w-full'>
                        <h2 className='text-base line-clamp-3'>{post?.title}</h2>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="col-span-1 flex flex-col gap-8">
                  <Link href={homeCategory2?.children?.nodes?.[1]?.uri ?? "/"} className="flex justify-between gap-5 w-full p-3 border-b border-blue-500 bg-blue-50">
                    <span className="font-semibold">{homeCategory2?.children?.nodes?.[1]?.name}</span>
                    <img width={20} src="/images/arrow-right.svg" alt="" />
                  </Link>
                  {homeCategory2?.children?.nodes?.[1]?.posts?.nodes?.length && homeCategory2?.children?.nodes?.[1]?.posts?.nodes?.slice(0, 3)?.map((post: any, index: any) => (
                    <Link href={post?.uri ?? "/"} className="flex gap-3 items-center" key={index}>
                      <div className='w-[100px]'>
                        <img className='min-w-[100px] h-[66px] object-cover object-fit rounded' src={post?.featuredImage?.node?.sourceUrl} alt={post?.featuredImage?.node?.altText} />
                      </div>
                      <div className='w-full'>
                        <h2 className='text-base line-clamp-3'>{post?.title}</h2>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="col-span-1 flex flex-col gap-8">
                  <Link href={homeCategory2?.children?.nodes?.[2]?.uri ?? "/"} className="flex justify-between gap-5 w-full p-3 border-b border-blue-500 bg-blue-50">
                    <span className="font-semibold">{homeCategory2?.children?.nodes?.[2]?.name}</span>
                    <img width={20} src="/images/arrow-right.svg" alt="" />
                  </Link>
                  {homeCategory2?.children?.nodes?.[2]?.posts?.nodes?.length && homeCategory2?.children?.nodes?.[2]?.posts?.nodes?.slice(0, 3)?.map((post: any, index: any) => (
                    <Link href={post?.uri ?? "/"} className="flex gap-3 items-center" key={index}>
                      <div className='w-[100px]'>
                        <img className='min-w-[100px] h-[66px] object-cover object-fit rounded' src={post?.featuredImage?.node?.sourceUrl} alt={post?.featuredImage?.node?.altText} />
                      </div>
                      <div className='w-full'>
                        <h2 className='text-base line-clamp-3'>{post?.title}</h2>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <hr className="my-10" />
              <div className='flex justify-between items-center my-10'>
                <h2>{homeCategory1?.name}</h2>
                <Link href={homeCategory1?.uri ?? "/"} className='text-link-color'>View all</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-5 lg:gap-12">
                <div className="col-span-1 flex flex-col gap-8">
                  <Link href={homeCategory1?.children?.nodes?.[0]?.name ?? "/"} className="flex justify-between gap-5 w-full p-3 border-b border-blue-500 bg-blue-50">
                    <span className="font-semibold">{homeCategory1?.children?.nodes?.[0]?.name}</span>
                    <img width={20} src="/images/arrow-right.svg" alt="" />
                  </Link>
                  {homeCategory1?.children?.nodes?.[0]?.posts?.nodes?.length && homeCategory1?.children?.nodes?.[0]?.posts?.nodes?.slice(0, 3)?.map((post: any, index: any) => (
                    <Link href={post?.uri ?? "/"} className="flex gap-3 items-center" key={index}>
                      <div className='w-[100px]'>
                        <img className='min-w-[100px] h-[66px] object-cover object-fit rounded' src={post?.featuredImage?.node?.sourceUrl} alt={post?.featuredImage?.node?.altText} />
                      </div>
                      <div className='w-full'>
                        <h2 className='text-base line-clamp-3'>{post?.title}</h2>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="col-span-1 flex flex-col gap-8">
                  <Link href={homeCategory1?.children?.nodes?.[1]?.uri ?? "/"} className="flex justify-between gap-5 w-full p-3 border-b border-blue-500 bg-blue-50">
                    <span className="font-semibold">{homeCategory1?.children?.nodes?.[1]?.name}</span>
                    <img width={20} src="/images/arrow-right.svg" alt="" />
                  </Link>
                  {homeCategory1?.children?.nodes?.[1]?.posts?.nodes?.length && homeCategory1?.children?.nodes?.[1]?.posts?.nodes?.slice(0, 3)?.map((post: any, index: any) => (
                    <Link href={post?.uri ?? "/"} className="flex gap-3 items-center" key={index}>
                      <div className='w-[100px]'>
                        <img className='min-w-[100px] h-[66px] object-cover object-fit rounded' src={post?.featuredImage?.node?.sourceUrl} alt={post?.featuredImage?.node?.altText} />
                      </div>
                      <div className='w-full'>
                        <h2 className='text-base line-clamp-3'>{post?.title}</h2>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="col-span-1 flex flex-col gap-8">
                  <Link href={homeCategory1?.children?.nodes?.[2]?.uri ?? "/"} className="flex justify-between gap-5 w-full p-3 border-b border-blue-500 bg-blue-50">
                    <span className="font-semibold">{homeCategory1?.children?.nodes?.[2]?.name}</span>
                    <img width={20} src="/images/arrow-right.svg" alt="" />
                  </Link>
                  {homeCategory1?.children?.nodes?.[2]?.posts?.nodes?.length && homeCategory1?.children?.nodes?.[2]?.posts?.nodes?.slice(0, 3)?.map((post: any, index: any) => (
                    <Link href={post?.uri ?? "/"} className="flex gap-3 items-center" key={index}>
                      <div className='w-[100px]'>
                        <img className='min-w-[100px] h-[66px] object-cover object-fit rounded' src={post?.featuredImage?.node?.sourceUrl} alt={post?.featuredImage?.node?.altText} />
                      </div>
                      <div className='w-full'>
                        <h2 className='text-base line-clamp-3'>{post?.title}</h2>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <hr className="my-10" />
              <div className='flex justify-between items-center my-10'>
                <h2>{homeCategory3?.name}</h2>
                <Link href={homeCategory3?.uri ?? "/"} className='text-link-color'>View all</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-5 lg:gap-12">
                <div className="col-span-1 flex flex-col gap-8">
                  <Link href={homeCategory3?.children?.nodes?.[0]?.name ?? "/"} className="flex justify-between gap-5 w-full p-3 border-b border-blue-500 bg-blue-50">
                    <span className="font-semibold">{homeCategory3?.children?.nodes?.[0]?.name}</span>
                    <img width={20} src="/images/arrow-right.svg" alt="" />
                  </Link>
                  {homeCategory3?.children?.nodes?.[0]?.posts?.nodes?.length && homeCategory3?.children?.nodes?.[0]?.posts?.nodes?.slice(0, 3)?.map((post: any, index: any) => (
                    <Link href={post?.uri ?? "/"} className="flex gap-3 items-center" key={index}>
                      <div className='w-[100px]'>
                        <img className='min-w-[100px] h-[66px] object-cover object-fit rounded' src={post?.featuredImage?.node?.sourceUrl} alt={post?.featuredImage?.node?.altText} />
                      </div>
                      <div className='w-full'>
                        <h2 className='text-base line-clamp-3'>{post?.title}</h2>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="col-span-1 flex flex-col gap-8">
                  <Link href={homeCategory3?.children?.nodes?.[1]?.uri ?? "/"} className="flex justify-between gap-5 w-full p-3 border-b border-blue-500 bg-blue-50">
                    <span className="font-semibold">{homeCategory3?.children?.nodes?.[1]?.name}</span>
                    <img width={20} src="/images/arrow-right.svg" alt="" />
                  </Link>
                  {homeCategory3?.children?.nodes?.[1]?.posts?.nodes?.length && homeCategory3?.children?.nodes?.[1]?.posts?.nodes?.slice(0, 3)?.map((post: any, index: any) => (
                    <Link href={post?.uri ?? "/"} className="flex gap-3 items-center" key={index}>
                      <div className='w-[100px]'>
                        <img className='min-w-[100px] h-[66px] object-cover object-fit rounded' src={post?.featuredImage?.node?.sourceUrl} alt={post?.featuredImage?.node?.altText} />
                      </div>
                      <div className='w-full'>
                        <h2 className='text-base line-clamp-3'>{post?.title}</h2>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="col-span-1 flex flex-col gap-8">
                  <Link href={homeCategory3?.children?.nodes?.[2]?.uri ?? "/"} className="flex justify-between gap-5 w-full p-3 border-b border-blue-500 bg-blue-50">
                    <span className="font-semibold">{homeCategory3?.children?.nodes?.[2]?.name}</span>
                    <img width={20} src="/images/arrow-right.svg" alt="" />
                  </Link>
                  {homeCategory3?.children?.nodes?.[2]?.posts?.nodes?.length && homeCategory3?.children?.nodes?.[2]?.posts?.nodes?.slice(0, 3)?.map((post: any, index: any) => (
                    <Link href={post?.uri ?? "/"} className="flex gap-3 items-center" key={index}>
                      <div className='w-[100px]'>
                        <img className='min-w-[100px] h-[66px] object-cover object-fit rounded' src={post?.featuredImage?.node?.sourceUrl} alt={post?.featuredImage?.node?.altText} />
                      </div>
                      <div className='w-full'>
                        <h2 className='text-base line-clamp-3'>{post?.title}</h2>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <hr className="my-10" />
              <div className='flex justify-between items-center my-10'>
                <h2>{homeCategory4?.name}</h2>
                <Link href={homeCategory4?.uri ?? "/"} className='text-link-color'>View all</Link>
              </div>

              <div className='list-category-child my-10 flex flex-wrap gap-5'>
                {homeCategory4?.children?.nodes?.length && homeCategory4?.children?.nodes?.map((item: any, index: any) => (
                  <Link key={index} href={item?.uri ?? "/"} className='border border-[#0d48b3] py-3 px-5 rounded-lg text-[#0d48b3] transition-all hover:bg-[#0d48b3] hover:text-white font-semibold'>{item?.name}</Link>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-5 lg:gap-12">
                {homeCategory4?.posts?.nodes?.length && homeCategory4?.posts?.nodes?.map((item: any, index: any) => (
                  <div className='flex gap-5 items-center md:items-start' key={index}>
                    <div className='w-[200px]'>
                      <Link href={item?.uri ?? "/"}>
                        <img className='min-w-[140px] md:min-w-[160px] lg:min-w-[200px] h-[100px] md:h-[113px] lg:h-[133px] object-cover object-fit rounded' src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
                      </Link>
                    </div>
                    <div className='w-full'>
                      <Link href={item?.uri ?? "/"}><h2 className='my-3 leading-6 md:leading-7 text-lg md:text-xl line-clamp-3'>{item?.title}</h2></Link>

                      <div className='flex gap-2 text-sm'>
                        <Link href={item?.categories?.nodes?.[1]?.uri ?? (item?.categories?.nodes?.[0]?.uri ?? "/")} className="text-link-color font-semibold line-clamp-1">
                          {item?.categories?.nodes?.[1]?.name ?? item?.categories?.nodes?.[0]?.name}
                        </Link>
                        <span>•</span>
                        <span className='min-w-fit'>9 mins read</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ------------End */}
          </div>
        </PageLayout>
      </>
    )
  }

  return (
    <>
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={homeData || []}
        pageFeaturedImageUrl={featuredImage?.node?.sourceUrl}
        pageTitle={title}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        <div className="nc-BgGlassmorphism absolute inset-x-0 md:top-10 xl:top-20 min-h-0 pl-20 py-24 flex overflow-hidden z-[-1]">
          <span className="block bg-[#ef233c] w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96"></span>
          <span className="block bg-[#04868b] w-72 h-72 -ml-20 mt-40 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96 nc-animation-delay-2000"></span>
        </div>
        <div
          className={`container ${isGutenbergPage ? "" : "pb-20 pt-5 sm:pt-10"
            }`}
        >
          <main
            className={`prose lg:prose-lg dark:prose-invert mx-auto ${isGutenbergPage ? "max-w-none" : ""
              }`}
          >
            {title && !isGutenbergPage && (
              <>
                <EntryHeader title={title} />
                <hr />
              </>
            )}

            <MyWordPressBlockViewer blocks={blocks} />
          </main>
        </div>
      </PageLayout>
    </>
  );
};

Page.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
    headerLocation: PRIMARY_LOCATION,
  };
};

// Note***: tat ca cac query trong cac page deu phai co generalSettings, no duoc su dung o compoent Wrap
Page.query = gql(`
  query GetPage($databaseId: ID!, $asPreview: Boolean = false, $headerLocation: MenuLocationEnum!) {
    page2: page(id: 415, idType: DATABASE_ID, asPreview: $asPreview) {
      pageCategory {
        postBanner {
          nodes {
            ...on Post {
              categories {
                nodes {
                  name
                  uri
                }
              }
              title
              uri
              excerpt
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
        breakingNews {
          nodes {
            ...on Post {
              categories {
                nodes {
                  name
                  uri
                }
              }
              title
              uri
              excerpt
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
        homeCategory1 {
          nodes {
            ...on Category {
              name
              uri
              ncTaxonomyMeta {
                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
              }
              children {
                nodes {
                  name
                  uri
                  ...on Category {
                    posts (first: 9) {
                      nodes {
                        title
                        uri
                        featuredImage {
                          node {
                            sourceUrl
                            altText
                          }
                        }
                        author {
                          node {
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        homeCategory2 {
          nodes {
            ...on Category {
              name
              uri
              ncTaxonomyMeta {
                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
              }
              children {
                nodes {
                  name
                  uri
                  ...on Category {
                    posts (first: 9) {
                      nodes {
                        title
                        uri
                        featuredImage {
                          node {
                            sourceUrl
                            altText
                          }
                        }
                        author {
                          node {
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        homeCategory3 {
          nodes {
            ...on Category {
              name
              uri
              ncTaxonomyMeta {
                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
              }
              children {
                nodes {
                  name
                  uri
                  ...on Category {
                    posts (first: 9) {
                      nodes {
                        title
                        uri
                        featuredImage {
                          node {
                            sourceUrl
                            altText
                          }
                        }
                        author {
                          node {
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        homeCategory4 {
          nodes {
            ...on Category {
              name
              uri
              ncTaxonomyMeta {
                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
              }
              posts (first: 6) {
                nodes {
                  title
                  uri
                  categories {
                    nodes {
                      name
                      uri
                    }
                  }
                  featuredImage {
                  node {
                      sourceUrl
                      altText
                    }
                }
                author {
                  node {
                    name
                    }
                  }
                }
              }
              children {
                nodes {
                  name
                  uri
                  ...on Category {
                    posts (first: 6) {
                      nodes {
                        title
                        uri
                        featuredImage {
                          node {
                            sourceUrl
                            altText
                          }
                        }
                        author {
                          node {
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      ncPageMeta {
        isFullWithPage
      }
      featuredImage {
        node {
          altText
          sourceUrl
        }
      }
      editorBlocks(flat: true) {
        __typename
        renderedHtml
        clientId
        parentClientId
        ...NcmazFaustBlockMagazineFragment
        ...NcmazFaustBlockTermsFragment
        ...NcmazFaustBlockCtaFragment
        ...NcmazFaustBlockGroupFragment
        ...CoreColumnsFragment
        ...CoreColumnFragment
      }
    }
    # common query for all page 
    generalSettings {
      ...NcgeneralSettingsFieldsFragment
    }
    primaryMenuItems: menuItems(where: { location:  $headerLocation  }, first: 80) {
      nodes {
        ...NcPrimaryMenuFieldsFragment
      }
    }
  }
`);

export default Page;
