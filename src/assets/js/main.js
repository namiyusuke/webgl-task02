/* --------- 　ここから編集禁止  ------------- */
console.info(
  "\n %c Orelop Static - https://github.com/hilosiva/orelop-static \n",
  "color: #66ffa5; background: #001010; padding:8px 0;"
);
import.meta.glob(["../img/**"]);
/* --------- 　ここまで編集禁止  ------------- */
import Artwork from "./modules/Artwork";
const $wrapper = document.getElementById("webgl-container");

$wrapper.style.position = "fixed";
$wrapper.style.top = 0;
$wrapper.style.left = 0;
$wrapper.style.right = 0;
$wrapper.style.bottom = 0;
console.log($wrapper);
const artwork = new Artwork({
  $wrapper: $wrapper,
});

window.addEventListener("resize", () => {
  artwork.resize();
});
