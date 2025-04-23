import express from "express";
import { fileURLToPath} from "url";
import path from "path";

let app = express();

let port = 3000;
//construct path to html file
let __fileName = fileURLToPath(import.meta.url);
console.log({ __fileName});

let __dirName = path.dirname(__fileName);
console.log({__dirName});

//set up templating
app.set('views','./views');
app.set('view engine','pug');

//home route
app.get("/", (req,res) =>{
  res.sendFile(path.join(__dirName,"public","Homepage.html"));
  });

 //movies page
  app.get("/movies",async (req,res) =>{
    console.log('Movies route');
    let movieRes = await fetch("http://api.themoviedb.org/3/discover/movie",{
      headers:{
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjU2NmYwOTAyMDg4NTNkMzFkODU1ZTk0ZTQxODhiNyIsIm5iZiI6MTczOTYxMDM5Mi4xOTcsInN1YiI6IjY3YjA1OTE4YWY5YjBjYWFlMTM1YWM5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.drgEo6RNPxuNsA4LshmLo0Zi6HEsYbSBN4l7ujNdyhU'
      },
    });

    let movies = await movieRes.json();
    console.log({movies});
    res.render("movies",{data:movies.results});
    // let res.sendFile(path.join(__dirName,"public","Movies.html"));
    });

  //series page
    app.get("/series",async (req,res) =>{
      console.log('Series route');
      let seriesRes = await fetch("https://api.themoviedb.org/3/discover/tv",{
        headers:{
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjU2NmYwOTAyMDg4NTNkMzFkODU1ZTk0ZTQxODhiNyIsIm5iZiI6MTczOTYxMDM5Mi4xOTcsInN1YiI6IjY3YjA1OTE4YWY5YjBjYWFlMTM1YWM5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.drgEo6RNPxuNsA4LshmLo0Zi6HEsYbSBN4l7ujNdyhU'
        },
      });
      let series = await seriesRes.json();
      console.log({series});

      res.render("series",{data:series.results});
      // res.sendFile(path.join(__dirName,"public","Series.html"));
      });


  // Individual movie route
      app.get("/movies/:id",async (req,res)=>{
        let id = req.params.id;
        console.log({id});

        let movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}`,{
          headers: {
             accept:"application/json",
             Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjU2NmYwOTAyMDg4NTNkMzFkODU1ZTk0ZTQxODhiNyIsIm5iZiI6MTczOTYxMDM5Mi4xOTcsInN1YiI6IjY3YjA1OTE4YWY5YjBjYWFlMTM1YWM5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.drgEo6RNPxuNsA4LshmLo0Zi6HEsYbSBN4l7ujNdyhU'
          },
        });
        let movie = await movieRes.json();
        console.log({movie});

        res.render("movie",{data:movie});
      });

  // Individual series route
  app.get("/series/:id",async (req,res)=>{
    let id = req.params.id;
    console.log({id});

    let serieRes = await fetch(`https://api.themoviedb.org/3/tv/${id}`,{
      headers: {
         accept:"application/json",
         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjU2NmYwOTAyMDg4NTNkMzFkODU1ZTk0ZTQxODhiNyIsIm5iZiI6MTczOTYxMDM5Mi4xOTcsInN1YiI6IjY3YjA1OTE4YWY5YjBjYWFlMTM1YWM5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.drgEo6RNPxuNsA4LshmLo0Zi6HEsYbSBN4l7ujNdyhU'
      },
    });
    let serie = await serieRes.json();
    console.log({serie});

    res.render("serie",{data:serie});
  });

      //Link static files
app.use(express.static("public"));

      app.listen(port, ()=>{
        console.log(`Server running at port ${port}`);
      });