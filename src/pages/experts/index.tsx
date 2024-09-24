import { gql } from "@/__generated__";
import { NcgeneralSettingsFieldsFragmentFragment } from "@/__generated__/graphql";
import PageLayout from "@/container/PageLayout";
import { GET_POSTS_FIRST_COMMON } from "@/contains/contants";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import { FaustPage, getNextStaticProps } from "@faustwp/core";
import { GetStaticPropsContext } from "next";

const Page: any = (props: any) => {

  const homeData = props?.data?.page?.pageCategory
  return (
    <PageLayout
      headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
      footerMenuItems={homeData || []}
      pageFeaturedImageUrl={null}
      generalSettings={
        props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
      }
    >
      <div className="container my-10">
        <h1>Research Team</h1>
        <p className="text-sm block my-5">By <span className="text-link-color">Our Team</span> • Updated on October 16, 2023</p>
        <div className="author-review text-lg flex flex-col gap-5">
          <p>At the core of Healthnews is our dedicated Research team, a dynamic group of professionals from the science and medical fields. Their expertise spans vitamins and supplements, health tech gadgets, health apps, and more. With a rich variety of educational backgrounds, the team embraces a multidisciplinary approach to provide well-rounded insights.</p>
          <p>Driven by a mission to inform and empower, our team works to make complex scientific information accessible and understandable, delivering reliable, actionable insights to our readers. We rigorously verify the credibility of our sources, ensuring that every article upholds the highest standards of content quality.</p>
          <p>Our commitment to scientific integrity means every product, gadget, and app is thoroughly evaluated, ensuring our readers have access to reliable information that helps them make informed decisions. We analyze the most up-to-date scientific literature and explore the reputation of each brand. Additionally, we reflect on the current status of evidence regarding the product’s safety and effectiveness.</p>
          <p>With every piece of content, we reaffirm our commitment to quality, trust, and the pursuit of a healthier, more informed community.</p>
        </div>
      </div>
    </PageLayout>
  )
}

export function getStaticProps(ctx: GetStaticPropsContext) {
  return getNextStaticProps(ctx, {
    Page,
    revalidate: 900,
  });
}

Page.variables = () => {
  return {
    headerLocation: PRIMARY_LOCATION,
    footerLocation: FOOTER_LOCATION,
  };
};

Page.query = gql(`
    query GetReadingPage($headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
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
      
      # common query for all page 
     generalSettings {
        ...NcgeneralSettingsFieldsFragment
      }
      primaryMenuItems: menuItems(where: { location:  $headerLocation  }, first: 80) {
        nodes {
          ...NcPrimaryMenuFieldsFragment
        }
      }
      footerMenuItems: menuItems(where: { location:  $footerLocation  }, first: 50) {
        nodes {
          ...NcFooterMenuFieldsFragment
        }
      }
      # end common query for all page
    }
  `);

export default Page;
