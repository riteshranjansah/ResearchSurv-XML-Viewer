chrome.action.onClicked.addListener((tab) => {
    handleTabClick(tab);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'activate') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            if (tab && tab.url) {
                handleTabClick(tab);
                sendResponse({ status: 'activated' });
            } else {
                console.error('Error: Tab or tab.url is undefined.');
                sendResponse({ status: 'error' });
            }
        });
        return true;
    }
});

function handleTabClick(tab) {
    // Define URL patterns
    const urlPatterns = [
        /^https:\/\/researchsurv\.com\/apps\/portal\/#\/projects\/detail\/selfserve\/(\d+\/\w+\/\d+)/,
        /^https:\/\/researchsurv\.com\/apps\/portal#\/projects\/detail\/selfserve\/(\d+\/\w+\/\d+)/,
        /^https:\/\/researchsurv\.com\/apps\/portal\/#\/projects\/detail\/selfserve\/(\d+\/\d+)/,
        /^https:\/\/researchsurv\.com\/apps\/portal#\/projects\/detail\/selfserve\/(\d+\/\d+)/,
        /^https:\/\/researchsurv\.com\/rep\/selfserve\/(\d+\/\w+\/\d+):dashboard.*$/,
        /^https:\/\/researchsurv\.com\/survey\/selfserve\/(\d+\/\w+\/\d+).*$/,
        /^https:\/\/researchsurv\.com\/apps\/distribution\/selfserve\/(\d+\/\w+\/\d+)$/,
        /^https:\/\/researchsurv\.com\/apps\/respondents\/report\/selfserve\/(\d+\/\w+\/\d+)$/,
        /^https:\/\/researchsurv\.com\/rep\/selfserve\/(\d+\/\d+):dashboard.*$/,
        /^https:\/\/researchsurv\.com\/survey\/selfserve\/(\d+\/\d+).*$/,
        /^https:\/\/researchsurv\.com\/apps\/distribution\/selfserve\/(\d+\/\d+)$/,
        /^https:\/\/researchsurv\.com\/apps\/respondents\/report\/selfserve\/(\d+\/\d+)$/

    ];


    const urlPatterns2 = [
        /^https:\/\/prodegemr\.decipherinc\.com\/apps\/portal\/#\/projects\/detail\/selfserve\/(\d+\/\w+\/\d+)/,
        /^https:\/\/prodegemr\.decipherinc\.com\/apps\/portal#\/projects\/detail\/selfserve\/(\d+\/\w+\/\d+)/,
        /^https:\/\/prodegemr\.decipherinc\.com\/apps\/portal\/#\/projects\/detail\/selfserve\/(\d+\/\d+)/,
        /^https:\/\/prodegemr\.decipherinc\.com\/apps\/portal#\/projects\/detail\/selfserve\/(\d+\/\d+)/,
        /^https:\/\/prodegemr\.decipherinc\.com\/rep\/selfserve\/(\d+\/\w+\/\d+):dashboard.*$/,
        /^https:\/\/prodegemr\.decipherinc\.com\/survey\/selfserve\/(\d+\/\w+\/\d+).*$/,
        /^https:\/\/prodegemr\.decipherinc\.com\/apps\/distribution\/selfserve\/(\d+\/\w+\/\d+)$/,
        /^https:\/\/prodegemr\.decipherinc\.com\/apps\/respondents\/report\/selfserve\/(\d+\/\w+\/\d+)$/,
        /^https:\/\/prodegemr\.decipherinc\.com\/rep\/selfserve\/(\d+\/\d+):dashboard.*$/,
        /^https:\/\/prodegemr\.decipherinc\.com\/survey\/selfserve\/(\d+\/\d+).*$/,
        /^https:\/\/prodegemr\.decipherinc\.com\/apps\/distribution\/selfserve\/(\d+\/\d+)$/,
        /^https:\/\/prodegemr\.decipherinc\.com\/apps\/respondents\/report\/selfserve\/(\d+\/\d+)$/
    ];

    // Iterate over patterns to find a match
    let dynamicPart = null;
    for (const pattern of urlPatterns) {
        const match = tab.url.match(pattern);
        if (match) {
            dynamicPart = match[1];
            break;
        }
    }
    // Iterate over patterns to find a match
    let dynamicPart2 = null;
    for (const pattern2 of urlPatterns2) {
        const match = tab.url.match(pattern2);
        if (match) {
            dynamicPart2 = match[1];
            break;
        }
    }
    // If a dynamic part is found, construct the new URL and create a new tab
    if (dynamicPart) {
        // Create a new URL based on the pattern that matched
        const newUrl = `https://researchsurv.com/apps/lumos/${dynamicPart}:raw`;
        chrome.tabs.create({ url: newUrl });
    }
    else if (dynamicPart2) {

        const newUrl2 = `https://prodegemr.decipherinc.com/apps/lumos/${dynamicPart2}:raw`;
        chrome.tabs.create({ url: newUrl2 });
    }

    else {
        console.log('This extension only works on specified ResearchSurv pages.');
    }
}

