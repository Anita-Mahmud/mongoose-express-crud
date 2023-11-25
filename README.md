This a CRUD operation api build with node.js, express, typescript and mongoose. In this user and order management is created, retrieved, updated and deleted and along with this operations, one can add products, retrived them and can calculate the total price.
Besides, for validation Joi is used. 
For User management-
1. Creating a user: when /api/users and method POST is hit, a user will be created with data of userId, username,password,fullName including firstName and lastName,age,email,isActive,array of hobbies, address 
including street, city and country. In response the password field will be hidden
2. Retrieve all users: when /api/users and method GET, all users will be shown with datas username, fullName, age, email, address.
3. Retrieve a specific user: when/api/users/:userId and method GET, full data excluding password will be retrieved.
4. Update a specific user: when/api/users/:userId and method PUT, if the user exists then it will update accordingly.
5. Delete a user: when/api/users/:userId and method DELETE, the user will deleted
For Order management-
1. Adding a new order: when /api/users/:userId/orders and method PUT, a new order will be added on the order array
2. Retrieving all orders for a specific user: when /api/users/:userId/orders and method GET, all products of the specified user will be shown.
3. Calculating total price of orders for a specific user: when /api/users/:userId/orders/total-price and method GET, total price in the order array of the specified user is calculated

Moreover, to ensure whether an user exists or not, a custom static method is built.
