# Discogs

This project is written in Angular and uses the Discogs api to perform search and display of musical artists, albums, and labels.

## Api Shortcomings

The Discogs api has a few shortcomings that affect the application. Most specifically, their album data is divided into two categories : Masters and Releases. Masters are what we typically think of as an album in an artists catalog. Releases refers to each particular release of an album ie Miles Smiles released in US/UK as an LP in 1966, in Japan 1967, on 8-track in 1972, as a cassette in 1980, etc. Releases will also include singles and other various formats. Since releases are generally not of interest to the casual user, masters are used exclusively in this site. 

The exclusive use of masters does lead to some problems, most specifically that the artist and label apis only support retrieval of a full, unfiltered list of releases for an artist/label. As a workaround, for artists and labels I utilize the search api to retrieve a list of masters filtered to include albums  and EPs only. This has the down side of being unable to sort across the full range of returned data. 

I decided the best workaround would be to increase the page size to the maximum of 100 , and to sort each page by year. For most artists who have well under 100 albums (keep in mind this may include bootlegs, etc) this will work well. For artists with large catalogs and many labels, the result will be somewhat strange as navigating from page to page of results will results in ranges of years being repeated ie a true sort is not performed.

## Autocomplete
See the autocompleteEnabled property in environment.ts . Discogs limits the number of api calls for a given token, and turning off autocomplete may help you stay under the limit.

## Discogs api token

1. Go to <https://www.discogs.com> to create an account. 

2. Once your account is created, go to <https://www.discogs.com/settings/developers> to create an api token

3. Open environment.ts and update the discogs_api_token property.

