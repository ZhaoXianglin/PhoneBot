import axios from 'axios'

export const instance = axios.create({
    //baseURL: "https://www.chatbot.fans:8080",
    baseURL: "http://127.0.0.1:8000",
    timeout: 20000,
})
export let user_model = {
    "user": {
        "preferenceData": {
            "brand": [],
            "price": [],
            "camera": [],
            "nettech": [],
            "os1": [],
            "nfc": [],
            "year": [],
            "fullscreen": [],
            "phone_size": [],
            "phone_weight": [],
            "storage": [],
            "ram": []
        },
        "_id": "",
        "user_preference_model": {
            "preference_value": {
                "brand": {},
                "nettech": {},
                "os1": {},
                "nfc": {},
                "year": {},
                "fullscreen": {},
                "phone_size": {},
                "phone_weight": {},
                "camera": {},
                "storage": {},
                "ram": {},
                "price": {}
            },
            "attribute_frequency": {}
        },
        "user_critique_preference": [],
        "user_constraints": []
    },
    "topRecommendedItem": 0,
    "logger": {
        "dialog": [],
        "latest_dialog": [],
        "browsedItems": [],
        "likedItems": [],
        "dislikedItems": []
    },
    "pool": [],
    "new_pool": []
}
