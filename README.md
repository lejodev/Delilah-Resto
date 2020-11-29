# Delilah-Resto
Delilah Resto is an API wich emulates any restaurant environment, which allows admins to manage all the orders performed by customers and take control of the process.

## Delilah Resto Installation
### Clone the repo to your local environment
```bash
Clone https://github.com/lejodev/Delilah-Resto.git to your local environment.
```

### Set database
* Start Mysql the service, in port 3306
* Once in the project, locate the file ```/model/model.sql``` and copy that
* Paste this file in the file called ```bin``` inside the XAMPP file on your pc
* Once there, use the CMD in this location. Type ```mysql -u 'Your MySQL userName'``` and then type ```source model.sql```

### Set your envoronment variables
create a ```.env``` file, type ```JWT_SECRET = 'Your preferred secret value'```. This environment variable is necessary to perform any JWT process

### Start local server
In a new CMD, or in the text editor terminal go to the file ```cd Delilah-Resto``` once there, type ```npm install```, once the process has finished, type ```npm run dev```

### Run in Postman
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/ec7aadb035961cb5a0f8)

### API documentation
In Swagger editor, import the ```Documentation.yaml``` to see the API documentation
