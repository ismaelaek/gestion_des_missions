# Gestion de Missions

## Introduction
Hello everybody !

This project is a web application that allows you to manage mission orders of DMSI.
this project is suggested and supervised by **Mr. Oussama Benhommane** as an internship project.


## Technologies

- Laravel 10
- React 18
- MySQL
- Bootstrap 5
- Material UI
- Ant Design
- Redux
- tailwindCSS

## Getting Started



### First step 
Using the command below, clone this project to your local machine :

```
git clone https://github.com/ismaelaek/gestion_des_missions.git
```

### Second step

Navigate to the cloned folder.
```
cd bisyclesManagement
```

### 3rd step : installing Laravel dependancies

Navigate to **Backend** Folder 
```
cd backend
```

Use those commands to install laravel dependancies:
```
composer update 
composer install
```
Make sure that a folder named `vendor` apeared after the installation!

### 4th step : setting up the environment
Copy the `.env.example` file to `.env` using the command below:
```
cp .env.example .env
```
### 5th step : installing react dependancies
After the installation is done, navigate to the **frontend** folder using 
```
cd ../frontend
```
Then use this command to install all React depandencies 
```
npm install
```
A new folder called `node_modules` will appear in your current directory (frontend).

### Final step : running the application

Firstly open two terminals, one for Laravel and the other for React

##### Laravel Terminal
Navigate to the folder named **backend**
```
cd backend
```
#### (Runing for the first time)

Create a db named DMSI in your phpMyadmin and make sure to set your MySQL port in the env file.

#####  Migrate tables  and Seed static data 
run this command to migrate database tabels :

```
php artisan migrate 
```

make sure if all the tables are created successfully

```
php artisan seed 
```

Then finaly start the server using 
```
php artisan serve
```

##### React Terminal
Navigate to the folder named **frontend**
```
cd frontend
```
Start the server using 
```
npm run dev
```
