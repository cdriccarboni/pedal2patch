import { Capacitor } from "@capacitor/core";
import {
  AdMob,
  AdmobConsentStatus,
  BannerAdPosition,
  BannerAdSize
} from "@capacitor-community/admob";
import {
  NativePurchases,
  PURCHASE_TYPE
} from "@capgo/native-purchases";

const REMOVE_ADS_PRODUCT_ID = "remove_ads_lifetime";
const BANNER_ID = __ADMOB_BANNER_ID__;

let premium = false;
let product = null;

function byId(id) {
  return document.getElementById(id);
}

function setStatus(message) {
  const status = byId("monetizationStatus");
  if (status) status.textContent = message;
}

function setPriceLabel() {
  const button = byId("removeAdsButton");
  if (!button) return;
  button.textContent = product?.priceString
    ? `Supprimer les pubs à vie — ${product.priceString}`
    : "Supprimer les pubs à vie";
}

function isOwnedTransaction(purchase) {
  if (!purchase || purchase.productIdentifier !== REMOVE_ADS_PRODUCT_ID) return false;
  const stateOk = !purchase.purchaseState || purchase.purchaseState === "PURCHASED";
  const ackOk = purchase.isAcknowledged !== false;
  return stateOk && ackOk;
}

async function refreshEntitlement() {
  try {
    const { purchases = [] } = await NativePurchases.getPurchases({
      productType: PURCHASE_TYPE.INAPP
    });
    premium = purchases.some(isOwnedTransaction);
  } catch {
    premium = localStorage.getItem("pedal2patch-remove-ads") === "1";
  }

  if (premium) {
    localStorage.setItem("pedal2patch-remove-ads", "1");
    await AdMob.removeBanner().catch(() => {});
    setStatus("Version sans pub activée à vie.");
    const button = byId("removeAdsButton");
    if (button) button.disabled = true;
  }
  return premium;
}

async function loadProduct() {
  try {
    const { isBillingSupported } = await NativePurchases.isBillingSupported();
    if (!isBillingSupported) {
      setStatus("Achats Google Play indisponibles sur cet appareil.");
      return;
    }
    const response = await NativePurchases.getProduct({
      productIdentifier: REMOVE_ADS_PRODUCT_ID,
      productType: PURCHASE_TYPE.INAPP
    });
    product = response.product;
    setPriceLabel();
  } catch {
    setStatus("Débloqueur sans pub non encore activé sur la fiche Google Play.");
  }
}

async function startAds() {
  if (premium) return;
  try {
    await AdMob.initialize();
    let consent = await AdMob.requestConsentInfo();
    if (
      consent.isConsentFormAvailable &&
      consent.status === AdmobConsentStatus.REQUIRED
    ) {
      consent = await AdMob.showConsentForm();
    }
    if (!consent.canRequestAds) {
      setStatus("Publicité désactivée tant que le consentement n'est pas disponible.");
      return;
    }
    await AdMob.showBanner({
      adId: BANNER_ID,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: BANNER_ID.startsWith("ca-app-pub-3940256099942544/")
    });
  } catch {
    setStatus("Publicité indisponible pour le moment.");
  }
}

async function buyRemoveAds() {
  try {
    if (!product) await loadProduct();
    const result = await NativePurchases.purchaseProduct({
      productIdentifier: REMOVE_ADS_PRODUCT_ID,
      productType: PURCHASE_TYPE.INAPP,
      quantity: 1
    });
    if (result?.productIdentifier === REMOVE_ADS_PRODUCT_ID) {
      localStorage.setItem("pedal2patch-remove-ads", "1");
      premium = true;
      await AdMob.removeBanner().catch(() => {});
      setStatus("Achat validé : publicités supprimées à vie.");
      const button = byId("removeAdsButton");
      if (button) button.disabled = true;
    }
  } catch {
    setStatus("Achat annulé ou indisponible.");
  }
}

async function restorePurchase() {
  try {
    await NativePurchases.restorePurchases();
    const owned = await refreshEntitlement();
    setStatus(owned ? "Achat restauré." : "Aucun achat sans pub trouvé.");
  } catch {
    setStatus("Restauration indisponible pour le moment.");
  }
}

async function init() {
  if (!Capacitor.isNativePlatform()) return;
  byId("removeAdsButton")?.addEventListener("click", buyRemoveAds);
  byId("restoreAdsPurchaseButton")?.addEventListener("click", restorePurchase);
  await refreshEntitlement();
  await loadProduct();
  await startAds();
}

window.addEventListener("load", () => {
  init().catch(() => setStatus("Monétisation indisponible pour le moment."));
});
