# Controlease Feature Tour Plan

This document defines the complete guided tour for the Controlease landing page interactive demo. The tour showcases the platform's core value propositions through an interactive lease management interface.

---

## Tour Infrastructure Reference

Each step can use these properties:

| Property | Type | Description |
|----------|------|-------------|
| `targetSelector` | string | CSS selector for the element to highlight |
| `title` | string | Step title displayed in tooltip |
| `description` | string | Step description/explanation |
| `position` | 'top' \| 'bottom' \| 'left' \| 'right' | Tooltip position relative to target |
| `requireClick` | boolean | User must click target to proceed |
| `clickSelector` | string | Specific element to click (if different from target) |
| `hint` | TourHint | Small helper tooltip near another element |
| `showHintAfterNext` | boolean | Hint only shows after clicking Next |
| `disableBack` | boolean | Prevent going back from this step |
| `completionMessage` | object | Inspiring modal shown after step completes |

**TourHint Properties:**
- `targetSelector`: Element to show hint near
- `text`: Hint text
- `position`: 'top' | 'bottom' | 'left' | 'right'

---

## Tour Steps

### Step 1: Sidebar Navigation
**Purpose:** Introduce the platform's main sections and navigation

```typescript
{
  targetSelector: '[data-tour="sidebar-nav"]',
  title: 'Your Command Center',
  description: 'Navigate your entire portfolio from here. Dashboard for metrics, Leases for contracts, Upload for AI extraction, and Alerts to stay on top of deadlines.',
  position: 'right',
}
```

**UI Element:** Sidebar with navigation icons (Home, Leases, Contracts, Upload, Assets, Alerts, Profile)
**Why this matters:** Orients users to the platform structure before diving into specific features. Mentions key capabilities: metrics dashboard, lease management, AI document extraction, and automated alerts.

---

### Step 2: Lease Status Badge
**Purpose:** Introduce the status-at-a-glance system

```typescript
{
  targetSelector: '[data-tour="status-badge"]',
  title: 'Lease Status at a Glance',
  description: 'Instantly identify where each lease stands. Color-coded statuses like Active, Lapsed, or Expiring Soon help you prioritize what needs attention.',
  position: 'bottom',
}
```

**UI Element:** StatusBadge showing "Lapsed" status
**Why this matters:** Users managing dozens or hundreds of leases need to quickly scan and identify problem areas.

---

### Step 3: Proactive Alerts
**Purpose:** Show proactive notification system

```typescript
{
  targetSelector: '[data-tour="alert-box"]',
  title: 'Proactive Alerts',
  description: 'Critical deadlines surface automatically. Renewal windows, break options, and compliance issues are flagged before they become problems.',
  position: 'bottom',
}
```

**UI Element:** AlertBox with renewal/lapse warning
**Why this matters:** Demonstrates the batch processing system that monitors all leases and generates notifications for IPC increases, break options, guarantee renewals, etc.

---

### Step 4: Organized Tabs
**Purpose:** Show structured data organization

```typescript
{
  targetSelector: '[data-tour="tabs"]',
  title: 'Everything Organized',
  description: 'Navigate complex lease data effortlessly. Key terms, financials, guarantees, and documents — all organized into intuitive sections.',
  position: 'bottom',
}
```

**UI Element:** Tab navigation (Key Terms, Financial, Guarantees, etc.)
**Why this matters:** Real leases have extensive data (91+ fields in the API). Good organization makes this manageable.

---

### Step 5: Quick Actions - Projections
**Purpose:** Introduce floating action buttons and trigger sidebar interaction

```typescript
{
  targetSelector: '[data-tour="projection-button"]',
  title: 'Powerful Actions',
  description: 'Access projections, view the original contract, or ask our AI assistant — all without leaving the lease. Click the projections button to explore!',
  position: 'left',
  requireClick: true,
}
```

**UI Element:** Floating action button (ChartBarIcon)
**Why this matters:** Demonstrates quick access to advanced features. The click interaction engages users and opens the projection panel.

---

### Step 6: Projection Panel
**Purpose:** Showcase financial analysis capabilities

