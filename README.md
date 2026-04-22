REQUIREMENTS


Back end
------------
Create a list of Countries.
Create a list of Cities.
Based on the selection of Countries the cities should be listed with the details page.
Implement Open API Specification in the back end
Pagination for list of cities in details page
Once you complete, please share your Github respository for review. 
 
Front End
------------
1. Show the list of Countries
2. Once you select the countries it should show the list of cities.
3. On selecting the cities it should show the details.
4. Show the cities using pagination 5 cities per page.

Open ID Auth notes
------------
How to get your GOOGLE_CLIENT_ID

● 1. Go to https://console.cloud.google.com
  2. Create a project (or select an existing one)
  3. In the left menu: APIs & Services → OAuth consent screen
    - Choose External user type
    - Fill in app name, support email, developer email → Save
  4. In the left menu: APIs & Services → Credentials
    - Click + Create Credentials → OAuth 2.0 Client ID
    - Application type: Web application
    - Under Authorized JavaScript origins add:
        - http://localhost:4200
      - Your ngrok URL (e.g. https://[your_subdomain].ngrok-free.dev)
  5. Click Create — a dialog shows your Client ID
  6. Copy it into:
    - .env → GOOGLE_CLIENT_ID=<paste here>
    - frontend/src/app/services/auth.service.ts → const CLIENT_ID = '<paste here>'

  ▎ Note: You do not need a Client Secret — this app uses Google Identity Services in the browser, which only requires the Client ID.
