// ==UserScript==
// @name         Quizlet Copy Paste
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds buttons to copy Quizlet terms / definitions
// @author       _John#1218
// @supportURL   https://github.com/JDipi/Quizlet-Copy-Paste/issues
// @match        https://quizlet.com/*
// @icon         https://www.google.com/s2/favicons?domain=quizlet.com
// @run-at       document-end
// ==/UserScript==

(function() {
    const btnStyle = `
    padding: 5px;
    margin: 5px;
    `

    window.addEventListener('load', () => {
        function insertAfter(newNode, referenceNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }

        const addBtn = (e) => {
            let newHTML = document.createElement("div")
            newHTML.innerHTML = `
            <button id="copy" style="${btnStyle}">Copy</button>
            `
            insertAfter(newHTML, e)
            newHTML.addEventListener("click", () => {
                navigator.clipboard.writeText(e.innerText).then(() => {
                    newHTML.children[0].innerText = "Copied!"
                    setTimeout(() => {
                        newHTML.children[0].innerText = "Copy"
                    }, 1000)
                }, (err) => {
                 console.error(`Couldn't copy: ${e.innerText}`)
                }
            )})
        }

        const terms = document.querySelectorAll("a.SetPageTerm-wordText")
        terms.forEach(e => {
            addBtn(e)
        })

        const def = document.querySelectorAll("a.SetPageTerm-definitionText")
        def.forEach(e => {
            addBtn(e)
        })
    }, false)
})();