```typescript
{
  targetSelector: '[data-tour="projection-panel"]',
  title: 'Financial Projections',
  description: 'Model future rent payments with IPC adjustments, analyze trends, and forecast total lease costs. Make data-driven renewal decisions.',
  position: 'left',
  showHintAfterNext: true,
  disableBack: true,
  hint: {
    targetSelector: '[data-tour="close-sidebar"]',
    text: 'Click X to close',
    position: 'left',
  },
  requireClick: true,
  clickSelector: '[data-tour="close-sidebar"]',
  completionMessage: {
    title: "You're All Set!",
    description: 'Controlease transforms lease management with AI-powered data extraction, automated alerts, and financial intelligence. We ship improvements weekly based on user feedback. Welcome aboard!',
  },
}
```

**UI Element:** Slide-out projection panel with charts and metrics
**Why this matters:**
- Shows the platform's analytical depth
- `disableBack: true` prevents awkward back navigation after sidebar opens
- `showHintAfterNext: true` creates a two-phase interaction (view panel → close panel)
- Completion message provides inspiring close to the tour

---

## Alternative/Extended Steps (For Future Consideration)

These steps could be added as the landing page demo expands:

### PDF Viewer Step
```typescript
{
  targetSelector: '[data-tour="pdf-button"]',
  title: 'Contract Viewer',
  description: 'View original contracts inline with extracted text highlighting. Compare AI-extracted data against the source document.',
  position: 'left',
  requireClick: true,
}
```

### AI Assistant Step
```typescript
{
  targetSelector: '[data-tour="chat-button"]',
  title: 'AI Assistant',
  description: 'Ask questions about any lease in plain language. Get instant answers about terms, dates, and obligations without digging through documents.',
  position: 'left',
}
```

### Sidebar Navigation Step
```typescript
{
  targetSelector: '[data-tour="sidebar-nav"]',
  title: 'Portfolio Navigation',
  description: 'Access your dashboard, lease list, directory, and settings. Filter and search across your entire portfolio.',
  position: 'right',
}
```

### Dashboard Metrics Step (if dashboard preview exists)
```typescript
{
  targetSelector: '[data-tour="dashboard-metrics"]',
  title: 'Portfolio Overview',
  description: 'Track key metrics across all leases — total value, upcoming expirations, and alert summaries at a glance.',
  position: 'bottom',
}
```

### Document Upload Step (if upload demo exists)
```typescript
{
  targetSelector: '[data-tour="upload-area"]',
  title: 'AI Data Extraction',
  description: 'Upload lease PDFs and watch AI extract key terms automatically. Review, edit, and approve extracted data before it enters your system.',
  position: 'bottom',
}
```

---

## Tour Flow Diagram

```
┌─────────────────┐
│    Sidebar      │ ← User reads, clicks Next
│   Navigation    │   (introduces platform sections)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Status Badge   │ ← User reads, clicks Next
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Proactive Alerts│ ← User reads, clicks Next
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Organized     │ ← User reads, clicks Next
│     Tabs        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Powerful Actions│ ← User MUST CLICK projection button
│  (Projections)  │   (requireClick: true)
└────────┬────────┘
         │
         ▼ (sidebar opens)
         │
┌─────────────────┐
│   Financial     │ ← User reads, clicks Next
│  Projections    │   → Hint appears pointing to X
│                 │ ← User MUST CLICK X button
│ (disableBack)   │   (requireClick + clickSelector)
└────────┬────────┘
         │
         ▼ (sidebar closes, tour elements fade)
         │
┌─────────────────┐
│  Completion     │ ← User clicks "Awesome!"
│    Modal        │
└─────────────────┘
```

---

## Implementation Notes

### Data Attributes Required
The following `data-tour` attributes must be present in the UI:

- `data-tour="sidebar-nav"` - On Sidebar component wrapper
- `data-tour="status-badge"` - On StatusBadge component
- `data-tour="alert-box"` - On AlertBox component
- `data-tour="tabs"` - On Tabs component
- `data-tour="projection-button"` - On projections floating button
- `data-tour="projection-panel"` - On slide-out projection sidebar
- `data-tour="close-sidebar"` - On X button inside projection panel

### Z-Index Hierarchy
- Tour overlay: `z-[51]`
- Highlighted elements: `z-52` (boosted dynamically)
- Sidebar wrapper: `z-[53]` (to allow sidebar to escape overlay)
- Tour tooltip: `z-[55]`
- Hint tooltip: `z-[56]`
- Completion modal: `z-[60]`

