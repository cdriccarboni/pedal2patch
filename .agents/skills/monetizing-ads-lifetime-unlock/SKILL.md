---
name: monetizing-ads-lifetime-unlock
description: Use when an app offers a free ad-supported tier plus a one-time lifetime purchase that permanently removes advertising.
---

# Monetizing Ads With Lifetime Unlock

## Product contract
The free tier remains usable. Ads fund the free tier. A single non-consumable purchase removes ads permanently for the purchasing store account.

## Implementation workflow
1. Inspect existing billing, ad, privacy, analytics, and consent code before adding another SDK or abstraction.
2. Verify current Google Play Billing, ads, consent, Data safety, and target-audience requirements from official documentation.
3. Model the no-ads entitlement separately from UI state.
4. Restore the entitlement from the store on fresh install, device change, app restart, and billing reconnection.
5. Cache the last verified entitlement for offline continuity without inventing purchases.
6. Hide all ad placements immediately when entitlement is active.
7. If the ad network fails, keep the app usable; never block core functionality waiting for an ad.
8. Add test paths for free user, purchased user, restored purchase, pending/cancelled purchase, billing unavailable, ad unavailable, and offline startup.

## Guardrails
- Use a one-time non-consumable product for a lifetime unlock unless current store rules require otherwise.
- Do not implement fake purchase success states.
- Do not commit billing keys, ad secrets, service-account credentials, or signing material.
- Do not describe cross-platform lifetime access unless entitlement synchronization actually supports it.
- Avoid manipulative ad placement and accidental taps.
- Keep privacy disclosures and store listing declarations synchronized with the SDKs actually shipped.

## Completion contract
Report product ID, entitlement source, restore behavior, ad-disable behavior, tested billing states, and store-policy items still awaiting console configuration.
