# Architecture Overview of react-native-drawing

## Project Structure
The react-native-drawing library is structured into several core components and modules to handle drawing functionality in an Expo React Native app. It consists of a React Native client (located in the lib directory), a web-based core (created with *react-native-webview*), and shared resources.

## Main Directories:
 - **lib**: Contains the React Native client, including the component for managing props and the container of the canvas (webview).
 - **core**: A WebView-based core that handles the drawing canvas and rendering.
 - **shared**: Contains code shared between the client and the core, including the message system for communication.
 - **scripts**: Utility scripts for building, compiling, and adapting the project to the environment.
 - **libs**: Additional resources required for building the project.

## Core Components
The core consists of several components and modules:
 - **Touchscreen**: Handles touch events and converts them to coordinates based on the screen resolution.
 - **Grid**: A customizable grid that can be shown or hidden and resized as needed.
 - **Display**: A full-screen canvas where the drawing takes place. It receives coordinates from the drawService for rendering.



## Modules in Core:
 - **draw**: The main module, exporting the drawService, which is responsible for handling drawing actions. This module links with the touchscreen component to process user input.
 - **grid**: Manages the grid's display, allowing for customization and visibility toggling.
 - **history**: Handles the drawing history, including snapshots and undo/redo functionality. It also manages garbage collection for snapshots to conserve memory.
 - **tools**: Defines the tools (e.g., Pencil, Eraser, Filler) used for drawing. The drawService interacts with these tools to draw on the canvas.
 - **touch**: Handles touch events on the canvas and maps them to the resolution of the display.
 - **cursor**: Provides a customizable on-canvas cursor to indicate touch/point position. Supports styling such as border, background, opacity, scale, and shadows (with sensible limits); iOS disables cursor shadows for compatibility.

## Communication Bridge
The communication between the React Native client and the WebView core is handled by a custom message system, which uses JSON strings to pass data between the two environments. Initialization is coordinated through a lightweight handshake: the core sends an `INIT_MESSAGE_SYSTEM` marker and the native side responds by completing the subscription; on iOS, the native side triggers delivery using JavaScript injection to call `window.ReactNativeWebView.onmessage(...)`, ensuring consistent delivery across platforms. The core side message system is also managed using two custom hooks to provide integration with the React Tree:
 - `useNativeDrawProps`: Receives the properties from the React Native client and updates the core.
 - `useCoreConnection`: Sends events from the core and receives actions from the Draw ref (such as drawing actions, history commands).

### The message system operates in the following manner:
1. The `postMessage` method of the `MessageSystem` sends data from one side (native or core) to the other.
2. Each message is acknowledged with an "ack" (acknowledgment) on reception, and the processed data is sent back with another "ack" upon completion.
3. The messages are processed asynchronously using promises, ensuring synchronization between the two components.

The bridge is implemented around a dedicated RN bridge object that encapsulates subscription and sending functions behind a single instance. The receiver uses a codec to safely decode/encode payloads and dispatches events to registered handlers.

## Canvas and Filler Architecture
The canvas backend abstracts headless rendering to support multiple environments. A factory selects the most suitable implementation at runtime:
 - A headless canvas factory creates either an `OffscreenCanvas` (modern environments) or a regular `HTMLCanvasElement` (legacy environments) transparently.
 - The Filler tool is provided through a factory that chooses between a parallel, animated implementation based on Web Workers when possible, and a single‑threaded implementation otherwise. Both variants expose the same interface with frame callbacks; the animated variant streams intermediate frames while the single‑threaded variant completes in a single pass.



## Handling Resolution and Scaling
The drawing canvas supports dynamic resolution changes. The resolution and aspect ratio are passed as props from the React Native client to the core using the `useNativeDrawProps` hook. The resolution is used to scale the drawing canvas, ensuring that the content is properly resized when the resolution changes.
When the resolution increases, the quality of the drawing improves, but existing drawings are rescaled (keeping its original quality, but improving new strokes definition). If the resolution decreases, the content may lose sharpness, but it is still re-rendered based on the new scale.
Aspect ratio changes can crop the image or expand the drawable area

## History Module
The history module in the core is designed to manage the state of the canvas. Each change to the canvas is stored as a snapshot. These snapshots are cleared and reset when the resolution changes to ensure that the history is based on the new canvas resolution.
The history module also supports undo and redo operations, allowing users to revert or reapply changes. Additionally, the history can be reset, taking the current image as the new base state. The module includes a garbage collector to remove unnecessary snapshots and optimize memory usage.

## Error Handling and Stability
Although the system does not include automated tests, the message system and its components have been manually tested to ensure stability. The only reported issues have occurred around the `MessageSystem`, and no issues have been found within its core processing logic.
Error handling is built into the message system to prevent crashes in case of unexpected conditions, but failed messages are not retried. It is assumed that acknowledgments will always be received.

