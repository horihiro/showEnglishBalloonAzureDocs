// ==UserScript==
// @name         Show engish sentenses
// @namespace    http://hihorika.net/
// @version      0.1
// @description  Show engish sentense on mouse over in Azure Docs
// @author       hihorika
// @match        https://docs.microsoft.com/ja-jp/azure/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if (!document.querySelectorAll('.lang-toggle-container')) return;

    const link4balloon = document.createElement('link');
    link4balloon.setAttribute('rel', 'stylesheet');
    link4balloon.setAttribute('href', 'https://unpkg.com/balloon-css/balloon.min.css');

    const style4balloon = document.createElement('style');
    style4balloon.innerText = `
:root {
  --balloon-border-radius: 0;
  --balloon-color: blue;
  --balloon-font-size: 15px;
}}

span[data-ttu-id] {
  text-decoration: none;
}
span[data-ttu-id]:hover {
  text-decoration: underline;
  cursor: default;
}
`;

    document.body.appendChild(link4balloon);
    document.body.appendChild(style4balloon);
    Array.prototype.forEach.call(document.querySelectorAll('span[data-ttu-id]'), (elm) => {
        elm.setAttribute('aria-label', elm.nextSibling.innerText);
        elm.setAttribute('data-balloon-pos', 'up');
        // elm.title = elm.nextSibling.innerText
    });

    return;
})();