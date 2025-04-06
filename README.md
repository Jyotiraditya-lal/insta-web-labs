# 🧩 Visual Editor Builder

A drag-and-drop visual editor that allows users to dynamically place and configure UI elements on a canvas. Built with modularity and reusability in mind, it includes support for content editing, styling, and positioning of components like text, buttons, and images.

---

## 📁 Project Architecture

```
src/
├── App.tsx                # Main layout and state manager for selected elements
├── canvas.tsx             # Drop zone where elements are positioned
├── elements-sidebar.tsx   # Sidebar with draggable UI elements
├── draggable-element.tsx  # Wrapper to make elements draggable (missing in your files)
├── properties-panel.tsx   # Inspector for editing selected element properties
├── lib/
│   └── types.ts           # Shared TypeScript types like `Element`, `ElementType`
└── styles/
    └── properties-panel.css
```

---

## 🛠 Tools & Technologies Used

| Tech               | Purpose                              |
|--------------------|---------------------------------------|
| **React**          | Core framework for building the UI    |
| **TypeScript**     | Type safety and clarity                |
| **react-dnd**      | Drag and drop logic                   |
| **lucide-react**   | Icon set used in the sidebar/panel    |
| **CSS Modules**    | Scoped and modular styling            |
| **Vite** (assumed) | For fast local development (optional) |

---

## 🧠 Key Design Rationale

### 1. **Modularity First**
Each UI region is built as a focused component:
- `ElementsSidebar` for adding elements
- `Canvas` as the layout playground
- `PropertiesPanel` to inspect and edit

This allows for independent testing and scaling of each component.

### 2. **Dynamic Drag and Drop**
The drag and drop flow uses `react-dnd`:

- Elements in `ElementsSidebar` use `useDrag()`
- The `Canvas` listens via `useDrop()` and calls `onAddElement`

This lets you drop multiple instances, each independently tracked.

### 3. **Live Editing**
Each element's content and styles can be modified in real time via the `PropertiesPanel`. Tabs provide a clean way to group features:
- **Content** (text or images)
- **Style** (font size, color, background)
- **Advanced** (positioning and size)

### 4. **Separation of Concerns**
- All data modeling is handled via a central `Element` type.
- Layout logic is abstracted into the `canvas`.
- UI rendering is separate from logic (e.g., icons, dropdowns, etc.).

### 5. **Scalability in Mind**
The setup allows:
- Adding new element types (e.g., video, form) with minimal changes.
- Extending the property panel to include behaviors or animations.
- Saving/restoring layouts via JSON (future-ready).

---

## 😞 Known Issues or To-Do
- `draggable-element.tsx` is missing (used by `ElementsSidebar`) – should contain the logic wrapping icons for dragging.
- Some icon imports like `Paragraph` may be incorrect/missing from `lucide-react`.
- Error: `Expected drag drop context` – make sure your app is wrapped in `<DndProvider>` at root level with `HTML5Backend`.

---

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Ensure your root entry (`main.tsx`) wraps `<App />` like this:

```tsx
<DndProvider backend={HTML5Backend}>
  <App />
</DndProvider>
```

