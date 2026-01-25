const input = document.getElementById("disturbance");

input.addEventListener("keydown", e => {
  if (e.key !== "Enter") return;

  const text = input.value;
  input.value = "";

  let energy = Math.min(text.length, 40);

  for (let i = 0; i < energy; i++) {
    spawnParticle(
      Math.random() * W,
      Math.random() * H,
      energy * 0.05
    );
  }
});
