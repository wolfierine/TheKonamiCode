// variables
let secret_word = "";
let lastClick = 0;
let update_dates = [];
let sorted;
const secret_data_box = document.getElementById('secret-data-box');
const box_of_cats = document.querySelector('.box-full-of-cats');
let seconds = 0;

// functions
function requestForSecretData(){
  fetch("https://api.github.com/repos/elixir-lang/elixir/issues")
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        // sort issues by last update date
        sorted = data.slice().sort(function(a,b){
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        }).slice(0,5);

        // create list of issues
        sorted.forEach(function(item){
          const issue = document.createElement('li');

          const issue_name_element = document.createElement('span');
          issue_name_element.classList.add("issue-name");
          const issue_name = document.createTextNode("Issue name: " + item.title);

          const issue_author_element = document.createElement('span');
          issue_author_element.classList.add("issue-author");
          const issue_author = document.createTextNode("Issue's author: " + item.user.login);

          secret_data_box.appendChild(issue);
          issue.appendChild(issue_name_element);
          issue_name_element.appendChild(issue_name);
          issue.appendChild(issue_author_element);
          issue_author_element.appendChild(issue_author);
        });

        // hide adorable kittens and show super secret info
        showSecretData();

        // after 15 sec hide secret data
        setTimeout(hideSecretData, 15000);

    });
}

function showSecretData(){
  box_of_cats.classList.remove("show");
  box_of_cats.classList.add("hide");
  secret_data_box.classList.remove("hide");
  secret_data_box.classList.add("show");
}

function hideSecretData(){
  box_of_cats.classList.remove("hide");
  box_of_cats.classList.add("show");
  secret_data_box.classList.remove("show");
  secret_data_box.classList.add("hide");
}

function theKonamiCode(e){
  // if someone press escape button reset konami code
  if(e.keyCode === 27){
    secret_word = "";
  }
  // if someone press any key
  if(e.keyCode != 27){
    let letter = e.key;
    secret_word += letter.toLowerCase();
    console.log(secret_word);
  }
  // if someone type konami code
  if(secret_word === "injects3crets"){
    console.log("secret data is loading..");
    requestForSecretData();
  }
}

function checkTime(e){
  let d = new Date();
  let t = d.getTime();
  let diff = t - lastClick;
  // after 5 seconds reset typing word
  if((t - lastClick > 5000) && (lastClick != 0)){
    secret_word = "";
  }
  lastClick = t;
}


// events
document.addEventListener('keyup', theKonamiCode);
document.addEventListener("keypress", checkTime);
