import { useConfig } from '@/lib/config'
import { defaultMapImageUrl } from 'react-notion-x'

const buildJsDelivrLink = (user, repo, version, path) => {
  if (version === 'latest') {
    return `https://cdn.jsdelivr.net/gh/${user}/${repo}/${path}`
  }

  return `https://cdn.jsdelivr.net/gh/${user}/${repo}@${version}/${path}`
}

export const gitHub2jsDelivr = (gitHub) => {
  const pattern =
    /^https?:\/\/(?:github|raw\.githubusercontent)\.com\/([^/]+)\/([^/]+)(?:\/blob)?\/([^/]+)\/(.*)$/i
  const match = pattern.exec(gitHub)

  if (match) {
    const [, user, repo, version, file] = match

    return buildJsDelivrLink(user, repo, version, file)
  }

  return gitHub
}

export const mapPageUrl = (id) => {
  return 'https://www.notion.so/' + id.replace(/-/g, '')
}

export const mapCoverUrl = (url) => {
  return 'https://www.notion.so' + url
}

export const mapImageUrl = (url, block) => {
  const BLOG = useConfig()
  try {
    if (new URL(url)?.host === BLOG.defaultImageHost) {
      return url
    }
  } catch (e) {
    console.warn('[mapImageUrl WARN]', url, e)
  }
  return defaultMapImageUrl(url, block)
}
