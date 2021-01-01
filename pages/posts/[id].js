import * as React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { getAllPostIds, getPostData } from '../../util/contentfulPosts';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Date from '../../components/Date';
// backLink
const Post = ({ postData }) => {
    return (
        <>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <h1 className="postTitle" >{postData.title}</h1>
            <p className="postDate">
                <Date dateString={postData.postDate} />
            </p>
            <div className="post">
                {documentToReactComponents(postData.post)}
            </div>
            <Link href={`/`}>
                <a className="backLink">Back To Home Page</a>
            </Link>
        </>
    )
}

export async function getStaticPaths() {
    const paths = await getAllPostIds();
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}

export default Post