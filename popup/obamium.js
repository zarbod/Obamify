const hidePage = `body > :not(.obamify-image) {
                   display: none;
                   }`;

function listenForClicks() {
    document.addEventListener("click", (e) => {

        function obamaToURL() {
            return browser.runtime.getURL("pictures/obamium.jpg");
        }

        function  obamify(tabs) {
            browser.tabs.insertCSS({code: hidePage}).then(() => {
                let url = obamaToURL(e.target.textContent);
                browser.tabs.sendMessage(tabs[0].id, {
                    command: "obamify",
                    obamaURL: url
                });
            });
        }

        function  reset(tabs) {
            browser.tabs.removeCSS({code: hidePage}).then(() => {
                browser.tabs.sendMessage(tabs[0].id, {
                    command: "reset",
                });
            });
        }

        function reportError(error) {
            console.error(`Could not Obamify: ${error}`);
        }


        if (e.target.classList.contains("obama")) {
            browser.tabs.query({active: true, currentWindow: true})
                .then(obamify)
                .catch(reportError);
        } else if (e.target.classList.contains("reset")) {
            browser.tabs.query({active: true, currenWindow: true})
                .then(reset)
                .catch(reportError);
        }
    });
}

function  reportExecuteScriptError(erorr) {
    document.querySelector('#popup-content').classList.add("hidden");
    document.querySelector('#error-content').classList.remove("hidden");
    console.error(`Failed to execute Obamify content script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/obamify.js"})
    .then(listenForClicks)
    .catch(reportExecuteScriptError);


