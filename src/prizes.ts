type Prize = {
  albumId: string;
};

export const prizes: Prize[] = [
  { albumId: "1609625145" },
  { albumId: "1597284220" },
  { albumId: "703424226" },
  // Duped...
  { albumId: "1609625145" },
  { albumId: "1597284220" },
  { albumId: "703424226" },
  { albumId: "1609625145" },
  { albumId: "1597284220" },
  { albumId: "703424226" },
  { albumId: "1609625145" },
  { albumId: "1597284220" },
  { albumId: "703424226" },
];

let prizeCount = 0;

export const onPrizeWon = (prizeId: number) => {
  prizeCount += 1;
  const prize = prizes[prizeId % prizes.length] || prizes[0];

  console.log("Issuing prize", prize);

  const { albumId } = prize;

  // Update score card
  const score = document.querySelector<HTMLDivElement>(".score");

  if (score?.classList.contains("hidden")) {
    score.classList.remove("hidden");
    score.classList.add("bounceIn");
  }

  if (score) {
    score.innerText = String(prizeCount);
  }

  // Write the album id to the iframe src
  const embedIframe = document.querySelector<HTMLIFrameElement>("iframe");

  if (!embedIframe) {
    throw "There should be an iframe on the page";
  }

  embedIframe.src = `https://bandcamp.com/EmbeddedPlayer/album=${albumId}/size=large/bgcol=333333/linkcol=0f91ff/minimal=true/transparent=true/`;

  // Hacky way to stop iframe from flashing
  setTimeout(() => {
    // Show the prize container
    const prizeContainer =
      document.querySelector<HTMLDivElement>("#prize-container");

    if (!prizeContainer) {
      throw "There should be a prize container";
    }

    if (prizeContainer.classList.contains("bounceIn")) {
      console.log("Container already present, trash it first");
      prizeContainer.classList.remove("bounceIn");
      prizeContainer.classList.add("hidden");

      setTimeout(() => {
        prizeContainer.classList.remove("hidden");
        prizeContainer.classList.add("bounceIn");
      }, 1000);
    } else {
      prizeContainer.classList.remove("hidden");
      prizeContainer.classList.add("bounceIn");
    }
  }, 500);
};
