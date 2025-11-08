# Brand Insights Backend

A NestJS backend API that generates mock brand performance insights including Google Visibility Score, Search Score, Keyword Volumes, and Competitor Analysis.

## 🚀 Features

- **POST /api/brand-insights**: Accepts brand details and returns simulated insights
- DTO-based validation for all inputs
- CORS enabled for frontend integration
- Modular architecture (DTO, Service, Controller)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🛠 Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## 📡 API Documentation

For comprehensive API documentation, see:

- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference with all endpoints, data models, and examples
- **[API_EXAMPLES.md](./API_EXAMPLES.md)** - Quick reference with code examples in multiple languages

### Quick Start

**Endpoint:** `POST /api/brand-insights`

**Request:**

```bash
curl -X POST http://localhost:3001/api/brand-insights \
  -H "Content-Type: application/json" \
  -d '{
    "brandName": "Zoop.one",
    "brandWebsite": "https://zoop.one",
    "contactEmail": "contact@zoop.one"
  }'
```

**Response:**

```json
{
  "message": "Brand insights generated successfully for Zoop.one",
  "submittedDetails": {
    "brandName": "Zoop.one",
    "brandWebsite": "https://zoop.one",
    "contactEmail": "contact@zoop.one"
  },
  "metrics": {
    "googleVisibility": 82,
    "searchScore": 76,
    "keywordVolumes": [...],
    "competitorAnalysis": [...],
    "historicalTrend": [...],
    "scoreBreakdown": {...}
  }
}
```

## 🏗 Project Structure

```
src/
├── brand-insights/
│   ├── dto/
│   │   └── create-brand-insight.dto.ts
│   ├── brand-insights.controller.ts
│   └── brand-insights.service.ts
├── app.module.ts
└── main.ts
```

## 🔧 Scripts

- `npm run build` - Build the project
- `npm run start` - Start production server
- `npm run dev` - Start development server with watch mode
- `npm run lint` - Run ESLint
- `npm test` - Run tests
