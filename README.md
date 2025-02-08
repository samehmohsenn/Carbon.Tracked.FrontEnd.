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

A visualization of the emission reports is shown on a bar chart, depicting each month's total emissions, each month's bar is split into calculated sections with different colors to reflect the amount of emissions caused by each category

For each month entry, a corresponding report is shown that shows the total emissions during that month, the highest emitter, a table showing each category's CO2e and a suggestions area, which provides suggestions for how to decrease their emissions, each emission category's suggestions is shown if it passes the threshold defined in the backend's database.

A delete button is present at the bottom of each report to delete the report and its corresponding data entry, the user can then reenter the month's data.

A search box on the page can filter the reports shown and visualized on the page, based on month, year, or both. enables the user to find a specific entry, see all reports of a single year, or compare this year's emissions to last year's, to see progress more clearly.

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
