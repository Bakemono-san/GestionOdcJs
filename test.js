let profile = document.querySelector(".header .profile");
let edit = document.querySelectorAll("#edit");
let id = 1;

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
         id: "0",
         nom: "diop",
         prenom: "diop",
         email: "alioud@gmail.com",
         telephone: "772157477",
         sexe: "M",
         dateNaiss: "2024-05-08",
         lieuNaiss: "pout",
         cni: "1761200000327",
         referentiel: "0",
         promo: "0",
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

let data = BDD;

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
                  console.log("date_naiss");
                  break;

               default:
                  break;
            }
         }
      });
   });

   if (error == 0) {

      let formData = new FormData(document.getElementById("form"))
      formData.append("id", id);
      formData = Object.fromEntries(formData)
      ajouter(formData);
      BDD.etudiants.push(formData);
   } else {
      e.preventDefault();
   }
});


function ajouter(datas) {
   let model = `
   <tr class="line" data-id="${datas.id}">
   <td class="bloc">
     <div class="col-bas" id="qrCode">
       <img src="${datas.image}" width="30px" />
     </div>
   </td>
   <td class="bloc">
     <div class="col-bas nom" id="edit" style="color: rgb(29, 109, 29)">
       ${datas.nom}
     </div>
   </td>
   <td class="bloc">
     <div class="col-bas prenom" id="edit" style="color: rgb(29, 109, 29)">
     ${datas.prenom}
     </div>
   </td>
   <td class="bloc">
     <div class="col-bas email" id="edit">${datas.email}</div>
   </td>
   <td class="bloc">
     <div class="col-bas sexe" id="edit">${datas.sexe}</div>
   </td>
   <td class="bloc">
     <div class="col-bas telephone" id="edit">${datas.telephone}</div>
   </td>
   <td class="bloc">
     <div class="col-bas" id="edit">${BDD.referentiiel[datas.referentiel].nom}</div>
   </td>
   <td class="bloc">
     <div class="col-haut"></div>
     <input type="checkbox" id="my-checkbox-0" />
     <label for="my-checkbox-0"></label>
     <span id="modal-edit">edit</span>
   </td>
 </tr>
   `;

   let table = document.querySelector("tbody");
   table.innerHTML += model;
   edit = document.querySelectorAll("#edit");
   id++;
}


function paginer(tableaux = [], page) {
   let tableau = tableaux.slice(page * 5, (page * 5) + 5);
   let table = document.querySelector("tbody");
   table.innerHTML = "";
   tableau.forEach(el => {
      ajouter(el);
   })

}

let next = document.querySelector(".next")
let prev = document.querySelector(".prev")
let page = 0;
next.addEventListener("click", () => {
   if ((page + 1) * 5 < BDD.etudiants.length) {
      page++;
      paginer(BDD.etudiants, page);
   }
})

prev.addEventListener("click", () => {
   if (page - 1 >= 0) {
      page--;
      paginer(BDD.etudiants, page);
   }
})

function search(term) {
   let table = document.querySelector("tbody");
   table.innerHTML = "";
   BDD.etudiants.forEach(el => {
      if (el.nom.includes(term) || el.prenom.includes(term)) {
         ajouter(el);
      }
   })
}

let searchApp = document.querySelector("#searchApp")

searchApp.addEventListener("keyup", (e) => {
   if (e.target.value.length >= 3) {
      search(e.target.value)
   } else {
      paginer(BDD.etudiants, page)
   }
})


let closeQrcode = document.querySelector(".qrcode")
qrCodes = document.querySelectorAll("#qrCode");
qrCodes.forEach(el => {
   el.addEventListener("click", () => {
      createQrCode(el.parentNode.parentNode.children[5].children[0].innerText)
      closeQrcode.style.display = "flex"
      let modalQr = `<img src="${el.firstElementChild.src}" >`;
      qrCodes.innerHTML += modalQr;
      console.log(el.firstElementChild.src);
   })
})

closeQrcode.addEventListener("click", () => {
   closeQrcode.style.display = "none"
})
let selectedDiv = "";
document.addEventListener("click", () => {
   edit = document.querySelectorAll("#edit");

   edit.forEach((el) => {



      el.parentNode.addEventListener("dblclick", () => {
         if (selectedDiv != el && selectedDiv != "") {
            el.preventDefault();
         }
         if (el.contentEditable != "true") {
            el.contentEditable = true;
         }
         selectedDiv = el;
      })
      el.addEventListener("keydown", (e) => {
         if (e.key == "Enter") {
            console.log(e.target.classList[1], e.target.parentNode.attributes);
            let col = e.target.classList[1]
            BDD.etudiants[e.target.parentNode.parentNode.getAttribute("data-id")][col] = el.innerText.trim();
            paginer(BDD.etudiants, page);
            selectedDiv = ""
            // el.innerText = el.innerText.trim();
            el.contentEditable = false
         }
      })

   })
   let modalEdit = document.querySelector("#modal-edit");
   let popup = document.querySelector("#popup");
   modalEdit.addEventListener("click", (e) => {
      let ligne = e.target.parentNode.parentNode;
      console.log(ligne);
      popup.style.display = "block"
      let id = e.target.parentNode.parentNode.getAttribute("data-id");
      let rowData = BDD.etudiants.map(el => {
         return el.id == id && el;
      })

      for (const el in rowData[1]) {
         console.log(el);
      }
      console.log(rowData, id);
      // let form = document.getElementById("form")

      // formData.append("id", id);
      // formData = Object.fromEntries(formData)
      // ajouter(formData);

   })
})

let ths = document.querySelectorAll("#tri")
ths.forEach(el => {
   let col = el.innerText
   console.log(col);
   el.addEventListener("click", () => {
      if (!el.children[0].classList.contains("actif") && !el.children[1].classList.contains("actif")) {
         el.children[0].classList.toggle("actif");
      } else {
         el.children[0].classList.toggle("actif");
         el.children[1].classList.toggle("actif");
      }

      if (el.children[0].classList.contains("actif")) {
         triCroissant(col);
      } else {
         triDeCroissant();
      }
   })
})

function triDeCroissant(col) {
   data = BDD
   data.etudiants.sort();


   let table = document.querySelector("tbody");
   table.innerHTML = ""

   data.etudiants.forEach(el => ajouter(el))
}

function triDeCroissantb() {
   data.etudiants.reverse();

   console.log(data);

   let table = document.querySelector("tbody");
   table.innerHTML = ""

   data.etudiants.forEach(el => ajouter(el))
}

function createQrCode(tel) {
   console.log("hey");
   // Create a QRCode object
   var qr = qrcode(0, 'M');
   qr.addData(tel); // Data to encode
   qr.make(); // Generate QR code

   // Render the QR code on the page
   document.getElementById('qrcode').innerHTML = qr.createImgTag();
}