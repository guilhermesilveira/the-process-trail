# The Process Trail

Member of a project navigate files and commit to areas of a project during their contribution phase. How can we visualize their paths?

This project is a first on a series of such visual explorations.

See the paths of Processing 4 commiters live at https://guilhermesilveira.github.io/the-process-trail/

Learn more at https://www.guilhermesilveira.org/main/the-process-trail

# Running

1. Choose your git project and change `main.py` accordingly to point to it.
2. Run `main.py`
3. Upload the output json file to a github folder, you can pull request to my central repository if you wish https://github.com/guilhermesilveira/theprocesstrail-logs
4. Run the p5.js visualization https://guilhermesilveira.github.io/the-process-trail/

# How to save the movie

1. Run the p5.js visualization with `CAPTURE=true`
2. Build the movie from the exported images:

```
ffmpeg -i %7d.png -framerate 30 -pix_fmt yuv420p video.mp4
```

# Is this Python or JS?

Both.

# I would like...

- To have used some modern p5.js capturing plugin instead of the code I have written. That would have saved a lot of time and bad code.
- To make `main.py` read a command line argument, which would be much easier.
- To add an input field to p5.js so you can select the json source to be loaded and a button to start running.