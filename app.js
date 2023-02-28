console.log('loading');

// load and display data
const loadData =  (searchWrod )=> {

  if(searchWrod != ''){
       fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + searchWrod)
         .then((res) => res.json())
         .then((data) => {
           // console.log(data);
           if (data.title === "No Definitions Found") {
             displayError(data.title);
           } else {
             displayData(data);
           }
         })
         .catch((err) => {
           console.log(err);
         });
  }else {
    alert('Input cant be left empty!!!');
  }

}

const searchBtn = document.getElementById("search_btn");

// seach btn click
searchBtn.addEventListener('click', function () {
    
    const inputField = document.getElementById('input_word');
    const inputValue = inputField.value 

    loadData(inputValue)

   

})

// search trigger by enter button
document
  .getElementById("input_word")
  .addEventListener("keypress", function (e) {
    const inputField = document.getElementById("input_word");
    const inputValue = inputField.value; 

    if(e.key === 'Enter'){
         loadData(inputValue);
    }
  });

// audio control
// document.getElementById("audio").addEventListener('click', ()=> {
//     document.getElementById("player").play();
// })

const displayError = (error)=> {
  alert(error);
}

const displayData = (response)=> {
  const data = response[0];
 // console.log(data);
  const { word, phonetics, meanings, phonetic } = data;
  const  audio  = phonetics[0]?.audio;

  //  console.log(meanings[0]);
  const { partOfSpeech, antonyms, synonyms, definitions } = meanings[0];
  // console.log(definitions);



  const displayContainer = document.getElementById("display_container");
  displayContainer.innerHTML = "";

  const dataEl = document.createElement("div");
  dataEl.classList.add("data", "bg-white", "rounded");

  const innerContent = `
       <div  class="data bg-white rounded p-3">
                    <!-- inner content start -->
                    <div class="d-flex align-items-center" >
                        <h1>${word}</h1>
                        <div class="ms-2">${phonetic? phonetic: null}</div>
                        <div class="ms-2">
                            <audio id="player" src="${audio}"></audio> 
                           <button id="playerBtn" class="btn">
                            ${
                                audio ?  `<i class="fa-solid fa-volume-high"></i>`:"Audio unavailable"
                            }                            
                            </button>                             
                        </div>
                        
                    </div>
                    <hr> 
                    <h4>${partOfSpeech ? partOfSpeech: 'No part of speech found'}</h4>
                    <ul>
                        ${
                          definitions?
                          definitions.map(
                          (item) => `
                            <li class="border-bottom p-2">
                                <p class="m-0 p-0">
                                   <strong> Definition:</strong> ${
                                     item.definition 
                                   }
                                </p>
                                <p class="m-0 p-0">
                                   <strong> Exmaple:</strong> ${
                                     item.example
                                       ? item.example
                                       : "No example available"
                                   }
                                </p>
                            </li>
                          `
                        ):
                        `No definition found`

                      }                            
                    </ul>
                    <div>
                        <p>Synnonyms:</p>
                        <p>Antonymss:</p>
                    </div>
                </div>
    `;
  dataEl.innerHTML = innerContent;

  displayContainer.appendChild(dataEl);
  // audioCall()\

   document.getElementById("playerBtn").addEventListener("click", () => {
     document.getElementById("player").play();
   });
}

// const audioCall = ()=> {

//   document.getElementById("playerBtn").addEventListener('click', ()=> {
//     document.getElementById("player").play()
//   })

// }

//  document.getElementById("playerBtn").addEventListener("click", () => {
//    document.getElementById("player").play();
//  });


 // loadData('town')

 console.log('loaded');


