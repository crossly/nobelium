import Link from 'next/link'
import { useConfig } from '@/lib/config'
import FormattedDate from '@/components/FormattedDate'

const BlogPost = ({ post }) => {
  const BLOG = useConfig()

  return (
    <Link href={`${BLOG.path}/${post.slug}`}>
      <article key={post.id} className="mb-6 md:mb-8">
        <header className="flex flex-col justify-between md:flex-row md:items-baseline">
          <h2 className="text-lg md:text-xl font-medium mb-2 cursor-pointer text-black dark:text-slate-100">
            {post.title}
          </h2>
          <time className="flex-shrink-0 text-slate-600 dark:text-slate-400">
            <FormattedDate date={post.date} />
          </time>
        </header>
        <main>
          <p className="hidden md:block leading-8 text-slate-700 dark:text-slate-300">
            {post.summary}
          </p>
        </main>
      </article>
    </Link>
  )
}

export default BlogPost
