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
