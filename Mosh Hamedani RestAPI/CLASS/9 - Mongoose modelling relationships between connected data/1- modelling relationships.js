/*
MONGODB BREAKDOWN : - Inside mongodb, we have databases e.g. "Vidly", inside the database(s), we have collections or call it folders e.g. "genres, customers" and this collections/folders contains documents. These documents are the data/json objects we saved inside the collection, so each json object is a separate document on its own....If we have 7 json objects containing details of 7 customers then we have 7 documents inside the "customer collection". And this documents now contains properties we defined in the schema e.g. "name, data, author" etc.

IN SIMPLEST FORM : -
MONGODB DATABASE : - Computer hard drive
COLLECTIONS : - Folders created in the hard drive
DOCUMENTS : - Files saved inside the folders e.g. MS document but in mongodb, these are json objects.

So far we have worked with "single self contained documents" i.e. They exist and can survive on their own, the document properties have no dependencies or share anything in common with any other documents, but in the real world, the properties we work with have some kind of association. e.g. We can have a Course document/object having the "author" property but the author is more than just a simple 'name/string', we might have another collection/folder containing author documents and in each of these author documents we might have properties like : "name, website, image" etc.
 * So we will be talking about how to work with related objects
 *
 * TWO APPROACHES FOR WORKING WITH RELATED OBJECTS
 * 1) Using References (Normalization)
 * 2) Using Embedded Documents (Denormalization)*/

//USING REFERENCES: - In this approach, we simply reference the id of the author's document inside the author property in the course document - CONSISTENCY

//we have this author collection containing author object
let author = {
  name: "Mosh"
};

//we have this course collection containing course object where we have author as one of the property
let course = {
  // here we set the value of author to the id of the author's document
  author: "id"
};

//USING EMBEDDED DOCUMENTS : - In this approach, we simply embed the author's document inside the course document - PERFORMANCE
//we have this author collection containing author object
let author = {
  name: "Mosh"
};

let course = {
  //we are embedding the author document inside the course document
  author: {
    name: "Mosh"
  }
};

/*Each of these two approaches has its strengths and weaknesses, what approach you choose really depends on your application and its querying requirements. So you need to "Choose between query performance vs consistency"?
What do we mean by this?
In the reference approach, if in future, we change the author's name inside the author's documents, there is a single place we need to modify which is the authors document alone and immediately all courses in course collection will immediately see the updated author because we are referencing the 'id'. So in the first approach we have consistency but anytime we query/get request a course, we need to perform extra query/get request to load the author, sometimes this might not be a big deal but sometimes you want to ensure that your query/get request runs as fast as possible and if that is the case the you need to use the second approach "Embedded Documents"

In the second approach "embedded" w can load the course object and the author object using a single query/get request because author is inside the course object/document but if in future we decide to change the author's details in this collection, chances are there are multiple documents we need to be updated and if our update operation doesnt completes successfully, we might have courses that are not updated so we end up with inconsistent data.

So you need to always think of the queries you want to use ahead of time and design your database based on those queries requirements.*/

/*HYBRID APPROACH : - This the 3rd approach. e.g. let us imagine each author has 50 properties, we dont want to duplicate all these properties of the author's object inside every course in our database, so we can embed an author document inside the course document but not a complete representation of that author perhaps we only want the 'name' property*/

//HYBRID
//authors document with 50 properties
let author = {
  name: "Mosh"
  // 50 other properties
};

//course document picking only the id and the name properties from the total 50 author's properties
let course = {
  author: {
    id: "ref",
    name: "Mosh"
  }
};

/*This approach is particularly useful if you want to have a snapshot of your data at a point in time e.g. if you are designing an e-commerce app, there you will have collections like: "orders, products, shopping-cart".
 * In each order, we need to store a snapshot of a product because we want to know the price of that product at a given point in time. So that is where we will use the hybrid approach. i.e. We have a product document with plenty properties : product name, price, review, likes etc but in the orders document, we need to reference the product name so we know the name of the product that was ordered.*/
