# North Bowl Score Card App

## Introduction

The North Bowl Score Card App is a mobile application designed to digitize the traditional paper-based score card. This app is developed for both iOS and Android platforms, ensuring compatibility for a wide range of users.

This app is also the first project created in React Native.

## Features

### 1. Create New Score Card

- **Description:** Users can create a new score card by entering essential details, including the competition name, date (which can be set automatically or via a Date Picker), rink number, team names, and player names.
- **Conditions:** The number of player names can range from 1 to 4 players.

### 2. Log Shots for Each End

- **Description:** Users can add the shots for each end to a team, and the app calculates and presents the running total value.
- **Conditions:** Shots for each end can only be applied to one team, resulting in the other team receiving zero shots.

### 3. Data Management

- **Description:** The app efficiently manages data using Reducers and Context hooks. It also implements a persistent storage system, allowing data to be stored either locally or externally.

### 6. Manage Previous Score Cards

- **Description:** Users can view previously played score cards, including full results. They have the option to edit previous cards to make changes and remove them as needed.

### 7. Optional Photo Capture

- **Description:** Users can optionally take a picture for each end using the device's camera hardware. These photos are retrievable for future uses of the application.

## Installation and Usage

To use the North Bowl Score Card App, follow these steps:

1. Clone or download the app's source code.

2. Navigate to the project directory and install the required dependencies using npm or yarn.

   npm install/npm i
   # or
   yarn install

3. Install Expo CLI to view the app

    npm start
    # or
    npx expo start

## Tech Stack

- React Native
- Expo CLI
