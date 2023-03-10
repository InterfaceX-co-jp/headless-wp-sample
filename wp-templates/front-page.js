import { useQuery, gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Footer,
  Main,
  Container,
  NavigationMenu,
  Hero,
  SEO,
  Post,
  FeaturedImage
} from '../components';
import { getNextStaticProps } from '@faustwp/core';

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page: Component,
    revalidate: 300, //5mins
  });
}

export default function Component() {
  const { data } = useQuery(Component.query, {
    variables: Component.variables(),
  });

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  const postList = data?.postList.nodes ?? []

  const hasPost = postList.length > 0

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <Container>
          <Hero title={'Front Page'} />
          <div className="text-center">
            <div>
              {
                hasPost && postList.map((el) => {
                  return <Post
                    title={el.title}
                    content={el.content}
                    date={el.date}
                    author={el.author.node.name}
                    uri={el.uri}
                  />
                })
              }
            </div>
            <p>This page is utilizing the "front-page" WordPress template.</p>
            <code>./wp-templates/front-page.js</code>
          </div>
        </Container>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    generalSettings {
      ...BlogInfoFragment
    }
    postList: posts {
      nodes {
        id
        title
        content
        date
        uri
        author {
          node {
            name
          }
        }
      }
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

Component.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};
