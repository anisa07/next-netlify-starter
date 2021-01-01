import Link from 'next/link'
import Head from 'next/head'

export default function Custom404() {
    return <>
        <Head>
            <title>404</title>
        </Head>
        <h1 className="postTitle" >404 - Page Not Found</h1>
        <Link href={`/`}>
            <a className="backLink">Back To Home Page</a>
        </Link>
    </>
}