const notificationapi = require('notificationapi-node-server-sdk').default;
const linkedIn = require("./linkedinJobs");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function currentTime() {
    return new Date().toISOString();
}

notificationapi.init(
    '<YOUR_NOTIFICATIONAPI_CLIENT_ID>',
    '<YOUR_NOTIFICATIONAPI_CLIENT_SECRET>'
)

const queryOptions = {
    keyword: 'Frontend',
    location: 'Bengaluru',
    dateSincePosted: '5m', // 5m, 10m, 1hr, 24hr
    // jobType: 'full time', // full time, part time, contract, temporary, volunteer, internship
    // remoteFilter: 'remote',
    // salary: 120000, //  Minimum Salary: 40000, 60000, 80000, 100000, 120000
    // experienceLevel: "entry level", // internship, entry level, associate, senior, director, executive
    // sortBy: "recent", // recent, relevant
    limit: '10',
    page: "0",
};

const seen = new Map();

async function checkLinkedInJobs() {
    console.log(`[${currentTime()}] Querying LinkedIn for jobs`);
    const response = await linkedIn.query(queryOptions);

    const keys = [];

    if (response) {
        response.forEach(job => {
            keys.push(job.position ? job.position.split(" ").join("") : "");
            keys.push(job.company ? job.company.split(" ").join("") : "");
            keys.push(job.location ? job.location.split(" ").join("") : "");
        });

        const key = keys.join("");

        if (!seen.get(key)) {
            console.log(`[${currentTime()}] New jobs found!`);
            seen.set(key, response);

            try {
                const notificationResponse = await notificationapi.send({
                    type: 'welcome',
                    to: {
                        email: "your_email_id"
                    },
                    email: {
                        subject: 'New LinkedIn Jobs Digest',
                        html: `<p>New jobs were found.</p><pre>${JSON.stringify(response, undefined, 2)}</pre>`
                    }
                });
                console.log(`[${currentTime()}] Notification sent successfully:`, notificationResponse.data);
            } catch (error) {
                console.error(`[${currentTime()}] Something went wrong while sending notification:`, error);
            }

        } else {
            console.log(`[${currentTime()}] No new jobs since last check.`);
        }
    }
}

async function main() {
    while (true) {
        await checkLinkedInJobs();
        await sleep(5000); // Try again after 5s.
    }
}

main().catch(error => {
    console.error("Something went wrong, error: ", error);
});
