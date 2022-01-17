/*Now we want to deploy our app to heroku
 * Open cmd inside the vidly-api-node folder
 * 1) Run the code 'heroku create'
 * 2) then we get this message: -
 *
https://fast-scrubland-34502.herokuapp.com/

https://git.heroku.com/fast-scrubland-34502.git


* The name of our app is 'fast-scrubland-34502'
*
* And our database server is 'https://fast-scrubland-34502.herokuapp.com/'
* So to access our genres, we connect to "https://fast-scrubland-34502.herokuapp.com/api/genres" same for movies "https://fast-scrubland-34502.herokuapp.com/api/movies"
*
* We also have address for a git respository: - https://git.heroku.com/fast-scrubland-34502.git
*
* Here is our remote git responsitory created for us by heroku, We will push the files we commit to this respository and anytime we push new codes to this respository, heroku will be notified and will download the latest source code, build it and deploy it to our apiUrl : - 'https://fast-scrubland-34502.herokuapp.com/' . THIS IS CALLED CONTINOUS INTEGRATION.*/

//NOW WE WANT TO PUSH OUR CODE FROM THE LOCAL GIT RES TO THE REMOTE GIT RES

/*In the cmd window, run 'git push heroku master'
 * After this completes, we can open it with 'heroku open'
 * You should get 'Application error' Next lecture we will find the logs and fix the errors.*/
