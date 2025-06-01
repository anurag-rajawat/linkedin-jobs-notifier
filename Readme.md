# 🚀 LinkedIn Job Notifier
Tired of manually searching for jobs on LinkedIn? This tool automates the process, scraping job listings based on your criteria and sending real-time notifications directly to your email! Stay ahead of the curve and never miss out on your next opportunity.

# ✨ Features
- **Customizable Job Searches**: Define keywords, locations, posting dates, and more to find the perfect job.
- **Email Notifications**: Get instant notifications for new job postings that match your preferences.
- **Easy to Use**: Set up and run the scraper with a few simple steps.

# 🛠️ Prerequisites
Before you get started, make sure you have these installed:

- [Node.js](https://nodejs.org/en/download): If you don't have it, download and install `Node.js`.
- [NotificationAPI Account](https://www.notificationapi.com/): This tool uses NotificationAPI to send email alerts. Sign up for a free account [here](https://www.notificationapi.com/).

# 🚀 Getting Started
Follow these steps to set up and run the LinkedIn Job Scraper and Alerter:

- Install Dependencies

First, navigate to the project directory in your terminal and install the required packages:

```bash
npm i
```

- Configure Your Job Search

Open [main.js](./main.js) and customize the `queryOptions` object with your desired job search criteria. Uncomment and adjust the options as needed.

```javascript
const queryOptions = {
    keyword: 'Frontend', // e.g., 'Software Engineer', 'Data Scientist'
    location: 'Bengaluru', // e.g., 'New York City', 'Remote'
    dateSincePosted: '5m', // Options: '5m', '10m', '1hr', '24hr' (5 minutes, 10 minutes, 1 hour, 24 hours)
    // jobType: 'full time', // Options: 'full time', 'part time', 'contract', 'temporary', 'volunteer', 'internship'
    // remoteFilter: 'remote', // Uncomment for remote jobs
    // salary: 120000, // Minimum Salary: 40000, 60000, 80000, 100000, 120000
    // experienceLevel: "entry level", // Options: 'internship', 'entry level', 'associate', 'senior', 'director', 'executive'
    // sortBy: "recent", // Options: 'recent', 'relevant'
    limit: '10', // Number of jobs to scrape per run
    page: "0", // Starting page for results
};
```

- Add `NotificationAPI` Credentials

In the same file, replace <credentials> with your actual `NotificationAPI` client ID and client secret. You can find these in your `NotificationAPI` dashboard after signing up.

```javascript
notificationapi.init(
    '<YOUR_NOTIFICATIONAPI_CLIENT_ID>',
    '<YOUR_NOTIFICATIONAPI_CLIENT_SECRET>'
)
```

- Run the Application

Once configured, start the scraper:

```shell
npm start
```

The application will begin scraping jobs and sending email alerts based on your settings.

# 🤝 Contributing
Contributions are welcome! If you have ideas for improvements or new features, feel free to open an issue or submit a pull request.
