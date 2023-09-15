# We-Love-Movies

This is the backend API for the We-Love-Movies project.

## /movies
Lists all movies.
Add the query ```?is_showing=true``` to only retrieve movies that are playing soon.
Movies have the following structure:
```
Movie: { id, title, runtime_in_minutes, rating, description, image_url }
```

## /reviews
#### GET
Returns all movie reviews.
Reviews have the following structure:
```
Review: { content, score, critic_id, movie_id }
```

### /reviews/:movieId
#### GET
Return a single movie's reviews.
#### PUT
Updates a review.
Make sure that the new version has at least a score or a content field.
#### DELETE
Deletes a review.

## /theaters
#### GET
Returns all theaters.
Theaters have the following structure:
```
Theater: { id, name, address_line_1, address_line_2, city, state, zip }
```
### /theaters/:movieId
Returns only the theaters that are playing a given movie.
