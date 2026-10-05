window.addEventListener("load", () => {
  const status = document.getElementById("monetizationStatus");
  const buy = document.getElementById("removeAdsButton");
  const restore = document.getElementById("restoreAdsPurchaseButton");
  const privacy = document.getElementById("adsPrivacyButton");
  if (status) status.textContent = "La PWA web reste sans publicité. L'achat sans pub concerne l'application Android.";
  if (buy) buy.hidden = true;
  if (restore) restore.hidden = true;
  if (privacy) privacy.hidden = true;
});
