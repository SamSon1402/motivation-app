# Motivation.AI

An AI-powered motivation and guidance application built with Next.js and Claude AI.

## Features

- AI-powered motivational responses
- Beautiful dark theme UI
- Real-time responses
- API testing dashboard

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Claude AI API
- Lucide Icons

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/motivation-app.git
cd motivation-app
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file and add your Claude API key:
```
ANTHROPIC_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── motivation/
│   │   │   └── route.ts
│   │   └── test/
│   │       └── route.ts
│   ├── test-dashboard/
│   │   └── page.tsx
│   └── page.tsx
├── components/
│   └── ui/
│       └── card.tsx
└── lib/
    └── utils.ts
```

## Environment Variables

- `ANTHROPIC_API_KEY`: Your Claude API key

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.
