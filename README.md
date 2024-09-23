# Act4Fitness

Act4Fitness is a React-based web application designed to help users track their fitness activities, monitor daily steps, and manage their fitness goals.

## Features

- **Activity Logging**: Users can log various fitness activities, including the type of activity, duration, and motion.
- **Step Tracking**: Daily step count can be logged and monitored.
- **Calorie Burn Calculation**: The app calculates calories burned based on activities and steps.
- **Progress Visualization**: Visual representation of daily steps and calories burned using progress dials.
- **Date-based Tracking**: Users can view and manage their fitness data for specific dates.
- **User Profile Management**: Users can create and manage their fitness profiles, including personal details and fitness goals.

## Getting Started

### Prerequisites

- Node.js (v12.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/act4fitness.git
   ```

2. Navigate to the project directory:
   ```
   cd act4fitness
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Usage

1. **Create User Profile**: Start by creating your user profile with your name, height, weight, and goal weight.

2. **Log Activities**: Use the "Log Activity" page to record your fitness activities.

3. **Track Steps**: Log your daily steps on the "Log Steps" page.

4. **View Progress**: The homepage displays your progress dials for steps and calories burned.

5. **Manage Data**: Use the date picker on the homepage to view data for specific dates.

## Project Structure

- `src/components/`: Contains React components for different pages and features.
- `src/Context/`: Includes React context files for state management.
- `src/Data/`: Stores any static data files used in the application.

## Technologies Used

- React
- React Router
- Context API for state management
- react-datepicker for date selection
- Local Storage for data persistence



## Acknowledgments

- Thanks to all contributors who have helped shape Act4Fitness.
- Special thanks to the React community for their excellent documentation and resources.
