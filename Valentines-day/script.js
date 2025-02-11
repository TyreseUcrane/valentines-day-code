let noClicks = 1;
const maxNoClicks = 4;
const minNoScale = 0.65;
let noScale = 1;
let yesScale = 1; // This now tracks the scaling factor directly for the Yes button
const gifElement = document.getElementById("silly-billy-charlie");
const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const buttonContainer = document.querySelector(".btn-container");
const yesButtonStyle = window.getComputedStyle(yesButton);
const maxYesWidth = parseFloat(yesButtonStyle.maxWidth);

// Array of gifs (ensure this is the correct order)
const gifs = [
  "assets/images/togepi-happy.gif",
  "assets/images/togepi-sad-1.gif",
  "assets/images/togepi-sad-2.gif",
  "assets/images/togepi-crying.gif",
];

// Array of messages for the No button
const buttonMessages = [
  "Are you sure??",
  "Pretty please?",
  "PLEASE",
  "You can't do this to me!",
];

// Handle the No button click
noButton.addEventListener("click", () => {
  if (noClicks < maxNoClicks) {
    // Change the gif based on the number of clicks
    gifElement.src = gifs[noClicks];
  }

  // Change the No button text
  noButton.textContent = buttonMessages[noClicks % maxNoClicks];

  // Adjust the No button width to fit text
  noButton.style.width = "auto";
  noButton.style.width = `${noButton.scrollWidth}px`;

  // Decrease the size of the No button
  if (noScale > minNoScale) {
    noScale -= 0.1;
    noButton.style.transform = `scale(${noScale})`;
  }

  // Scale the Yes button (grow slightly with each click)
  yesScale += 2.5 // Slightly smaller increment to ensure smooth scaling
  yesButton.style.transform = `scale(${yesScale})`;

  // Get the current gap scale factor from CSS
  const rootStyles = getComputedStyle(document.documentElement);
  const gapScaleFactor =
    parseFloat(rootStyles.getPropertyValue("--gap-scale-factor")) || 250;

  // Adjust the gap dynamically based on scaling
  const currentGap = parseFloat(buttonContainer.style.gap) || 20;
  const newGap = Math.sqrt(currentGap * gapScaleFactor);
  buttonContainer.style.gap = `${newGap}px`;

  // Increment the number of No button clicks
  noClicks++;
});
