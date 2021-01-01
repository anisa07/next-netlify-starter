// at the top of your component file

import { fetchEntries } from '../util/contentfulPosts'
import Post from '../components/Post'

// inside your component markup, pull `posts` from props

export default function Home({posts}) {
  console.log(posts)
  return (
    <div className="posts">
    </div>
  )
}
// {posts.map((p) => {
  //   return <div />
  // })}

// at the bottom of your component file

export async function getStaticProps() {
  const res = await fetchEntries()
  const posts = await res.map((p) => {
    return p.fields
  })

  return {
    props: {
      posts,
    },
  }
}
