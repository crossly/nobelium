import Link from 'next/link'

const Tags = ({ tags, currentTag }) => {
  if (!tags) return null
  return (
    <div className="tag-container">
      <ul className="flex max-w-full mt-4 overflow-x-auto">
        {Object.keys(tags).map(key => {
          const selected = key === currentTag
          return (
            <li
              key={key}
              className={`mr-3 font-medium border whitespace-nowrap dark:text-slate-300 ${
                selected
                  ? 'text-white bg-black border-black dark:bg-gray-600 dark:border-slate-600'
                  : 'bg-gray-100 border-slate-100 text-slate-400 dark:bg-night dark:border-slate-800'
              }`}
            >
              <Link
                key={key}
                href={selected ? '/search' : `/tag/${encodeURIComponent(key)}`}
                className="px-4 py-2 block"
              >
                {`${key} (${tags[key]})`}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Tags
