import { getRequest, postRequest } from "../hooks/api";
// import src from "./src.json";

// const isValidUrl = (urlString) => {
//   try {
//     let url = new URL(urlString);
//     if (url.protocol != "http:" && url.protocol != "https:") {
//       return false;
//     }
//     return url;
//   } catch (e) {
//     return false;
//   }
// };

// const openTab = (url) => {
//   let a_ = document.createElement("a");
//   a_.href = url;
//   a_.target = "_blank";
//   a_.click();
//   a_.remove();
// };

// if (location.href != "https://www.youtube.com/") {
//   (async () => {
//     let data = await postRequest("/getOne", {
//       name: location.href,
//     });
//     if (data.length == 0) {
//       let links = document.getElementsByTagName("a"),
//         hrefs = [];
//       for (let i = 0; i < links.length; i++) {
//         let url = isValidUrl(links[i].href);
//         if (url) {
//           if (url.hostname != location.hostname) {
//             hrefs.push(url);
//             hrefs = Array.from(new Set(hrefs));
//           }
//         }
//       }
//       await postRequest("/post", {
//         name: location.origin,
//         urls: hrefs,
//       });
//       await postRequest("/addQueqe", {
//         urls: hrefs,
//       });
//       window.close();
//     }
//   })();
// } else {
//   for (const s in src) {
//     openTab(src[s].url);
//   }
//   await postRequest("/addQueqe", {
//     urls: [],
//   });
//   setInterval(async () => {
//     let queqe = await getRequest("/getElementQueqe");
//     if (queqe.length > 0) {
//       openTab(queqe);
//     }
//     // else{
//     //   clearInterval(open)
//     // }
//   }, 2000);
//   // window.close();
// }
// // head
// var meta = document.getElementsByTagName('meta'), docsmeta = [];
// docsmeta.push({
//     name: 'title',
//     content: document.getElementsByTagName('title')[0].innerHTML
// })
// for (var i = 0; i < meta.length; i++) {
// links[i].style.backgroundColor = 'red'
// let meta_ = meta[i]
// let t = text?.previousSibling
// console.log(text, links[i])
//     if (meta_.name != '' && meta_.name != "viewport" && meta_.name.toLowerCase() != "robots" ) {

//         docsmeta.push({
//             name: meta_.name,
//             content: meta_.content
//         });
//     }
// }
// console.log(docsmeta)

const urlPromise = new Promise((resolve, reject) =>
  setTimeout(() => resolve(Math.floor(Math.random() * 101)), 1000)
);
const pending = {
  state: "pending",
};

const getPromiseState = (promise) => {
  return Promise.race([promise, pending]).then(
    (value) => {
      if (value === pending) {
        return value;
      }
      return {
        state: "resolved",
        value,
      };
    },
    (reason) => ({ state: "rejected", reason })
  );
};

const checkStatus = async (a) => {
  return await getPromiseState(a);
};
let child = document.body.children;
let style = [];
const addNotification = () => {
  let str =
    '<div class="block" style="z-index: 9999;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);border-radius: 0.75rem;background-color: white"><div style="border-color: rgba(249, 57, 32, 0.5);background-color: rgba(249, 57, 32, 0.1);border-width: 2px; border-style: solid;width: 500px;border-radius: 0.75rem;height: 300px;display: flex;flex-direction: column;align-items: center;justify-content: center;" > <div style="display: flex;flex-direction: column;align-items: center;gap: 0.5rem;padding-bottom: 0.25rem"> <span role="img" aria-label="warning" class="anticon anticon-warning" style="color: rgba(249, 57, 32, 0.5);font-size: 80px;" > <svg viewBox="64 64 896 896" focusable="false" data-icon="warning" width="1em" height="1em" fill="currentColor" aria-hidden="true" > <path d="M464 720a48 48 0 1096 0 48 48 0 10-96 0zm16-304v184c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V416c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8zm475.7 440l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zm-783.5-27.9L512 239.9l339.8 588.2H172.2z"></path> </svg> </span> <div style="color: rgb(249, 57, 32);font-size: 28px;"> Cảnh báo </div> </div> <div style="color: rgb(92 105 117);">Trang này có thể là trang lừa đảo</div> <div style="color: rgb(92 105 117);">1 là tắt tab 2 là tắt extentsion</div> </div></div>';

  for (let index = 0; index < child.length; index++) {
    const element = child[index];
    if (element.style) {
      style.push(element.style);
      element.style.opacity = 0.3;
      element.style["pointer-events"] = "None";
    }
  }
  document.body.insertAdjacentHTML("beforeend", str);
};
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.status == "off") {
    const elements = document.body.getElementsByClassName("block");
    elements[0].parentNode.removeChild(elements[0]);
    for (let index = 0; index < child.length; index++) {
      const element = child[index];
      if (element.style) {
        element.style = style[index];
      }
    }
  } else {
    if (request.status < 66) addNotification();
  }
});

const handleLoading = async () => {
  let a = postRequest('/predict',{
    "url": location.href
  });

  let result = await checkStatus(a);

  let s = setInterval(async () => {
    result = await checkStatus(a);
    let j = 0;
    let value = 0
    if (result.state == "resolved") {
      value = Math.floor(result.value*100);
      let domain = new URL("" + location.href);
      chrome.storage.local.set(
        { state: "result", [domain.href.toString()]: value },
        function () {
          // start timer
        }
      );
      if (value < 66) {
        addNotification();
      }
      clearInterval(s);
    }
  }, 100);
};

let domain = new URL("" + location.href);
chrome.storage.local.get(["state", String(domain.href)], function (result) {
  if (result.state != "off" && result[String(domain.href)] == null) {
    handleLoading();
  } else {
  }
  if (result[String(domain.href)] < 66 && result.state != "off") {
    addNotification();
  }
});
