(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;
        if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();
        }
    });
    const newVideoLoaded = () => {
        const bookmarkBtnExists =
            document.getElementsByClassName(".bookmark-btn")[0];
        if (!bookmarkBtnExists) {
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
            bookmarkBtn.className = "ytp-button " + "bookmark-btn";
            bookmarkBtn.title = "Click to bookmark timestamp";

            youtubeLeftControls =
                document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];

            youtubeLeftControls.appendChild(bookmarkBtn);

            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
        }
    };

    newVideoLoaded();

    const addNewBookmarkEventHandler = (e) => {
        const currentTime = youtubePlayer.currentTime;
        const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + getTime(currentTime),
        };
    };

    const getTime = (t) => {
        let date = new Date(0);
        date.setSeconds(t);

        return date.toISOString().substring(11, 8);
    };
})();
