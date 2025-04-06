# 🇪🇺 **Europé Connect** 

## 🌐 **Project Overview**

This project was created as part of an **code test for internship**, where I developed a simple web app that displays user profiles fetched from [randomuser.me](https://randomuser.me). 
It includes search option by name and filter options by country and gender. The website also adapts its layout for different screen sizes.

You can view the live demo of the project at: [**People Profile Demo**](https://hani-kristiansson.github.io/People-profile/).

---

## ✅ **Features**

- Filter users by countries: Denmark, France, UK, Germany, Spain
- Search users by name
- Filter users by gender (male/female)
- Select one or multiple countries
- **Responsive layout:**
  - Small : 1 profile per row (1x3 grid)
  - Medium : 2 profiles per row (2x3 grid)
  - Large : 4 profiles per row (4x4 grid)
- **“Send message” button**: Automatically creates a greeting message with the user’s name and country (e.g., "Bonjour" for France, "Hola" for Spain)
- Click the **header** to reload page
- **“Load more” button**: Adds 8 more profiles. Button is hidden when it reaches end of pre-loaded user profiles

---

## 🛠 **Improvements**

- Hide **"Load more"** button after search is done (currently still visible)
- Improve the **design** of the site
- Add **sorting** (by name, age, etc.)
- Create a **separate backend API** instead of using randomuser.me

---

## 🐞 **Bug** 

- Filtering by more than 5 countries **may not** work as expected.

---

## 📚 **References**

- [W3Schools](https://www.w3schools.com)
- **Bootstrap** from [getbootstrap.com](https://getbootstrap.com)
