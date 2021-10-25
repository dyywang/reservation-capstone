# Capstone: Restaurant Reservation System

## Link
https://reservation-capstone-otczhebkg-dyywang.vercel.app/

## Summary 
This project is a restaurant reservation system which allows users to manage reservations. Users can create and edit reservations, assign guests to tables, add new tables, and search for reservations.  
 
## API documentation
There are two main resources for the API: Reservations and Tables.

Reservations:
The reservations resource provides multiple end-points for users to interact with the reservation system. Specifically, the following end-points exist:

-- GET /reservations - This end point retrieves all reservations. Query parameters for reservation date (e.g. /reservations?date=2022-02-12) and mobile number (e.g. /reservations?mobile_number=201-111-2222) can be provided to list only reservations for those respective criteria. 

-- POST /reservations - Create a new reservation

-- GET /reservations/:reservation_id - Get a specific reservation using the reservation_id

-- PUT /reservations/:reservation_id - Update a reservation details

-- PUT /reservations/:reservation_id/status - Update a reservation status (booked, cancelled, seated)

Tables:
The tables resource provides end-points for users to interact with restaurant tables. Specifically, the following end-points exist:

-- GET /tables - Lists all of the tables

-- POST /tables - creates a new table

-- PUT /tables/:table_id/seat - Seats a reservation at the specified table. The reservation_id to be seated is to be provided in the request body.

-- DELETE /tables/:table_id/seat - Finishes a reservation that is sitting at the specified table

## Screenshots

![Dashboard](/screenshots/dashboard.png?raw=true "Dashboard - View all reservations and tables")

![New Reservation](/screenshots/new_reservation.png?raw=true "Create a new reservation")

![New Table](/screenshots/new_table.png?raw=true "Create a new table")

![Seat Table](/screenshots/seat_table.png?raw=true "Assign a table to a reservation")

![Search](/screenshots/search.png?raw=true "Search for a reservation")

## Technology
The application front-end runs on React, and the back-end uses Node.js and Express. The database used is Postgres. 

## Installation instructions
This is a monorepo of the application with the back-end in the folder "back-end" and the front end in the folder "front-end". All packages used can be installed via npm install.


