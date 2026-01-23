const button = document.getElementById("enter");
const input = document.getElementById("input");
const response = document.getElementById("response");

let used = false;

button.onclick = () => {
  if (used) return;

  const value = input.value.trim();

  if (!value) {
    response.innerText = "No linguistic structure detected.";
  } else if (value.split(/\s+/).length < 3) {
    response.innerText = "Insufficient structure for pattern observation.";
  } else {
    response.innerText =
      "Linguistic structure observed without stable semantic convergence.";
  }

  used = true;
  input.disabled = true;
  button.disabled = true;
};
