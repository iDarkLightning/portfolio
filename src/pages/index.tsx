import { GraphQLClient } from "graphql-request";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { About } from "../components/about";
import { Contact } from "../components/contact";
import { Footer } from "../components/footer";
import { Hero } from "../components/hero";
import { Layout } from "../components/layout";
import { Nav } from "../components/nav";
import { Projects } from "../components/projects";
import { RefProvider } from "../context";
import { IQuery } from "../query";

const DATOCMS_ENDPOINT = "https://graphql.datocms.com";

const QUERY = `
  query Query {
    hero {
      name
      title
      description
    }
    allProjects {
      name
      stack
      images {
        url
      }
      description
    }
    about {
      aboutMe
      headshot {
        url
      }
    }
    contact {
      blurb
      email
      github
      instagram
      linkedin
      twitter
    }
}

`;

const Page: NextPage<{ query: IQuery }> = ({ query }) => {
  return (
    <>
      <Head>
        <title>Nirjhor Nath</title>
      </Head>
      <Layout>
        <RefProvider>
          <Nav />
          <Hero {...query.hero} />
          <Projects projects={query.allProjects} />
          <About {...query.about} />
          <Contact {...query.contact} />
          <Footer />
        </RefProvider>
      </Layout>
    </>
  );
};

export default Page;

export const getStaticProps: GetStaticProps = async () => {
  const client = new GraphQLClient(DATOCMS_ENDPOINT, {
    headers: {
      authorization: `Bearer ${process.env.CMS_TOKEN}`,
    },
  });

  const query = await client.request<IQuery>(QUERY);

  return { props: { query } };
};
