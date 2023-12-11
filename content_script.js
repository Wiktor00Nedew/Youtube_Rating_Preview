(() => {
    console.clear();
    let previous_href = "";
    let href = "";
    let popup;
    let popup_textbox_likes;
    let popup_textbox_dislikes;
    let hovering = false;
    let limit = 2 * 24 * 60 * 60 * 1000; // in ms

    // here we're gonna add code

    const newPageLoaded = () => {
        const popupExists = document.getElementsByClassName("rating-popup")[0];
        
        
        if (popupExists) 
            return;

        popup = document.createElement("div");
        let like_image = document.createElement("img");
        let dislike_image = document.createElement("img");
        popup_textbox_likes = document.createElement("div");
        popup_textbox_dislikes = document.createElement("div");


        let table = document.createElement("table");

        // FIRST ROW 
        let td1_1 = document.createElement("td");
        let td2_1 = document.createElement("td");

        // SECOND ROW
        let td1_2 = document.createElement("td");
        let td2_2 = document.createElement("td");

        let tr1 = document.createElement("tr");
        let tr2 = document.createElement("tr");

        like_image.className = "popup-image";
        like_image.src = chrome.runtime.getURL("assets/like.png");
        dislike_image.className = "popup-image";
        dislike_image.src = chrome.runtime.getURL("assets/dislike.png");

        popup_textbox_likes.className = "popup-textbox";
        popup_textbox_dislikes.className = "popup-textbox";

        td1_1.appendChild(like_image);
        td2_1.appendChild(popup_textbox_likes);
        td1_2.appendChild(dislike_image);
        td2_2.appendChild(popup_textbox_dislikes);

        tr1.appendChild(td1_1);
        tr1.appendChild(td2_1);

        tr2.appendChild(td1_2);
        tr2.appendChild(td2_2);

        table.appendChild(tr1);
        table.appendChild(tr2);

        table.className = "popup-table"

        popup.className = "rating-popup";
        popup.style.display = 'none';

        popup.appendChild(table);

        document.body.appendChild(popup);
        
    }

    newPageLoaded();
})();