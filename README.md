📡 SCSS (Security Control Simulation System)
📄 About

This program simulates three different types of advisory systems to evaluate how people respond to different types of advice in cyber defense tasks. Participants are randomly assigned to one of the following four experimental conditions:

    No Advisor (Control)
    AI Advisor
    Human Advisor

Participants are tasked as cyber defense experts to protect a network by classifying incoming requests as "Trusted," "Suspect," or "Hostile" based on provided rules. Misclassifications may lead to a security breach or prevent staff from accessing essential data.

The system utilizes a Battlespace Management Task (Hodgetts et al., 2015), adapted to fit the terminology of a cyber defense task. The network is at the center of the radar screen, surrounded by incoming internet traffic represented by radar dots. Participants must click on these dots to view their parameters (e.g., country of origin, packet size) and classify them accordingly.

Advisor Panel:
Participants in advisory conditions receive advice on how to classify each data point via an additional panel, depending on their assigned advisor (AI, computer, or human).

🎯 Aim

The objective of this experiment is to evaluate how people respond to advice from AI, computer, or human advisors and the impact of this advice on classification accuracy.
🔧 System Features

    Three Advisory Systems:
    Simulates four different types of advisors with varying advisory panels and recommendations.

    Radar Display:
    A visual representation of incoming network traffic for classification.


🛠️ Prerequisites

    Ensure you have Node.js and npm 📦 installed on your system. Download and install them from Node.js official website.
    This software is designed to be used with PostgreSQL. For futher information regarding download and set up of this see their official website.


🚀 Installing

    🖥️ Clone the repository:
    git clone https://github.com/theAppieAutie/scss-sans-webgazer.git

    📁 Navigate to the project folder:
    cd SCSSxWebGazer

    ⬇️ Install dependencies:
    npm install

🌍 Environment Setup

    📄 Create a .env file in the project's root directory.

    🔑 Add the following variables with your values:

    SESSION_SECRET=your_secret_here Replace your_secret_here with a unique, strong value.
    DB_USER=your db user name 
    DB_PASSWORD= your db password
    DB_DATABASE=your database name (usually postgres upon set up)
    DB_HOST=if hosting locally then 'localhost'
    DB_PORT=port postgresql is listening on - defaults to 5432

    🔄 To make the environment variables accessible, type:

    export $(cat .env | xargs)

🖥️ Usage

    🔥 Start the server:
    npm run dev

    🌐 Open a browser and go to the configured port in server.js.

    🧭 Follow the on-screen instructions to engage with the simulation and answer the questionnaires.

