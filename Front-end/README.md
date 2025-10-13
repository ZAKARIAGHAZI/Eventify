# Eventify Front-End

This is the front-end for **Eventify**, a modern event management platform. Built with React and Vite, it provides a responsive user interface for browsing, creating, and managing events.

---

## Features

- User authentication (login/register)
- Explore events with search and filters
- Event details and registration
- Organizer dashboard for event management
- Responsive design with Tailwind CSS
- API integration with Eventify back-end

---

## Requirements

- Node.js >= 18
- npm >= 9

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/eventify-frontend.git
   cd eventify-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env` and set your API base URL.

4. **Start the development server**
   ```bash
   npm run dev
   ```

---

## Project Structure

```
src/
  assets/                # Images and static assets
  components/            # Reusable UI components
  contexts/              # React context providers
  pages/                 # Application pages (Explore, landing page, etc.)
  App.jsx                # Main app component
  main.jsx               # Entry point
  App.css, index.css     # Global styles
```

---

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

## Contact

For questions or support, open an issue or contact the maintainer.