// require("dotenv").config();

let static_url = "https://cse135.qinjian.xyz/api/statics/";
let performance_url = "https://cse135.qinjian.xyz/api/performances/";
let activity_url = "https://cse135.qinjian.xyz/api/activities/";

let time = Date.now();
async function resetTimer() {
    let current = Date.now();
    let diff = current - time;
    if (diff > 2000) {
        data = {
            break_end_at: current,
            break_length: diff,
            page_info: window.location.href,
            identifier: custom_cookies()
        }
        return await postInstance(activity_url, data);
    }
    time = Date.now();
}

function addIdleEvents() {
    let events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(name => {
        window.addEventListener(name, resetTimer, true);
    });
}

async function getAllInstances(url) {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    const response = await fetch(url, {
            headers: headers,
            redirect: 'follow'
        })
        .then(response => response.json())
        .catch(error => console.log(error));
    return response;
}

async function postInstance(url, data) {

    // check local storage first
    let unsent_data = localStorage.getItem('CSE135');
    if (unsent_data != null) { // data found
        // clear local storage if request is successful to avoid infinite loop
        // if request fails again local storage would be saved again
        localStorage.removeItem('CSE135');
        postInstance(url, unsent_data);
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    const response = await fetch(url, {
            mode: 'cors',
            method: 'POST',
            cache: 'no-cache',
            headers: headers,
            redirect: 'follow',
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => {
            // store in local storage if the request fails somehow
            localStorage.setItem('CSE135', JSON.stringify(data));
            console.error(error);
        });
    return response;
}

function imageExists(image_url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status != 404;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// if cookie exists simply return otherwise create uuid
function custom_cookies() {
    let theResult = getCookie("CSE135");
    if (theResult == null) {
        let unique_id = uuidv4();
        document.cookie = `CSE135=${unique_id}`;
        return unique_id;
    } else {
        return theResult.toString();
    }
}

function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res
}

async function postStatic() {
    data = {
        user_agent_string: navigator.userAgent,
        language: navigator.language,
        accept_cookies: navigator.cookieEnabled,
        allow_js: true,
        allow_imgs: imageExists("https://cse135.qinjian.xyz/statics/Geisel.jpg"),
        allow_css: CSS.supports("( display: flex )"),
        screen_dimensions: {
            width: screen.width,
            height: screen.height
        },
        window_dimensions: {
            width: window.innerWidth,
            height: window.innerHeight
        },
        connection_type: navigator.connection.type,
        identifier: custom_cookies()
    }
    return await postInstance(static_url, data);
}

async function postPerformance() {
    data = {
        timing: JSON.stringify(window.performance.timing),
        start_time: window.performance.timing.requestStart,
        end_time: window.performance.timing.responseEnd,
        total_time: window.performance.timing.connectEnd - window.performance.timing.connectStart,
        identifier: custom_cookies()
    }
    return await postInstance(performance_url, data);
}

async function addMouseEvents() {
    window.addEventListener('mousemove', event => {
        postMouseMovement(event);
    });
    window.addEventListener('scroll', event => {
        postMouseScrolling(event);
    });
    window.onclick = event => {
        postMouseClick(event);
    }
}

async function addKeyboardEvents() {
    window.addEventListener('keypress', async (event) => {
        data = {
            keyboard: event.code,
            page_info: window.location.href,
            identifier: custom_cookies()
        }
        return await postInstance(activity_url, data);
    })
}


async function postEnterInfo() {
    data = {
        enter_site_time: Date.now(),
        page_info: window.location.href,
        identifier: custom_cookies()
    }
    return await postInstance(activity_url, data);
}

async function postLeaveInfo() {
    data = {
        leave_site_time: Date.now(),
        page_info: window.location.href,
        identifier: custom_cookies()
    }
    return await postInstance(activity_url, data);
}

let mouseMovement_counter = 0
async function postMouseMovement(event) {
    mouseMovement_counter++;
    if (mouseMovement_counter % 10 == 0) {
        data = {
            cursor_positions: `${event.clientX},${event.clientY}`,
            clicks: false,
            scrolling: false,
            page_info: window.location.href,
            identifier: custom_cookies()
        }
        return await postInstance(activity_url, data);
    }
}

let mouseScrolling_counter = 0;
async function postMouseScrolling(event) {
    mouseScrolling_counter++;
    if (mouseScrolling_counter % 10 == 0) {
        data = {
            cursor_positions: `${window.scrollX},${window.scrollY}`,
            clicks: false,
            scrolling: true,
            page_info: window.location.href,
            identifier: custom_cookies()
        }
        return await postInstance(activity_url, data);
    }
}

async function postMouseClick(event) {
    data = {
        cursor_positions: `${event.clientX},${event.clientY}`,
        clicks: true,
        scrolling: false,
        page_info: window.location.href,
        identifier: custom_cookies()
    }
    return await postInstance(activity_url, data);
}

async function getAllStatics() {
    return await getAllInstances(static_url)
        .then(response => console.log(response));
}