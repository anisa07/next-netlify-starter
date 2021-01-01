import * as React from 'react';
import { fetchEntries } from '../util/contentfulPosts';
import Head from 'next/head'
import Link from 'next/link'
// import parse from 'html-react-parser';

export default function Home({ data }) {
  const [home, setHome] = React.useState();
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const dataPosts = [];
    let dataHome = {};
    data.forEach(entry => {
      if (entry.contentType === 'home') {
        dataHome = entry;
      } else {
        dataPosts.push(entry)
      }
    });
    setPosts(dataPosts);
    setHome(dataHome);
  }, [data])

  return (
    <div>
      {home && <div className="header">
        <img src={`${home.mainImage.fields.file.url}`} className="mainLeft" />
        <div className="mainRight">
          <Head>
            <title>{home.title}</title>
          </Head>
          <h1>{home.title}</h1>
          <p>
            {home.text}
          </p>
          <ul>
            {posts.map(post =>
              <li key={post.id}>
                <Link href={`/posts/${post.id}`}>
                  <a>{post.title}</a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>}
    </div>
  )
}

export async function getStaticProps() {
  const data = await fetchEntries();
  return {
    props: {
      data
    }
  }
}