### Click Blocking
The tour blocks all clicks except:
1. Clicks on the tour tooltip itself (navigation buttons)
2. When `requireClick` is true AND hint is activated (if `showHintAfterNext`), clicks on the `clickSelector` or `targetSelector`

### Animation Timing
- Tooltip position transitions: 300ms ease-out
- Tooltip opacity/scale: spring (stiffness: 400, damping: 25)
- Hint enter/exit: 150ms
- Completion transition: 400ms fade out → modal fade in

---

## Content Guidelines

### Title Guidelines
- Keep titles to 2-4 words
- Use action-oriented or benefit-focused language
- Avoid technical jargon

### Description Guidelines
- 1-2 sentences maximum
- Lead with the benefit, then explain the feature
- Use "you/your" to address the user directly
- End interactive steps with a clear call-to-action

### Completion Message Guidelines
- Title should feel celebratory but not cheesy
- Description should:
  - Summarize key value props (2-3)
  - Mention ongoing improvement/user feedback
  - Create sense of welcome/partnership

---

## Feature Coverage Mapping

| Platform Feature | Covered in Tour | Step |
|-----------------|-----------------|------|
| Platform navigation | Yes | Step 1 |
| Dashboard metrics | Mentioned | Step 1 |
| AI data extraction | Mentioned | Step 1, Completion |
| Lease status tracking | Yes | Step 2 |
| Automated notifications | Yes | Step 3 |
| Structured data (91+ fields) | Yes | Step 4 |
| Quick action buttons | Yes | Step 5 |
| Financial projections | Yes | Step 6 |
| IPC/inflation adjustments | Mentioned | Step 6 |
| Contract PDF viewing | Mentioned | Step 5 |
| AI chat assistant | Mentioned | Step 5 |
| Batch document processing | No (future) | - |
| Multi-scope organization | No (future) | - |
| Audit history/versioning | No (future) | - |

---

## Final Tour Configuration

```typescript
const tourSteps: TourStep[] = [
  {
    targetSelector: '[data-tour="sidebar-nav"]',
    title: 'Your Command Center',
    description: 'Navigate your entire portfolio from here. Dashboard for metrics, Leases for contracts, Upload for AI extraction, and Alerts to stay on top of deadlines.',
    position: 'right',
  },
  {
    targetSelector: '[data-tour="status-badge"]',
    title: 'Lease Status at a Glance',
    description: 'Instantly identify where each lease stands. Color-coded statuses like Active, Lapsed, or Expiring Soon help you prioritize what needs attention.',
    position: 'bottom',
  },
  {
    targetSelector: '[data-tour="alert-box"]',
    title: 'Proactive Alerts',
    description: 'Critical deadlines surface automatically. Renewal windows, break options, and compliance issues are flagged before they become problems.',
    position: 'bottom',
  },
  {
    targetSelector: '[data-tour="tabs"]',
    title: 'Everything Organized',
    description: 'Navigate complex lease data effortlessly. Key terms, financials, guarantees, and documents — all organized into intuitive sections.',
    position: 'bottom',
  },
  {
    targetSelector: '[data-tour="projection-button"]',
    title: 'Powerful Actions',
    description: 'Access projections, view the original contract, or ask our AI assistant — all without leaving the lease. Click the projections button to explore!',
    position: 'left',
    requireClick: true,
  },
  {
    targetSelector: '[data-tour="projection-panel"]',
    title: 'Financial Projections',
    description: 'Model future rent payments with IPC adjustments, analyze trends, and forecast total lease costs. Make data-driven renewal decisions.',
    position: 'left',
    showHintAfterNext: true,
    disableBack: true,
    hint: {
      targetSelector: '[data-tour="close-sidebar"]',
      text: 'Click X to close',
      position: 'left',
    },
    requireClick: true,
    clickSelector: '[data-tour="close-sidebar"]',
    completionMessage: {
      title: "You're All Set!",
      description: 'Controlease transforms lease management with AI-powered data extraction, automated alerts, and financial intelligence. We ship improvements weekly based on user feedback. Welcome aboard!',
    },
  },
];
```
