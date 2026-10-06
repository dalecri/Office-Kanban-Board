# Architecture

The app uses native JavaScript ES modules and Canvas 2D, with Vite for development and production builds. It does not require a UI framework or runtime CDN dependencies.

## Startup and task flow

`main.js` awaits storage initialization before rendering the board, binding controls, and starting the simulation. `state.js` owns the task array and exports `setTasks` for replacements. Imports observe the current array through ES module live bindings.

The editor or a card drop updates tasks and calls `changed()`. That schedules an IndexedDB save, invalidates submitted task IDs that are no longer complete, prompts agents to reconsider their destination, and emits `taskschange` for the board to render. Storage writes are serialized so a slow earlier write cannot overwrite a later one.

## Simulation

`layout.js` describes rooms, doors, desk seats, copier destinations, and furniture obstacles. `routing.js` searches a four-pixel grid and routes between rooms through their door waypoints. Keep collision rectangles aligned with furniture if the scene changes.

`agents.js` prioritizes in-progress work, pending meetings, then completed-work handoffs. Other agents lounge. Completed tasks are tracked in each agent's session-only Set to avoid repeating celebrations. Pam takes a copier trip after one minute sitting at her desk.

`scene.js` draws the floor plan and props; `characters.js` renders character sprites, badges, and bubbles; `drawing.js` supplies shared canvas primitives. `simulation.js` owns frame timing, animation, confetti updates, and roster statuses. It schedules the next frame before updating and catches frame and agent errors so one exception does not stop animation.

## Persistence boundaries

Tasks persist, while character position, selected colleague, pause state, and confetti are transient. Storage errors show a visible status. Keep the database name and object store compatible when changing task storage, or add an explicit migration.

## Scope

This is a local-first browser app, not a native app package or shared team backend. Authentication, cloud sync, import/export, and app-store packaging are separate future features.
