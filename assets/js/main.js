let profile = document.querySelector(".header .profile");
let edit = document.querySelectorAll("#edit");
let id = 1;
let idPromo = 2;
let qrCodes = [];
let modalEdit;
let currentPage = "Apprenants";
let newBtn = document.querySelector("#newBtn")



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
      { nom: "ref dig", desc: "developpement web", status: "active" },
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

function ajouterPromo(datas) {
   console.log(datas);
   let model = `
   <tr class="line" data-id="${idPromo}">
   <td class="bloc">
       ${datas.nom}
   </td>
   <td class="bloc">
     <div class="col-bas nom" id="edit" style="color: rgb(29, 109, 29)">
       ${datas.dateDebut}
     </div>
   </td>
   <td class="bloc">
     <div class="col-bas prenom" id="edit" style="color: rgb(29, 109, 29)">
     ${datas.dateFin}
     </div>
   </td>
   <td class="bloc">
     <div class="col-haut"></div>
     <input type="checkbox" class="checkbox" ${datas.etat == "active" ? "checked" : ""} id="my-checkbox-${id}" />
     <label for="my-checkbox-${id}"></label>
   </td>
 </tr>
   `;

   let table = document.querySelector("tbody");
   table.innerHTML += model;
   idPromo++;
   document.querySelector(".modal").style.display = "none"
}


function ajouterApprenant(datas) {
   let hidden = document.querySelector("#hidden")
   console.log(hidden)
   let model = `
   <tr class="line" data-id="${datas.id}">
   <td class="bloc">
     <div id="qrCode" class="col-bas">
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
     <input type="checkbox" class="checkbox" id="my-checkbox-${id}" />
     <label for="my-checkbox-${id}"></label>
     <span id="modal-edit">edit</span>
   </td>
 </tr>
   `;

   let table = document.querySelector("tbody");
   table.innerHTML += model;
   edit = document.querySelectorAll("#edit");
   id++;
   modalEdit = document.querySelector("#modal-edit");
   document.querySelector(".modal").style.display = "none"

   qrCodes = document.querySelectorAll("#qrCode");
}


function paginer(tableaux = [], page) {
   let tableau = tableaux.slice(page * 5, (page * 5) + 5);
   let table = document.querySelector("tbody");
   table.innerHTML = "";
   tableau.forEach(el => {
      ajouterApprenant(el);
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
         ajouterApprenant(el);
      }
   })
}

function changeTableHeader(page) {
   let model;
   if (page == "Promos") {

      model = `
      <tr>
      <th class="titre" id="tri" data-label="nom">
      <i class="fa fa-arrow-down" aria-hidden="true"></i>
      <i class="fa fa-arrow-up" aria-hidden="true"></i> Nom
      </th>
   <th class="titre prenom" id="tri" data-label="prenom">
   <i class="fa fa-arrow-down" aria-hidden="true"></i>
   <i class="fa fa-arrow-up" aria-hidden="true"></i> Date de debut
   </th>
   <th class="titre email1" id="tri" data-label="email">
   <i class="fa fa-arrow-down" aria-hidden="true"></i>
   <i class="fa fa-arrow-up" aria-hidden="true"></i> Date de fin
   </th>
   <th class="titre" data-label="Actions">Actions</th>
   </tr>
   `
   } else {
      model = `
      <tr>
                    <th class="titre" data-label="Image">Image</th>
                    <th class="titre" id="tri" data-label="nom">
                      <i class="fa fa-arrow-down" aria-hidden="true"></i>
                      <i class="fa fa-arrow-up" aria-hidden="true"></i> Nom
                    </th>
                    <th class="titre prenom" id="tri" data-label="prenom">
                      <i class="fa fa-arrow-down" aria-hidden="true"></i>
                      <i class="fa fa-arrow-up" aria-hidden="true"></i> Prenom
                    </th>
                    <th class="titre email1" id="tri" data-label="email">
                      <i class="fa fa-arrow-down" aria-hidden="true"></i>
                      <i class="fa fa-arrow-up" aria-hidden="true"></i> Email
                    </th>
                    <th class="titre" id="tri" data-label="genre">
                      <i class="fa fa-arrow-down" aria-hidden="true"></i>
                      <i class="fa fa-arrow-up" aria-hidden="true"></i> Genre
                    </th>
                    <th class="titre" id="tri" data-label="telephone">
                      <i class="fa fa-arrow-down" aria-hidden="true"></i>
                      <i class="fa fa-arrow-up" aria-hidden="true"></i>
                      Telephones
                    </th>
                    <th class="titre" id="tri" data-label="referentiel">
                      <i class="fa fa-arrow-down" aria-hidden="true"></i>
                      <i class="fa fa-arrow-up" aria-hidden="true"></i>
                      Réferentiels
                    </th>
                    <th class="titre" data-label="Actions">Actions</th>
                  </tr>
   `
   }

   document.querySelector("thead").innerHTML = "";
   document.querySelector("thead").innerHTML = model;
   qrCodes = document.querySelectorAll("#qrCode");


}

