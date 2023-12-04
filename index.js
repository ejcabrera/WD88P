import express from "express";
import morgan from "morgan";
import cors from "cors"

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
morgan.token("body", function (req,res){
    return JSON.stringify(req.body);
});
app.use(morgan
    (':method :url :status :body')
    );
// app.use(logger);

let notes = [
    {
        id:1,
        content: "HTML is easy",
        important: true,
    },
    {
        id:2,
        content: "Browser can execute only JavaScript",
        important: false,
    },
    {
        id:3,
        content: "Get and Post are the most important methos of HTTP protocol",
        important: true,
    },
    {
        id:4,
        content: "test nodemon",
        important: true,
    },
    
]

// HTTP Methods: GET, POST, DELETE, PUT, PATCH
// RESTful API
/* 
URL        verb         functionality
notes       GET         fetches all resources in the collection
notes/10    GET         fetch a single resource
notes       POST        creates new resource based on the request data
notes/10    Deleted     remove the identified resource
note/10     PUT         replaces the entire identified resource
note/10     PATCH       replaces/update a part of the identified resource
*/

// function logger(req, res ,next) {
//     console.log(`Method: ${req.method}`);
//     console.log(`Path: ${req.path}`);
//     console.log(`Body: ${JSON.stringify(req.body)}`);
//     console.log("---------------------");
//     next();
// }

function unknownEndpoint (req,res) {
    res.status(404).send({error:"unkown endpoint"});
}

function generateId() {
    const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
    return maxId + 1;
}

app.get("/", (req, res) => {
    return res.send("<h1>Hello from Express JS!</h1>")});

app.get("/notes/info", (req, res) => {
    const notesCount = notes.length;
    return res.send(`<p>Notes App have ${notesCount} notes</p>`)
});    

app.get("/notes", (req, res) => {
    return res.json(notes)});

app.get("/notes/:id", (req, res) => { 
    const id = Number (req.params.id);
    const note = notes.find((note) => note.id === id);
    return res.json(note);
});
app.delete("/notes/:id", (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter((note) => note.id !== id);
    return res.status(204).end();
});

app.post("/notes", (req,res) => {
    const body =req.body;
    if (!body.content) {
    return res.status(400).json({error:"content missing"});
    }
    const note = {
        content:body.content,
        important:body.important || false,
        id:generateId(),
    };
    notes = notes.concat(note);
    return res.status(201).json(note);
});

app.use(unknownEndpoint);

app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
})