import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"

import DashboardPage from "@/app/(dashboard)/dashboard/page"

// Test d'intégration exemple : une page rendue avec ses composants réels (pas de mocks).
// Valide aussi la chaîne RTL + jsdom + jest-dom du template.
describe("page Dashboard", () => {
  it("rend le heading et l'empty state", () => {
    render(<DashboardPage />)

    expect(screen.getByRole("heading", { level: 1, name: "Dashboard" })).toBeInTheDocument()
    expect(screen.getByText("Prêt à démarrer")).toBeInTheDocument()
  })
})
