# RMG Product Management Task

Hello, this is a test project for a Frontend function. I used the latest version of the Angular framework. I also used Angular Material & Tailwind CSS. I used intelligence in several areas: reviewing the code, improving the UI, testing performance, and writing some formatting.

## 🚀 Technologies Used

- **Angular 21.1.2** - Latest version of Angular framework
- **Angular Material** - Material Design components
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Strongly typed programming language
- **Transloco** - Internationalization (i18n) solution for Angular
- **Signals** - Modern reactive state management

## ✨ Features

- 📦 **Product Management** - Full CRUD operations for products
- 📄 **Invoice Management** - Create, view, edit, and delete invoices with line items
- 🌐 **Internationalization** - Full support for English and Arabic languages (RTL)
- 🌗 **Dark Mode** - Beautiful dark theme support
- 📱 **Responsive Design** - Works seamlessly on all device sizes
- ♿ **Accessibility** - WCAG AA compliant with proper ARIA attributes
- 🎨 **Modern UI** - Clean, professional interface with smooth animations
- ⏳ **Splash Screen** - Premium, elegant splash screen for a better first impression

## 📋 Project Structure

```
src/
├── app/
│   ├── core/              # Core services and utilities
│   ├── features/          # Feature modules (products, invoices)
│   ├── layouts/           # Layout components
│   └── shared/            # Shared components and utilities
├── public/
│   └── i18n/             # Translation files (en.json, ar.json)
└── styles.css            # Global styles
```

## 🛠️ Local Development

To run the project locally, you need to start both the mock server and the Angular application.

### 1. Start the Mock Server

The project uses `json-server` to mock the backend. By default, it runs on port `3000`.

```bash
# Run server on default port 3000
npm run server

# Or run on a custom port
npx json-server --watch mock-data.json --port 4000
```

> [!NOTE]
> If you change the server port, remember to update the `target` in `proxy.conf.json`.

### 2. Start the Angular Application

To start the local development server on port `4200`:

```bash
npm install
npm start -- --port 4200
```

Once the servers are running, navigate to `http://localhost:4200/`.

## 🏗️ Building

To build the project for production:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory with optimizations for performance and speed.

## 🎯 Code Quality

- **TypeScript Strict Mode** - Enhanced type safety
- **OnPush Change Detection** - Optimized performance
- **Standalone Components** - Modern Angular architecture
- **Signal-based State** - Reactive and predictable state management

## 📚 Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

**Author**: Taha Alokla  
**Project**: RMG Product Management Task
