import BLOG from '@/blog.config'
/**
 * 压缩图片
 * 1. Notion图床可以通过指定url-query参数来压缩裁剪图片 例如 ?xx=xx&width=400
 * 2. UnPlash 图片可以通过api q=50 控制压缩质量 width=400 控制图片尺寸
 * @param {*} image
 */
const compressImage = (image, width = 400, quality = 50, fmt = 'webp') => {
  if (!image) {
    return null
  }
  if (image.indexOf(BLOG.NOTION_HOST) === 0 && image.indexOf('amazonaws.com') > 0) {
    return `${image}&width=${width}`
  }
  // 压缩unsplash图片
  if (image.indexOf('https://images.unsplash.com/') === 0) {
    // 将URL解析为一个对象
    const urlObj = new URL(image)
    // 获取URL参数
    const params = new URLSearchParams(urlObj.search)
    // 将q参数的值替换
    params.set('q', quality)
    // 尺寸
    params.set('width', width)
    // 格式
    params.set('fmt', fmt)
    params.set('fm', fmt)
    // 生成新的URL
    urlObj.search = params.toString()
    return urlObj.toString()
  }

  // 此处还可以添加您的自定义图传的封面图压缩参数。
  // .e.g
  if (image.indexOf('https://your_picture_bed') === 0) {
    return 'do_somethin_here'
  }

  return image
}

/**
 * 图片映射
 * 1. 如果是 /xx.xx 相对路径格式，则转化为 完整notion域名图片
 * 2. 如果是 bookmark类型的block 图片封面无需处理
 * @param {*} url
 * @param {*} block
 * @returns
 */
const mapImgUrl = (url, block) => {
  if (!url) {
    return null
  }

  if (url.startsWith('data:')) {
    return url
  }

  // more recent versions of notion don't proxy unsplash images
  if (url.startsWith('https://images.unsplash.com')) {
    return url
  }

  try {
    const u = new URL(url)

    if (
      u.pathname.startsWith('/secure.notion-static.com') &&
      u.hostname.endsWith('.amazonaws.com')
    ) {
      if (
        u.searchParams.has('X-Amz-Credential') &&
        u.searchParams.has('X-Amz-Signature') &&
        u.searchParams.has('X-Amz-Algorithm')
      ) {
        // if the URL is already signed, then use it as-is
        return url
      }
    }
  } catch {
    // ignore invalid urls
  }

  if (url.startsWith('/images')) {
    // url = `https://www.notion.so${url}`
    url = decodeURIComponent(url.replace('/images'))
  }

  // url = `https://www.notion.so${
  //   url.startsWith('/image') ? url : `/image/${encodeURIComponent(url)}`
  // }`

  const notionImageUrlV2 = new URL(url)
  // let table = block.parent_table === 'space' ? 'block' : block.parent_table
  // if (table === 'collection' || table === 'team') {
  //   table = 'block'
  // }
  // notionImageUrlV2.searchParams.set('table', table)
  // notionImageUrlV2.searchParams.set('id', block.id)
  // notionImageUrlV2.searchParams.set('cache', 'v2')

  url = notionImageUrlV2.toString()

  return url
}

export { mapImgUrl, compressImage }
