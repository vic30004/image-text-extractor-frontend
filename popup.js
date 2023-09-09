document.getElementById("extractBtn").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  const result = document.getElementById("result");
  result.innerHTML = "";
  const formData = new FormData();
  formData.append("image", fileInput.files[0]);

  const response = await fetch("https://image-text-extractor-backend-9346c6e1e5a8.herokuapp.com/extract-text", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  document.getElementById("result").innerText = data.text;
});
