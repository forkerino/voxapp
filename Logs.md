20-2-2017
13.30: Objective: 
Users can share the poll. Add a link to the poll. 
Done, also created a way for people to copy the link to the clipboard.

14:30: Objective:
As an authenticated user, if I don't like the options on a poll, I can create a new option.

Done 
16.25: Objective: 
Make sure can only vote once. Based on IP.
Done with a simple addition to the addVote function, an extra condition in the findOneAndUpdate method: 
'answeredByIP': { $nin: [vote.userIP]}

16.35: Objective:
Only show add Option form for logged in users.
Done by passing in the req.user || false into the template, and adding <% if (user) { %> block around the form.

17.03: Objective:
Create a chart for each poll. 
added chart.js, had to use cdn because node module didn't work properly.
Added it in script tags at the bottom of the page. Maybe refactor later. 

19.00: 
All that is left is styling. Will continue later.

22-2-2017:
14.50: Objective:
Create a partial for the login/signup buttons, which should go at the top. 

15.20: Objective:
Display latest 5 polls on frontpage.

15.30: Objective: 
Create partial for the footer and for the user options. 

15.55: Time to commit.

16.00: Objective:
Remove bootstrap and do stuff myself

The removing part was easy, now on with the boring stuff.

16.32: Have been working on a bug, because the server couldn't find my stylesheet. 
Had to add `app.use('/public', express.static(process.cwd() + '/public'));` 
in my server.js to access the folder.

