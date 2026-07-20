import { test, expect } from "@playwright/test"

// Smoke e2e : valide que l'app démarre et que les routes de base répondent.
// Sert aussi de test de la config Playwright elle-même — à étoffer par story.
test("la home redirige vers /dashboard", async ({ page }) => {
  await page.goto("/")
  // Timeout large : la 1re requête compile /dashboard à froid en dev (turbopack).
  await expect(page).toHaveURL(/\/dashboard$/, { timeout: 30_000 })
  await expect(page.getByRole("heading", { level: 1, name: "Dashboard" })).toBeVisible()
})

test("la preview du design system se rend", async ({ page }) => {
  await page.goto("/design-system")
  await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible()
})
