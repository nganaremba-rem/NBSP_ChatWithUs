const chatItemWrap = document.querySelector("#displaySearch");
const searchInput = document.querySelector("#search");
let searchItem;
let formDataSearch;

function fetchSearchData() {
  fetch("search.php", {
    method: "POST",
    body: formDataSearch,
  })
    .then((res) => res.json())
    .then((res) => {
      if (Object.keys(res).length == 0) {
        chatItemWrap.innerHTML = `
        <div class="chat-item-wrap">
                <div class="chat-details">
                    <div class="chat-name">No Result</div>
                </div>
            </div>
        `;
      } else {
        let outputSearch = "";
        res.forEach((element) => {
          outputSearch += `
          <div class="chat-item-wrap"  id='${element.Username}' onclick='openChat(this.id)'>                
            <div class="prof-icon"><img src="./icon/icon.jpg" alt=""></div>
            <div class="chat-details"'>
                <div class="chat-name">${element.Username}</div>
            </div>
          </div>
                `;
        });
        chatItemWrap.innerHTML = outputSearch;
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
searchInput.addEventListener("keyup", () => {
  searchItem = searchInput.value;
  if (searchItem == "") {
    fetchMainPage();
  } else {
    formDataSearch = new FormData();
    formDataSearch.append("search", searchItem);
    fetchSearchData();
  }
});
