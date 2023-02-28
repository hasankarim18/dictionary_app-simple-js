

// load and display data
const loadData = async (searchWrod )=> {

    try {
        const res = await fetch(
          "https://api.dictionaryapi.dev/api/v2/entries/en/" + searchWrod
        );
        const data = await res.json();

        displayData(data)

    } catch (error) {
      console.log(error);
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



const displayData = (data)=> {
  console.log(data);  

  const displayContainer = document.getElementById("display_container");
    displayContainer.innerHTML = "";

    const dataEl = document.createElement('div');
    dataEl.classList.add("data", "bg-white", "rounded");


    const innerContent = `
       <div class="d-flex align-items-center" >
                <h1></h1> <audio src=""></audio> <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
      </div>
    `;

    dataEl.innerHTML = innerContent;

    displayContainer.appendChild(dataEl);

}



