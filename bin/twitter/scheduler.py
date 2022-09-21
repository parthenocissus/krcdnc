import time
import json
import atexit
import tweepy
import sys

from apscheduler.schedulers.background import BackgroundScheduler

counter_path = "bin/twitter/counter.txt"
flags_path = "static/flags.jpg"

bot_text_path = "static/space/svesvrstani/conf/twitter_bot_text.json"
bot_flags_path = "static/space/svesvrstani/twitter_bot_flags/"

bot_text_ending = "\n#Svesvrstani #AllAligned"

twitter_auth_keys = {
    "consumer_key": "jyFK3MnXcjaYDrquttQdEyejF",
    "consumer_secret": "5H0IkRWqXCr1lBgIZcQLtBHZsciyBeKXfm0AUQu47V9iGwWAOz",
    "access_token": "1565308088122482688-i32KiPgmnxmH16bDUR4gFUUJ8x6gVC",
    "access_token_secret": "UCcboyHhvsH1jQ4NiEc5MIpqg2bkHcNwqr9FTq0ozJ4nv"
}


def tweet(txt, file_name):
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
    media = api.media_upload(file_name)

    # Post tweet with image
    api.update_status(status=txt, media_ids=[media.media_id])


def get_n_text(n):
    key = str(n)
    with open(bot_text_path, encoding='utf-8') as f:
        data = json.load(f)
        if key in data:
            return data[str(n)] + bot_text_ending


def get_for_n(data, n):
    tweet_txt = data[str(n)] + bot_text_ending
    flag_file_name = bot_flags_path + str(n) + ".jpg"
    return tweet_txt, flag_file_name


def go():
    print(time.strftime("%A, %d. %B %Y %I:%M:%S %p"))
    with open(counter_path, 'r') as f:
        n = int(f.readline())
        print(f'Tweet index: {n}')
        f.close()
    n += 1

    key = str(n)
    with open(bot_text_path, encoding='utf-8') as f:
        data = json.load(f)
        if key not in data:
            sys.exit("Kraj.")
            # n = 1
        tweet_txt, flag_file_name = get_for_n(data, n)

    tweet(tweet_txt, flag_file_name)

    with open(counter_path, 'w') as f:
        f.write(str(n))
        f.close()


def schedule():
    scheduler = BackgroundScheduler()
    scheduler.add_job(func=go, trigger="interval", seconds=10)
    # scheduler.add_job(func=go, trigger="interval", hours=4)
    scheduler.start()
    atexit.register(lambda: scheduler.shutdown())
