(() => {
    console.clear();
    let previous_href = "";
    let href = "";
    let popup;
    let popup_textbox_likes;
    let popup_textbox_dislikes;
    let hovering = false;
    let limit = 2 * 24 * 60 * 60 * 1000; // in ms

    document.addEventListener('mousemove', async e => {
        let nodes = document.elementsFromPoint(e.clientX, e.clientY);

        updatePopupPosition(e.clientX, e.clientY);

        for (node of nodes) {
            if (node.id === "thumbnail" && node.nodeName === "A") {
                hovering = true;
                href = node.getAttribute("href");
                if (href != previous_href) {
                    previous_href = href;
                    if (href.includes("/shorts/")){
                        hovering = false;
                        break;
                    }
                    const queryParameters = href.split('?')[1];
                    const videoId = queryParameters.split('=')[1];
                    await showPopup(videoId);
                }
                break;
            }
            hovering = false;
        }
        if (!hovering) {
            hidePopup();
            previous_href = "";
            href = "";
        }
    });

    const showPopup = async (id) => {
        popup.style.display = 'block';

        let data_inserted = false;

        popup_textbox_likes.innerHTML = "loading...";
        popup_textbox_dislikes.innerHTML = "loading...";

        let obj = await chrome.storage.sync.get([id])

        if (obj[id]){
            let data = JSON.parse(obj[id]);
            console.log("storage");
                
            if (Date.now() - data.time < limit) {
                popup_textbox_likes.innerHTML = data.likes;
                popup_textbox_dislikes.innerHTML = data.dislikes;
                data_inserted = true;
            }
        }
            
        if (data_inserted) 
            return;

        fetch("https://returnyoutubedislikeapi.com/votes?videoId=" + id)
            .then((res) => res.json())
            .then((data) => {
                console.log("api");
                const rating = {
                    time: Date.now(),
                    likes: data.likes,
                    dislikes: data.dislikes
                };

                let string = JSON.stringify(rating);
                        
                chrome.storage.sync.set({
                    [id]: string
                }).then(() => {
                    popup_textbox_likes.innerHTML= data.likes;
                    popup_textbox_dislikes.innerHTML = data.dislikes;
                });
                        
            })
            .catch(error => {
                popup_textbox_likes = "API unavailable";
                popup_textbox_dislikes = "API unavailable";
            });
                
    }        
        

    const hidePopup = () => {
        popup.style.display = 'none';
    }

    const updatePopupPosition = (x, y) => {
        popup.style.left = x + "px";
        popup.style.top = y + popup.ownerDocument.defaultView.pageYOffset + "px";
    };

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