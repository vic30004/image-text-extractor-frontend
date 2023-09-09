document.addEventListener("click", function (event) {
  console.log("Image clicked");

  let target = event.target;
  while (target && target.nodeName !== "IMG") {
    target = target.parentElement;
  }

  if (target) {
    // We have an image! Send its src URL to the background script.
    chrome.runtime.sendMessage({ type: "imageClicked", imageUrl: target.src });
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "displayResult") {
    // Display the result in the div with ID 'result'
    const resultDiv = document.getElementById("result");
    if (resultDiv) {
      // Adjust this line according to the structure of the data you received
      resultDiv.textContent = message.data.text;
    }
  }
});
