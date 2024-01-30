# User Management System

A simple React application for managing user data, with features for adding, editing, and deleting users. The project uses JSON Server as a mock backend for user data.

## Description
How to run the JSON server?
A.make sure u install the all the packages using npm install and install the packages open new terminal and use this command  
## json-server --watch json-server/db.json --port 3001
make sure its should in 3001 port beacuse the api i used 3001 localhost port


## Description

The User Management System is a React application that allows users to perform CRUD operations on a list of users. It uses JSON Server to simulate a backend API for managing user data.

## Components

### Layout

The `Layout` component provides a common layout structure for different pages.

### Input
The `Input` component handles data in input  its a reasubel component.

### Dropdown
The `Dropdown` component handles data in drop  its a reasubel component.



### UserList

The `UserList` component displays a paginated list of users, allowing users to navigate to user details and perform various actions.

### UserDetails

The `UserDetails` component shows detailed information about a specific user, allowing users to edit or delete the user.

### UserForm

The `UserForm` component is a reusable form for adding or editing users.

### UserPagination

The `UserPagination` component handles pagination for the list of users.

### CustomSnackbar

The `CustomSnackbar` component is a customizable snackbar for displaying messages to the user.

## Folder Structure

The project follows a standard React project structure. Key folders include:

- `src`: Contains the source code for the React application.
- `public`: Holds static assets and the HTML file.
- `server`: Includes the JSON Server configuration and database file.

## Technologies Used

- React
- JSON Server
- Material-UI

## Setup

1. Clone the repository:

```bash
git clone https://github.com/kpspavan/user-management-app.git
cd user-management-app
