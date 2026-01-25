// reception/input.js
export function receiveInput(callback) {
  const input = document.getElementById("input");
  const button = document.getElementById("submit");

  button.onclick = () => {
    if (input.value.trim()) {
      callback(input.value);
      input.value = "";
    }
  };

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      button.click();
    }
  });
}
