// ==UserScript==
// @name         Show engish sentenses
// @namespace    http://hihorika.net/
// @version      0.1
// @description  Show engish sentense on mouse over in Azure Docs
// @author       hihorika@microsoft.com a.k.a. horihiro
// @match        https://docs.microsoft.com/ja-jp/azure/*
// @downloadURL  https://github.com/horihiro/showEnglishBalloonAzureDocs/raw/main/showEnglishBalloon.user.js
// @updateURL    https://github.com/horihiro/showEnglishBalloonAzureDocs/raw/main/showEnglishBalloon.meta.js
// @supportURL   https://github.com/horihiro/showEnglishBalloonAzureDocs/issues
// @grant        none
// ==/UserScript==

(async function() {
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

  const updateDateElm = document.querySelectorAll('time[data-article-date-source="ms.date"]')[0];
  if (!updateDateElm) return;

  const updateDate = new Date(updateDateElm.getAttribute('datetime'));
  if (!updateDateElm || updateDate.getFullYear() < 2000) return;

  const urlEnUs = document.location.href.replace(/^(https:\/\/docs.microsoft.com\/)[^/]+(\/.*)$/, '$1en-us$2');
  const response = await fetch(urlEnUs);
  const body = await response.text();
  const datetime = body.replace(/^[\w\W]*<time[^>]* datetime="([^"]+)"[^>]*>[^<]+<\/time>[\w\W]*$/, "$1");
  const updateDateEnUs = new Date(datetime);
  if (updateDate.getTime() >= updateDateEnUs.getTime()) return;

  updateDateElm.innerHTML = `<a href="${urlEnUs}" style="--balloon-color: red;" aria-label="英語版は ${updateDateEnUs.getFullYear()}/${updateDateEnUs.getMonth()+1}/${updateDateEnUs.getDate()} に更新されています" data-balloon-pos="up" target="_blank" rel="noopener noreferrer">⚠️${updateDateElm.innerText}</a>`;

  return;
})();