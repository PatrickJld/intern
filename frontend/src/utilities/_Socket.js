import { io } from "socket.io-client";

const socketURL = import.meta.env.VITE_SOCKET_URL + "";
export default io(socketURL, {
    withCredentials: true,
    secure: true,
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: 20,
    forceNew: true,
    transports: ["websocket", "polling"],
});

// let access_token = "";
// let user_key = "";
// let s;

// function createSocket(accessToken, user_key) {
//     s = io(socketURL, {
//         withCredentials: true,
//         query: { 
//             token: accessToken,
//             user_key: user_key,
//         },
//         secure: true,
//         reconnection: true,
//         reconnectionDelay: 500,
//         reconnectionAttempts: 20,
//         forceNew: true,
//         transports: ["websocket", "polling"],
//     });
//     s = s.connect();
//     s.on("connect_error", (err) => {
//         console.log(`connect_error due to ${err.message}`);
//     });
//     return s;
// }

// export function buildSocket(accessToken, userKey, count = 0) {
//     return new Promise((resolve, reject) => {
//         if (count < 10) {
//             if (accessToken === undefined || userKey === undefined) {
//                 setTimeout(() => {
//                     resolve(buildSocket(count + 1));
//                 }, 50);
//             } else {
//                 access_token = accessToken;
//                 user_key = userKey;
//                 resolve(createSocket(accessToken, userKey));
//             }
//         } else {
//             reject("Request time out");
//         }
//     });
// }

// export function socket(callback, create = false) {
//     delay(() => {
//         if (!s || create) createSocket(access_token, user_key);

//         return new Promise(() => {
//             if (!s.connected) s.connect();
            
//             callback(s);
//         });
//     });
// }

// function delay(callback, count = 0) {
//     return new Promise(function (resolve, reject) {
//         if (count <= 100) {
//             if (access_token === "") {
//                 setTimeout(() => {
//                     resolve(delay(callback, count + 1));
//                 }, 30);
//             } else {
//                 resolve(callback());
//             }
//         } else {
//             reject("Cannot access token");
//         }
//     });
// }