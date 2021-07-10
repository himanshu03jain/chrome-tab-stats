var timedTabs = Array();
var totalCreated = 0;
var totalRemoved = 0;

// Count currently open tabs when script starts.
chrome.windows.getAll(null, function (windows) {
  for (i in windows) {
    chrome.tabs.getAllInWindow(windows[i].id, function (tabs) {
      totalCreated += tabs.length;
      timedTabs.push([getCurrentTime(), totalCreated - totalRemoved]);
    });
  }
});

// Listeners for created and removed tabs.
chrome.tabs.onCreated.addListener(function(tab) {
  totalCreated++;
  timedTabs.push([getCurrentTime(), totalCreated - totalRemoved]);
});
chrome.tabs.onRemoved.addListener(function(tab) {
  totalRemoved++;
  timedTabs.push([getCurrentTime(), totalCreated - totalRemoved]);
});

// Get current time with timezone offset for flot.
function getCurrentTime() {
  time = new Date()
  return time.getTime() - (time.getTimezoneOffset() * 60 * 1000);
}
