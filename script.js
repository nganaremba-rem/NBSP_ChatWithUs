const msg = document.querySelector("#chat");
const sendBtn = document.querySelector(".send");
const chatArea = document.querySelector(".chat-area");
let tl = gsap.timeline({defaults: {ease: 'power1.out'}})
tl.to('.introtext', {y: "0%",delay: .5, duration: 1, stagger: 1})
tl.to('.intro',{y: "-100%", duration: .6, delay: .6})
// const colors = [
//   "#0066ff",
//   "#ff0000",
//   "#1aff1a",
//   "#00ccff",
//   "#9933ff",
//   "#00aaff",
// ];

/// full screen mode
let elem = document.querySelector(".chat-box");
let fsbtn = document.querySelector("#fsbtn");
function openFullscreen() {
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
}

/* Close fullscreen */
function closeFullscreen() {
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
}

// let username = prompt("Enter your Name: ");
// while (username == null || username.replace(/\s/g, "") == "") {
//   username = prompt("Enter your Name: ");
// }
let chatName = document.querySelector(".chat-name");

// chatName.innerHTML = "Welcome " + username;
let userID = document.querySelector("#userID").innerHTML;
let formData;
sendBtn.addEventListener("click", () => {
  let to = document.querySelector("#chatname").innerHTML;
  formData = new FormData();
  formData.append("msg", msg.value);
  formData.append("user", userID);
  formData.append("to", to);

  fetch("sendmsg.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => {
      let output = "";
      let text = '';
      let domain = ["online","com","tech","in","io"];
      let textDom = domain.join("|");
          let regex = new RegExp(`([a-zA-Z0-9_\.-]+[\.](?:${textDom})(?:[\/][a-zA-Z0-9_\.-]*)?)`,"g");
    //   let regex = new RegExp(`([a-zA-Z0-9_\.-]+[\.](?:${textDom}))`,"g");

      res.forEach((element) => {
        // let randNum = Math.floor(Math.random() * (5 - 0 + 1) + 0);
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
      msg.value = "";
      scrollToBottom();
    });
});

document.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    sendBtn.click();
  }
});

const scrollToBottom = () => {
  chatArea.scrollTop = chatArea.scrollHeight;
};

// fetchMainPage
function fetchMainPage() {
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
  let formData = new FormData();
  formData.append("user", userID);
  let chatItemWrap = document.querySelector("#displaySearch");
  fetch("fetchMainPage.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => {
      let output = "";
      res.forEach((element) => {
        if (element["User"] != userID) {
          output += `<div class="chat-item-wrap"  id='${element["User"]}' onclick='openChat(this.id)'>                
          <div class="prof-icon"><img src="./icon/icon.jpg" alt=""></div>
          <div class="chat-details"'>
              <div class="chat-name">${element["User"]}</div>
          </div>
        </div>`;
        } else {
          output += `<div class="chat-item-wrap"  id='${element["To"]}' onclick='openChat(this.id)'>                
          <div class="prof-icon"><img src="./icon/icon.jpg" alt=""></div>
          <div class="chat-details"'>
              <div class="chat-name">${element["To"]}</div>
          </div>
        </div>`;
        }
      });
      chatItemWrap.innerHTML = output;
    });
}
