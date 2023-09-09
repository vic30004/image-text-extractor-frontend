chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "imageClicked") {
    const imageUrl = message.imageUrl;

    // Fetch the image data
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], "imageFileName.jpg", {
          type: "image/jpeg",
        });

        sendDataToBackend(file);
      });
  }
});

function sendDataToBackend(file) {
  const formData = new FormData();
  formData.append("image", file);

  // Send formData to your backend
  fetch(
    "https://image-text-extractor-backend-9346c6e1e5a8.herokuapp.com/extract-text",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      chrome.tabs.sendMessage(sender.tab.id, {
        type: "displayResult",
        data: data,
      });
    });
}
