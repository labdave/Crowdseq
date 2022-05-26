export function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i !== s.length; ++i) {
    // tslint:disable-next-line:no-bitwise
    view[i] = s.charCodeAt(i) & 0xFF;
  }
  return buf;
}
