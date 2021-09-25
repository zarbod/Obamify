(function() {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    function insertObamium(obamaURL) {
        removeExistingPicture();
        let obamiumImage = document.createElement("img");
        obamiumImage.setAttribute("src", obamaURL);
        obamiumImage.style.height = "200vh";
        obamiumImage.className = "obamify-image";
        document.body.appendChild(obamiumImage);
    }

    function  removeExistingPicture() {
        let existingPicture = document.querySelectorAll(".obamify-image");
        for (let o of existingPicture) {
            o.remove();
        }
    }

    browser.runtime.onMessage.addListener((message) => {
        if(message.command === "obamify") {
            insertObamium(message.obamaURL);
        } else if (message.command === "reset") {
            removeExistingPicture();
        }
    });

})();