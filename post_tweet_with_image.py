import tweepy

# twitter data
"""
API key:             jyFK3MnXcjaYDrquttQdEyejF
API Key Secret:      5H0IkRWqXCr1lBgIZcQLtBHZsciyBeKXfm0AUQu47V9iGwWAOz
Bearer Token:        AAAAAAAAAAAAAAAAAAAAAH5tggEAAAAAjCfmDcyaX%2BgkSk85ZbgrC2d2bEk%3D05V290aLkgOgTpyXB14vfhkKrQl5XO8upU4gtQ1NkUqQwcq4QD
Access Token:        1565308088122482688-i32KiPgmnxmH16bDUR4gFUUJ8x6gVC
Access Token Secret: UCcboyHhvsH1jQ4NiEc5MIpqg2bkHcNwqr9FTq0ozJ4nv
"""


def main():
    twitter_auth_keys = {
        "consumer_key": "jyFK3MnXcjaYDrquttQdEyejF",
        "consumer_secret": "5H0IkRWqXCr1lBgIZcQLtBHZsciyBeKXfm0AUQu47V9iGwWAOz",
        "access_token": "1565308088122482688-i32KiPgmnxmH16bDUR4gFUUJ8x6gVC",
        "access_token_secret": "UCcboyHhvsH1jQ4NiEc5MIpqg2bkHcNwqr9FTq0ozJ4nv"
    }

    auth = tweepy.OAuthHandler(
        twitter_auth_keys['consumer_key'],
        twitter_auth_keys['consumer_secret']
    )
    auth.set_access_token(
        twitter_auth_keys['access_token'],
        twitter_auth_keys['access_token_secret']
    )
    api = tweepy.API(auth)

    # Upload image
    media = api.media_upload("static/flags.jpg")

    # Post tweet with image
    tweet = "testing flags... 3"
    post_result = api.update_status(status=tweet, media_ids=[media.media_id])


if __name__ == "__main__":
    main()
