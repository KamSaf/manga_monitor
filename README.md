# Overview

It's basically a webscrapping script, which checks if there are new manga chapters on <a href="https://mangakatana.com/">MangaKatana.com<a/>.


# Features

- Checking if there are new chapters (including extra chapters) of given manga,
- Data about manga to be checked is stored in JSON file and updated when new chapter is found,


# How to install (Linux/MacOS):

1. Make sure you've got <a href="https://nodejs.org/en">node.js</a> and <a href="https://git-scm.com">git</a> installed on your system.

2. Clone this repository into ```/usr/local/bin``` (```sudo``` might be needed):

        git clone https://github.com/KamSaf/manga_monitor.git /usr/local/bin/manga-monitor

3. Add these aliases to your ```.zshrc``` or ```.bashrc```:

        alias manga-monitor="sudo bash /usr/local/bin/manga-monitor/scripts/run.sh"
        alias manga-monitor-update="sudo bash /usr/local/bin/manga-monitor/scripts/update.sh"

4. Open new terminal so that new aliases are available and run:
        manga-monitor-update


# Usage

To add manga to check go to ```/usr/local/bin/app/data/manga.json``` and just add new object like this:

                [
                    {
                        "name": "< MANGA NAME >",
                        "baseUrl": "< BASE MANGA URL >",
                        "lastChapter": "< LAST CHAPTER NUMBER >",
                        "lastExtraChapter": "< LAST EXTRA CHAPTER NUMBER>" // this one is optional
                    },
                ]

##

Kamil Safaryjski 2024
