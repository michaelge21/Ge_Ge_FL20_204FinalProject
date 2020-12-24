window.onload = function() {

    const APIKEY = "np5jLkSLwCqMfucJ8SxhABzsBjRvr8qP";
    var moregifsCounter = 0;
    var lastSearchedTerm;
    let expandedGifs;

    var trendingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}&limit=20`;
    console.log(trendingUrl);
    fetch (trendingUrl)
        .then(response => response.json())
        .then(content => {
            console.log(content.data);
                console.log("META", content.meta);
            for (i = 0; i < content.data.length; i++ ) {
                displayGifs(content.data[i].images.fixed_width.url, content.data[i].id);
            }
        })
    .catch(err => {
        console.log("ERROR");
    });
        
    document.getElementById("searchbar-button").addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("gifs").innerHTML = "";
        var keyword = document.getElementById("searchbar").value.trim();
        lastSearchedTerm = keyword;
        var url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=20&q=` + keyword;
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(content => {
                console.log(content.data);
                console.log("META", content.meta);
                for (i = 0; i < content.data.length; i++ ) {
                    displayGifs(content.data[i].images.fixed_width.url, content.data[i].id);
                }
                clearForm();
            })
            .catch(err => {
                console.log("ERROR");
            });
        
        document.getElementById("moreGifs").classList.remove("hidden");
    })

    function displayGifs(url, id) {

        var newGif = document.createElement("img");
        newGif.setAttribute("src", url);
        newGif.setAttribute("alt", id);
        newGif.addEventListener("click", () => {
            getGIFById(id);
        })

        var gifs = document.getElementById("gifs");
        gifs.appendChild(newGif); 
    }

    document.getElementById("moreGifs").addEventListener("click", (e) => {
        e.preventDefault();
        moregifsCounter++;
        var url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=20&offset=${moregifsCounter*10}&q=` + lastSearchedTerm;
        console.log(url);
        console.log(moregifsCounter);
        console.log(lastSearchedTerm);

        fetch(url)
            .then(response => response.json())
            .then(content => {
                console.log(content.data);
                console.log("META", content.meta);
                for (i = 0; i < content.data.length; i++ ) {
                    displayGifs(content.data[i].images.fixed_width.url, content.data[i].title);
                }
                clearForm();
            })
            .catch(err => {
                console.log("ERROR");
            });

    })

    function clearForm() {
        document.getElementById("searchbar").value = "";
    }

    function getGIFById(id) {
        var url = `https://api.giphy.com/v1/gifs/${id}?api_key=${APIKEY}`;
        console.log(url);
    
        fetch(url)
            .then(response => response.json())
            .then(content => {
                console.log(content.data);
                console.log("META", content.meta);
                console.log(content.data.images.original.url);
                console.log(content.data.id);
                expandGif(content.data.images.original.url, content.data.id);
            })
        .catch(err => {
            console.log("ERROR");
        });
    }
    
    function expandGif (url, id) {
        var expandGif = document.createElement("img");
        expandGif.setAttribute("src", url);
        expandGif.setAttribute("alt", id);
        expandGif.setAttribute("class", "expanded");
        expandGif.addEventListener("click", () => {
            expandGif.setAttribute("class", "hidden");
        })

        var gifs = document.getElementById("gifs");
        gifs.appendChild(expandGif); 
    }

}

function switchColor() {
    var body = document.body;
    var bodyText = [];
    bodyText = document.getElementsByClassName("change-color");

    console.log(bodyText);

    Array.from(bodyText).forEach(function (element) {
        element.classList.toggle("light-mode-text");
    })

    var header = document.getElementById("header");
    header.classList.toggle("light-mode-header");

    body.classList.toggle("light-mode");
}


