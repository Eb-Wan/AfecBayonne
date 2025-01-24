#Trucs à faire:

    Pages:
        -Home
        -Register
        -Log in
        -Chat

    1. routes user
        -post /db/user { name, email, password }
        -put /db/user/:email { name, email, accessLvl, pfpUrl }
        -delete /db/user/:email

    2. routes msg
        -get /db/msg/:email
        -get /db/msg/:limit/:skip
        -post /db/msg/ { userId, content, linkTo, image }
        -put /db/msg/ { content }
        -delete /db/msg/:id

    3. routes images
        -get /db/image/:email
        -post /db/image { uploader, img }
        -remove /db/image/:id