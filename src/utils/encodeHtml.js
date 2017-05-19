/* eslint-disable no-useless-escape */
/**
 * Created by solojiang on 2017/5/15.
 */
const encodeHtml = str => {
  let s = ''
  if (str.length === 0) return ''
  s = str.replace(/&amp;/g, '&')
  s = s.replace(/&lt;/g, '<')
  s = s.replace(/&gt;/g, '>')
  s = s.replace(/&nbsp;/g, ' ')
  s = s.replace(/&#39;/g, "\'")
  s = s.replace(/&quot;/g, '"')
  s = s.replace(/<br>/g, '\n')
  return s
}

const xssFilter = str => {
  if (str.length === 0) return ''
  return str.replace(/<script.*?>.*?<\/script>/ig, '')
}

module.exports.encodeHtml = encodeHtml
module.exports.xssFilter = xssFilter
