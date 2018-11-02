/**
 * 生成随机手机号码
 *
 * @param {Boolean} withMask
 * @return {String}
 */
export const randomMobile = function (withMask) {
  const startCodeArr = [139, 138, 137, 136, 135, 134, 159, 158, 157, 150, 151, 152, 188, 187, 182, 183, 184, 178, 130, 131, 132, 156, 155, 186, 185, 176, 133, 153, 189, 180, 181, 177, 173]
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
