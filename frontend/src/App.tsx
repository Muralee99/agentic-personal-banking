import { Route, Routes } from "react-router-dom"
import { AppLayout } from "@/components/layout/AppLayout"
import { DashboardPage } from "@/pages/Dashboard/DashboardPage"
import { CustomersPage } from "@/pages/Customers/CustomersPage"
import { CustomerDetailPage } from "@/pages/Customers/CustomerDetailPage"
import { SegmentationPage } from "@/pages/Segmentation/SegmentationPage"
import { CountriesPage } from "@/pages/Countries/CountriesPage"
import { AISupervisorPage } from "@/pages/AISupervisor/AISupervisorPage"
import { AgentsPage } from "@/pages/Agents/AgentsPage"
import { AgentDetailPage } from "@/pages/Agents/AgentDetailPage"
import { GovernancePage } from "@/pages/Governance/GovernancePage"
import { GuardrailsPage } from "@/pages/Guardrails/GuardrailsPage"
import { BusinessRulesPage } from "@/pages/BusinessRules/BusinessRulesPage"
import { SkillsPage } from "@/pages/Skills/SkillsPage"
import { RecommendationsPage } from "@/pages/Recommendations/RecommendationsPage"
import { AnalyticsPage } from "@/pages/Analytics/AnalyticsPage"
import { SettingsPage } from "@/pages/Settings/SettingsPage"

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/customers/:id" element={<CustomerDetailPage />} />
        <Route path="/segmentation" element={<SegmentationPage />} />
        <Route path="/countries" element={<CountriesPage />} />
        <Route path="/ai-supervisor" element={<AISupervisorPage />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/agents/:id" element={<AgentDetailPage />} />
        <Route path="/governance" element={<GovernancePage />} />
        <Route path="/guardrails" element={<GuardrailsPage />} />
        <Route path="/business-rules" element={<BusinessRulesPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

export default App
