const apiKey = "1fe7e787";

async function searchMovie(){

    const movie = document.getElementById("movieInput").value.trim();
    const moviesDiv = document.getElementById("movies");

    if(movie===""){
        alert("Enter a movie name");
        return;
    }

    moviesDiv.innerHTML="<h2>Loading...</h2>";

    try{

        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${movie}`);
        const data = await response.json();

        moviesDiv.innerHTML="";

        if(data.Response==="False"){
            moviesDiv.innerHTML=`<p class="error">${data.Error}</p>`;
            return;
        }

        data.Search.forEach(movie=>{

            const poster = movie.Poster==="N/A"
                ? "https://via.placeholder.com/220x320?text=No+Image"
                : movie.Poster;

            moviesDiv.innerHTML+=`
            <div class="movie-card">
                <img src="${poster}">
                <div class="movie-info">
                    <h3>${movie.Title}</h3>
                    <p><strong>Year:</strong> ${movie.Year}</p>
                    <p><strong>Type:</strong> ${movie.Type}</p>
                </div>
            </div>
            `;

        });

    }

    catch(error){

        moviesDiv.innerHTML=`<p class="error">Something went wrong!</p>`;

    }

}