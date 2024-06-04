const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())




const uri = "mongodb+srv://tanim-kitchen:mLSUZkZC8Hcxn32g@cluster0.z12trsh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection

    const allRecipes = client.db("tanim-kitchen").collection("all-recipes");

    app.get('/recipes', async (req, res) => {
      const result = await allRecipes.find().toArray();
      res.send(result);
    })

    app.get('/recipe/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await allRecipes.findOne(query);
      res.send(result);
    })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/user", (req, res) => {
  const user = {
    name: "tanim",
    id: 122
  }
  res.send(user)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// tanim-kitchen
// mLSUZkZC8Hcxn32g