let searchApp = document.querySelector("#searchApp")

searchApp.addEventListener("keyup", (e) => {
   if (e.target.value.length >= 3) {
      search(e.target.value)
   } else {
      paginer(BDD.etudiants, page)
   }
})

let selectedDiv = "";
document.addEventListener("click", () => {
   qrCodes.forEach(el => {
      el.addEventListener("click", () => {
         showQr(el);
      })
   })
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
   let popup = document.querySelector(".modal");
   modalEdit.addEventListener("click", (e) => {
      let id = e.target.parentNode.parentNode.getAttribute("data-id");
      let etudiant = BDD.etudiants[id];
      let donnees = Object.entries(etudiant)
      console.log(popup.children.form, etudiant);
      for (let index = 0; index < donnees.length; index++) {
         popup.children.form[index].value = donnees[index][1]
      }

      // popup.children.form.innerHTML += `<input type="hidden" id="hidden" value="${id}" />`
      popup.style.display = "block"

      document.querySelector(".close").addEventListener("click", () => {
         document.querySelector(".modal").style.display = "none"
      })

      suivant.addEventListener("click", () => {
         let formData = new FormData(document.getElementById("form"))
         let donnee = Object.fromEntries(formData)


         BDD.etudiants[id] = donnee;
         document.querySelector("tbody").innerHTML = "";
         // console.log("bdd => ",BDD.etudiants,"form => ", formData);
         BDD.etudiants.forEach(el => {
            ajouterApprenant(el)
         })
         document.getElementById("form").reset();
      })

   })

   newBtn.addEventListener("click", () => {
      if (currentPage != "Promos") {
         document.querySelector("#popupPromo").style.display = "none"

         document.querySelector("#popup").style.display = "block"
         const btn = document.querySelector("#suivant");
         let closebtn = document.querySelector(".close.popupApp")
         closebtn.addEventListener("click", () => {
            document.querySelector("#popup").style.display = "none"
         })
         btn.addEventListener("click", (e) => {
            const form = document.querySelectorAll(".apprenant");
            let error = 0;
            form.forEach((el) => {
               if (checkVide(el.value) != 0) {
                  el.classList.toggle("error");
                  el.nextElementSibling.innerText =
                     "le champ " + el.attributes[1].value + " ne peut etre vide";
                  console.log(("hello", el.value, el));
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
                           console.log("email");
                           error = 1;
                           break;
                        case "telephone":
                           el.nextElementSibling.innerText = isValidPhoneNumber(el.value);
                           console.log("telephone");
                           error = 1;
                           break;
                        case "cni":
                           el.nextElementSibling.innerText = valideCni(el.value);
                           console.log("cni");
                           error = 1;
                           break;
                        case "date_naiss":
                           el.nextElementSibling.innerText = isValidDate(el.value);
                           console.log("date_naiss");
                           error = 1;
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
               ajouterApprenant(formData);
               BDD.etudiants.push(formData);
               document.getElementById("form").reset();
            } else {
               e.preventDefault();
            }
         });
      }
   })

   let navBtn = document.querySelectorAll("#nav")
   let creatPromo;
   navBtn.forEach(el => {

      el.addEventListener("click", (e) => {
         currentPage = e.target.lastChild.textContent
         document.querySelector("tbody").innerHTML = ""
         if (currentPage == "Promos") {
            newBtn.innerText = "nouvelle"
            newBtn.addEventListener("click", () => {
               document.querySelector("#popupPromo").style.display = "flex"
            })
            document.querySelector(".close.promo").addEventListener("click", () => {
               document.querySelector("#popupPromo").style.display = "none"

            })
            changeTableHeader("Promos");
            BDD.promotion.forEach(el => {
               ajouterPromo(el)
            })
            creatPromo = document.querySelector("#createPromo")
            creatPromo.addEventListener("click", () => {
               let formData = new FormData(document.getElementById("formPromo"))
               formData.append("id", id);
               formData.append("etat", "desactive");
               formData = Object.fromEntries(formData);
               BDD.promotion.push(formData);
               let table = document.querySelector("tbody");
               table.innerHTML = ""
               BDD.promotion.forEach(el => {
                  ajouterPromo(el);
               })
               document.getElementById("formPromo").reset();
               document.querySelector("#popupPromo").style.display = "none"

            })
         } else {

            newBtn.innerText = "nouveau"
            newBtn.addEventListener("click", () => {
               document.querySelector("#popup").style.display = "block"
            })
            changeTableHeader("Etudiants");
            BDD.etudiants.forEach(el => {
               ajouterApprenant(el)
            })
         }
      })
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
      qrCodes = document.querySelectorAll("#qrCode");

   })
})

function triCroissant(col) {
   data = BDD
   data.etudiants.sort((a, b) => {

      // Convert 'nom' strings to lowercase for case-insensitive sorting
      const nomA = a[col.toLowerCase()].toLowerCase();
      const nomB = b[col.toLowerCase()].toLowerCase();

      if (nomA < nomB) {
         return -1;
      }
      if (nomA > nomB) {
         return 1;
      }
      return 0;
   });

   console.log(data);

   let table = document.querySelector("tbody");
   table.innerHTML = ""

   data.etudiants.forEach(el => ajouterApprenant(el))
}

function triDeCroissant() {
   data.etudiants.reverse();

   console.log(data);

   let table = document.querySelector("tbody");
   table.innerHTML = ""

   data.etudiants.forEach(el => ajouterApprenant(el))
}

document.querySelector(".trade-modal-container").addEventListener("click", () => {
   document.querySelector(".trade-modal-container").style.display = "none"
})

let transfertlistbtn;

function showRefList() {
   let div = document.querySelector(".ref-list")
   let listeRef = BDD.referentiiel;
   div.innerHTML = ""
   let datas = [];
   listeRef.forEach((el, index) => {
      div.innerHTML += `<button id="transf" data-id="${index}">${el.nom}</button>`
   })
   div.style.display = "flex"
   transfertlistbtn = document.querySelectorAll("#transf")
   console.log(transfertlistbtn);
   if (transfertlistbtn) {
      transfertlistbtn.forEach(el => {
         el.addEventListener("click", () => {
            transfererRef(el.getAttribute("data-id"));
         })
      })
   }
}


function transfererRef(referentiel) {
   let datas = document.querySelectorAll(".checkbox")
   let table = document.querySelector("tbody");
   table.innerHTML = "";
   datas.forEach(el => {
      if (el.checked == true) {
         id = el.parentNode.parentNode.getAttribute("data-id");

         BDD.etudiants[id].referentiel = referentiel;
         console.log(BDD.etudiants);

         BDD.etudiants.forEach(el => {
            ajouterApprenant(el);
         })
      }
   })

   document.querySelector(".ref-list").style.display = "none"
   qrCodes = document.querySelectorAll("#qrCode");


}

// codeQR
function createQrCode(tel) {
   console.log("hey");
   var qr = qrcode(0, 'M');
   qr.addData(tel);
   qr.make();
   document.getElementById('qrcode').innerHTML += qr.createImgTag();
}

let closeQrcode = document.querySelector(".qrcode")
function showQr(img) {
   document.getElementById('qrcode').innerHTML = ""
   console.log(document.getElementById('qrcode'));
   let modalQr = `<img src="${img.firstElementChild.src}" class="profil"/> <p>${img.parentNode.parentNode.children[2].children[0].innerText} ${img.parentNode.parentNode.children[1].children[0].innerText} - ${img.parentNode.parentNode.children[6].children[0].innerText}</p>`;
   document.getElementById('qrcode').innerHTML += modalQr;
   createQrCode(img.parentNode.parentNode.children[5].children[0].innerText)
   closeQrcode.style.display = "flex"
}



closeQrcode.addEventListener("click", () => {
   closeQrcode.style.display = "none"
})

// QrCode



BDD.etudiants.forEach(el => {
   ajouterApprenant(el)
})