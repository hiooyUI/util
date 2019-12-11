/**
 * 生成随机手机号码
 *
 * @param {Boolean} withMask
 * @return {String}
 */
export const randomMobile = function (withMask) {
  const startCodeArr = [139, 138, 137, 136, 135, 134, 159, 158, 157, 150, 151, 152, 188, 187, 182, 183, 184, 178, 130, 131, 132, 156, 155, 186, 185, 176, 133, 153, 189, 180, 181, 177, 173, 199, 198]
  const areaCode = withMask ? 'xxxx' : String(new Date().valueOf()).substr(-4, 4)
  const userCode = String(new Date().getTime() + Math.floor(9999 * Math.random())).substr(-4, 4)
  const startCode = String(startCodeArr[Math.floor((startCodeArr.length - 1) * Math.random())])
  return startCode + areaCode + userCode
}
/**
 * 过滤特殊字符、emoji符号及空格
 *
 * @param {String} str
 * @return {String}
 */
export const specialCharsFilter = function ( str ) {
  const emojiReg = /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g
  const punctuationReg = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——| {}【】‘’\"；：”“'。，、？]", 'g')
  return str.replace(/\s+/g, '').replace(emojiReg, '').replace(punctuationReg, '') // 过滤空格、符号及emoji
}

/**
 * 深度比较
 * @param  {Array | Object | String | Number} a
 * @param  {Array | Object | String | Number} b
 * @returns {Boolean}
 */
export const deepEq = (a, b) => {
  if (a === b) return a !== 0 || 1 / a === 1 / b
  if (a == null || b == null) return a === b
  const type = typeof a
  if (type !== 'function' && type !== 'object' && typeof b != 'object') return false
  return JSON.stringify(a) === JSON.stringify(b)
}

/**
 * canvas 换行画出多行文字
 * @param  {CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext | ImageBitmapRenderingContext} ctx
 * @param  {String} text
 * @param  {Number} x
 * @param  {Number} y
 * @param  {Number} w，即一行的宽度 width
 * @param  {String} color，即字体的颜色
 * @param  {Number} fontSize
 * @param  {Boolean} isBold，即是否加粗
 */
export function drawMultiLineRichText (ctx, text, x, y, w, color, fontSize, isBold) {
  if (!text) {
    return false
  }
  const rawRows = text.split('\n')
  let rows = []
  // 保存画布 用 save 及 restore 是为了不影响其他地方使用画布
  ctx.save()
  fontSize = fontSize ? fontSize : 26
  ctx.font = `${isBold ? '700' : '400'} ${fontSize}px "Hiragino Sans GB W3","Microsoft YaHei",sans-serif`
  ctx.textBaseline = 'middle'
  ctx.fillStyle = color
  rawRows.forEach((txt) => {
    const chars = txt.split('')
    let tempStr = ''
    chars.forEach((char) => {
      if (ctx.measureText(tempStr).width >= w) {
        rows.push(tempStr)
        tempStr = ''
      }
      tempStr += char
    })
    rows.push(tempStr)
  })
  rows.forEach((txt, n) => {
    ctx.fillText(txt, x, y + n * fontSize * 1.8) // ****** 使用 FILLTEXT
  })
  ctx.restore() // 恢复画布
}

/**
 * 预加载图片
 * @param  {String} url，图片地址
 * @param  {String} callback，图片加载完成的回调函数
 * @param  {Boolean} needCrossOrigin，是否跨域
 * @returns {Image}，返回自己本身
 */
export function preLoadImage (url, callback, needCrossOrigin) { // fixed Chrome 图片load 不出来问题
  let img = new Image() // 创建一个 Image 对象，实现图片的预下载
  needCrossOrigin && img.crossOrigin = 'anonymous'
  img.src = url

  if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数  
    callback && callback.call(img)
    return // 直接返回，不用再处理 onload 事件  
  }

  img.onload = function () { // 图片下载完毕时异步调用 callback 函数。  
    callback && callback.call(img) // 将回调函数的 this 替换为 Image 对象  
  }
}
