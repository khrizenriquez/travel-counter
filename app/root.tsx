import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { useEffect } from "react"; // Importar useEffect

import "./tailwind.css";

export const links: LinksFunction = () => [
  // Preconexiones para Google Fonts
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  
  // Nuevas preconexiones para Google Analytics
  { rel: "preconnect", href: "https://www.googletagmanager.com" },
  { rel: "preconnect", href: "https://www.google-analytics.com" }
];

export function Layout({ children }: { children: React.ReactNode }) {
  // Efecto para cargar Google Analytics solo en el cliente
  useEffect(() => {
    if (import.meta.env.MODE === "production") {
      // Cargar script principal
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-JS214HD5QV';
      
      // Configuración inicial
      const inlineScript = document.createElement('script');
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-JS214HD5QV', {
          page_path: window.location.pathname,
        });
      `;

      // Añadir scripts al head
      document.head.appendChild(gaScript);
      document.head.appendChild(inlineScript);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}