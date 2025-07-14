Coder: Santiago Botero Ramírez
Clan: Linus
email: boteroramirezsantiago@gmail.com
C.C: 1020490469

This project is a simple event management and user registration platform.

To display correctly, run the following commands:

npm install

This command run de vite server:
npm run dev

This command run the json-server
json-server --watch db.json --port 3000


The main page is a login where you must enter your username and password to 

Depending on your permissions, you will be redirected to an administration screen if you log in as an administrator or to a display screen of available events if you are a visitor.

As an administrator, you can update, delete, and add not only events but also visiting users.

As a visitor, you can add the events you want and delete any you no longer intend to attend.

Finally, there is also a logout button to exit the session and return to the main login page.

Admin credentials => email: admin@admin.com passwd: admin123
Visitor credential => email: santi@santi.com passwd: coco123
