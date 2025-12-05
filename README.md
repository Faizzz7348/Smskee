# Smskee - SMS Application

A professional SMS application built with React and the Textbelt API, featuring a modern sidebar interface.

## Features

- 📱 **Send SMS** - Send text messages to any phone number
- 🎨 **Modern UI** - Clean and intuitive interface with sidebar navigation
- 🌍 **International Support** - Multiple country codes supported
- 🔑 **Textbelt API Integration** - Powered by Textbelt API
- 📊 **Character Counter** - Real-time message length tracking
- ✨ **Responsive Design** - Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Faizzz7348/Smskee.git
cd Smskee
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## API Key

This app uses the Textbelt API for sending SMS messages.

- **Free tier**: Use the key `textbelt` (1 text per day per IP)
- **Paid tier**: Get your own API key at [textbelt.com](https://textbelt.com) for unlimited texts

## Usage

1. Enter your Textbelt API key (or use the free "textbelt" key)
2. Select the country code
3. Enter the recipient's phone number
4. Type your message
5. Click "Send SMS"

## Project Structure

```
src/
├── components/
│   ├── Sidebar.js          # Sidebar navigation component
│   ├── Sidebar.css         # Sidebar styles
│   ├── SendSMS.js          # SMS sending component
│   └── SendSMS.css         # SendSMS styles
├── App.js                  # Main application component
├── App.css                 # Main application styles
├── index.js                # Application entry point
└── index.css               # Global styles
```

## Technologies Used

- **React** - Frontend framework
- **Textbelt API** - SMS sending service
- **React Icons** - Icon library
- **Axios** - HTTP client (ready for advanced features)

## Future Enhancements

- 📥 Inbox functionality
- 🕐 Message history
- 👥 Contact management
- 📝 Message templates
- ⚙️ Settings and preferences

## Documentation

For more information about the Textbelt API, visit:
- [Textbelt Documentation](https://docs.textbelt.com/)
- [Textbelt Website](https://textbelt.com)

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## Author

Created by Faizzz7348