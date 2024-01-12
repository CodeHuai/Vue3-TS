/**
 * 生成指定范围内的随机数
 * @param start number 起始值
 * @param end number 终值
 */
export function createRandom(start: number, end: number) {
  return Math.round(Math.random() * (end - start)) + start
}
