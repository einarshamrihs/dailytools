# dailytools



## Getting started

Install frontend dependencies:
```
cd templates
yarn install
```
Install the backend dependencies:
```
cd ../
pip install requiremenets.txt
```
Run the application:
```
python3.9 dailytools.py
```


Deploy to vercel
'''
sed -i 's/templates\/node_modules\//#templates\/node_modules\//g' .gitignore
vercel
vercel --prod
sed -i 's/#templates\/node_modules\//templates\/node_modules\//g' .gitignore
'''