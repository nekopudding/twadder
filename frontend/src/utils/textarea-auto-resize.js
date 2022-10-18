/**
 * Auto resizes textarea lines when you type.
 * 
 * https://stackoverflow.com/questions/17772260/textarea-auto-height
 * @param {*} elem - should be a textarea DOM element
 */
export const autoResize = (elem) => {
  elem.style.height = '5px';
  elem.style.height = (elem.scrollHeight)+"px";;
}