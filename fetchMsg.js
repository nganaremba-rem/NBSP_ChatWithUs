// const scrollToBottom = () => {
//   chatArea.scrollTop = chatArea.scrollHeight;
// };

let to;
// const scrollToBottom = () => {
//   chatArea.scrollTop = chatArea.scrollHeight;
// };

function openChat(id) {
    //
    if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  fsbtn.setAttribute("onclick", "closeFullscreen()");
    //
  document.querySelector(".container").classList.add("open");
  document.querySelector("#chatname").innerHTML = id;
  to = id;

  if (to == "Global Chat") {
    let lastTimeg = 0;
    const UPDATEg = 1 / 0.5;
    let lastCheckMsgg = 0;

    function globalMain(time) {
      requestAnimationFrame(globalMain);
      let second = (time - lastTimeg) / 1000;
      if (second < 1 / UPDATEg) {
        return;
      }
      lastTimeg = time;
      // console.log(second);
      fetch("fetchMsg.php")
        .then((res) => res.json())
        .then((res) => {
          let output = "";
          let checkMsg = Object.keys(res).length;
          // to get the last element of a json file
          //   var highest = res[Object.keys(res).sort().pop()];
          //   console.log(highest);
          let domain = ["online","com","tech","in","io"];
          let textDom = domain.join("|");
          let regex = new RegExp(`([a-zA-Z0-9_\.-]+[\.](?:${textDom})(?:[\/][a-zA-Z0-9_\.-]*)?)`,"g");
          let text = ""
          if (checkMsg == 0) {
            chatArea.innerHTML = output;
          }
          if (checkMsg != lastCheckMsgg) {
            res.forEach((element) => {
              // const randNum = Math.floor(Math.random() * (5 - 0 + 1) + 0);

              if (element["user"] == userID) {
                $senderClass = "receiver";
              } else {
                $senderClass = "sender";
              }
              output += `
          <div class="msg">
              <div class="${$senderClass}">
                  <div class='sender-name'>
                    ${element["user"]}
                  </div>
                  <div class='text-msg'>
                    ${element["msg"]}
                  </div>
              </div>
            </div>
          `;
            });
            text = output;
            text = text.replace(regex,"<a class='link-text' href='http://$1'>$1</a>");
            chatArea.innerHTML = text;
            chatArea.scrollTop = chatArea.scrollHeight;
          }
          lastCheckMsgg = checkMsg;
        });
    }
    requestAnimationFrame(globalMain);
    chatArea.scrollTop = chatArea.scrollHeight;
  } else {
    //
    let lastTime = 0;
    const UPDATE = 1 / 0.5;
    let lastCheckMsg = 0;

    function main(time) {
      requestAnimationFrame(main);
      let second = (time - lastTime) / 1000;
      if (second < 1 / UPDATE) {
        return;
      }
      lastTime = time;
      // fetch msg
      let formData = new FormData();
      formData.append("user", userID);
      formData.append("to", to);
      //
      //   for (var pair of formData.entries()) {
      //     console.log(pair[0] + ", " + pair[1]);
      //   }
      //
      fetch("fetchMsg.php", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          let output = "";
          let checkMsg = Object.keys(res).length;
          let domain = ["online","com","tech","in","io"];
          let textDom = domain.join("|");
          let regex = new RegExp(`([a-zA-Z0-9_\.-]+[\.](?:${textDom})(?:[\/][a-zA-Z0-9_\.-]*)?)`,"g");          
          let text = ""

          if (checkMsg == 0) {
            chatArea.innerHTML = output;
          }
          if (checkMsg != lastCheckMsg) {
              
      
            res.forEach((element) => {
              // const randNum = Math.floor(Math.random() * (5 - 0 + 1) + 0);

              if (element["user"] == userID) {
                $senderClass = "receiver";
              } else {
                $senderClass = "sender";
              }
              output += `
          <div class="msg">
              <div class="${$senderClass}">
                  <div class='sender-name'>
                    ${element["user"]}
                  </div>
                  <div class='text-msg'>
                    ${element["msg"]}
                  </div>
              </div>
            </div>
          `;
            });
            text = output;
            text = text.replace(regex,"<a class='link-text' href='http://$1'>$1</a>");
            chatArea.innerHTML = text;
            chatArea.scrollTop = chatArea.scrollHeight;
          }
          lastCheckMsg = checkMsg;
        });
    }
    requestAnimationFrame(main);
    chatArea.scrollTop = chatArea.scrollHeight;
  }
}

function back() {
    
  document.querySelector("#search").value = "";
  chatArea.innerHTML = "";
  //
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  fsbtn.setAttribute("onclick", "openFullscreen()");
  //
  document.querySelector("#homepage").classList.add("open");
  document.querySelector(".container").classList.remove("open");
  var id = window.requestAnimationFrame(function () {});
  while (id--) {
    window.cancelAnimationFrame(id);
  }
  fetchMainPage();
}
