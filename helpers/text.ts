import textList from "assets/contents/staticText.json";

interface PARAMS {
  [k: string]: string;
}
const _t = (key: string) => {
  let list: PARAMS = textList;
  let text = list[key];
  return text;
};
export default _t;
