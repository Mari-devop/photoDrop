# PhotoDrop Project

## Overview

The PhotoDrop Project is a two-part application designed to streamline the process of photo management and sales for photographers and their clients. The project includes two separate applications:

1. **Photographer App**: Enables photographers to upload photos taken during events or photo sessions.
2. **Client App**: Allows clients to view, manage, and purchase photos taken of them.
   
The service features a unique photo-matching system where AI matches photos to users based on facial recognition. However, for this project, we simulate this process manually by assigning users to photos.

## Features

### Photographer App
- **Photo Upload**: Photographers can upload photos to the service, which will be processed and assigned to the respective clients.
- **Album Management**: Photographers can create and manage albums, grouping photos by event or session.
- **Manual User Assignment**: Photographers can manually assign photos to users, simulating AI-driven facial recognition.

### Client App
- **User Registration**: Clients can register to create an account on the platform.
- **Album Access**: Clients can view albums that have been matched with their photos.
- **Watermark Removal**: Clients can preview photos with watermarks and have the option to purchase without watermarks.

## Technology Stack

- **Frontend**: React, TypeScript
- **Backend**: Node.js, Retool
- **AI Simulation**: Manually assigned photo-user matching
- **Payment Processing**: Stripe API
- **Cloud Storage**: Fly.io

## Installation and Setup

### Prerequisites
- Node.js
- npm or yarn
- Retool account
- Fly(for storing photos)
- Stripe account (for payment processing)

### Step-by-Step Guide

1. Clone the repository:
    ```
    git clone https://github.com/yourusername/photodrop.git
    cd photodrop
    ```
2. Install dependencies for both applications:
    ```
    cd photographer-app
    npm install
    cd ../client-app
    npm install
    ```
3. Set up environment variables:
   
   Create a .env file in both the photographer-app and client-app directories with the following variables:
    ```
    # Common
    FLY_ACCESS_KEY_ID=your_aws_access_key_i STRIPE_SECRET_KEY=your_stripe_secret_key

    # Client App
    PORT=3000
    API_URL=http://localhost:3000
    ```
4. Run the applications:

    Start the photographer app:
    ```
    cd photographer-app
    npm start
    ```

    Start the client app:
    ```
    cd ../client-app
    npm start
    ```
## Usage

### Photographer Workflow
1. Login and upload photos to an album.
2. Manually assign photos to registered users.
3. Review and manage uploaded photos and user assignments.

### Client Workflow
1. Register and log in to the client application.
2. View assigned albums and preview photos.
3. Select and purchase photos to remove watermarks.

## Simulating AI Matching

For this project, the AI photo matching is simulated. As a photographer, you can manually assign users to photos by selecting from a list of registered clients. This simulates the AI's role in identifying and grouping photos by the individuals in them.

## Future Improvements

1. Implement Real AI Matching: Replace the manual assignment process with an AI-driven facial recognition system.
2. Expand Payment Options: Integrate additional payment gateways.
3. Enhance Photo Management: Include features for bulk uploads and editing tools for photographers.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any suggestions or improvements.