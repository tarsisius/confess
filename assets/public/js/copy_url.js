"use strict";(()=>{document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelector("#copy_url_button"),t=document.querySelector("#url_input"),o=document.querySelector("#copy_url_icon"),n=document.querySelector("#copied_url_icon");e&&t&&o&&n&&e.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(t.value),o.classList.add("hidden"),n.classList.remove("hidden")}catch(c){console.error("Unable to copy text: ",c)}})});})();
//# sourceMappingURL=copy_url.js.map