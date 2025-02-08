### This is the FrontEnd Project for Carbon. Tracked. Created with ReactJS and Vite.

Carbon. Tracked. is a MERN stack project centered around enterprises' concern towards achieving a lower carbon footprint, while still continuing to provide the essence of their business.

This project includes all of the UI and FrontEnd functionality needed to provide all the basic operations needed by the web app.

# Preview: 

## SignUp / Login / Logout: 
![signup-login-logout preview](https://github.com/user-attachments/assets/04af0138-14df-4302-866d-48f336ccc4b5)

User can signup providing the Company Name, a unique username, the industry it inhabits and a password.

User cannot access any pages without a token (without being logged in).

## Data Entry: 
![data-entry preview](https://github.com/user-attachments/assets/312ccbba-26f2-4f0a-b217-1d62491a5d28)

For each month, user can input data for the categories responsible for CO2e and their values, they can dynamically add more or remove categories as applicable to their case.

Users cannot add more than one entry for the same month, to prevent double entries and confusion, user must first delete the old entry from the reports.

They can also see the current categories available in the backend database on the right, providing their name and their unit, so the user knows exactly what kind of data to input.

## Reports Visualization / Viewing / Search / Deletion: 
![reports visualization-viewing-deleting-searching](https://github.com/user-attachments/assets/edb390b4-a318-4ea8-86c1-7a441ba374d5)


# Dependencies: 
### Dependencies to run the project:
## 1. Node Modules 
the modules in node used by the project must be installed, by running 
```npm install``` in the terminal (you need to have nodeJS installed).



# Start the Server:
Ensure that your backend API is running, and to start the server, run the command 

```npm run dev``` 

in the project terminal.


### To find and setup the BackEnd API, visit [Carbon. Tracked. BackEnd.](https://github.com/samehmohsenn/Carbon.Tracked.BackEnd./), and read the readME.
