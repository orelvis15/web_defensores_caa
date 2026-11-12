## Project info

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Nuestra Memoria (fotos y videos de los eventos)

- La sección «Nuestra Memoria» de la portada (`src/components/home/NuestraMemoria.tsx`) y las páginas `/memoria`
  y `/memoria/:eventId` (`src/pages/Memory.tsx`) se alimentan solas de la Memoria del módulo de Eventos del sistema.
  No se suben fotos aparte a la web: solo aparece lo marcado «Publicar en la web» y aprobado por Relaciones Públicas.
- Datos: API pública del portal de miembros (`src/config/memory.ts`), `VITE_MEMBERS_URL` (por defecto
  `https://miembro.defensorescaa.org`): `/api/public/memory/featured`, `/api/public/memory/albums[?year&type&chapter]`
  y `/api/public/memory/albums/{eventId}`. CORS abierto; las respuestas se guardan 5 minutos en caché.
- Las cuadrículas usan la miniatura (`thumb_url`, `loading="lazy"`) y la foto completa solo al abrirla en el visor
  (`src/components/memory/MemoryLightbox.tsx`: flechas, teclado, deslizar en el teléfono, videos embebidos).
- `/galeria` y `/galeria/:id` redirigen a `/memoria`.
