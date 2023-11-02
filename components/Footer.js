import { useConfig } from '@/lib/config'
import Vercel from '@/components/Vercel'
import Link from 'next/link'
const Footer = ({ fullWidth }) => {
  const BLOG = useConfig()

  const d = new Date()
  const y = d.getFullYear()
  const from = +BLOG.since
  return (
    <div
      className={`mt-6 flex-shrink-0 m-auto w-full text-slate-500 dark:text-slate-400 transition-all ${
        !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
      }`}
    >
      <hr className="border-slate-200 dark:border-slate-600" />
      <div className="my-4 text-sm leading-6">
        <div className="flex align-baseline justify-between flex-wrap">
          <p>
            © {BLOG.author} {from === y || !from ? y : `${from} - ${y} `}Some🔗 <Link href="/links">Links</Link>
          </p>
          <Vercel />
        </div>
      </div>
    </div>
  )
}

export default Footer
