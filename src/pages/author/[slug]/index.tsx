import { GetStaticPropsContext } from "next";
import { FaustPage, getNextStaticProps } from "@faustwp/core";
import { gql } from "@/__generated__";
import { NcgeneralSettingsFieldsFragmentFragment } from "@/__generated__/graphql";
import { GET_POSTS_FIRST_COMMON } from "@/contains/contants";
import React from "react";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import Page404Content from "@/container/404Content";
import PageLayout from "@/container/PageLayout";
import Link from "next/link";

const Page: any = (props: any) => {
  if (!props.data?.user) {
    return <Page404Content />;
  }

  const homeData = (props as any)?.data?.page?.pageCategory

  let author = props?.data?.user

  return (
    <>
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={homeData || []}
        pageFeaturedImageUrl={null}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        <div className="container my-10">
          <div className="flex flex-col md:flex-row gap-5 md:gap-12">
            <div className="w-[160px]">
              <img className="min-w-[160px] rounded" src={author?.ncUserMeta?.featuredImage?.node?.sourceUrl} alt={author?.ncUserMeta?.featuredImage?.node?.altText} />
            </div>
            <div>
              <h2 className="capitalize mb-3">{author?.name}</h2>
              <div dangerouslySetInnerHTML={{ __html: author?.description }} className="text-base md:text-[18px]"></div>
            </div>
          </div>

          <div className="my-10 py-10 border-t border-slate-300">
            <h2>Written by {author?.name}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-5 mt-8">
              {author?.posts?.nodes?.length > 0 && author?.posts?.nodes?.slice(0, 50)?.map((item: any, index: any) => (
                <Link href={item?.uri ?? "/"} className="col-span-1 flex gap-3 items-center" key={index}>
                    <div>
                        <img className="rounded min-w-[100px] max-w-[100px] h-[66px] object-cover object-center" src={item?.featuredImage?.node?.sourceUrl} alt={item?.featuredImage?.node?.altText} />
                    </div>

                    <div>
                        <p className="font-semibold line-clamp-3">{item?.title}</p>
                    </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
export function getStaticProps(ctx: GetStaticPropsContext) {
  return getNextStaticProps(ctx, {
    Page,
    revalidate: 900,
  });
}

Page.variables = ({ params }: any) => {
  return {
    id: params?.slug,
    first: GET_POSTS_FIRST_COMMON,
    headerLocation: PRIMARY_LOCATION,
  };
};

Page.query = gql(`
  query GetAuthorWithPosts($id: ID!, $first: Int, $headerLocation: MenuLocationEnum!) {
    user(id: $id, idType: SLUG) {
      ...NcmazFcUserFullFields
      posts(first:  $first, where: {orderby: {field: DATE, order: DESC}}) {
        nodes {
          ...NcmazFcPostCardFields
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
    page(id: 415, idType: DATABASE_ID) {
        pageCategory {
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
    categories(first:10, where: { orderby: COUNT, order: DESC }) {
      nodes {
        ...NcmazFcCategoryFullFieldsFragment
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
    # end common query for all page
  }
`);

export default Page;
