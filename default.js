import http from "http";

let notes =[
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
]
const app = http.createServer((request, response) => {
        response.writeHead(200, {"Content-Type":"application/json"});
        response.end(JSON.stringify(notes));
});

const PORT = 3001;

app.listen(PORT);
console.log(`Server is now running on port ${PORT}`);