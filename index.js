const submit = document.getElementById("submit");
const form = document.getElementById("form");

const container = document.getElementById("container");
const input = document.getElementById("username");

const display_profile = document.getElementById("display_profile");
const user_image = document.getElementById("user_image");
const user_id = document.getElementById("user_id");
const user_name = document.getElementById("user_name");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const repositories = document.getElementById("repositories");

const repo_list = document.getElementById("repo_list");
const list = document.getElementById("list");


form.addEventListener("submit", function(event){
  event.preventDefault();
})


submit.addEventListener("click", function(){
  let username = input.value;
  input.value="";
  getResponse(username);
})


// ajax call
const getResponse =(username) => {
  var httpRequest = new XMLHttpRequest();

  httpRequest.addEventListener("readystatechange", function(){
    if(httpRequest.readyState == 4){
      var data = JSON.parse(httpRequest.responseText);

      var user = data[0].owner.url;

      display_user(user);

      repo_list.style.display="block";
      
      list.innerHTML = " ";
      data.forEach(repo => {
        var list_item = document.createElement("button");
        list_item.setAttribute("id", "repo_link");
        list_item.innerHTML = `<a href=${repo.html_url}>${repo.name}</a>`;
        list.appendChild(list_item);
      })

      repo_list.appendChild(list);
    }
  })

  var url = `https://api.github.com/users/${username}/repos`;
  console.log(url);

  httpRequest.open("GET", url);
  httpRequest.send();
}


// display user information
const display_user = user => {

  var request = new XMLHttpRequest();

  request.addEventListener("readystatechange", function(){
    if(request.readyState==4){
      var details = JSON.parse(request.responseText);

      // console.log(details);
      display_profile.style.display="flex";
      user_image.setAttribute("src", details.avatar_url);
      user_name.innerText = details.name;
      user_id.innerText = `@${details.login}`;
      user_id.style.color = "skyblue";
      followers.innerText = `Followers: ${details.followers}`;
      following.innerText = `Following: ${details.following}`;
      repositories.innerText = `Repositories: ${details.public_repos}`;
    }
  })

  request.open("GET", user, false);
  request.send();
}
