import { gql } from "../__generated__";
import {
  GetPostSiglePageQuery,
  NcgeneralSettingsFieldsFragmentFragment,
  NcmazFcUserReactionPostActionEnum,
  NcmazFcUserReactionPostNumberUpdateEnum,
} from "../__generated__/graphql";
import { FaustTemplate } from "@faustwp/core";
import SingleContent from "@/container/singles/SingleContent";
import SingleType1 from "@/container/singles/single/single";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import { Sidebar } from "@/container/singles/Sidebar";
import PageLayout from "@/container/PageLayout";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { NC_MUTATION_UPDATE_USER_REACTION_POST_COUNT } from "@/fragments/mutations";
import { useMutation } from "@apollo/client";
import { IS_DEV } from "@/contains/site-settings";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useGetPostsNcmazMetaByIds from "@/hooks/useGetPostsNcmazMetaByIds";
import { TPostCard } from "@/components/Card2/Card2";
import { useRouter } from "next/router";
import { TCategoryCardFull } from "@/components/CardCategory1/CardCategory1";
import SingleTypeAudio from "@/container/singles/single-audio/single-audio";
import SingleTypeVideo from "@/container/singles/single-video/single-video";
import SingleTypeGallery from "@/container/singles/single-gallery/single-gallery";

const DynamicSingleRelatedPosts = dynamic(
  () => import("@/container/singles/SingleRelatedPosts")
);
const DynamicSingleType2 = dynamic(
  () => import("../container/singles/single-2/single-2")
);
const DynamicSingleType3 = dynamic(
  () => import("../container/singles/single-3/single-3")
);
const DynamicSingleType4 = dynamic(
  () => import("../container/singles/single-4/single-4")
);
const DynamicSingleType5 = dynamic(
  () => import("../container/singles/single-5/single-5")
);

const Component: FaustTemplate<GetPostSiglePageQuery> = (props: any) => {
  //  LOADING ----------
  if (props.loading) {
    return <>Loading...</>;
  }

  const router = useRouter();
  const IS_PREVIEW = router.pathname === "/preview";

  // START ----------
  const { isReady, isAuthenticated } = useSelector(
    (state: RootState) => state.viewer.authorizedUser
  );
  const { viewer } = useSelector((state: RootState) => state.viewer);
  const [isUpdateViewCount, setIsUpdateViewCount] = useState(false);

  useEffect(() => {
    const timeOutUpdateViewCount = setTimeout(() => {
      setIsUpdateViewCount(true);
    }, 5000);

    return () => {
      clearTimeout(timeOutUpdateViewCount);
    };
  }, []);

  const _post = props.data?.post || {};
  const _relatedPosts = (props.data?.posts?.nodes as TPostCard[]) || [];
  const _top10Categories =
    (props.data?.categories?.nodes as TCategoryCardFull[]) || [];

  const {
    title,
    ncPostMetaData,
    postFormats,
    featuredImage,
    databaseId,
    excerpt,
  } = getPostDataFromPostFragment(_post);

  //
  const { } = useGetPostsNcmazMetaByIds({
    posts: (IS_PREVIEW ? [] : [_post]) as TPostCard[],
  });
  //

  // Query update post view count
  const [handleUpdateReactionCount, { reset }] = useMutation(
    NC_MUTATION_UPDATE_USER_REACTION_POST_COUNT,
    {
      onCompleted: (data) => {
        IS_DEV && console.log("___update post view data: ", data);
        reset();
      },
    }
  );

  // update view count
  useEffect(() => {
    if (!isReady || IS_PREVIEW || !isUpdateViewCount) {
      return;
    }

    // user chua dang nhap, va update view count voi user la null
    if (isAuthenticated === false) {
      handleUpdateReactionCount({
        variables: {
          post_id: databaseId,
          reaction: NcmazFcUserReactionPostActionEnum.View,
          number: NcmazFcUserReactionPostNumberUpdateEnum.Add_1,
        },
      });
      return;
    }

    // user da dang nhap, va luc nay viewer dang fetch.
    if (!viewer?.databaseId) {
      return;
    }

    // khi viewer fetch xong, luc nay viewer da co databaseId, va se update view count voi user la viewer
    handleUpdateReactionCount({
      variables: {
        post_id: databaseId,
        reaction: NcmazFcUserReactionPostActionEnum.View,
        number: NcmazFcUserReactionPostNumberUpdateEnum.Add_1,
        user_id: viewer?.databaseId,
      },
    });
  }, [
    databaseId,
    isReady,
    isAuthenticated,
    viewer?.databaseId,
    IS_PREVIEW,
    isUpdateViewCount,
  ]);

  const renderHeaderType = () => {
    const pData = { ...(_post || {}) };
    return (
      <SingleType1
        post={pData}
      />
    );
  };

  const homeData = props?.data?.page?.pageCategory

  return (
    <>
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={homeData || []}
        pageFeaturedImageUrl={featuredImage?.sourceUrl}
        pageTitle={title}
        pageDescription={excerpt || ""}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        <div>
          {renderHeaderType()}
        </div>
      </PageLayout>
    </>
  );
};

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    post_databaseId: Number(databaseId || 0),
    asPreview: ctx?.asPreview,
    headerLocation: PRIMARY_LOCATION,
    footerLocation: FOOTER_LOCATION,
  };
};

Component.query = gql(`
  query GetPostSiglePage($databaseId: ID!, $post_databaseId: Int,$asPreview: Boolean = false, $headerLocation: MenuLocationEnum!) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
    ...NcmazFcPostFullFields
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
    posts(where: {isRelatedOfPostId:$post_databaseId}) {
      nodes {
      ...PostCardFieldsNOTNcmazMEDIA
      }
    }
    categories(first:10, where: { orderby: COUNT, order: DESC }) {
      nodes {
        ...NcmazFcCategoryFullFieldsFragment
      }
    }
    generalSettings {
      ...NcgeneralSettingsFieldsFragment
    }
    primaryMenuItems: menuItems(where: {location:$headerLocation}, first: 80) {
      nodes {
        ...NcPrimaryMenuFieldsFragment
      }
    }
  }
`);

export default Component;
