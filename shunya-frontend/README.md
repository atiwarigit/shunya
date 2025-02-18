# Shunya Journal

An ADHD-friendly digital journaling application designed to help users track their thoughts, emotions, and daily experiences with minimal friction and maximum engagement.

![Shunya Journal](public/logo192.png)

## Features

### 🎯 ADHD-Friendly Design
- Clean, distraction-free interface
- Clear visual hierarchy
- Immediate feedback on actions
- Progressive disclosure of features
- Smooth animations and transitions

### 📝 Core Functionality
- **Quick Mood Selection**: Easy-to-use mood tracking with visual indicators
- **State Tracking**: Monitor focus, energy, clarity, and overwhelm levels
- **Flexible Input Methods**:
  - Traditional text input
  - Voice-to-text for hands-free journaling
  - Image uploads with optional captions

### 💫 User Experience
- Responsive design for all devices
- Offline-first architecture using IndexedDB
- Real-time saving with visual feedback
- Edit and delete functionality with confirmation
- Expandable/collapsible journal entries

## Technology Stack

- **Frontend**: React with TypeScript
- **UI Framework**: Material-UI (MUI)
- **State Management**: React Hooks
- **Storage**: IndexedDB
- **Build Tool**: Create React App
- **APIs**: Web Speech API for voice input

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/atiwarigit/shunya.git
cd shunya/shunya-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### Building for Production

```bash
npm run build
# or
yarn build
```

## Browser Support

The application supports all modern browsers. However, some features like speech-to-text may have varying levels of support:

- Chrome/Edge: Full support
- Firefox: Partial support (some features may require permissions)
- Safari: Basic support

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the component library
- The ADHD community for UX insights and feedback
- Create React App team for the project bootstrap

---

Made with ❤️ for better mental health and productivity
