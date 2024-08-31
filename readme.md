# MUNI subjects highlighter

> [!WARNING]  
> This is a beta-version, it may contain some bugs. If you fing one please let me know at futupas@gmail.com or via telegram

## What does it do
It helps to see your progress in passing necessary subjects in MUNI. It will highlight your subjects and you will see very nicely what you should take to finish the study

## How does it work
It takes your marks and highlights subjects in your template.
Meaning: 
* Green color - You passed this subject (at least once)
* Red color - You failed this subject (and have no successfull trial)
* Blue color - You have this subject, but it is not marked yet

## How to use it
1. Find file named `main.js` in this repo
1. Find the page with your marks (it should be something like `https://is.muni.cz/auth/student/moje_znamky?studium=1186739;vsob=1`)
    1. Make sure you have marks for THE WHOLE STUDY, not only current semester
    1. It can be found at [Student](https://is.muni.cz/auth/student/) -> `ZÁVĚR STUDIA` -> `Známky za celé studium, získané kredity a stud. průměr`
    1. The url you will be at is `MARKS_URL`, remember it
1. Now go to your template (it should be something like `https://is.muni.cz/auth/predmety/sablony?fakulta=1433;obdobi=9223;uzel=2592712;rek=a`)
    1. Go to [Šablony](https://is.muni.cz/auth/predmety/sablony) -> `Kontrolní šablony` -> Find your study (e.g. `B-CS Kyberbezpečnost - 2022/2023`). Its year should be the year you APPLIED to the study
    1. The url you will be at is `TEMPLATE_URL`, remember it
1. Go to `TEMPLATE_URL`
1. Open `Developer Console` in your browser (usually `F12`)
1. Find `Console` tab
1. Copy `app.js` contents and paste it to console
1. You will see some info there (in the console) and will be prompted to insert a url into alert window
1. Paste `MARKS_URL` in the text field named `Enter your marks url here`
1. Press `Ok` and wait a little bit
1. If everything is okay, the subjects will be highlighted and you will see a message in the console as well
1. You can close the console



## Credits
Made with ♥ by Futupas. If you want to thank me, you always can buy me a beer
