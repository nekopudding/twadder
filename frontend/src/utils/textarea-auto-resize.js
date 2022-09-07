export const autoResize = (elem) => {
  elem.style.height = '5px';
  elem.style.height = (elem.scrollHeight)+"px";;
}