// -----------------------nav------------------------------------------------

let nav = false;

function openNav() {
    document.getElementById('nav-menu').style.width = "250px"
    document.getElementById('nav-menu').style.display = "flex"
    document.getElementById('togg-ico').classList.add('fa-times')
    document.getElementById('togg-ico').classList.remove('fa-align-justify')
    nav = true;

}
function closeNav() {
    document.getElementById('nav-menu').style.width = "0px"
    document.getElementById('nav-menu').style.display = "none"
    document.getElementById('togg-ico').classList.add('fa-align-justify')
    document.getElementById('togg-ico').classList.remove('fa-times')
    nav = false;

}

let navTogg = document.getElementById('mark-togg');

navTogg.addEventListener('click', function () {
    if (nav == false) {
        openNav();
        

    }
    else { closeNav(); }
})


// let toggico = document.getElementById('togg-ico');
// toggico.addEventListener('click' , function(){
// $('#navitem').animate({opacity:"1",paddingTop:"25px"},1100)
// })


// contact input validation---------------------------------------------------------------

let userName = document.getElementById("name"),
    userEmail = document.getElementById("email"),
    userPhone = document.getElementById("phone"),
    userAge = document.getElementById("age"),
    userPassword = document.getElementById("password"),
    userRePassword = document.getElementById("rePassword"),
    userNameAlert = document.getElementById("namealert"),
    userEmailAlert = document.getElementById("emailalert"),
    userPhoneAlert = document.getElementById("phonealert"),
    userAgeAlert = document.getElementById("agealert"),
    userpasswordAlert = document.getElementById("passwordalert"),
    userRepasswordAlert = document.getElementById("repasswordalert");

function userNameValid() {

    let pattern = /^[a-zA-Z0-9]+$/
    if (userName.value.match(pattern)) {
        userNameAlert.style.display = "none"
    } else {
        userNameAlert.style.display = "block"
    }
}
userName.addEventListener('keyup', userNameValid);

function userEmailValid() {
    let epattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (userEmail.value.match(epattern)) {
        userEmailAlert.style.display = "none"
    } else {
        userEmailAlert.style.display = "block"
    }
}
userEmail.addEventListener('keyup', userEmailValid);

function userPhoneValid() {
    let ppattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    if (userPhone.value.match(ppattern)) {
        userPhoneAlert.style.display = "none"
    } else {
        userPhoneAlert.style.display = "block"
    }
}

userPhone.addEventListener('keyup', userPhoneValid);

function userAgeValid() {
    let apattern = /^[1-9][0-9]?$|^100$/
    if (userAge.value.match(apattern)) {
        userAgeAlert.style.display = "none"
    } else {
        userAgeAlert.style.display = "block"
    }
}
userAge.addEventListener('keyup', userAgeValid);

function userPasswordValid() {
    let pppattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (userPassword.value.match(pppattern)) {
        userpasswordAlert.style.display = "none"
    } else {
        userpasswordAlert.style.display = "block"
    }
}
userPassword.addEventListener('keyup', userPasswordValid);

function userRePasswordValid() {

    if (userRePassword.value == userPassword.value) {
        userRepasswordAlert.style.display = "none"
    } else {
        userRepasswordAlert.style.display = "block"
    }
}
userRePassword.addEventListener('keyup', userRePasswordValid);











let
    trendingURL = "https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
    popularURL = "https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
    topratedURL = "https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
    upcomingURL = "https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
    NowURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
    searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&query=`


reqUrl = trendingURL

getResults(reqUrl)
async function getResults(reqUrl) {

    apiResponse = await fetch(reqUrl)
    responseData = await apiResponse.json()
    console.log(responseData)


    let mofies = document.getElementById('cardz')
    var dispo = "";

    for (i = 0; i < responseData.results.length; i++) {

        votes = Math.round(responseData.results[i].vote_average);

        // title
        if (responseData.results[i].name != undefined) {
            title = responseData.results[i].name
        } else {
            title = responseData.results[i].title

        }
        // first_air_date

        if (responseData.results[i].release_date != undefined) {
            datez = responseData.results[i].release_date
        } else {
            datez = responseData.results[i].first_air_date

        }


        dispo += `<div class="movie col-4 ">
        <div class="img">
          <img class="w-100" src="https://image.tmdb.org/t/p/w500/${responseData.results[i].poster_path}" alt="">
          <div class="info">
            <h5>${title}</h5>
            <p class="desc">${responseData.results[i].overview}</p>
            <p class="rate">rate:${votes}</p>
            <p class="date">${datez}</p>
          </div>
        </div>
      </div>`
    }
    mofies.innerHTML = dispo;

}



document.getElementById('item1').addEventListener('click', function () {
    reqUrl = NowURL
    getResults(reqUrl);
});
document.getElementById('item2').addEventListener('click', function () {
    reqUrl = popularURL
    getResults(reqUrl);
});
document.getElementById('item3').addEventListener('click', function () {
    reqUrl = topratedURL
    getResults(reqUrl);
});
document.getElementById('item4').addEventListener('click', function () {
    reqUrl = trendingURL
    getResults(reqUrl);
});
document.getElementById('item5').addEventListener('click', function () {
    reqUrl = upcomingURL
    getResults(reqUrl);
});

document.getElementById('seasea').addEventListener('keyup', function () {

    reqUrl = `${searchUrl} ${document.getElementById('seasea').value}`
    getResults(reqUrl);
});

document.getElementById('input').addEventListener('keyup', function () {

    reqUrl = `${searchUrl} ${document.getElementById('input').value}`
    getResults(reqUrl);
});




// animation





