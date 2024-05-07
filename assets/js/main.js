let profile = document.querySelector(".header .profile");

document.querySelector("#user-btn").onclick = () => {
  profile.classList.toggle("active");
  search.classList.remove("active");
};

let toggleBtn = document.getElementById("toggle-btn");
let body = document.body;
let darkMode = localStorage.getItem("dark-mode");

const enableDarkMode = () => {
  toggleBtn.classList.replace("fa-sun", "fa-moon");
  body.classList.add("dark");
  localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
  toggleBtn.classList.replace("fa-moon", "fa-sun");
  body.classList.remove("dark");
  localStorage.setItem("dark-mode", "disabled");
};

if (darkMode === "enabled") {
  enableDarkMode();
}

toggleBtn.onclick = (e) => {
  darkMode = localStorage.getItem("dark-mode");
  if (darkMode === "disabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
};

const BDD = {
  etudiants: [
    {
      nom: "diop",
      prenom: "diop",
      email: "alioud@gmail.com",
      telephone: "772157477",
      sexe: "M",
      dateNaiss: "2024-05-08",
      lieuNaiss: "pout",
      cni: "1761200000327",
      referentiielId: 0,
      promotionId: 0,
    },
  ],
  referentiiel: [
    { nom: "dev web", desc: "developpement web", status: "active" },
  ],
  promotion: [
    {
      nom: "p1",
      dateDebut: "2020-05-08",
      dateFin: "2021-05-08",
      etat: "desactive",
    },
    {
      nom: "p2",
      dateDebut: "2021-12-08",
      dateFin: "2022-05-08",
      etat: "active",
    },
  ],
  presence: [{}],
  utilisateur: [{}],
};

function isValidURL(url) {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(url);
}

const btn = document.querySelector("#suivant");

const profileImg = document.querySelector("#studentImage");

let imginput = document.querySelector("#image");
imginput.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    if (isValidURL(imginput.value)) profileImg.src = imginput.value;
  }
});

function checkVide(value) {
  if (value == "") {
    return "ce champs ne peut etre vide";
  }
  return 0;
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    ? ""
    : "email invalide";
};

const valideCni = (cni) => {
  return String(cni)
    .toLowerCase()
    .match(/^[0-9]{13}$/)
    ? ""
    : "cni invalide";
};

function isValidPhoneNumber(text) {
  var pattern = /^(77|78|76|75)\d{7}$/;

  return pattern.test(text) ? "" : "numero telephone invalide";
}

function isValidDate(dateString) {
  // Parse the date string
  var date = new Date(dateString);

  return !isNaN(date.getTime()) ? "" : "date invalide";
}

btn.addEventListener("click", (e) => {
  const form = document.querySelectorAll("#app");
  let error = 0;

  form.forEach((el) => {
    if (checkVide(el.value) != 0) {
      console.log(el.attributes[1]);
      el.classList.toggle("error");
      el.nextElementSibling.innerText =
        "le champ " + el.attributes[1].value + " ne peut etre vide";
      error = 1;
    }

    el.addEventListener("change", (e) => {
      if (checkVide(e.target.value) != 0) {
        e.target.classList.toggle("error");
        el.nextElementSibling.innerText =
          "le champ " + el.attributes[1].value + " ne peut etre vide";
        error = 1;
      } else {
        // if(e.target.classList)
        e.target.classList.remove("error");
        e.target.nextElementSibling.innerText = "";
      }

      if (error != 0) {
        switch (el.attributes[1].value) {
          case "email":
            el.nextElementSibling.innerText = validateEmail(el.value);
            error = 1;
            break;
          case "telephone":
            el.nextElementSibling.innerText = isValidPhoneNumber(el.value);
            error = 1;
            break;
          case "cni":
            el.nextElementSibling.innerText = valideCni(el.value);
            error = 1;
            break;
          case "date_naiss":
            el.nextElementSibling.innerText = isValidDate(el.value);
            error = 1;
            break;

          default:
            break;
        }
      }
    });
  });

  if(error == 0){

     let formData = Object.fromEntries(
        new FormData(document.getElementById("form"))
      );
      console.log(formData);
      afficher(formData);
      BDD.etudiants.push(formData);
   }else{
      e.preventDefault();
   }
});

function afficher(datas) {
  let model = `
   <tr class="line">
   <td class="bloc">
     <div class="col-bas">
       <img src="${datas.image}" width="30px" />
     </div>
   </td>
   <td class="bloc">
     <div class="col-bas" style="color: rgb(29, 109, 29)">
       ${datas.nom}
     </div>
   </td>
   <td class="bloc">
     <div class="col-bas" style="color: rgb(29, 109, 29)">
     ${datas.prenom}
     </div>
   </td>
   <td class="bloc">
     <div class="col-bas email">${datas.email}</div>
   </td>
   <td class="bloc">
     <div class="col-bas">${datas.sexe}</div>
   </td>
   <td class="bloc">
     <div class="col-bas">${datas.telephone}</div>
   </td>
   <td class="bloc">
     <div class="col-bas">${BDD.referentiiel[datas.promo].nom}</div>
   </td>
   <td class="bloc">
     <div class="col-haut"></div>
     <input type="checkbox" id="my-checkbox-0" />
     <label for="my-checkbox-0"></label>
   </td>
 </tr>
   `;

  let table = document.querySelector("table");
  table.innerHTML += model;
}
