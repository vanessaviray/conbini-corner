# Conbini Corner

A full-stack application that simulates an e-commerce site for food enthusiasts who want to purchase imported snacks and drinks from Japan.

## ❓Why I Built This

Inspired by my first visit to Japan, I was captivated by the unique cultural flavors found even in everyday convenience store items like snacks, condiments, and drinks. Upon returning home, I realized how difficult it is to obtain some of these items in the US. This project is my solution to that problem: a platform designed to make these unique Japanese products more accessible to US consumers. By creating this site, I aimed to combine my passion for cultural exploration with my technical skills, offering a seamless and enjoyable shopping experience for those who, like me, appreciate the distinct tastes of Japan.

## 🚀 Live Demo

Try the application live here: http://ec2-3-135-94-136.us-east-2.compute.amazonaws.com/

## 💻 Technologies Used

- React.js
- Node.js
- Express.js
- PostgreSQL
- TypeScript
- CSS3
- Tailwind CSS
- AWS, DB Diagram and a custom-built database specifically for this project, the Conbini Corner Database.

## 📋 Features

- Users can access different featured content and categories from the hero section on the home page
- Users can view a list of featured products
- Users can search and view products by categories and subcategories
- Users can search for products using the search bar
- Users can add products to their shopping cart
- Users can create an account to save the products in their cart
- Users can remove and update the quantity of the items in their shopping cart
- Users can view their order summary
- Users can checkout

## 👀 Preview

![add-demo-ezgif com-video-to-gif-converter](https://github.com/vanessaviray/vanessaviray/assets/161077888/cfd6faaf-ec33-4bc8-9ee7-975730be521d)
![details-demo-ezgif com-video-to-gif-converter (1)](https://github.com/vanessaviray/vanessaviray/assets/161077888/9168978a-f782-461e-9ce3-4494cf7ff0db)
![mobile-demo-ezgif com-video-to-gif-converter](https://github.com/vanessaviray/vanessaviray/assets/161077888/dfee1c24-845a-44a1-b93c-b7bc4a75c2bc)

## 👩🏻‍💻 Development

### Getting Started

1. Clone the repository.

```shell
git clone git@github.com:vanessaviray/conbini-corner.git
```

2. Install all dependencies with npm.

```shell
npm install
```

3. Import the starting database to PostgreSQL.

```shell
sudo service postgresql start
createdb conbiniCorner
npm run db:import
```

4. Start the project. Once started you can view the application by opening

```shell
npm run dev
```

Open http://localhost:5173 with your browser to see the result.
