document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button");
  const trackList = document.getElementById("track-list");
  let trackVisible = false;

  button.addEventListener("click", () => {
    if (trackVisible) {
      trackList.innerHTML = "";
    } else {
      trackList.innerHTML = `
                <section class="track">
                    <img src="https://i.scdn.co/image/ab67616d0000b273f6e31941d10e4819d290af41" alt="Album Art">
                    <div>
                        <h3>When the Sun Hits</h3>
                        <p>Slowdive</p>
                        <p>Souvlaki</p>
                    </div>
                </section>
            `;
    }
    trackVisible = !trackVisible;
  });
});
