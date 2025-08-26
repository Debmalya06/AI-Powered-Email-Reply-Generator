# 🤖 ReplyGenius - AI-Powered Email Reply Generator

![ReplyGenius Logo](client/public/replygenius-logo.svg)

**Your intelligent email assistant that crafts perfect replies with AI**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-success?style=for-the-badge)](https://ai-powered-email-reply-generator-1.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/Debmalya06/AI-Powered-Email-Reply-Generator)

---

## 📖 About

ReplyGenius is an intelligent email assistant that helps you craft professional, well-structured email replies using advanced AI technology. Whether you need a formal business response or a casual friendly reply, ReplyGenius adapts to your preferred tone and generates contextually appropriate content in seconds.

![ReplyGenius Screenshot](client/public/Screenshot%202025-08-26%20032854-Picsart-BackgroundRemover.png)

## 🌟 Features

### 🎯 **Smart Email Generation**
- **AI-Powered Content**: Generate contextually relevant email replies
- **Multiple Tone Options**: Professional, Friendly, Casual, Formal, Enthusiastic
- **Real-time Processing**: Get instant AI-generated responses
- **Context-Aware**: Understands email content and generates appropriate replies

### 🌐 **Multi-Platform Support**
- **Web Application**: Full-featured web interface
- **Chrome Extension**: Seamless integration with Gmail, Outlook, and other email platforms
- **Cross-Browser Compatibility**: Works on all modern browsers

### 🎨 **Modern User Experience**
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Clean Interface**: Intuitive and user-friendly design
- **Real-time Preview**: See your generated email before using it
- **Visitor Counter**: Track application usage

### 🔒 **Privacy & Security**
- **Privacy-Focused**: Your email content is processed securely
- **No Data Storage**: We don't store your personal email content
<!-- - **Secure API**: All communications are encrypted -->

## 🚀 Live Demo

Experience ReplyGenius live: **[https://ai-powered-email-reply-generator-1.onrender.com](https://ai-powered-email-reply-generator-1.onrender.com)**

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API requests

### Backend
- **Spring Boot 3.4.4** - Java-based backend framework
- **Java 21** - Latest LTS version
- **Maven** - Dependency management
- **REST API** - RESTful web services
- **CORS Support** - Cross-origin resource sharing

### Browser Extension
- **Vanilla JavaScript** - Lightweight extension
- **Chrome Extension API** - Browser integration
- **Content Scripts** - DOM manipulation

### Deployment
- **Render** - Cloud hosting platform
- **Docker Support** - Containerized deployment

## 📱 Images

### Main Application Interface
![Main Interface](client/public/images/img1.png)
![Main Interface](client/public/images/img2.png)


### Chrome Extension Integration
*The extension seamlessly integrates with your favorite email platforms*
![Extension Interface](client/public/images/img3.png)
![Extension Interface](client/public/images/img4.png)
## 🏗️ Project Structure

```
AI-Powered-Email-Reply-Generator/
├── client/                          # React Frontend
│   ├── public/
│   │   ├── replygenius-logo.svg    # App logo
│   │   └── Screenshot 2025-08-26 032854-Picsart-BackgroundRemover.png
│   ├── src/
│   │   ├── App.jsx                 # Main React component
│   │   ├── index.css               # Global styles
│   │   └── main.jsx                # React entry point
│   ├── package.json                # Frontend dependencies
│   ├── tailwind.config.js          # Tailwind configuration
│   └── vite.config.js              # Vite configuration
├── email_writer_backend/            # Spring Boot Backend
│   ├── src/main/java/com/email_writer/
│   │   ├── EmailWriterApplication.java
│   │   ├── controller/
│   │   │   └── EmailController.java
│   │   ├── model/
│   │   │   └── EmailRequest.java
│   │   ├── services/
│   │   │   └── EmailGeneratorService.java
│   │   └── config/
│   │       └── WebConfig.java
│   ├── pom.xml                     # Maven dependencies
│   └── Dockerfile                  # Docker configuration
└── email_Extension/                # Chrome Extension
    ├── manifest.json               # Extension manifest
    ├── content.js                  # Content script
    ├── content.css                 # Extension styles
    └── icons/
        └── icon_email.png         # Extension icon
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm
- **Java** 21+
- **Maven** 3.6+
- **Chrome Browser** (for extension)

### 1. Clone the Repository
```bash
git clone https://github.com/Debmalya06/AI-Powered-Email-Reply-Generator.git
cd AI-Powered-Email-Reply-Generator
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`

### 3. Backend Setup
```bash
cd email_writer_backend
mvn clean install
mvn spring-boot:run
```
The backend will run on `http://localhost:8080`

### 4. Chrome Extension Setup
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `email_Extension` folder
4. The extension will be added to your browser

## 🔧 Configuration

### Frontend Configuration
Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:8080
```

### Backend Configuration
Update `application.properties` in `email_writer_backend/src/main/resources/`:
```properties
server.port=8080
spring.application.name=email_writer
```

## 📡 API Endpoints

### Generate Email Reply
```http
POST /api/email/generate
Content-Type: application/json

{
  "emailContent": "Original email content here...",
  "tone": "professional"
}
```

**Response:**
```json
{
  "generatedReply": "AI-generated email reply based on the input content and tone"
}
```

## 🎯 Usage Examples

### Web Application
1. Visit the live demo or run locally
2. Select your preferred tone (Professional, Friendly, etc.)
3. Paste or type your email content
4. Click "Generate Email" to get AI-powered suggestions
5. Copy and use the generated reply

### Chrome Extension
1. Install the extension from the web app
2. Open Gmail, Outlook, or any email platform
3. The ReplyGenius assistant will appear
4. Select content and generate replies directly in your email client

<!-- ## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting -->

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Debmalya Pan**
- GitHub: [@Debmalya06](https://github.com/Debmalya06)
- Email: [Contact](mailto:your-email@example.com)

## 🙏 Acknowledgments

- Thanks to the React and Spring Boot communities
- Icons provided by [Lucide](https://lucide.dev/)
- Styling powered by [Tailwind CSS](https://tailwindcss.com/)
- Hosted on [Render](https://render.com/)

## 📈 Roadmap

- [ ] **Multi-language Support** - Support for multiple languages
- [ ] **Email Templates** - Pre-built email templates
- [ ] **Advanced AI Models** - Integration with more AI providers
- [ ] **Team Collaboration** - Shared email templates and settings
- [ ] **Analytics Dashboard** - Usage statistics and insights
- [ ] **Mobile App** - Native mobile applications

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please create an issue on our [GitHub Issues](https://github.com/Debmalya06/AI-Powered-Email-Reply-Generator/issues) page.

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/Debmalya06">Debmalya Pan</a></p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
